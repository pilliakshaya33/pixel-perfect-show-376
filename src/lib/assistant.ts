import { categories, formatDate, locById, localities, updates } from "./data";

export function answer(q: string, lang: "en" | "te"): string {
  const s = q.toLowerCase();
  const te = lang === "te";
  const loc = localities.find((l) => s.includes((l.name.en.split(",")[0] ?? "").toLowerCase()) || s.includes(l.name.te.split(",")[0] ?? "") );
  const city = ["guntur", "గుంటూరు"].some((w) => s.includes(w)) ? "guntur" : ["vijayawada", "విజయవాడ"].some((w) => s.includes(w)) ? "vja" : null;
  const kw: Record<string, string[]> = {
    water: ["water", "నీ"], roads: ["road", "traffic", "రోడ్", "ట్రాఫిక్"], garbage: ["garbage", "waste", "చెత్త"],
    meetings: ["meeting", "సమావేశ"], services: ["certificate", "service", "సేవ", "సర్టిఫికెట్"],
    electricity: ["power", "electric", "current", "విద్యుత్", "కరెంట"], emergency: ["rain", "emergency", "వర్ష", "అత్యవసర"],
    development: ["development", "footpath", "అభివృద్ధి"],
  };
  const cat = categories.find((c) => (kw[c.id] ?? []).some((k) => s.includes(k)));

  if (/(website|portal|official|link|వెబ్‌సైట్|అధికారిక)/.test(s)) {
    return te
      ? "అధికారిక లింకులను నేను సొంతంగా ఇవ్వలేను — తప్పుడు లింకులు ప్రమాదకరం. 'అధికారిక వనరులు' పేజీలో ప్రతి వర్గానికి ఏ శాఖ సమాచారం ప్రచురిస్తుందో చూడండి. వెబ్‌సైట్ చిరునామా .gov.in లేదా .ap.gov.in తో ముగుస్తుందో లేదో తనిఖీ చేయండి, లేదా మీ వార్డు సచివాలయాన్ని నేరుగా అడగండి."
      : "I won't guess official links — a wrong link can be harmful. Open the Official Sources page to see which department typically publishes each kind of information. Check that a website address ends in .gov.in (or .ap.gov.in), or ask your ward secretariat directly.";
  }
  if (/(explain|simple|వివరించ|సరళ)/.test(s) && !cat) {
    return te
      ? "తప్పకుండా! ప్రకటన పాఠ్యాన్ని ఇక్కడ పేస్ట్ చేయండి, లేదా 'స్థానిక సమాచారం'లో ఏదైనా నమూనా ప్రకటన తెరవండి — ప్రతిదానికీ సరళమైన తెలుగు వివరణ ఉంది. గమనిక: ఈ డెమోలో నిజమైన AI కనెక్ట్ కాలేదు, కాబట్టి కొత్త పాఠ్యాన్ని అనువదించలేను."
      : "Happy to help! In this demo I can't process new text (no live AI is connected), but every sample update in Local Updates has a plain-language explanation in both English and Telugu. Switch to తెలుగు at the top to read it in Telugu.";
  }
  if (/(before attending|attend|హాజర)/.test(s) || (cat?.id === "meetings" && /(what|check|ఏమి)/.test(s))) {
    return te
      ? "సమావేశానికి వెళ్లే ముందు: 1) తేదీ, సమయం, స్థలం అధికారిక ప్రకటనలో నిర్ధారించుకోండి. 2) ఎజెండా ఏమిటో తెలుసుకోండి. 3) మీ సమస్యను క్లుప్తంగా రాసుకోండి, ఫోటోలు ఉంటే తీసుకెళ్లండి. 4) గుర్తింపు పత్రం అవసరమా అని అడగండి. 5) వాయిదా పడిందేమో చివరి నిమిషంలో తనిఖీ చేయండి."
      : "Before attending a public meeting: 1) Confirm the date, time and venue from an official notice. 2) Find out the agenda. 3) Note your concern briefly and bring photos if useful. 4) Check whether ID is needed. 5) Re-check on the day in case it's rescheduled.";
  }

  let hits = updates.filter((u) => (!cat || u.category === cat.id) && (!loc || u.locality === loc.id) && (!city || u.locality.startsWith(city)));
  if (!cat && !loc && !city) hits = [];
  if (hits.length) {
    const lines = hits.slice(0, 4).map((u) => `• ${u.title[lang]} — ${locById(u.locality).name[lang]}, ${formatDate(u.date, lang)}`);
    return (te ? `నమూనా డేటాలో ${hits.length} సమాచారం దొరికింది:\n` : `I found ${hits.length} matching update(s) in the sample data:\n`)
      + lines.join("\n")
      + (te ? "\n\n⚠️ ఇవి డెమో డేటా మాత్రమే, అధికారిక ప్రకటనలు కావు. " : "\n\n⚠️ These are demo records, not official notices. ")
      + (cat ? (te ? `నిర్ధారణకు: ${cat.agency.te}.` : `To verify, check with: ${cat.agency.en}.`) : "");
  }
  if (cat || loc || city) {
    return te
      ? `నమూనా డేటాలో దీనికి సరిపోయే సమాచారం లేదు. నిజమైన సమాచారం కోసం ${cat ? cat.agency.te : "మీ వార్డు సచివాలయం లేదా మున్సిపల్ కార్యాలయం"} ను సంప్రదించండి. నేను తేదీలు లేదా ప్రకటనలు ఊహించి చెప్పను.`
      : `There's no matching update in the sample data. For real information, check with ${cat ? cat.agency.en : "your ward secretariat or municipal office"}. I won't guess dates or announcements.`;
  }
  return te
    ? "క్షమించండి, అది నాకు అర్థం కాలేదు. నీరు, రోడ్లు, చెత్త, విద్యుత్, సమావేశాలు గురించి లేదా గుంటూరు/విజయవాడ వంటి ప్రాంతం పేరుతో అడగండి."
    : "Sorry, I couldn't match that. Try asking about water, roads, garbage, electricity or meetings — or name an area like Guntur or Vijayawada.";
}

export const examples = {
  en: ["Is there a water supply update in my area?", "How can I find the official government service website?", "Where can I check local road closure information?", "Explain this public notice in simple Telugu.", "What information should I check before attending a public meeting?"],
  te: ["నా ప్రాంతంలో నీటి సరఫరా సమాచారం ఉందా?", "అధికారిక ప్రభుత్వ సేవల వెబ్‌సైట్ ఎలా కనుగొనాలి?", "రోడ్డు మూసివేత సమాచారం ఎక్కడ చూడాలి?", "ఈ ప్రకటనను సరళమైన తెలుగులో వివరించండి.", "ప్రజా సమావేశానికి హాజరయ్యే ముందు ఏమి తనిఖీ చేయాలి?"],
};
