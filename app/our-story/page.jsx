import Link from 'next/link';
import { Header, Footer } from '@/components/BrandShell';
import Icon from '@/components/Icons';
import StoryJournalMotion from '@/components/StoryJournalMotion';
import StoryReveal from '@/components/StoryReveal';
import { portraitAttributes } from '@/lib/portraitAssets';
import { pageMetadata } from '@/lib/seo.mjs';
import { siteConfig } from '@/lib/siteConfig';
import styles from './StoryPage.module.css';

export const metadata = pageMetadata({
  title: 'Our Story — The Orchard Journal',
  description: 'Discover the story of Mr. Kinoow, from our own farm in Punjab to thoughtfully packed Royal and Golden Kinnow Collections delivered across Pakistan.',
  path: '/our-story',
});

const commitments = [
  { number: '01', title: 'From Our Own Farm', text: 'Grown and selected at our own farm.' },
  { number: '02', title: 'Net Fruit Weight', text: 'Every box contains 10 KG of fruit, excluding packaging.' },
  { number: '03', title: 'See Your Order Prepared', text: 'A harvesting and packing video is shared with every order through WhatsApp.' },
  { number: '04', title: 'Delivery On Us', text: 'Complimentary delivery across Pakistan via Leopards Courier.' },
];

const fruitStatements = ['NO ARTIFICIAL POLISHING', 'NO ADDED PRESERVATIVES', 'THOUGHTFULLY PACKED'];

const journey = [
  { number: '01', title: 'Choose', text: 'Choose Royal for larger kinnows or Golden for comparatively smaller kinnows.' },
  { number: '02', title: 'Prepare', text: 'Each box is packed with 10 KG net fruit weight, excluding packaging.' },
  { number: '03', title: 'Deliver', text: 'A harvesting and packing video is shared through WhatsApp, with complimentary delivery via Leopards Courier.' },
];

export default function StoryPage() {
  const phone = (siteConfig.whatsapp || '').replace(/\D/g, '');

  return <>
    <Header story />
    <StoryJournalMotion className={styles.page}>
      <section className={styles.hero} aria-labelledby="story-title">
        <div className={styles.heroMedia} data-story-parallax>
          <img src="/images/hero-fruit.webp" alt="Kinnows and green leaves in warm cinematic light" width="1672" height="941" fetchPriority="high" />
        </div>
        <div className={styles.heroShade}/>
        <div className={`shell ${styles.heroLayout}`}>
          <div className={styles.heroNumber} aria-hidden="true"><span>THE ORCHARD JOURNAL</span><strong>00</strong></div>
          <StoryReveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>THE STORY OF MR. KINOOW</p>
            <h1 id="story-title"><span>Every fruit</span><em>has a beginning.</em></h1>
            <p className={styles.heroIntro}>Ours begins at our own farm, with a simple belief: good fruit deserves thoughtful care.</p>
          </StoryReveal>
          <a className={styles.scrollCue} href="#roots"><span>Read the journal</span><i aria-hidden="true"/><Icon name="arrowDown" size={15}/></a>
        </div>
      </section>

      <section className={styles.roots} id="roots" aria-labelledby="roots-title">
        <div className={styles.rootsImage} data-story-parallax>
          <img src="/images/orchard-sunset-premium.png" alt="Cinematic orchard landscape representing the setting of the Mr. Kinoow story" width="2037" height="772" loading="lazy" decoding="async" />
          <span>Punjab, Pakistan</span>
        </div>
        <div className={`shell ${styles.rootsLayout}`}>
          <StoryReveal className={styles.rootsHeading}>
            <p className={styles.eyebrow}>01 / OUR ROOTS</p>
            <h2 id="roots-title">It begins with<br/><em>the orchard.</em></h2>
          </StoryReveal>
          <StoryReveal className={styles.rootsCopy} delay={120}>
            <span className={styles.dropCap}>M</span>
            <p>Mr. Kinoow brings kinnows from our own farm in Punjab to homes across Pakistan. We focus on careful selection, thoughtful packing, and a clear connection to where our fruit comes from.</p>
            <small>OUR OWN FARM · PUNJAB</small>
          </StoryReveal>
        </div>
      </section>

      <section className={styles.fruit} aria-labelledby="fruit-title">
        <div className={`shell ${styles.fruitIntro}`}>
          <StoryReveal>
            <p className={styles.eyebrow}>02 / THE FRUIT</p>
            <h2 id="fruit-title">Naturally, just as<br/><em>it should be.</em></h2>
          </StoryReveal>
          <StoryReveal tag="p" delay={120}>Our kinnows are presented without artificial polishing or added preservatives. We believe the fruit should remain the focus.</StoryReveal>
        </div>
        <div className={`shell ${styles.fruitExperience}`}>
          <figure className={styles.fruitVisual} data-story-parallax>
            <img src="/images/peel-reveal-premium.png" alt="Close-up composition of peeled citrus and leaves" width="2106" height="747" loading="lazy" decoding="async" />
            <figcaption>THE FRUIT, CLOSE UP</figcaption>
          </figure>
          <div className={styles.fruitStatements}>
            {fruitStatements.map((statement, index)=><StoryReveal className={styles.fruitStatement} key={statement} delay={index * 70}>
              <span>0{index + 1}</span><p>{statement}</p>
            </StoryReveal>)}
          </div>
        </div>
      </section>

      <section className={styles.promise} aria-labelledby="promise-title">
        <div className={`shell ${styles.promiseHeading}`}>
          <StoryReveal><p className={styles.eyebrow}>03 / WHAT MATTERS TO US</p><h2 id="promise-title">Considered in<br/><em>every detail.</em></h2></StoryReveal>
          <p className={styles.promiseNote}>Four clear commitments guide the experience from our farm to your doorstep.</p>
        </div>
        <ol className={`shell ${styles.promiseIndex}`}>
          {commitments.map((item,index)=><StoryReveal tag="li" className={styles.promiseItem} delay={index * 55} key={item.number}>
            <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
          </StoryReveal>)}
        </ol>
      </section>

      <section className={styles.founders} aria-labelledby="founders-title">
        <div className={`shell ${styles.foundersHeading}`}>
          <StoryReveal>
            <p className={styles.eyebrow}>04 / THE FOUNDERS</p>
            <h2 id="founders-title">Two minds.<br/><em>One shared vision.</em></h2>
          </StoryReveal>
          <StoryReveal tag="p" delay={120}>Behind Mr. Kinoow are two people working to bring a more thoughtful fruit-shopping experience to homes across Pakistan.</StoryReveal>
        </div>
        <div className={`shell ${styles.portraitStage}`}>
          {siteConfig.founders.map((founder,index)=><StoryReveal tag="article" variant={index ? 'left' : 'right'} className={`${styles.founder} ${index ? styles.founderSecond : styles.founderFirst}`} key={founder.name}>
            <div className={styles.portrait}>
              <span aria-hidden="true">0{index + 1}</span>
              <img src={founder.image} alt={`Portrait of ${founder.name}, ${founder.role} at Mr. Kinoow`} loading="lazy" decoding="async" {...portraitAttributes(founder.image, '(max-width: 760px) 92vw, 40vw')} />
            </div>
            <div className={styles.founderCopy}><p>{founder.role}</p><h3>{founder.name}</h3><span>{founder.bio}</span></div>
          </StoryReveal>)}
        </div>
      </section>

      <section className={styles.experience} aria-labelledby="experience-title">
        <div className={`shell ${styles.experienceLayout}`}>
          <StoryReveal className={styles.experienceHeading}>
            <p className={styles.eyebrow}>05 / THE EXPERIENCE</p>
            <h2 id="experience-title">A simple journey,<br/><em>thoughtfully handled.</em></h2>
          </StoryReveal>
          <ol className={styles.timeline} data-story-timeline>
            {journey.map((step,index)=><StoryReveal tag="li" delay={index * 70} key={step.number}>
              <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
            </StoryReveal>)}
          </ol>
        </div>
      </section>

      <section className={styles.finalFrame} aria-labelledby="final-title">
        <img src="/images/citrus-splash.webp" alt="Citrus in warm dramatic light" width="1600" height="900" loading="lazy" decoding="async" data-story-parallax />
        <div className={styles.finalShade}/>
        <div className={`shell ${styles.finalLayout}`}>
          <StoryReveal className={styles.finalCopy}>
            <p className={styles.eyebrow}>THE MR. KINOOW COLLECTION</p>
            <h2 id="final-title">From our farm.<br/><em>To your home.</em></h2>
          </StoryReveal>
          <StoryReveal className={styles.finalAction} delay={120}>
            <p>Discover our Royal and Golden Kinnow Collections, thoughtfully selected and delivered across Pakistan.</p>
            <div className={styles.finalButtons}>
              <Link className={styles.primaryCta} href="/#collection">Explore the Collection</Link>
              {phone&&<a className={styles.secondaryCta} href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={17}/>Order on WhatsApp</a>}
            </div>
          </StoryReveal>
        </div>
      </section>
    </StoryJournalMotion>
    <Footer />
  </>;
}
