// Dependency-free Chrome DevTools checks against the real static export.
// Artifacts and disposable Chrome profile are confined to .seo-artifacts/.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import { seoRoutes } from '../lib/seoRoutes.js';

const chromePath = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
assert(existsSync(chromePath), 'Set CHROME_PATH to an installed Chromium browser.');
const artifacts = resolve('.seo-artifacts'); mkdirSync(artifacts, { recursive: true });
const profile = mkdtempSync(resolve(artifacts, 'chrome-'));
const root = resolve('out');
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.txt': 'text/plain', '.xml': 'application/xml' };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = resolve(root, `.${path === '/' ? '/index.html' : path}`);
  if (!file.startsWith(root + sep)) { res.writeHead(403); return res.end(); }
  if (!extname(file) && existsSync(`${file}.html`)) file += '.html';
  if (!existsSync(file)) { res.writeHead(404); return res.end('Not found'); }
  try { res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' }); res.end(readFileSync(file)); } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const chrome = spawn(chromePath, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const report = { viewports: [], runtimeErrors: [], failedRequests: [], metrics: [], checks: [], screenshots: [] };
try {
  const portFile = resolve(profile, 'DevToolsActivePort');
  for (let n = 0; !existsSync(portFile) && n < 100; n++) await delay(100);
  assert(existsSync(portFile), 'Chrome remote debugging did not start.');
  const port = readFileSync(portFile, 'utf8').split('\n')[0];
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  ws = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let sequence = 0; const pending = new Map();
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id) { const task = pending.get(message.id); if (task) { clearTimeout(task.timer); pending.delete(message.id); message.error ? task.reject(new Error(JSON.stringify(message.error))) : task.resolve(message.result); } }
    if (message.method === 'Runtime.exceptionThrown') report.runtimeErrors.push(message.params.exceptionDetails.text + ': ' + (message.params.exceptionDetails.exception?.description || ''));
    if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) report.failedRequests.push({ url: message.params.response.url, status: message.params.response.status });
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 20000); pending.set(id, { resolve, reject, timer }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails)); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.__seoMetrics={lcp:null,cls:0};try{new PerformanceObserver(l=>{for(const e of l.getEntries())window.__seoMetrics.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__seoMetrics.cls+=e.value}).observe({type:'layout-shift',buffered:true})}catch{}` });
  const viewport = async (width, height = width < 768 ? 844 : 1000) => { await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false }); await delay(100); };
  const navigate = async route => { await send('Page.navigate', { url: origin + route }); for (let i = 0; i < 100; i++) { await delay(100); if (await evaluate('document.readyState === "complete"')) break; } await evaluate('Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]).then(()=>true)'); await delay(250); };
  for (const route of seoRoutes) {
    await viewport(390); await navigate(route);
    for (const width of [320,360,375,390,430,768,1024,1440,1920]) {
      await viewport(width);
      const state = await evaluate(`(()=>{const w=innerWidth; const selectors=${JSON.stringify(route === '/' ? ['.products-section','.product-card','.product-meta','.footer','.nav-inner'] : route === '/our-story' ? ['.founder-card','.footer','.nav-inner'] : ['main','main h1','main h2','main p','main figure','main dl','.footer','.nav-inner'])};const clipped=[...document.querySelectorAll(selectors.join(','))].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>w+1||r.left< -1||e.scrollWidth>e.clientWidth+2)}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,50)}));return {width:w,documentWidth:document.documentElement.scrollWidth,clipped,brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)}})()`);
      report.viewports.push({ route, ...state });
      assert.equal(state.brokenImages.length, 0, `${route}: broken images`);
      if (route !== '/' && route !== '/our-story') assert.equal(state.clipped.length, 0, `${route} ${width}: overflow ${JSON.stringify(state.clipped)}`);
      if ((route === '/oranges' || route === '/products/malta-10kg') && [390,1440].includes(width)) {
        const file = `${route.replaceAll('/', '_')}-${width}.png`;
        const screenshot = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(resolve(artifacts, file), Buffer.from(screenshot.data, 'base64')); report.screenshots.push(file);
      }
    }
  }
  await viewport(390); await navigate('/');
  await evaluate('localStorage.removeItem("mrkinoow-bag")'); await navigate('/');
  await evaluate('document.querySelector(".product-add").click()'); await delay(200);
  assert.equal(await evaluate('document.querySelectorAll(".cart-item").length'), 1);
  await evaluate('document.querySelector(".stepper button:last-child").click()'); await delay(100);
  assert((await evaluate('document.querySelector(".total-row").textContent')).includes('4,998'));
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }); await delay(100);
  assert.equal(await evaluate('document.querySelector(".drawer-open") === null'), true);
  await navigate('/');
  assert.equal(await evaluate('document.querySelector(".cart-count").textContent'), '2');
  await evaluate('document.querySelectorAll(".product-add")[1].click()'); await delay(100);
  assert((await evaluate('document.querySelector(".total-row").textContent')).includes('7,397'));
  await evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.__copiedOrder=text}}});document.querySelector(".checkout-btn").click()'); await delay(100);
  assert((await evaluate('window.__copiedOrder')).includes('7,397'));
  await evaluate('document.querySelector(".cart-overlay").click()'); await delay(100);
  assert.equal(await evaluate('document.querySelector(".drawer-open") === null'), true);
  await evaluate('document.querySelector(".cart-button").click()'); await delay(100);
  for (let i = 0; i < 3; i++) { await evaluate('document.querySelector(".stepper button").click()'); await delay(100); }
  assert.equal(await evaluate('document.querySelectorAll(".cart-item").length'), 0);
  assert.equal(await evaluate('!!document.querySelector(".cart-empty")'), true);
  await evaluate('document.querySelector(".cart-heading button").click()'); await delay(100);
  await evaluate('document.querySelector(".mobile-menu").click()'); await delay(100);
  assert.equal(await evaluate('document.querySelector(".mobile-menu").getAttribute("aria-expanded")'), 'true');
  assert.equal(await evaluate('document.querySelector("#primary-navigation a:last-child").getAttribute("href")'), '/oranges');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 }); await delay(100);
  assert.equal(await evaluate('document.querySelector(".mobile-menu").getAttribute("aria-expanded")'), 'false');
  for (const [width, height] of [[375,667],[390,844],[430,932],[768,1024]]) {
    await viewport(width, height); await navigate('/');
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".narrative-sticky")).position'), 'sticky', `${width}px sticky narrative`);
    for (const progress of [0,.333333,.666667,1]) {
      await evaluate(`(()=>{const n=document.querySelector('.narrative');window.scrollTo({top:n.getBoundingClientRect().top+scrollY+(n.offsetHeight-innerHeight)*${progress},behavior:'instant'})})()`); await delay(300);
      const visible = await evaluate('[...document.querySelectorAll(".chapter")].map(e=>Number(getComputedStyle(e).opacity))');
      assert.equal(visible.length, 4, `${width}px chapter count`);
      assert(visible[Math.round(progress*3)] > .99, `${width}px chapter ${progress}`);
    }
    const animated = await evaluate('[...document.querySelectorAll(".chapter")].some(e=>getComputedStyle(e).transform!=="none")');
    assert(animated, `${width}px chapter transition transform`);
    await evaluate('(()=>{const n=document.querySelector(".narrative");window.scrollTo({top:n.getBoundingClientRect().top+scrollY,behavior:"instant"})})()'); await delay(300);
    assert((await evaluate('[...document.querySelectorAll(".chapter")].map(e=>Number(getComputedStyle(e).opacity))'))[0] > .99, `${width}px reverse chapter 1`);
  }
  await viewport(1440);
  for (const progress of [0,.333333,.666667,1]) {
    await evaluate(`(()=>{const n=document.querySelector('.narrative');window.scrollTo({top:n.getBoundingClientRect().top+scrollY+(n.offsetHeight-innerHeight)*${progress},behavior:'instant'})})()`); await delay(300);
    const visible = await evaluate('[...document.querySelectorAll(".chapter")].map(e=>Number(getComputedStyle(e).opacity))');
    assert(visible[Math.round(progress*3)] > .99, `Desktop chapter ${progress}`);
  }
  await viewport(390,844); await navigate('/'); await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] }); await delay(300);
  assert(await evaluate('[...document.querySelectorAll(".chapter")].every(e=>getComputedStyle(e).transform==="none")'));
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".narrative-sticky")).position'), 'relative');
  await send('Emulation.setEmulatedMedia', { features: [] });
  report.checks.push('Add both products; increment; totals 4,998 and 7,397; persistence; Escape/overlay/close; decrement to empty; enquiry text with mocked clipboard; menu; four scroll-driven chapters forward and reverse at 375×667, 390×844, 430×932, 768×1024 and desktop; reduced motion');
  // Cold local load samples, with a fixed viewport and no scrolling or resizing during measurement.
  for (const [width, route] of [[390,'/'],[1440,'/'],[390,'/oranges'],[1440,'/oranges']]) {
    await viewport(width); await send('Network.clearBrowserCache'); await navigate(route); await delay(2500);
    report.metrics.push({route,width,...await evaluate('window.__seoMetrics'), conditions:'local unthrottled Chrome headless, DPR 1; not field CWV or Lighthouse; no INP claim'});
  }
  assert.equal(report.runtimeErrors.length, 0, 'Browser runtime errors');
  report.checks.push('No uncaught JavaScript exceptions');
} finally {
  writeFileSync(resolve(artifacts, 'browser-report.json'), JSON.stringify(report, null, 2));
  ws?.close(); chrome.kill(); server.close();
}
console.log(JSON.stringify({ checks: report.checks, viewports: report.viewports.length, existingLayoutFindings: report.viewports.filter(v=>v.clipped.length), failedRequests: report.failedRequests, metrics: report.metrics, report: '.seo-artifacts/browser-report.json' }, null, 2));
