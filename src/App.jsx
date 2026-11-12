import React, { useMemo, useState } from 'react';
import { brandProof, brands, caseStudies, experience, publishedWork } from './content.js';

const BASE = import.meta.env.BASE_URL;
const headshot = `${BASE}assets/jatin-deewan-headshot.png`;
const resume = `${BASE}assets/jatin-deewan-resume.pdf`;
const email = 'jatindeewan@gmail.com';
const phone = '971569669836';
const linkedin = 'https://www.linkedin.com/in/jatin-deewan/';

function Label({ n, children }) { return <div className="section-label"><span>{n}</span><span>{children}</span><i /></div>; }
function InstagramCard({ item }) {
  const [loaded, setLoaded] = useState(false);
  const kind = item.instagramType === 'reel' ? 'reel' : 'p';
  return <article className="media-card"><div className="media-frame instagram-frame">{loaded ? <iframe title={item.title} src={`https://www.instagram.com/${kind}/${item.shortcode}/embed/`} loading="lazy" allow="encrypted-media; picture-in-picture" /> : <div className="embed-placeholder"><small>INSTAGRAM / PUBLISHED WORK</small><strong>{item.title}</strong><button onClick={() => setLoaded(true)}>Load Instagram post ↗</button></div>}</div><div className="media-caption"><strong>{item.title}</strong><a href={item.url} target="_blank" rel="noreferrer">Open original ↗</a></div></article>;
}
function MediaCard({ item }) {
  if (item.type === 'instagram') return <InstagramCard item={item} />;
  if (item.type === 'youtube') return <article className="media-card"><div className="media-frame"><iframe title={item.title} src={`https://www.youtube-nocookie.com/embed/${item.videoId}?rel=0`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><div className="media-caption"><strong>{item.title}</strong><a href={item.url} target="_blank" rel="noreferrer">Open original ↗</a></div></article>;
  return <article className="linkedin-card"><span className="linkedin-icon">in</span><small>{item.source || 'LINKEDIN / PUBLISHED WORK'}</small><strong>{item.title}</strong><p>Open the original LinkedIn publication to view the post and its full context.</p><a href={item.url} target="_blank" rel="noreferrer">View publication ↗</a></article>;
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [filter, setFilter] = useState('All work');
  const [contactOpen, setContactOpen] = useState(false);
  const groups = useMemo(() => ['All work', ...new Set(publishedWork.map(x => x.group))], []);
  const visibleWork = useMemo(() => filter === 'All work' ? publishedWork : publishedWork.filter(x => x.group === filter), [filter]);
  React.useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);

  return <div className="site-shell">
    <header className="site-header"><a className="wordmark" href="#top">JD<span>®</span></a><nav><a href="#about">00 Intro</a><a href="#experience">01 Journey</a><a href="#work">02 Work</a><a href="#published">03 Published</a><a href="#contact">04 Contact</a></nav><button className="theme-toggle" onClick={() => setDark(v => !v)}>{dark ? 'LIGHT' : 'DARK'}</button></header>
    <main id="top">
      <section className="hero" id="about">
        <div className="hero-topline"><span>CHAPTER 00 / ENTERING</span><span>JATIN DEEWAN / PORTFOLIO 2026</span><span>DUBAI, UAE ↗</span></div>
        <div className="hero-main">
          <div className="hero-copy"><p className="eyebrow"><i /> MARKETING LEADERSHIP · BRAND · BUSINESS GROWTH</p><h1>JATIN<br/><em>DEEWAN</em></h1><p className="hero-role">MARKETING LEADER / INDIA · EUROPE · EMEA</p><p className="hero-line">I build brands, open markets and turn marketing into business momentum.</p><div className="hero-actions"><a className="button-primary" href="#work">Explore selected work ↗</a><a className="button-text" href={resume} download="Jatin-Deewan-Resume.pdf">Download résumé ↓</a></div></div>
          <div className="hero-image-wrap"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><img src={headshot} alt="Jatin Deewan" onError={e => { e.currentTarget.style.opacity = '0'; }} /><div className="image-label">PORTRAIT / 001</div><div className="image-caption">STRATEGY TO EXECUTION<br/>CAMPAIGN TO COMMERCIAL IMPACT</div></div>
          <div className="hero-aside">BRAND IS A PROMISE.<br/>GROWTH IS THE PROOF.</div>
        </div>
        <div className="hero-bottom"><span>09 YEARS / AUTOMOTIVE & MOBILITY</span><span>SCROLL TO EXPLORE ↓</span><span>OPEN TO THE RIGHT CONVERSATION</span></div>
        <div className="ticker"><div>{Array.from({length:2},(_,i)=><span key={i}>BRAND BUILDING ✳ GTM & MARKET EXPANSION ✳ 360° MARKETING ✳ PRODUCT LAUNCHES ✳ CUSTOMER EXPERIENCE ✳ COMMERCIAL GROWTH ✳ </span>)}</div></div>
      </section>

      <section className="section experience" id="experience"><Label n="01">THE JOURNEY / ORGANISATIONS</Label><div className="section-intro"><h2>A career built across the entire <em>marketing spectrum.</em></h2><p>Nine years. Multiple markets. A full-funnel view of how brands are built, experienced and grown.</p></div>
        <div className="timeline">{experience.map((job,i)=><article className="timeline-row" key={job.company}><div className="timeline-date">{job.period}</div><div className="timeline-dot"/><div className="org-logo"><b>{job.company === 'ROBUSTRADE FZCO' ? 'ROBUSTRADE' : job.company === 'ULTRAVIOLETTE AUTOMOTIVE' ? 'UV' : job.company === 'ŠKODA AUTO VOLKSWAGEN INDIA' ? 'ŠKODA · VW' : 'HYUNDAI'}</b></div><div className="org-details"><h3>{job.company}</h3><p>{job.role}</p><span>{job.region}</span><small>{job.brands}</small></div><div className="timeline-number">0{i+1}</div></article>)}</div>
      </section>

      <section className="section case-section" id="work"><Label n="02">SELECTED CASE STUDIES</Label><div className="section-intro"><h2>Big-picture thinking.<br/><em>On-the-ground execution.</em></h2><p>Strategy, creativity and commercial outcomes — connected, not siloed.</p></div><div className="case-grid">{caseStudies.map(p=><article className="case-card" key={p.number}><div className="case-top"><span>{p.number} / {p.tag}</span><b>↗</b></div><small>{p.brand}</small><h3>{p.title}</h3><p>{p.summary}</p><div className="metrics">{p.metrics.map(([v,l])=><div key={l}><b>{v}</b><span>{l}</span></div>)}</div></article>)}</div></section>

      <section className="section published" id="published"><Label n="03">PUBLISHED WORK / IN THE WILD</Label><div className="section-intro"><h2>Less talking.<br/><em>More showing.</em></h2><p>Films, Instagram posts, LinkedIn features, partnerships and campaigns published in the real world.</p></div><div className="work-filter"><span>{publishedWork.length.toString().padStart(2,'0')} COLLECTIONS</span><select value={filter} onChange={e=>setFilter(e.target.value)}>{groups.map(g=><option key={g}>{g}</option>)}</select></div>
        {visibleWork.map(group=><article className="work-group" key={group.number}><div className="group-title"><span>{group.number}</span><div><small>{group.group}</small><h3>{group.title}</h3><p>{group.note}</p></div></div><div className="media-grid">{group.items.map(item=><MediaCard key={item.url} item={item}/>)}</div></article>)}
      </section>

      <section className="section brands"><Label n="04">BRANDS / COLLABORATIONS</Label><div className="section-intro"><h2>Different brands.<br/><em>One appetite for growth.</em></h2><p>A career across automotive, mobility, energy and customer experience.</p></div><div className="brand-wall">{brands.map((b,i)=><div key={b} className={`brand-word bw-${i%4}`}>{b}</div>)}</div><div className="proof-grid">{brandProof.map(item=><a className="proof-card" href={item.url} target="_blank" rel="noreferrer" key={item.brand+item.label}>{item.image?<img src={item.image} alt="" loading="lazy"/>:<div className="proof-placeholder">HYUNDAI<br/><b>SHIELD OF TRUST</b></div>}<small>{item.brand} / {item.label}</small><strong>{item.title}</strong></a>)}</div></section>

      <section className="section contact" id="contact"><Label n="05">THE NEXT CHAPTER</Label><h2>Let's make<br/><em>something move.</em></h2><p>Building a brand, entering a market or rethinking the customer journey? I'm always up for a good challenge and a better conversation.</p><div className="contact-grid"><a href={`mailto:${email}`}>EMAIL<strong>{email}</strong></a><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">WHATSAPP<strong>+971 56 966 9836</strong></a><a href={linkedin} target="_blank" rel="noreferrer">LINKEDIN<strong>Connect with Jatin</strong></a><a href={resume} download="Jatin-Deewan-Resume.pdf">RÉSUMÉ<strong>Download PDF ↓</strong></a></div></section>
    </main>
    <div className="floating-contact">{contactOpen&&<div className="floating-items"><a href={`https://wa.me/${phone}`}>WA</a><a href={linkedin}>in</a><a href={`mailto:${email}`}>@</a></div>}<button onClick={()=>setContactOpen(v=>!v)}>{contactOpen?'×':'+'}</button></div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} JATIN DEEWAN</span><span>MARKETING / BRAND / BUSINESS GROWTH</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>;
}
