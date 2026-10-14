import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "te";

const dict = {
  en: {
    nav_home: "Home", nav_updates: "Local Updates", nav_assistant: "Ask AI", nav_feedback: "Share Concern",
    nav_sources: "Official Sources", nav_about: "About",
    tagline: "Your Area. Your Updates. Your Voice.",
    hero_desc: "One simple place to discover and understand local public-service information — water, roads, waste, meetings and more.",
    select_locality: "Select your locality", all_localities: "All localities",
    search_ph: "Search your local updates…", explore: "Explore Local Updates", ask: "Ask Janamitra AI",
    prototype_note: "Prototype — all updates shown are sample demonstration data.",
    happening: "What's Happening in Your Area?", happening_sub: "Browse updates by category.",
    upcoming: "Important & Upcoming Updates", see_all: "See all updates",
    how: "How it works",
    step1: "Select Your Area", step1d: "Choose your town or ward to see what's relevant to you.",
    step2: "Discover Updates", step2d: "Browse water, roads, waste, meetings and service notices.",
    step3: "Understand and Take Action", step3d: "Read plain-language explanations and verify with official sources.",
    verify_title: "Verify Before You Act",
    verify_desc: "Always confirm important announcements through official government websites or authorised public-service channels before acting.",
    dash_title: "Local Updates", dash_sub: "Search, filter and explore public-service updates.",
    category: "Category", status: "Status", all: "All", sort_newest: "Newest first", sort_oldest: "Oldest first",
    clear: "Clear filters", results: "updates found",
    empty_title: "No matching updates", empty_desc: "Try a different keyword, locality or category.",
    view_details: "View Details", back: "Back to dashboard",
    demo_label: "DEMO DATA — NOT AN OFFICIAL NOTICE",
    source: "Source", published: "Published", locality: "Locality",
    no_official_link: "No official source link has been configured for this record. Please verify with the relevant government department.",
    st_upcoming: "Upcoming", st_info: "Informational", st_completed: "Completed",
    src_demo: "Demonstration data", src_unverified: "Unverified", src_verified: "Officially verified",
    asst_title: "Ask Janamitra AI", asst_desc: "Understand local public information in simple language.",
    asst_demo: "Demo assistant — uses predefined responses and sample data. No live AI service is connected.",
    asst_ph: "Type your question…", send: "Send", try_asking: "Try asking",
    asst_hello: "Namaste! I can help you explore sample local updates and point you to the right kind of official source. What would you like to know?",
    fb_title: "Share Your Concern", fb_desc: "Tell us about a local issue. No personal details needed.",
    fb_demo: "Demonstration only — submissions are NOT sent to any government department and are not officially filed.",
    fb_cat: "Concern category", fb_loc: "Locality", fb_desc_l: "Short description", fb_sugg: "Suggestion (optional)",
    fb_choose: "Choose…", fb_submit: "Submit concern", fb_req: "This field is required.", fb_min: "Please write at least 10 characters.",
    fb_ok_t: "Thank you — concern recorded (demo)", fb_ok_d: "This was a demonstration submission. It has not been sent to or filed with any authority.",
    fb_another: "Submit another",
    src_title: "Official Source Directory", src_sub: "Where to verify information by category.",
    src_not_conf: "Genuine source not yet configured. Add the verified official URL before going live.",
    src_where: "Typically published by",
    about_title: "About Janamitra AI",
    about_quote: "We don't just display public information — we make it easier for people to understand and use it.",
    footer_note: "Janamitra AI is a student prototype. Not affiliated with any government body.",
    accessibility: "Accessibility", privacy: "Privacy",
    language: "Language",
  },
  te: {
    nav_home: "హోమ్", nav_updates: "స్థానిక సమాచారం", nav_assistant: "AI ని అడగండి", nav_feedback: "సమస్య తెలపండి",
    nav_sources: "అధికారిక వనరులు", nav_about: "మా గురించి",
    tagline: "మీ ప్రాంతం. మీ సమాచారం. మీ గొంతు.",
    hero_desc: "నీరు, రోడ్లు, చెత్త సేకరణ, సమావేశాలు వంటి స్థానిక ప్రజా సేవల సమాచారాన్ని ఒకే చోట సులభంగా తెలుసుకోండి.",
    select_locality: "మీ ప్రాంతాన్ని ఎంచుకోండి", all_localities: "అన్ని ప్రాంతాలు",
    search_ph: "మీ స్థానిక సమాచారం వెతకండి…", explore: "స్థానిక సమాచారం చూడండి", ask: "జనమిత్ర AI ని అడగండి",
    prototype_note: "ప్రోటోటైప్ — ఇక్కడ చూపిన సమాచారం అంతా నమూనా డెమో డేటా.",
    happening: "మీ ప్రాంతంలో ఏం జరుగుతోంది?", happening_sub: "వర్గం ప్రకారం సమాచారం చూడండి.",
    upcoming: "ముఖ్యమైన & రాబోయే సమాచారం", see_all: "అన్నీ చూడండి",
    how: "ఇది ఎలా పనిచేస్తుంది",
    step1: "మీ ప్రాంతం ఎంచుకోండి", step1d: "మీకు సంబంధించిన సమాచారం కోసం మీ పట్టణం లేదా వార్డు ఎంచుకోండి.",
    step2: "సమాచారం తెలుసుకోండి", step2d: "నీరు, రోడ్లు, చెత్త, సమావేశాలు, సేవల ప్రకటనలు చూడండి.",
    step3: "అర్థం చేసుకుని చర్య తీసుకోండి", step3d: "సరళమైన భాషలో వివరణ చదివి, అధికారిక వనరులతో నిర్ధారించుకోండి.",
    verify_title: "చర్య తీసుకునే ముందు నిర్ధారించుకోండి",
    verify_desc: "ముఖ్యమైన ప్రకటనలపై చర్య తీసుకునే ముందు అధికారిక ప్రభుత్వ వెబ్‌సైట్లు లేదా అధీకృత ప్రజా సేవా మార్గాల ద్వారా నిర్ధారించుకోండి.",
    dash_title: "స్థానిక సమాచారం", dash_sub: "ప్రజా సేవల సమాచారాన్ని వెతకండి, ఫిల్టర్ చేయండి.",
    category: "వర్గం", status: "స్థితి", all: "అన్నీ", sort_newest: "కొత్తవి ముందు", sort_oldest: "పాతవి ముందు",
    clear: "ఫిల్టర్లు తొలగించు", results: "సమాచారాలు దొరికాయి",
    empty_title: "సరిపోలే సమాచారం లేదు", empty_desc: "వేరే పదం, ప్రాంతం లేదా వర్గం ప్రయత్నించండి.",
    view_details: "వివరాలు చూడండి", back: "డాష్‌బోర్డ్‌కు తిరిగి",
    demo_label: "డెమో డేటా — ఇది అధికారిక ప్రకటన కాదు",
    source: "వనరు", published: "ప్రచురణ", locality: "ప్రాంతం",
    no_official_link: "ఈ రికార్డుకు అధికారిక లింక్ ఇంకా జోడించలేదు. దయచేసి సంబంధిత ప్రభుత్వ శాఖతో నిర్ధారించుకోండి.",
    st_upcoming: "రాబోయేది", st_info: "సమాచారం", st_completed: "పూర్తయింది",
    src_demo: "డెమో డేటా", src_unverified: "నిర్ధారించబడలేదు", src_verified: "అధికారికంగా నిర్ధారించబడింది",
    asst_title: "జనమిత్ర AI ని అడగండి", asst_desc: "స్థానిక ప్రజా సమాచారాన్ని సరళమైన భాషలో అర్థం చేసుకోండి.",
    asst_demo: "డెమో సహాయకుడు — ముందే నిర్ణయించిన సమాధానాలు, నమూనా డేటా ఉపయోగిస్తుంది. నిజమైన AI సేవ కనెక్ట్ కాలేదు.",
    asst_ph: "మీ ప్రశ్న టైప్ చేయండి…", send: "పంపు", try_asking: "ఇలా అడగండి",
    asst_hello: "నమస్తే! నమూనా స్థానిక సమాచారం తెలుసుకోవడంలో, సరైన అధికారిక వనరును చూపడంలో నేను సహాయం చేస్తాను. మీకు ఏం తెలియాలి?",
    fb_title: "మీ సమస్య తెలపండి", fb_desc: "స్థానిక సమస్య గురించి చెప్పండి. వ్యక్తిగత వివరాలు అవసరం లేదు.",
    fb_demo: "డెమో మాత్రమే — మీ సమర్పణ ఏ ప్రభుత్వ శాఖకూ పంపబడదు, అధికారికంగా నమోదు కాదు.",
    fb_cat: "సమస్య వర్గం", fb_loc: "ప్రాంతం", fb_desc_l: "చిన్న వివరణ", fb_sugg: "సూచన (ఐచ్ఛికం)",
    fb_choose: "ఎంచుకోండి…", fb_submit: "సమర్పించండి", fb_req: "ఈ వివరం తప్పనిసరి.", fb_min: "కనీసం 10 అక్షరాలు రాయండి.",
    fb_ok_t: "ధన్యవాదాలు — సమస్య నమోదైంది (డెమో)", fb_ok_d: "ఇది డెమో సమర్పణ మాత్రమే. ఏ అధికార సంస్థకూ పంపబడలేదు.",
    fb_another: "మరొకటి సమర్పించండి",
    src_title: "అధికారిక వనరుల జాబితా", src_sub: "వర్గం వారీగా సమాచారం ఎక్కడ నిర్ధారించాలి.",
    src_not_conf: "నిజమైన వనరు ఇంకా జోడించలేదు. ప్రారంభానికి ముందు నిర్ధారిత అధికారిక లింక్ జోడించండి.",
    src_where: "సాధారణంగా ప్రచురించేది",
    about_title: "జనమిత్ర AI గురించి",
    about_quote: "మేము ప్రజా సమాచారాన్ని చూపించడం మాత్రమే కాదు — ప్రజలు దాన్ని సులభంగా అర్థం చేసుకుని ఉపయోగించేలా చేస్తాం.",
    footer_note: "జనమిత్ర AI ఒక విద్యార్థి ప్రోటోటైప్. ఏ ప్రభుత్వ సంస్థతోనూ అనుబంధం లేదు.",
    accessibility: "సౌలభ్యం", privacy: "గోప్యత",
    language: "భాష",
  },
} as const;

export type TKey = keyof typeof dict.en;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string }>({
  lang: "en", setLang: () => {}, t: (k) => dict.en[k],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const s = localStorage.getItem("jm-lang");
    if (s === "te" || s === "en") setLangState(s);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("jm-lang", l); };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => dict[lang][k] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
