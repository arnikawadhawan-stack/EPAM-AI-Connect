import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react'
import './index.css'

// ── THEME CONTEXT ─────────────────────────────────────────────────────────────

const THEMES = [
  {
    id: 'tech',
    label: 'A',
    name: 'Tech Conference',
    description: 'Dark hero block with gradient, neon accents',
    style: 'Modern and techy',
  },
  {
    id: 'corporate',
    label: 'B',
    name: 'Corporate Event',
    description: 'EPAM blue, clean white sections',
    style: 'Professional and corporate',
  },
  {
    id: 'community',
    label: 'C',
    name: 'Community Meetup',
    description: 'Warm orange tones, rounded corners',
    style: 'Friendly and informal',
  },
]

const ThemeContext = createContext({ theme: 'tech', setTheme: () => {} })
const useTheme = () => useContext(ThemeContext)

// ── LANGUAGE CONTEXT ──────────────────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    navAbout: 'About', navProgram: 'Program', navVenue: 'Venue', navSpeakers: 'Speakers',
    navGallery: 'Gallery', navFaq: 'FAQ', navRegister: 'Register',
    heroBadge: '7th July 2026 · Pune, India',
    heroTitle: 'EPAM AI Connect',
    heroSubtitle: 'Connect. Collaborate. Create.',
    heroDate: '7th July 2026', heroLocation: 'Pune, India', heroSeats: '2000 Seats',
    heroBtn: 'Register Now →',
    heroScroll: 'Scroll',
    spotsLeft: (n) => `Only ${n} spots left`,
    spotsLabel: 'out of 2000 seats',
    spotsFull: 'Sold out!',
    countdownStarted: 'Event has started!',
    countdownDays: 'DAYS', countdownHours: 'HOURS', countdownMins: 'MINS', countdownSecs: 'SECS',
    aboutLabel: 'About the Event',
    aboutTitle: 'AI Knowledge for', aboutTitleSpan: 'Everyone',
    aboutP1: 'EPAM AI Connect is a one-day bootcamp-style event designed to demystify artificial intelligence and show you exactly how to build skills in it — no matter your background. Whether you work in tech, finance, HR, or are just curious about where the world is heading, this event is built for you.',
    aboutP2: "Led by EPAM's own leaders, you'll hear directly about how AI is progressing, what the future looks like for people who invest in learning it now, and get a clear, practical roadmap you can act on the very next day.",
    statAttendees: 'Attendees', statSpeakers: 'Speakers', statSessions: 'Sessions', statDays: 'Day',
    programLabel: '7th July · Full Day Schedule',
    programTitle: 'Full', programTitleSpan: 'Program',
    programIntro: 'A curated day of ideas, hands-on learning, and meaningful connections.',
    speakersLabel: 'Featured Speakers',
    speakersTitle: 'Learn From the', speakersTitleSpan: 'Best',
    speakersIntro: 'Hover to see a quick bio. Click any card to learn more.',
    speakerHint: 'Hover to preview · Click for more',
    modalTalkLabel: 'Talk',
    venueLabel: 'Event Venue',
    venueTitle: 'Find', venueTitleSpan: 'Us',
    venueIntro: 'Join us in the heart of Pune. Easily accessible by road and rail.',
    venueName: 'EPAM Systems India Pvt. Ltd.',
    venueAddress: '11th Floor, Malpani Agile, Pan Card Club Road, Baner, Pune, Maharashtra 411045, India',
    venueDirections: 'Get Directions →',
    galleryTitle: 'EPAM in the', galleryTitleSpan: 'Community',
    galleryIntro: 'A look at the real events where EPAM engineers, leaders, and enthusiasts connected across India in early 2026.',
    faqLabel: 'Got Questions?',
    faqTitle: 'Frequently', faqTitleSpan: 'Asked',
    faqIntro: 'Everything you need to know before you arrive.',
    regLabel: 'Secure Your Spot',
    regTitle: 'Register for', regTitleSpan: 'EPAM AI Connect',
    regIntro: "Seats are limited to 2000 attendees. Fill in your details below and we'll send a confirmation straight to your inbox.",
    formName: 'Full Name', formEmail: 'Email Address', formCompany: 'Company', formRole: 'Job Title',
    formNamePH: 'Jane Smith', formEmailPH: 'jane@company.com', formCompanyPH: 'Acme Inc.', formRolePH: 'Product Manager',
    formSubmit: 'Claim My Spot →',
    errName: 'Full name is required.', errEmail: 'Email address is required.',
    errEmailInvalid: 'Please enter a valid email.', errCompany: 'Company / organisation is required.',
    successTitle: "You're registered!",
    successMsg: (name, email) => `Welcome to EPAM AI Connect 2026, ${name}! A confirmation email is on its way to ${email}. We can't wait to see you in Pune on 7th July.`,
    shareLabel: 'Spread the word',
    shareLinkedIn: 'Share on LinkedIn',
    shareTelegram: 'Share on Telegram',
    shareInstagram: 'Share on Instagram',
    shareInstagramTip: 'Link copied! Open Instagram and paste it in your story or bio.',
    footerCopy: '© 2026 EPAM AI Connect. All rights reserved. · Pune, India',
  },
  hi: {
    navAbout: 'परिचय', navProgram: 'कार्यक्रम', navVenue: 'स्थान', navSpeakers: 'वक्ता',
    navGallery: 'गैलरी', navFaq: 'सवाल', navRegister: 'पंजीकरण',
    heroBadge: '7 जुलाई 2026 · पुणे, भारत',
    heroTitle: 'EPAM AI Connect',
    heroSubtitle: 'जुड़ें। सहयोग करें। बनाएं।',
    heroDate: '7 जुलाई 2026', heroLocation: 'पुणे, भारत', heroSeats: '2000 सीटें',
    heroBtn: 'अभी पंजीकरण करें →',
    heroScroll: 'स्क्रॉल करें',
    spotsLeft: (n) => `केवल ${n} सीटें बची हैं`,
    spotsLabel: '2000 में से',
    spotsFull: 'सीटें भर गईं!',
    countdownStarted: 'कार्यक्रम शुरू हो गया!',
    countdownDays: 'दिन', countdownHours: 'घंटे', countdownMins: 'मिनट', countdownSecs: 'सेकंड',
    aboutLabel: 'कार्यक्रम के बारे में',
    aboutTitle: 'AI ज्ञान', aboutTitleSpan: 'सबके लिए',
    aboutP1: 'EPAM AI Connect एक दिवसीय बूटकैंप-शैली का कार्यक्रम है जो आर्टिफिशियल इंटेलिजेंस को सरल बनाने के लिए डिज़ाइन किया गया है — चाहे आपकी पृष्ठभूमि कोई भी हो। चाहे आप तकनीक, वित्त, HR में हों, या बस यह जानना चाहते हों कि दुनिया किस ओर जा रही है, यह कार्यक्रम आपके लिए है।',
    aboutP2: 'EPAM के अपने नेताओं द्वारा संचालित, आप सीधे सुनेंगे कि AI किस दिशा में बढ़ रहा है और अब इसे सीखने में निवेश करने वाले लोगों का भविष्य कैसा दिखेगा।',
    statAttendees: 'प्रतिभागी', statSpeakers: 'वक्ता', statSessions: 'सत्र', statDays: 'दिन',
    programLabel: '7 जुलाई · पूरे दिन का कार्यक्रम',
    programTitle: 'पूरा', programTitleSpan: 'कार्यक्रम',
    programIntro: 'विचारों, व्यावहारिक शिक्षण और सार्थक संबंधों का एक क्यूरेटेड दिन।',
    speakersLabel: 'विशेष वक्ता',
    speakersTitle: 'सर्वश्रेष्ठ से', speakersTitleSpan: 'सीखें',
    speakersIntro: 'त्वरित बायो देखने के लिए होवर करें। अधिक जानने के लिए किसी भी कार्ड पर क्लिक करें।',
    speakerHint: 'पूर्वावलोकन · अधिक के लिए क्लिक करें',
    modalTalkLabel: 'विषय',
    venueLabel: 'कार्यक्रम स्थान',
    venueTitle: 'हमें', venueTitleSpan: 'खोजें',
    venueIntro: 'पुणे के केंद्र में हमसे जुड़ें। सड़क और रेल द्वारा आसानी से पहुँचें।',
    venueName: 'EPAM Systems India Pvt. Ltd.',
    venueAddress: '11वीं मंजिल, मलपानी एजाइल, पैन कार्ड क्लब रोड, बाणेर, पुणे, महाराष्ट्र 411045, भारत',
    venueDirections: 'दिशा-निर्देश पाएं →',
    galleryTitle: 'समुदाय में', galleryTitleSpan: 'EPAM',
    galleryIntro: 'शुरुआती 2026 में पूरे भारत में EPAM के इंजीनियरों, नेताओं और उत्साही लोगों के वास्तविक कार्यक्रमों की एक झलक।',
    faqLabel: 'सवाल हैं?',
    faqTitle: 'अक्सर', faqTitleSpan: 'पूछे जाने वाले प्रश्न',
    faqIntro: 'आने से पहले आपको जो कुछ भी जानना चाहिए।',
    regLabel: 'अपनी जगह सुरक्षित करें',
    regTitle: 'के लिए पंजीकरण करें', regTitleSpan: 'EPAM AI Connect',
    regIntro: 'सीटें 2000 प्रतिभागियों तक सीमित हैं। नीचे अपनी जानकारी भरें और हम आपके इनबॉक्स में पुष्टि भेजेंगे।',
    formName: 'पूरा नाम', formEmail: 'ईमेल पता', formCompany: 'कंपनी', formRole: 'पद',
    formNamePH: 'रिया शर्मा', formEmailPH: 'riya@company.com', formCompanyPH: 'Acme Inc.', formRolePH: 'प्रोडक्ट मैनेजर',
    formSubmit: 'मेरी जगह बुक करें →',
    errName: 'पूरा नाम आवश्यक है।', errEmail: 'ईमेल पता आवश्यक है।',
    errEmailInvalid: 'कृपया एक वैध ईमेल दर्ज करें।', errCompany: 'कंपनी / संस्था आवश्यक है।',
    successTitle: 'आप पंजीकृत हैं!',
    successMsg: (name, email) => `EPAM AI Connect 2026 में आपका स्वागत है, ${name}! ${email} पर एक पुष्टि ईमेल भेजी जा रही है। हम 7 जुलाई को पुणे में आपसे मिलने के लिए उत्सुक हैं।`,
    shareLabel: 'दोस्तों को बताएं',
    shareLinkedIn: 'LinkedIn पर शेयर करें',
    shareTelegram: 'Telegram पर शेयर करें',
    shareInstagram: 'Instagram पर शेयर करें',
    shareInstagramTip: 'लिंक कॉपी हो गया! Instagram खोलें और इसे अपनी स्टोरी या बायो में पेस्ट करें।',
    footerCopy: '© 2026 EPAM AI Connect. सर्वाधिकार सुरक्षित। · पुणे, भारत',
  },
}

const LangContext = createContext({ lang: 'en', t: TRANSLATIONS.en })
const useLang = () => useContext(LangContext)

// ── SCROLL ANIMATION HOOK ─────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.unobserve(el) } },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// ── COUNTDOWN HOOK ─────────────────────────────────────────────────────────────

const EVENT_DATE = new Date('2026-07-07T00:00:00')

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now()
    if (diff <= 0) return null
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    }
  }
  const [timeLeft, setTimeLeft] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return timeLeft
}

// ── SPOTS COUNTER HOOK ────────────────────────────────────────────────────────

const TOTAL_SEATS = 2000
const INITIAL_SPOTS = 347   // spots remaining when page loads

function useSpots() {
  const [spots, setSpots] = useState(INITIAL_SPOTS)
  useEffect(() => {
    // tick down by 1 every 8–18 s to simulate live registrations
    const tick = () => {
      setSpots(s => {
        if (s <= 0) return 0
        const next = s - 1
        // re-schedule only if spots remain
        if (next > 0) timer = setTimeout(tick, 8000 + Math.random() * 10000)
        return next
      })
    }
    let timer = setTimeout(tick, 8000 + Math.random() * 10000)
    return () => clearTimeout(timer)
  }, [])
  return spots
}

// ── SPOTS BADGE COMPONENT ─────────────────────────────────────────────────────

function SpotsCounter({ variant = 'hero' }) {
  const { t } = useLang()
  const spots = useSpots()
  const pct   = Math.max(0, (spots / TOTAL_SEATS) * 100)

  const urgency = pct > 30 ? 'low' : pct > 10 ? 'mid' : 'high'

  if (spots <= 0) {
    return <div className={`spots-badge spots-sold spots-${variant}`}>{t.spotsFull}</div>
  }

  return (
    <div className={`spots-badge spots-${urgency} spots-${variant}`}>
      <div className="spots-top">
        <span className="spots-flame">🔥</span>
        <span className="spots-text">{t.spotsLeft(spots.toLocaleString())}</span>
      </div>
      <div className="spots-bar-wrap" aria-label={`${pct.toFixed(0)}% of seats remaining`}>
        <div className="spots-bar-track">
          <div
            className="spots-bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="spots-sub">{t.spotsLabel}</span>
      </div>
    </div>
  )
}

// ── COUNTDOWN COMPONENT ────────────────────────────────────────────────────────

function CountdownTimer() {
  const { t } = useLang()
  const timeLeft = useCountdown(EVENT_DATE)
  if (!timeLeft) return <div className="countdown-started">{t.countdownStarted}</div>
  const units = [
    { value: timeLeft.days,    label: t.countdownDays },
    { value: timeLeft.hours,   label: t.countdownHours },
    { value: timeLeft.minutes, label: t.countdownMins },
    { value: timeLeft.seconds, label: t.countdownSecs },
  ]
  return (
    <div className="countdown">
      {units.map(({ value, label }) => (
        <div className="countdown-box" key={label}>
          <span className="countdown-num">{String(value).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const SCHEDULE = [
  { time: '9:00 AM',  tag: 'keynote',    label: 'Keynote',    title: 'Opening Keynote: The Future of Innovation', desc: 'A powerful vision-setting talk to launch the day — exploring where technology and human creativity intersect.' },
  { time: '10:30 AM', tag: 'panel',      label: 'Panel',      title: 'Building Products That Last', desc: 'Industry leaders share battle-tested strategies for product development, team culture, and sustainable growth.' },
  { time: '12:00 PM', tag: 'break',      label: 'Break',      title: 'Lunch & Networking', desc: 'Fuel up and connect with fellow attendees, speakers, and sponsors in a relaxed setting.' },
  { time: '1:30 PM',  tag: 'workshop',   label: 'Workshop',   title: 'Hands-On: AI Tools for Modern Teams', desc: "An interactive workshop where you'll build real workflows using the latest AI tooling — no prior ML experience needed." },
  { time: '3:30 PM',  tag: 'networking', label: 'Networking', title: 'Closing Mixer & Awards', desc: "Celebrate the day's insights, connect with new collaborators, and raise a glass to the ideas that move us forward." },
]

const SPEAKERS = [
  { initials: 'V',  avatarClass: 'avatar-1', name: 'Vinay',   title: 'TA Head',             company: 'EPAM Systems', bio: 'Vinay leads talent acquisition at EPAM Systems, building high-performing teams across engineering and technology. With over a decade of experience in people strategy, he champions AI-driven hiring practices and is passionate about helping professionals navigate career growth in the age of automation.', talk: 'The AI-Ready Workforce: Hiring, Skilling, and Leading in 2026', linkedin: '#', twitter: '#' },
  { initials: 'AV', avatarClass: 'avatar-2', name: 'Avinash', title: 'Head of Technology',   company: 'EPAM Systems', bio: 'Avinash drives technology strategy and innovation at EPAM Systems, overseeing large-scale engineering initiatives across cloud, data, and AI. He has led digital transformation programmes for Fortune 500 clients and is a firm believer that AI is the great equaliser for organisations of every size.', talk: 'From Proof of Concept to Production: Scaling AI in the Enterprise', linkedin: '#', twitter: '#' },
  { initials: 'H',  avatarClass: 'avatar-3', name: 'Harsh',   title: 'Finance Head',         company: 'EPAM Systems', bio: 'Harsh oversees financial planning and business strategy at EPAM Systems. He brings a data-first perspective to every decision and has been instrumental in evaluating the ROI of AI investments across the organisation. His talks bridge the gap between technical possibility and business reality.', talk: 'The Business Case for AI: Measuring ROI Beyond the Hype', linkedin: '#', twitter: '#' },
  { initials: 'AR', avatarClass: 'avatar-4', name: 'Arnika',  title: 'Head of AI Research',  company: 'EPAM Systems', bio: "Arnika leads AI research at EPAM Systems, focusing on practical applications of machine learning, generative AI, and responsible AI frameworks. She has published research on human-AI collaboration and is dedicated to making AI education accessible to everyone — regardless of technical background.", talk: "Generative AI Demystified: What It Is, What It Isn't, and Where It's Going", linkedin: '#', twitter: '#' },
]

const FAQS = [
  { q: 'Where is EPAM AI Connect taking place?',      a: 'The event is held in Pune, India on 7th July 2026. Exact venue details and directions will be shared with registered attendees via email closer to the date.' },
  { q: 'Do I need a technical background to attend?', a: 'Not at all! EPAM AI Connect is open to everyone — whether you come from a tech, business, creative, or non-technical background. The sessions are designed to be accessible and valuable for all levels.' },
  { q: 'What will I learn at this event?',            a: "You'll get a clear picture of how AI is evolving, a practical roadmap for building AI skills, and insights from EPAM's own leaders on how AI is being applied in real projects today." },
  { q: 'Is there a cost to attend?',                  a: "Registration details including pricing (if applicable) will be confirmed when you sign up. Fill out the form below and we'll send all the information directly to your inbox." },
  { q: 'Will there be recordings or materials after the event?', a: 'Yes — key session recordings and materials will be made available to all registered attendees after the event so you can revisit the content at your own pace.' },
]

// Gallery: Real EPAM External Community Events — Q1 2026
const GALLERY_PHOTOS = [
  {
    id: 1,
    src:   '/gallery/java-ai-meetup.jpg',
    thumb: '/gallery/java-ai-meetup.jpg',
    caption: 'JAVA AI Meetup · Coimbatore',
    date: 'March 7, 2026',
    stats: '70+ Attendees · 47 New Contacts',
  },
  {
    id: 2,
    src:   '/gallery/pyconf.jpg',
    thumb: '/gallery/pyconf.jpg',
    caption: 'PyConf Conference & Workshop · Hyderabad',
    date: 'March 14–15, 2026',
    stats: '259 New Contacts',
  },
  {
    id: 3,
    src:   '/gallery/pe-kata.jpg',
    thumb: '/gallery/pe-kata.jpg',
    caption: 'Product Engineering Kata · Hyderabad',
    date: 'March 14, 2026',
    stats: '12 Participants',
  },
  {
    id: 4,
    src:   '/gallery/sre-conclave.jpg',
    thumb: '/gallery/sre-conclave.jpg',
    caption: 'SRE Reliability & Intelligence Conclave · Hyderabad',
    date: 'March 21, 2026',
    stats: '120 Participants',
  },
  {
    id: 5,
    src:   '/gallery/pydelhi.jpg',
    thumb: '/gallery/pydelhi.jpg',
    caption: 'PyDelhi Meetup · Gurgaon',
    date: 'February 28, 2026',
    stats: '30+ Attendees',
  },
  {
    id: 6,
    src:   '/gallery/data-aws.jpg',
    thumb: '/gallery/data-aws.jpg',
    caption: 'Data-AWS Meetup · Coimbatore',
    date: 'February 21, 2026',
    stats: '70+ Attendees · 57 New Contacts',
  },
  {
    id: 7,
    src:   '/gallery/bapdm.jpg',
    thumb: '/gallery/bapdm.jpg',
    caption: 'BAPDM ProdVerse 2026 · Hyderabad',
    date: 'February 13, 2026',
    stats: '50+ Attendees',
  },
]

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function LangSwitcher() {
  const { lang, setLang } = useContext(LangContext)
  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => setLang('en')}
        aria-label="Switch to English"
      >EN</button>
      <span className="lang-sep">|</span>
      <button
        className={`lang-btn${lang === 'hi' ? ' active' : ''}`}
        onClick={() => setLang('hi')}
        aria-label="हिंदी में बदलें"
      >हि</button>
    </div>
  )
}

// ── THEME SWITCHER ─────────────────────────────────────────────────────────────

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const active = THEMES.find(t => t.id === theme)

  return (
    <div className="theme-switcher" ref={wrapRef}>
      <button
        className="theme-trigger"
        onClick={() => setOpen(o => !o)}
        aria-label="Switch theme"
        aria-expanded={open}
      >
        <span className="theme-trigger-label">Theme</span>
        <span className="theme-trigger-badge">{active.label}</span>
        <svg
          className={`theme-chevron${open ? ' open' : ''}`}
          width="10" height="10" viewBox="0 0 10 10"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <polyline points="2,3 5,7 8,3" />
        </svg>
      </button>

      {open && (
        <div className="theme-dropdown" role="listbox" aria-label="Select theme">
          <div className="theme-dropdown-header">Select Theme</div>
          {THEMES.map(t => (
            <button
              key={t.id}
              role="option"
              aria-selected={theme === t.id}
              className={`theme-option${theme === t.id ? ' selected' : ''}`}
              onClick={() => { setTheme(t.id); setOpen(false) }}
            >
              <span className="theme-option-badge">{t.label}</span>
              <div className="theme-option-info">
                <span className="theme-option-name">{t.name}</span>
                <span className="theme-option-desc">{t.description}</span>
                <span className="theme-option-style">{t.style}</span>
              </div>
              {theme === t.id && (
                <svg className="theme-check" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2,7 6,11 12,3" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Navbar({ menuOpen, setMenuOpen }) {
  const { t } = useLang()
  const close = () => setMenuOpen(false)
  return (
    <nav className="navbar">
      <a href="#hero" className="navbar-brand" onClick={close}>EPAM AI Connect</a>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#about"        onClick={close}>{t.navAbout}</a></li>
        <li><a href="#program"      onClick={close}>{t.navProgram}</a></li>
        <li><a href="#venue"        onClick={close}>{t.navVenue}</a></li>
        <li><a href="#speakers"     onClick={close}>{t.navSpeakers}</a></li>
        <li><a href="#gallery"      onClick={close}>{t.navGallery}</a></li>
        <li><a href="#faq"          onClick={close}>{t.navFaq}</a></li>
        <li><a href="#registration" onClick={close} className="navbar-cta">{t.navRegister}</a></li>
      </ul>
      <div className="navbar-right">
        <ThemeSwitcher />
        <LangSwitcher />
        <button className="hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  const { t } = useLang()
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-badge">{t.heroBadge}</div>
        <h1 className="hero-title">{t.heroTitle}</h1>
        <p className="hero-subtitle">{t.heroSubtitle}</p>
        <div className="hero-meta">
          <div className="hero-meta-item"><span className="icon">📅</span><span>{t.heroDate}</span></div>
          <div className="hero-separator" />
          <div className="hero-meta-item"><span className="icon">📍</span><span>{t.heroLocation}</span></div>
          <div className="hero-separator" />
          <div className="hero-meta-item"><span className="icon">🎟️</span><span>{t.heroSeats}</span></div>
        </div>
        <CountdownTimer />
        <a href="#registration" className="hero-btn">{t.heroBtn}</a>
        <SpotsCounter variant="hero" />
      </div>
      <div className="hero-scroll-hint">
        <span>{t.heroScroll}</span>
        <span className="arrow">↓</span>
      </div>
    </section>
  )
}

function About() {
  const { t } = useLang()
  const ref = useScrollReveal()
  return (
    <section id="about" className="about reveal-section" ref={ref}>
      <div className="about-inner">
        <div className="about-text">
          <span className="section-label">{t.aboutLabel}</span>
          <h2 className="section-title">{t.aboutTitle} <span>{t.aboutTitleSpan}</span></h2>
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
        </div>
        <div className="about-stats">
          <div className="stat-card"><div className="stat-number">2000+</div><div className="stat-label">{t.statAttendees}</div></div>
          <div className="stat-card"><div className="stat-number">4</div><div className="stat-label">{t.statSpeakers}</div></div>
          <div className="stat-card"><div className="stat-number">6</div><div className="stat-label">{t.statSessions}</div></div>
          <div className="stat-card"><div className="stat-number">1</div><div className="stat-label">{t.statDays}</div></div>
        </div>
      </div>
    </section>
  )
}

function Program() {
  const { t } = useLang()
  const ref = useScrollReveal()
  return (
    <section id="program" className="program reveal-section" ref={ref}>
      <div className="program-inner">
        <div className="program-header">
          <span className="section-label">{t.programLabel}</span>
          <h2 className="section-title">{t.programTitle} <span>{t.programTitleSpan}</span></h2>
          <p className="section-intro" style={{ margin: '0 auto' }}>{t.programIntro}</p>
        </div>
        <div className="schedule">
          {SCHEDULE.map((item, i) => (
            <div className="schedule-item" key={i}>
              <div className="schedule-time">{item.time}</div>
              <div className="schedule-content">
                <span className={`schedule-tag tag-${item.tag}`}>{item.label}</span>
                <div className="schedule-title">{item.title}</div>
                <div className="schedule-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── VENUE ─────────────────────────────────────────────────────────────────────

function Venue() {
  const { t } = useLang()
  const ref = useScrollReveal()
  return (
    <section id="venue" className="venue reveal-section" ref={ref}>
      <div className="venue-inner">
        <div className="venue-header">
          <span className="section-label">{t.venueLabel}</span>
          <h2 className="section-title">{t.venueTitle} <span>{t.venueTitleSpan}</span></h2>
          <p className="section-intro">{t.venueIntro}</p>
        </div>
        <div className="venue-body">
          <div className="venue-info">
            <div className="venue-info-block">
              <div className="venue-icon">📍</div>
              <div>
                <div className="venue-name">{t.venueName}</div>
                <div className="venue-address">{t.venueAddress}</div>
              </div>
            </div>
            <div className="venue-info-block">
              <div className="venue-icon">📅</div>
              <div>
                <div className="venue-name">7th July 2026</div>
                <div className="venue-address">9:00 AM – 6:00 PM IST</div>
              </div>
            </div>
            <div className="venue-info-block">
              <div className="venue-icon">🚇</div>
              <div>
                <div className="venue-name">Getting Here</div>
                <div className="venue-address">Near Baner Metro Station (Line 3) · On Baner–Pashan Road · Ample parking on site</div>
              </div>
            </div>
            <a
              className="venue-directions-btn"
              href="https://maps.google.com/?q=EPAM+Systems+India+Malpani+Agile+Pan+Card+Club+Road+Baner+Pune+411045"
              target="_blank"
              rel="noreferrer"
            >
              {t.venueDirections}
            </a>
          </div>
          <div className="venue-map">
            <iframe
              title="EPAM AI Connect Venue — Pune"
              src="https://maps.google.com/maps?q=EPAM+Systems+India+Pvt+Ltd,+Malpani+Agile,+Pan+Card+Club+Road,+Baner,+Pune,+Maharashtra+411045&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SPEAKER MODAL ─────────────────────────────────────────────────────────────

function SpeakerModal({ speaker, onClose }) {
  const { t } = useLang()
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose() }
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])
  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-card" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-header">
          <div className={`speaker-avatar modal-avatar ${speaker.avatarClass}`}>{speaker.initials}</div>
          <div>
            <div className="modal-name">{speaker.name}</div>
            <div className="modal-title">{speaker.title}</div>
            <div className="modal-company">{speaker.company}</div>
          </div>
        </div>
        <div className="modal-bio">{speaker.bio}</div>
        <div className="modal-talk">
          <span className="modal-talk-label">{t.modalTalkLabel}</span>
          <span className="modal-talk-title">"{speaker.talk}"</span>
        </div>
        <div className="modal-socials">
          <a href={speaker.linkedin} target="_blank" rel="noreferrer" className="modal-social-link linkedin" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href={speaker.twitter} target="_blank" rel="noreferrer" className="modal-social-link twitter" aria-label="Twitter/X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter / X
          </a>
        </div>
      </div>
    </div>
  )
}

function Speakers() {
  const { t } = useLang()
  const [active, setActive] = useState(null)
  const ref = useScrollReveal()
  return (
    <section id="speakers" className="speakers reveal-section" ref={ref}>
      <div className="speakers-inner">
        <div className="speakers-header">
          <span className="section-label">{t.speakersLabel}</span>
          <h2 className="section-title">{t.speakersTitle} <span>{t.speakersTitleSpan}</span></h2>
          <p className="section-intro">{t.speakersIntro}</p>
        </div>
        <div className="speakers-grid">
          {SPEAKERS.map((s, i) => (
            <div className="speaker-flip-wrap" key={i} onClick={() => setActive(s)}
              role="button" tabIndex={0} aria-label={`View ${s.name}'s profile`}
              onKeyDown={(e) => e.key === 'Enter' && setActive(s)}>
              <div className="speaker-flip">
                <div className="speaker-flip-front">
                  <div className={`speaker-avatar ${s.avatarClass}`}>{s.initials}</div>
                  <div className="speaker-name">{s.name}</div>
                  <div className="speaker-title">{s.title}</div>
                  <div className="speaker-company">{s.company}</div>
                  <div className="speaker-hint">{t.speakerHint}</div>
                </div>
                <div className="speaker-flip-back">
                  <div className={`speaker-avatar speaker-avatar-sm ${s.avatarClass}`}>{s.initials}</div>
                  <div className="speaker-name">{s.name}</div>
                  <p className="speaker-back-bio">{s.bio.slice(0, 120)}…</p>
                  <div className="speaker-back-socials">
                    <a href={s.linkedin} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="social-icon-link linkedin" aria-label="LinkedIn">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                    <a href={s.twitter} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="social-icon-link twitter" aria-label="Twitter/X">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {active && <SpeakerModal speaker={active} onClose={() => setActive(null)} />}
    </section>
  )
}

// ── GALLERY ───────────────────────────────────────────────────────────────────

function Lightbox({ photo, total, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
        <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous">‹</button>
        <div className="lightbox-img-wrap">
          <img src={photo.src} alt={photo.caption} className="lightbox-img" />
        </div>
        <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next">›</button>
        <div className="lightbox-caption">
          <div className="lightbox-caption-title">{photo.caption}</div>
          {photo.date  && <div className="lightbox-caption-meta">📅 {photo.date}</div>}
          {photo.stats && <div className="lightbox-caption-meta">👥 {photo.stats}</div>}
        </div>
      </div>
    </div>
  )
}

function Gallery() {
  const { t } = useLang()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const ref = useScrollReveal()

  const open  = (i) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)
  const prev  = useCallback(() => setLightboxIndex(i => (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length), [])
  const next  = useCallback(() => setLightboxIndex(i => (i + 1) % GALLERY_PHOTOS.length), [])

  return (
    <section id="gallery" className="gallery reveal-section" ref={ref}>
      <div className="gallery-inner">
        <div className="gallery-header">
          <span className="section-label">{t.galleryLabel}</span>
          <h2 className="section-title">{t.galleryTitle} <span>{t.galleryTitleSpan}</span></h2>
          <p className="section-intro">{t.galleryIntro}</p>
        </div>
        <div className="gallery-grid">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              className="gallery-item"
              key={photo.id}
              onClick={() => open(i)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.caption}`}
              onKeyDown={(e) => e.key === 'Enter' && open(i)}
            >
              <img src={photo.thumb} alt={photo.caption} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-zoom">🔍</span>
                <span className="gallery-caption">{photo.caption}</span>
                {photo.date && <span className="gallery-date">{photo.date}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          photo={GALLERY_PHOTOS[lightboxIndex]}
          total={GALLERY_PHOTOS.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FAQ() {
  const { t } = useLang()
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useScrollReveal()
  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)
  return (
    <section id="faq" className="faq reveal-section" ref={ref}>
      <div className="faq-inner">
        <div className="faq-header">
          <span className="section-label">{t.faqLabel}</span>
          <h2 className="section-title">{t.faqTitle} <span>{t.faqTitleSpan}</span></h2>
          <p className="section-intro">{t.faqIntro}</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div className={`faq-item${openIndex === i ? ' open' : ''}`} key={i}>
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── REGISTRATION ──────────────────────────────────────────────────────────────

function Registration() {
  const { t } = useLang()
  const [form, setForm]           = useState({ name: '', email: '', company: '', role: '' })
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const ref = useScrollReveal()

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = t.errName
    if (!form.email.trim())   e.email   = t.errEmail
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.errEmailInvalid
    if (!form.company.trim()) e.company = t.errCompany
    return e
  }

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(err => ({ ...err, [field]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  return (
    <section id="registration" className="registration reveal-section" ref={ref}>
      <div className="registration-inner">
        <span className="section-label">{t.regLabel}</span>
        <h2 className="section-title">{t.regTitle} <span>{t.regTitleSpan}</span></h2>
        <p className="section-intro">{t.regIntro}</p>
        <SpotsCounter variant="reg" />
        <div className="reg-form">
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <div className="success-title">{t.successTitle}</div>
              <p className="success-subtitle">{t.successMsg(form.name, form.email)}</p>
              <ShareButtons variant="success" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">{t.formName} <span>*</span></label>
                  <input id="reg-name" className={`form-input${errors.name ? ' error' : ''}`} type="text" placeholder={t.formNamePH} value={form.name} onChange={handleChange('name')} />
                  {errors.name && <p className="form-error-msg">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">{t.formEmail} <span>*</span></label>
                  <input id="reg-email" className={`form-input${errors.email ? ' error' : ''}`} type="email" placeholder={t.formEmailPH} value={form.email} onChange={handleChange('email')} />
                  {errors.email && <p className="form-error-msg">{errors.email}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-company">{t.formCompany} <span>*</span></label>
                  <input id="reg-company" className={`form-input${errors.company ? ' error' : ''}`} type="text" placeholder={t.formCompanyPH} value={form.company} onChange={handleChange('company')} />
                  {errors.company && <p className="form-error-msg">{errors.company}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-role">{t.formRole}</label>
                  <input id="reg-role" className="form-input" type="text" placeholder={t.formRolePH} value={form.role} onChange={handleChange('role')} />
                </div>
              </div>
              <button type="submit" className="form-submit">{t.formSubmit}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ── SOCIAL SHARE ──────────────────────────────────────────────────────────────

const SHARE_URL  = 'https://epam-ai-connect.com'
const SHARE_TEXT = 'I just registered for EPAM AI Connect 2026 — a one-day AI bootcamp in Pune on 7th July! Join me 🚀'

function ShareButtons({ variant = 'footer' }) {
  const { t } = useLang()
  const [copied,   setCopied]   = useState(false)
  const [igCopied, setIgCopied] = useState(false)

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(SHARE_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleInstagram = () => {
    navigator.clipboard.writeText(SHARE_URL).then(() => {
      setIgCopied(true)
      setTimeout(() => setIgCopied(false), 3500)
      window.open('https://www.instagram.com', '_blank', 'noreferrer')
    })
  }

  return (
    <div className={`share-wrap share-${variant}`}>
      <span className="share-label">{t.shareLabel}</span>
      <div className="share-buttons">

        {/* LinkedIn */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer"
          className="share-btn share-linkedin"
          aria-label={t.shareLinkedIn}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          <span>{t.shareLinkedIn}</span>
        </a>

        {/* Telegram */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="share-btn share-telegram"
          aria-label={t.shareTelegram}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.95 3.05a1.5 1.5 0 00-1.6-.22L2.1 10.28a1.5 1.5 0 00.08 2.78l4.07 1.35 1.57 4.94a1 1 0 001.7.4l2.35-2.27 4.52 3.33a1.5 1.5 0 002.3-.9l3-14.5a1.5 1.5 0 00-.74-1.36zM10 15.5l-.9 2.7-1.1-3.5 8.6-6.6-6.6 7.4z"/>
          </svg>
          <span>{t.shareTelegram}</span>
        </a>

        {/* Instagram */}
        <div className="share-ig-wrap">
          <button
            className={`share-btn share-instagram${igCopied ? ' ig-copied' : ''}`}
            onClick={handleInstagram}
            aria-label={t.shareInstagram}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.2"/>
            </svg>
            <span>{igCopied ? 'Link copied!' : t.shareInstagram}</span>
          </button>
          {igCopied && (
            <div className="ig-tooltip" role="status">
              {t.shareInstagramTip}
            </div>
          )}
        </div>

        {/* Copy link */}
        <button
          className={`share-btn share-copy${copied ? ' copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy link"
        >
          {copied ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          )}
          <span>{copied ? 'Copied!' : 'Copy link'}</span>
        </button>

      </div>
    </div>
  )
}

function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="footer-logo">EPAM AI Connect 2026</div>
      <ShareButtons variant="footer" />
      <p className="footer-text">{t.footerCopy}</p>
    </footer>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang]         = useState('en')
  const [theme, setTheme]       = useState('tech')
  const t = TRANSLATIONS[lang]

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LangContext.Provider value={{ lang, setLang, t }}>
        <div className={`theme-${theme}`}>
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Hero />
          <About />
          <Program />
          <Venue />
          <Speakers />
          <Gallery />
          <FAQ />
          <Registration />
          <Footer />
        </div>
      </LangContext.Provider>
    </ThemeContext.Provider>
  )
}
