import Link from 'next/link';
import { Header, Footer } from '@/components/BrandShell';
import Icon from '@/components/Icons';
import { portraitAttributes } from '@/lib/portraitAssets';
import { pageMetadata } from '@/lib/seo.mjs';
import { siteConfig } from '@/lib/siteConfig';
import styles from './StoryPage.module.css';

export const metadata = pageMetadata({
  title: 'Our Story — Freshness & Thoughtful Presentation',
  description: 'Discover the idea behind Mr. Kinoow: a citrus brand shaped by freshness, thoughtful presentation and the joy of sharing. Meet the people behind the vision.',
  path: '/our-story',
});

const commitments = [
  { number: '01', icon: 'leaf', title: 'From our own farm', label: 'Known origin', text: 'Both the Royal and Golden Kinnow Collections are grown and selected at our own farm.' },
  { number: '02', icon: 'box', title: '10 KG net fruit weight', label: 'Packaging excluded', text: 'Every collection box contains 10 KG net fruit weight. The box and other packaging are excluded.' },
  { number: '03', icon: 'star', title: 'Your order, prepared', label: 'Shared on WhatsApp', text: 'A harvesting and packing video is shared with every order via WhatsApp.' },
  { number: '04', icon: 'sun', title: 'Complimentary delivery', label: 'Across Pakistan', text: 'Delivery is free across Pakistan via Leopards Courier.' },
];

const harvestNotes = [
  { number: '01', title: 'No artificial polish', text: 'Our kinnows are presented without artificial polishing.' },
  { number: '02', title: 'No added preservatives', text: 'No preservatives are added to either collection.' },
  { number: '03', title: 'WhatsApp transparency', text: 'A harvesting and packing video is shared with every order.' },
];

const journey = [
  { number: '01', title: 'Choose your collection', text: 'Select Royal for larger kinnows or Golden for comparatively smaller kinnows from the same farm.' },
  { number: '02', title: 'Selected and packed', text: 'Your 10 KG net fruit box is prepared without artificial polishing or added preservatives.' },
  { number: '03', title: 'Prepared and delivered', text: 'A harvesting and packing video is shared via WhatsApp, with free delivery across Pakistan through Leopards Courier.' },
];

export default function StoryPage() {
  const phone = (siteConfig.whatsapp || '').replace(/\D/g, '');

  return (
    <>
      <Header story />
      <main className={styles.page}>
        <section className={styles.hero}>
          <img className={styles.heroImage} src="/images/hero-fruit.webp" alt="Fresh citrus on a Mr. Kinoow orchard branch" width="1672" height="941" fetchPriority="high" />
          <div className={styles.heroShade} />
          <div className={`shell ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>OUR STORY · PUNJAB, PAKISTAN</p>
              <h1>Rooted in nature.<br /><em>Made to be shared.</em></h1>
              <p className={styles.heroIntro}>Mr. Kinoow brings together two carefully selected kinnow collections from our own farm, packed with care and delivered to doorsteps across Pakistan.</p>
              <div className={styles.heroActions}>
                <a className={styles.heroScroll} href="#origin"><span>Explore our approach</span><Icon name="arrowDown" size={16} /></a>
                <span>Our own farm · Thoughtfully packed</span>
              </div>
            </div>
            <div className={styles.heroCaption}><span>01</span><p>Two fruit-size selections. One considered farm-to-doorstep experience.</p></div>
          </div>
        </section>

        <section className={styles.manifesto} aria-label="Our standards">
          <div className={`shell ${styles.manifestoGrid}`}>
            <p className={styles.manifestoLead}>Our approach is simple: select kinnows from our own farm, present them without artificial polishing or added preservatives, and make each order clear.</p>
            <div className={styles.stats}>
              <div><strong>OWN</strong><span>Farm grown and selected</span></div>
              <div><strong>10 KG</strong><span>Net fruit weight</span></div>
              <div><strong>FREE</strong><span>Nationwide courier</span></div>
            </div>
          </div>
        </section>

        <section className={styles.origin} id="origin">
          <div className={`shell ${styles.originGrid}`}>
            <div className={styles.originMedia}>
              <div className={styles.imageFrame}><img src="/images/orchard-sunset-premium.png" alt="Golden evening sunset over a citrus orchard in Punjab" width="2037" height="772" loading="lazy" decoding="async" /></div>
              <div className={styles.imageMeta}><span>Origin orchard</span><span>Punjab citrus belt</span></div>
            </div>
            <div className={styles.originCopy}>
              <p className={styles.sectionLabel}>01 — Our origin</p>
              <h2>From our own farm<br /><em>to your doorstep.</em></h2>
              <div className={styles.rule} />
              <p>Mr. Kinoow offers two kinnow collections from the same farm. Royal contains larger kinnows; Golden contains comparatively smaller kinnows. The distinction is fruit size, not a claim of different sweetness, flavour, nutrition or quality.</p>
              <p>Both are selected and packed with the same care. Each box contains 10 KG net fruit weight, excluding the box and other packaging.</p>
              <ul className={styles.originList}>
                <li><Icon name="leaf" size={17} /> From our own farm</li>
                <li><Icon name="sun" size={17} /> No artificial polishing</li>
                <li><Icon name="star" size={17} /> No added preservatives</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.purity}>
          <div className={`shell ${styles.purityHeading}`}>
            <p className={styles.sectionLabel}>02 — Thoughtful presentation</p>
            <h2>Nothing artificial.<br /><em>Only what belongs.</em></h2>
            <p>Neither collection uses artificial polishing or added preservatives. This clear, restrained approach keeps the presentation focused on the fruit and the care taken in preparing each order.</p>
          </div>
          <div className={`shell ${styles.purityVisual}`}>
            <img src="/images/peel-reveal-premium.png" alt="Freshly peeled citrus with natural droplets" width="2106" height="747" loading="lazy" decoding="async" />
            <span>Prepared with care</span>
          </div>
          <div className={`shell ${styles.harvestNotes}`}>
            {harvestNotes.map((note) => <article key={note.number}><span>{note.number}</span><h3>{note.title}</h3><p>{note.text}</p></article>)}
          </div>
        </section>

        <section className={styles.promise} id="promise">
          <div className={`shell ${styles.promiseIntro}`}>
            <div><p className={styles.sectionLabel}>03 — Our promise</p><h2>Care you can<br /><em>see and verify.</em></h2></div>
            <p>Four verified commitments define the Mr. Kinoow collection.</p>
          </div>
          <div className={`shell ${styles.commitmentGrid}`}>
            {commitments.map((item) => (
              <article className={styles.commitment} key={item.number}>
                <div className={styles.commitmentTop}><span>{item.number}</span><Icon name={item.icon} size={22} /></div>
                <p className={styles.commitmentLabel}>{item.label}</p><h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.founders} id="founders">
          <div className={`shell ${styles.foundersHeading}`}>
            <p className={styles.sectionLabel}>04 — The people</p>
            <h2>Two minds.<br /><em>One honest vision.</em></h2>
            <p>Meet the people shaping the idea, presentation and farm-to-doorstep experience of Mr. Kinoow.</p>
          </div>
          <div className={`shell ${styles.founderGrid}`}>
            {siteConfig.founders.map((founder, index) => (
              <article className={styles.founder} key={founder.name}>
                <div className={styles.founderPortrait}>
                  <span className={styles.founderNumber}>0{index + 1}</span>
                  <img src={founder.image} alt={`Portrait of ${founder.name}, ${founder.role} of Mr. Kinoow`} loading="lazy" decoding="async" {...portraitAttributes(founder.image, '(max-width: 760px) 90vw, 42vw')} />
                </div>
                <div className={styles.founderInfo}><p>{founder.role}</p><h3>{founder.name}</h3><span>{founder.bio}</span></div>
              </article>
            ))}
          </div>
          <blockquote className={`shell ${styles.quote}`}>
            <p>“For us, thoughtful presentation begins with clear product information and care at every step from our farm to your doorstep.”</p>
            <footer>Dr Ebbad Nazir &amp; M. Nouman <span>— Founders, Mr. Kinoow</span></footer>
          </blockquote>
        </section>

        <section className={styles.process} id="journey">
          <div className={`shell ${styles.processGrid}`}>
            <div className={styles.processHeading}><p className={styles.sectionLabel}>05 — Your order</p><h2>Simple choices.<br /><em>Clear details.</em></h2><p>Choose your preferred fruit size, review the verified box details, and prepare your order through WhatsApp.</p></div>
            <ol className={styles.timeline}>
              {journey.map((step) => <li key={step.number}><span className={styles.timelineNumber}>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className={styles.cta}>
          <img src="/images/citrus-splash.webp" alt="" width="1600" height="900" loading="lazy" aria-hidden="true" />
          <div className={styles.ctaShade} />
          <div className={`shell ${styles.ctaInner}`}>
            <div><p className={styles.sectionLabel}>From our farm to your doorstep</p><h2>Bring home the<br /><em>Mr. Kinoow collection.</em></h2></div>
            <div className={styles.ctaAction}>
              <p>Grown and selected at our own farm, thoughtfully packed, and delivered free across Pakistan via Leopards Courier.</p>
              <div className={styles.ctaButtons}>
                <Link className="btn btn-solid" href="/#collection">Explore the collection <Icon name="arrow" size={18} /></Link>
                {phone && <a className={styles.textLink} href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">Order on WhatsApp <Icon name="whatsapp" size={17} /></a>}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
