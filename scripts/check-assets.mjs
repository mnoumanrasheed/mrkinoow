import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const files=['app/page.jsx','app/layout.jsx','app/our-story/page.jsx','app/globals.css','components/HomeExperience.jsx','components/ScrollNarrative.jsx','components/CartDrawer.jsx','public/images/hero-home.webp','public/images/hero-fruit.webp','public/images/founder.png','public/images/co-founder.png','public/images/box-5kg.svg','public/images/box-10kg.svg'];
let fails=0;
for(const file of files){if(!existsSync(join(process.cwd(),file))){console.error('MISSING:',file);fails++}else console.log('OK',file)}
for (const file of ['app/page.jsx','app/our-story/page.jsx','components/HomeExperience.jsx']){ const text=readFileSync(file,'utf8'); if(/\/api\/|fetch\(['"]\/(api|checkout)/.test(text)){ console.error('Unexpected backend reference:',file);fails++}}
if(fails){process.exitCode=1}else console.log('Static source and required assets are present.');
