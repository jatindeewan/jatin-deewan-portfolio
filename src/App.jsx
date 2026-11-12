import React, { useEffect, useMemo, useState } from 'react';
import { brandProof, brands, caseStudies, experience, publishedWork } from './content.js';

const headshot = '/assets/jatin-deewan-headshot.png';
const resume = '/assets/jatin-deewan-resume.pdf';
const email = 'jatindeewan@gmail.com';
const phone = '971569669836';
const linkedin = 'https://www.linkedin.com/in/jatin-deewan/';

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 18 18" aria-hidden="true" className="arrow-icon"><path d={diagonal ? 'M4 14 14 4M5 4h9v9' : 'M2 9h13M10 4l5 5-5 5'} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Icon({ name }) {
  const paths = {
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8 7.7c.3-.5.6-.5.9-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.4.7 1 1.3 1.7 1.8.5.3.8.4 1 .2l.9-1c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.7-.5.4-1.2.6-1.8.5-1.1-.1-2.4-.7-3.8-1.9-1.6-1.4-2.5-3.1-2.8-4.1-.3-1 .1-1.8.8-2.2Z"/></>,
    linkedin: <><path d="M5 8v11M5 5.1v.1M9.5 19v-6.1c0-2 1.2-3.2 3-3.2s3 1.2 3 3.2V19M9.5 10v9"/><circle cx="5" cy="5" r="1.1"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>
  };
  return <svg viewBox="0 0 24 24" className="contact-svg" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function SectionHeading({ number, eyebrow, title, body }) {
  return (
    <div className="section-heading">
      <div className="section-kicker"><span>{number}</span><span>{eyebrow}</span><i /></div>
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
    </div>
  );
}

function MediaItem({ item }) {
  const [expanded, setExpanded] = useState(false);
  if (item.type === 'youtube') {
    return (
      <div className="media-item media-video">
        <div className="embed-frame youtube-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?rel=0&modestbranding=1`}
            title={item.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="media-caption"><span>{item.title}</span><a href={item.url} target="_blank" rel="noreferrer">Open original <Arrow diagonal /></a></div>
      </div>
    );
  }
  if (item.type === 'instagram') {
    return (
      <div className="media-item media-instagram">
        <div className="instagram-shell">
          {!expanded ? (
            <div className="instagram-placeholder">
              <div className="ig-top"><span className="ig-mark">◎</span><span>INSTAGRAM / PUBLISHED WORK</span></div>
              <div className="ig-center"><span className="ig-glyph">◎</span><strong>{item.title}</strong><small>Open the original post or load the embedded preview.</small></div>
              <div className="ig-actions"><button onClick={() => setExpanded(true)}>Load embed <Arrow /></button><a href={item.url} target="_blank" rel="noreferrer">Open Instagram <Arrow diagonal /></a></div>
            </div>
          ) : (
            <iframe
              className="instagram-embed"
              src={`https://www.instagram.com/${item.instagramType === 'reel' ? 'reel' : 'p'}/${item.shortcode}/embed/`}
              title={item.title}
              loading="lazy"
              allow="encrypted-media; picture-in-picture"
            />
          )}
        </div>
        <div className="media-caption"><span>{item.title}</span><a href={item.url} target="_blank" rel="noreferrer">Open original <Arrow diagonal /></a></div>
      </div>
    );
  }
  return (
    <a className="link-preview" href={item.url} target="_blank" rel="noreferrer">
      <span className="link-preview-top"><span>{item.source || 'PUBLISHED WORK'}</span><Arrow diagonal /></span>
      <strong>{item.title}</strong>
      <span className="link-preview-bottom">View publication <Arrow /></span>
    </a>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All work');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  const groups = useMemo(() => ['All work', ...new Set(publishedWork.map((item) => item.group))], []);
  const filteredWork = useMemo(() => activeFilter === 'All work' ? publishedWork : publishedWork.filter((item) => item.group === activeFilter), [activeFilter]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#top" className="wordmark" onClick={closeMenu}>JD<span>·</span></a>
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>01 About</a>
          <a href="#experience" onClick={closeMenu}>02 Experience</a>
          <a href="#case-studies" onClick={closeMenu}>03 Case studies</a>
          <a href="#work" onClick={closeMenu}>04 Published work</a>
          <a href="#brands" onClick={closeMenu}>05 Brands</a>
          <a href="#contact" onClick={closeMenu}>06 Contact</a>
        </nav>
        <div className="header-tools">
          <button className="theme-toggle" onClick={() => setDark((value) => !value)} aria-label="Toggle colour theme"><span>{dark ? 'LT' : 'DK'}</span><i /></button>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation"><span /><span /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap" id="about">
          <div className="hero-topline"><span>MARKETING LEADERSHIP / BRAND / BUSINESS GROWTH</span><span>BASED IN DUBAI, UAE ↗</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-overline"><span className="live-dot" /> OPEN TO THE RIGHT CONVERSATION</div>
              <h1>I build brands.<br /><em>I scale markets.</em><br />I make marketing count.</h1>
              <p className="hero-intro">Nine years across India, Europe and EMEA — connecting brand ambition with business performance.</p>
              <p className="hero-description">From market-entry strategy and product launches to ATL, BTL, digital, PR, experiences, CRM and social. I work across the full marketing mix, and I care about what happens after the campaign goes live.</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#case-studies">Explore selected work <Arrow /></a>
                <a className="text-link" href={resume} target="_blank" rel="noreferrer">Download résumé <Arrow diagonal /></a>
              </div>
              <div className="hero-footnote"><span>STRATEGY TO EXECUTION</span><span>CAMPAIGN TO COMMERCIAL IMPACT</span></div>
            </div>
            <div className="hero-portrait-wrap">
              <div className="portrait-frame"><img src={headshot} alt="Portrait of Jatin Deewan" /></div>
              <div className="portrait-stamp"><span>JD</span><small>MARKETING<br />& GROWTH</small></div>
              <div className="portrait-caption"><span>JATIN DEEWAN</span><span>MARKETING LEADER · DUBAI</span></div>
            </div>
          </div>
          <div className="hero-ticker" aria-label="Areas of expertise"><div className="ticker-track">{Array.from({ length: 2 }).map((_, index) => <span key={index}>BRAND STRATEGY <b>✳</b> GTM & MARKET EXPANSION <b>✳</b> PRODUCT LAUNCHES <b>✳</b> 360° MARKETING <b>✳</b> CUSTOMER EXPERIENCE <b>✳</b> COMMERCIAL GROWTH <b>✳</b></span>)}</div></div>
        </section>

        <section className="section-wrap experience-section" id="experience">
          <SectionHeading number="02" eyebrow="THE BUSINESS OF BUILDING BRANDS" title="A career built across the entire marketing spectrum." body="Different markets. Different business models. One consistent thread: turning a marketing mandate into measurable momentum." />
          <div className="experience-list">
            {experience.map((job, index) => (
              <article className="experience-row" key={job.company}>
                <div className="experience-index"><span>0{index + 1}</span><small>{job.period}</small></div>
                <div className="experience-main">
                  <div className="experience-title-row"><div><p className="company-name">{job.company}</p><h3>{job.role}</h3></div><span className="region-tag">{job.region}</span></div>
                  <p className="experience-summary">{job.summary}</p>
                  <div className="brand-line">{job.brands}</div>
                  <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
                <div className="experience-aside"><span className="aside-label">THE MANDATE</span><span className="aside-mark">{String(index + 1).padStart(2, '0')}</span><span className="aside-period">{job.period.split(' — ')[0]}<br />{job.period.split(' — ')[1]}</span></div>
              </article>
            ))}
          </div>
          <div className="scope-strip"><span>THE FULL MARKETING MANDATE</span><p>Strategy <b>→</b> Brand <b>→</b> Product <b>→</b> Demand <b>→</b> Experience <b>→</b> Retention <b>→</b> Growth</p></div>
        </section>

        <section className="case-section" id="case-studies">
          <div className="section-wrap">
            <SectionHeading number="03" eyebrow="SELECTED CASE STUDIES" title="Big-picture thinking. On-the-ground execution." body="A few moments where strategy met the real world — and where the work had a number attached to it." />
            <div className="case-grid">
              {caseStudies.map((project) => (
                <article className={`case-card case-${project.accent}`} key={project.number}>
                  <div className="case-card-top"><span>{project.number} / {project.tag}</span><span className="case-symbol">↗</span></div>
                  <div className="case-card-content"><p className="case-brand">{project.brand}</p><h3>{project.title}</h3><p className="case-summary">{project.summary}</p></div>
                  <div className="case-metrics">{project.metrics.map(([metric, label]) => <div className="metric" key={label}><strong>{metric}</strong><span>{label}</span></div>)}</div>
                </article>
              ))}
            </div>
            <p className="metrics-note">Selected outcomes from the roles and programmes described in my résumé. Scope and attribution are presented at the programme level.</p>
          </div>
        </section>

        <section className="section-wrap work-section" id="work">
          <SectionHeading number="04" eyebrow="THE WORK, OUT IN THE WORLD" title="Less talking. More showing." body="Published campaigns, films, creator collaborations, experiences and ideas. Some of the work is best watched; some is best clicked. Either way, it left the deck." />
          <div className="work-toolbar"><p><strong>{publishedWork.length.toString().padStart(2, '0')}</strong> collections / published work</p><div className="filter-select-wrap"><label htmlFor="work-filter">FILTER</label><select id="work-filter" value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)}>{groups.map((group) => <option key={group}>{group}</option>)}</select></div></div>
          <div className="published-groups">
            {filteredWork.map((group) => (
              <article className="published-group" key={group.number}>
                <div className="published-group-heading"><span className="published-number">{group.number}</span><div><p>{group.group}</p><h3>{group.title}</h3><span>{group.note}</span></div></div>
                <div className={`media-grid ${group.items.length === 1 ? 'media-grid-single' : ''}`}>{group.items.map((item) => <MediaItem item={item} key={item.url} />)}</div>
              </article>
            ))}
          </div>
          <div className="add-work-note"><span>↳</span><p>This is a living portfolio. More launches, campaigns and experiments will find their way here as they go live.</p></div>
        </section>

        <section className="brands-section" id="brands">
          <div className="section-wrap">
            <SectionHeading number="05" eyebrow="A FEW NAMES FROM THE JOURNEY" title="Different brands. Different briefs. Same appetite for growth." body="A cross-section of the automotive, mobility, energy and service brands I've worked with across my career." />
            <div className="brand-proof-grid">{brandProof.map((item) => <a className="brand-proof-card" href={item.url} target="_blank" rel="noreferrer" key={`${item.brand}-${item.label}`}>
              <div className={`brand-proof-image ${item.image ? '' : 'brand-proof-no-image'}`}>{item.image ? <img src={item.image} alt={`${item.brand} — ${item.label}`} loading="lazy" /> : <div className="shield-graphic"><span>HYUNDAI</span><strong>SHIELD<br />OF TRUST</strong><small>LOYALTY / RETENTION</small></div>}<span className="proof-open"><Arrow diagonal /></span></div>
              <div className="brand-proof-caption"><span>{item.brand} / {item.label}</span><strong>{item.title}</strong><small>VIEW ON {item.source.toUpperCase()} <Arrow diagonal /></small></div>
            </a>)}</div>
            <div className="brand-wall">{brands.map((brand, index) => <div className={`brand-word brand-word-${index % 4}`} key={brand}><span>{brand}</span><i>↗</i></div>)}</div>
            <div className="recognition-row"><div><span className="recognition-label">RECOGNITION</span><h3>Good work gets noticed.</h3></div><div className="recognition-items"><div><strong>2023</strong><span>Above & Beyond Employee<br />Škoda Auto Volkswagen India</span></div><div><strong>2020</strong><span>Employee of the Year<br />Hyundai Motor India</span></div><div><strong>ISB</strong><span>AMP Co’25<br />Marketing & Analytics</span></div></div></div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-topline"><span>06 / CONTACT</span><span>GOOD CONVERSATIONS START HERE</span></div>
          <div className="contact-layout"><div><p className="contact-eyebrow">HAVE A CHALLENGE WORTH SOLVING?</p><h2>Let's make<br /><em>something move.</em></h2><p className="contact-copy">Building a brand, entering a market, fixing the funnel or rethinking the customer journey? I'm always up for a conversation with people who think big and execute well.</p></div><div className="contact-details"><a href={`mailto:${email}`}><span>EMAIL</span><strong>{email}</strong><Arrow diagonal /></a><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer"><span>WHATSAPP</span><strong>+971 56 966 9836</strong><Arrow diagonal /></a><a href={linkedin} target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Connect with Jatin</strong><Arrow diagonal /></a><a href={resume} target="_blank" rel="noreferrer"><span>RÉSUMÉ</span><strong>Download PDF</strong><Arrow diagonal /></a></div></div>
          <div className="contact-bottom"><span>JATIN DEEWAN · DUBAI, UAE</span><span>BUILT WITH INTENT. UPDATED WITH EVERY NEW CHAPTER.</span><a href="#top">BACK TO TOP ↑</a></div>
        </section>
      </main>

      <div className="floating-contact">
        <div className={contactOpen ? 'floating-links floating-links-open' : 'floating-links'} aria-hidden={!contactOpen}>
          <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={`mailto:${email}`} aria-label="Email"><Icon name="mail" /></a>
        </div>
        <button className="floating-trigger" onClick={() => setContactOpen((value) => !value)} aria-label={contactOpen ? 'Close contact shortcuts' : 'Open contact shortcuts'} aria-expanded={contactOpen}>{contactOpen ? '×' : '+'}</button>
      </div>
      <footer className="site-footer"><span>© {new Date().getFullYear()} JATIN DEEWAN</span><span>MARKETING / BRAND / BUSINESS GROWTH</span><span>DESIGNED TO MAKE AN IMPRESSION. BUILT TO MAKE A POINT.</span></footer>
    </div>
  );
}

export default App;
