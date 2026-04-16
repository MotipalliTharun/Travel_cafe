import React, { useEffect, useRef, useState, useCallback } from 'react';
import './index.css';

/* ── Scroll-reveal hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    let raf;
    const setup = () => {
      const els = document.querySelectorAll('.reveal');
      if (!els.length) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in-view');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    };
    raf = requestAnimationFrame(() => { setup(); });
    return () => cancelAnimationFrame(raf);
  }, []);
}


/* ── SVG Transport Characters ── */

const Walker = ({ phase }) => {
  const leg = Math.sin(phase) * 10;
  const arm = Math.cos(phase) * 8;
  return (
    <g transform="translate(-11, -54)">
      {/* hat */}
      <rect x="6" y="-2" width="10" height="5" rx="1" fill="#D4A373" />
      <ellipse cx="11" cy="3" rx="10" ry="3" fill="#D4A373" />
      {/* head */}
      <circle cx="11" cy="11" r="7" fill="#1C4D5D" />
      {/* body */}
      <rect x="8" y="18" width="6" height="14" rx="2" fill="#1C4D5D" />
      {/* backpack */}
      <rect x="14" y="19" width="5" height="9" rx="2" fill="#D4A373" opacity="0.85" />
      {/* arms */}
      <line x1="8" y1="22" x2={3 + arm} y2="31" stroke="#1C4D5D" strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="22" x2={19 - arm} y2="31" stroke="#1C4D5D" strokeWidth="3" strokeLinecap="round" />
      {/* legs */}
      <line x1="9" y1="32" x2={9 + leg} y2="48" stroke="#1C4D5D" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="13" y1="32" x2={13 - leg} y2="48" stroke="#1C4D5D" strokeWidth="3.5" strokeLinecap="round" />
      {/* stick */}
      <line x1="17" y1="22" x2="24" y2="46" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
};

const Cyclist = ({ phase }) => {
  const px = Math.cos(phase) * 8;
  const py = Math.sin(phase) * 8;
  return (
    <g transform="translate(-22, -50)">
      {/* wheels */}
      <circle cx="8" cy="40" r="13" fill="none" stroke="#1C4D5D" strokeWidth="2.5" />
      <circle cx="8" cy="40" r="3" fill="#1C4D5D" />
      <circle cx="36" cy="40" r="13" fill="none" stroke="#1C4D5D" strokeWidth="2.5" />
      <circle cx="36" cy="40" r="3" fill="#1C4D5D" />
      {/* frame */}
      <line x1="8" y1="40" x2="22" y2="22" stroke="#1C4D5D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="22" x2="36" y2="40" stroke="#1C4D5D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="8" y1="40" x2="22" y2="40" stroke="#1C4D5D" strokeWidth="2.5" strokeLinecap="round" />
      {/* seat post */}
      <line x1="22" y1="22" x2="22" y2="12" stroke="#1C4D5D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="12" x2="26" y2="12" stroke="#D4A373" strokeWidth="3" strokeLinecap="round" />
      {/* handlebar */}
      <line x1="36" y1="40" x2="36" y2="28" stroke="#1C4D5D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33" y1="28" x2="41" y2="28" stroke="#1C4D5D" strokeWidth="3" strokeLinecap="round" />
      {/* pedals */}
      <line x1="22" y1="40" x2={22 + px} y2={40 + py} stroke="#D4A373" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="40" x2={22 - px} y2={40 - py} stroke="#D4A373" strokeWidth="2.5" strokeLinecap="round" />
      {/* rider head + torso */}
      <circle cx="22" cy="4" r="6" fill="#1C4D5D" />
      <line x1="22" y1="10" x2="36" y2="28" stroke="#1C4D5D" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  );
};

const Car = () => (
  <g transform="translate(-38, -30)">
    {/* body */}
    <rect x="0" y="10" width="76" height="22" rx="4" fill="#1C4D5D" />
    {/* roof */}
    <rect x="16" y="0" width="42" height="14" rx="6" fill="#2A6A80" />
    {/* windows */}
    <rect x="19" y="3" width="16" height="9" rx="2" fill="#7EB8CC" opacity="0.75" />
    <rect x="39" y="3" width="16" height="9" rx="2" fill="#7EB8CC" opacity="0.75" />
    {/* driver */}
    <circle cx="33" cy="6" r="4" fill="#D4A373" opacity="0.7" />
    {/* wheels */}
    <circle cx="15" cy="30" r="9" fill="#122226" />
    <circle cx="15" cy="30" r="4" fill="#556B72" />
    <circle cx="61" cy="30" r="9" fill="#122226" />
    <circle cx="61" cy="30" r="4" fill="#556B72" />
    {/* lights */}
    <rect x="70" y="15" width="6" height="6" rx="2" fill="#FFE082" />
    <rect x="0" y="15" width="5" height="6" rx="2" fill="#EF5350" />
  </g>
);

const Bus = () => (
  <g transform="translate(-54, -44)">
    {/* body */}
    <rect x="0" y="6" width="108" height="40" rx="5" fill="#1C4D5D" />
    {/* roof stripe */}
    <rect x="0" y="4" width="108" height="8" rx="4" fill="#2A6A80" />
    {/* destination board */}
    <rect x="4" y="5" width="56" height="11" rx="2" fill="#D4A373" />
    <text x="32" y="13.5" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="6" fill="#fff" fontWeight="800">TRAVELCAFE EXPRESS</text>
    {/* windows */}
    {[8, 24, 40, 56, 72, 88].map((x) => (
      <rect key={x} x={x} y="16" width="11" height="13" rx="2" fill="#7EB8CC" opacity="0.65" />
    ))}
    {/* wheels */}
    <circle cx="20" cy="44" r="10" fill="#122226" /><circle cx="20" cy="44" r="4" fill="#556B72" />
    <circle cx="54" cy="44" r="10" fill="#122226" /><circle cx="54" cy="44" r="4" fill="#556B72" />
    <circle cx="88" cy="44" r="10" fill="#122226" /><circle cx="88" cy="44" r="4" fill="#556B72" />
    {/* door */}
    <rect x="90" y="20" width="10" height="16" rx="1" fill="#122226" opacity="0.4" />
    {/* lights */}
    <rect x="100" y="14" width="8" height="8" rx="2" fill="#FFE082" />
    <rect x="0" y="14" width="6" height="8" rx="2" fill="#EF5350" />
  </g>
);

const BusStopSign = ({ visible }) => (
  <g style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease' }}>
    <line x1="760" y1="15" x2="760" y2="78" stroke="#1C4D5D" strokeWidth="4" strokeLinecap="round" />
    <rect x="730" y="5" width="56" height="24" rx="5" fill="#D4A373" stroke="#1C4D5D" strokeWidth="1.5" />
    <text x="758" y="15" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="7" fill="#fff" fontWeight="800">🚌 BUS STOP</text>
    <text x="758" y="25" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="6" fill="rgba(255,255,255,0.85)">TravelCafe · Destination</text>
    <line x1="728" y1="78" x2="792" y2="78" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" />
  </g>
);

/* ── Mode order config ── */
const MODES = [
  { key: 'walk', label: 'Walk', icon: '🚶', threshold: 0 },
  { key: 'cycle', label: 'Cycle', icon: '🚲', threshold: 22 },
  { key: 'car', label: 'Drive', icon: '🚗', threshold: 44 },
  { key: 'bus', label: 'Bus', icon: '🚌', threshold: 65 },
  { key: 'arrived', label: 'Arrived', icon: '🏁', threshold: 87 },
];

const ROAD = 'M 50 480 C 120 420, 80 340, 200 300 S 380 220, 400 160 S 500 80, 650 60 S 755 115, 760 68';

const MILESTONES = [
  { label: 'Walk', icon: '🚶', cx: 50, cy: 480, at: 0 },
  { label: 'Cycle', icon: '🚲', cx: 200, cy: 300, at: 22 },
  { label: 'Drive', icon: '🚗', cx: 400, cy: 160, at: 44 },
  { label: 'Bus', icon: '🚌', cx: 580, cy: 72, at: 65 },
  { label: 'Arrive', icon: '🏁', cx: 760, cy: 68, at: 87 },
];

/* ── Journey Section ── */
function TravelJourney() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [pathLen, setPathLen] = useState(0);

  const onScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const total = sectionRef.current.offsetHeight - window.innerHeight;
    setProgress(Math.min(100, Math.max(0, (-rect.top / total) * 100)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  const mode = MODES.slice().reverse().find((m) => progress >= m.threshold)?.key || 'walk';
  const modeIdx = MODES.findIndex((m) => m.key === mode);
  const charOffset = Math.min(progress, 88); // stop at bus stop
  const phase = progress * 0.35;
  const arrived = progress >= 90;

  return (
    <section ref={sectionRef} className="journey-section" id="journey">
      <div className="journey-sticky">

        {/* Header */}
        <div className="journey-header">
          <span className="journey-label">The Adventure</span>
          <h2 className="journey-title">One Trip, Many Ways to Travel</h2>
          <p className="journey-subtitle">
            Scroll down — walk, cycle, drive, ride the bus, and arrive at your destination.
          </p>
        </div>

        {/* Mode strip */}
        <div className="mode-strip">
          {MODES.map((m, i) => (
            <div
              key={m.key}
              className={`mode-pill${mode === m.key ? ' active' : ''}${modeIdx > i ? ' done' : ''}`}
            >
              <span className="mode-icon">{m.icon}</span>
              <span className="mode-name">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Road canvas */}
        <div className="road-canvas">
          <svg className="road-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">

            {/* Road shadow */}
            <path d={ROAD} fill="none" stroke="rgba(28,77,93,0.09)" strokeWidth="50" strokeLinecap="round" />
            {/* Road surface */}
            <path d={ROAD} fill="none" stroke="#C4A882" strokeWidth="34" strokeLinecap="round" />
            {/* Road edge */}
            <path d={ROAD} fill="none" stroke="#B8936A" strokeWidth="34" strokeLinecap="round" strokeOpacity="0.3" />
            {/* Center dashes */}
            <path d={ROAD} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="24 18" strokeOpacity="0.55" />

            {/* Traveled trail */}
            {pathLen > 0 && (
              <path
                d={ROAD}
                fill="none"
                stroke="#D4A373"
                strokeWidth="12"
                strokeLinecap="round"
                strokeOpacity="0.6"
                style={{
                  strokeDasharray: pathLen,
                  strokeDashoffset: pathLen * (1 - charOffset / 100),
                  transition: 'stroke-dashoffset 0.1s linear',
                }}
              />
            )}
            {/* Hidden path for length measurement */}
            <path ref={pathRef} d={ROAD} fill="none" stroke="none" />

            {/* Milestone markers */}
            {MILESTONES.map((ms) => (
              <g key={ms.label} style={{ opacity: progress >= ms.at - 4 ? 1 : 0.2, transition: 'opacity 0.5s' }}>
                <circle cx={ms.cx} cy={ms.cy} r="22" fill="var(--secondary)" opacity={progress >= ms.at ? 0.18 : 0.06} />
                <circle cx={ms.cx} cy={ms.cy} r="13" fill={progress >= ms.at ? 'var(--secondary)' : '#C4A882'} />
                <text x={ms.cx} y={ms.cy + 5} textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="12" fill="#fff" fontWeight="800">{ms.icon}</text>
                <text x={ms.cx + 28} y={ms.cy + 5} fontFamily="Outfit,sans-serif" fontSize="12" fill="#1C4D5D" fontWeight="600">{ms.label}</text>
              </g>
            ))}

            {/* Bus stop sign */}
            <BusStopSign visible={progress >= 80} />

            {/* "Destination Arrived!" */}
            <g style={{ opacity: arrived ? 1 : 0, transition: 'opacity 0.9s ease' }}>
              <text x="400" y="448" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="25" fill="var(--secondary)" fontWeight="700">
                🎉 Destination Arrived!
              </text>
              {[...Array(12)].map((_, i) => (
                <circle
                  key={i}
                  cx={150 + i * 45}
                  cy={420 + (i % 4) * 12}
                  r="5"
                  fill={['#D4A373', '#1C4D5D', '#7EB8CC', '#FFE082'][i % 4]}
                  opacity={arrived ? 0.75 : 0}
                  style={{ transition: `opacity 0.4s ease ${i * 0.06}s` }}
                />
              ))}
            </g>

            {/* ── Walker (auto-rotate with road) ── */}
            <g style={{
              offsetPath: `path('${ROAD}')`,
              offsetDistance: `${charOffset}%`,
              offsetRotate: 'auto',
              opacity: mode === 'walk' ? 1 : 0,
              transition: 'opacity 0.45s',
            }}>
              <Walker phase={phase} />
            </g>

            {/* ── Cyclist (auto-rotate with road) ── */}
            <g style={{
              offsetPath: `path('${ROAD}')`,
              offsetDistance: `${charOffset}%`,
              offsetRotate: 'auto',
              opacity: mode === 'cycle' ? 1 : 0,
              transition: 'opacity 0.45s',
            }}>
              <Cyclist phase={phase} />
            </g>

            {/* ── Car (stays horizontal) ── */}
            <g style={{
              offsetPath: `path('${ROAD}')`,
              offsetDistance: `${charOffset}%`,
              offsetRotate: '0deg',
              opacity: mode === 'car' ? 1 : 0,
              transition: 'opacity 0.45s',
            }}>
              <Car />
            </g>

            {/* ── Bus (stays horizontal) ── */}
            <g style={{
              offsetPath: `path('${ROAD}')`,
              offsetDistance: `${charOffset}%`,
              offsetRotate: '0deg',
              opacity: (mode === 'bus' || mode === 'arrived') ? 1 : 0,
              transition: 'opacity 0.45s',
            }}>
              <Bus />
            </g>

          </svg>

          {/* Progress bar */}
          <div className="road-progress">
            <div className="road-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="road-progress-label">{Math.round(progress)}% of the journey</div>
        </div>
      </div>
    </section>
  );
}

/* ── Main App ── */
function App() {
  const videoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useReveal();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => { });
    }
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  return (
    <div className="app">

      {/* NAV */}
      <nav className="navbar container animate-fade-in">
        <div className="logo-container">
          <img src="/assets/primary_logo_solid.png" alt="TravelCafe Logo" className="logo" />
        </div>
        <div className="nav-links">
          <a href="#discover">Discover</a>
          <a href="#community">Community</a>
          <a href="#cafes">Cafes</a>
          <a href="#shop">Shop</a>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </nav>

      {/* VIDEO HERO */}
      <section className="video-hero" id="hero">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay muted loop playsInline preload="auto"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <source src="/assets/Animation_Video_Creation_Request.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay hero-overlay--dark" />
        <div className="hero-overlay hero-overlay--gradient" />
        <div className="hero-overlay hero-overlay--vignette" />
        <div className="hero-particles">
          {[...Array(18)].map((_, i) => (
            <span key={i} className="particle" style={{
              '--delay': `${(i * 0.4) % 6}s`,
              '--x': `${(i * 17 + 5) % 100}%`,
              '--size': `${4 + (i % 5) * 2}px`,
              '--dur': `${6 + (i % 4) * 2}s`,
            }} />
          ))}
        </div>
        <div className={`hero-copy ${heroLoaded ? 'hero-copy--visible' : ''}`}>
          <div className="hero-badge"><span className="badge-dot" />Discover · Connect · Explore</div>
          <h1 className="hero-heading">Find Your Travel<br /><span className="hero-heading--accent">Soulmate.</span></h1>
          <p className="hero-sub">
            We connect travelers who want to explore, not just visit.
            Discover local meetups, track your journey, and build lasting friendships over great coffee.
          </p>
          <div className="hero-actions">
            <button className="btn btn-hero-primary">Start Your Journey</button>
            <button className="btn btn-hero-outline"><span className="play-icon">▶</span>Watch Story</button>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-track"><div className="scroll-thumb" /></div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z" fill="#F7F4E9" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-strip container reveal-stagger">
        {[
          { value: '120K+', label: 'Travelers' },
          { value: '3,400+', label: 'Meetups' },
          { value: '85+', label: 'Countries' },
          { value: '4.9★', label: 'App Rating' },
        ].map((s) => (
          <div className="stat-item reveal reveal--scale" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* TRAVEL JOURNEY SCROLL ANIMATION */}
      <TravelJourney />

      {/* FEATURES */}
      <section className="features-section container" id="discover">
        <div className="section-header reveal">
          <h2>Your Path, Your Vibe, Your People.</h2>
          <p>Everything you need for your next adventure.</p>
        </div>
        <div className="features-grid reveal-stagger">
          <div className="feature-card reveal reveal--scale">
            <img src="/assets/feature_icons_reference.png" alt="Icons" className="feature-img" />
            <h3>Specialized Engagement</h3>
            <p>Customize your journey pins and track the miles you travel.</p>
          </div>
          <div className="feature-card reveal reveal--scale">
            <img src="/assets/app_carousel_mockup.png" alt="App" className="feature-img" />
            <h3>Mobile App</h3>
            <p>Plan and Meet Up on the go with our seamless mobile experience.</p>
          </div>
          <div className="feature-card reveal reveal--scale">
            <img src="/assets/evolution_timeline.png" alt="Evolution" className="feature-img" />
            <h3>Journey Milestones</h3>
            <p>From the mountain pass to the local cafe, capture your travel evolution.</p>
          </div>
        </div>
      </section>

      {/* APP PREVIEW */}
      <section className="app-preview container">
        <div className="preview-content">
          <h2 className="reveal">Core User Interface</h2>
          <p className="reveal">A beautifully crafted interface that puts your journey first.</p>
          <img src="/assets/ui_ux_wireframes.png" alt="UI Wireframes" className="preview-img main-preview reveal reveal--scale" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand reveal reveal--left">
            <img src="/assets/primary_logo_solid.png" alt="TravelCafe logo" className="footer-logo" />
            <p>Not All Who Wander Are Lost.<br />Some Just Need Coffee.</p>
          </div>
          <div className="footer-links reveal reveal--right">
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">App Integration</a>
              <a href="#">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
