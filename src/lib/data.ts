import {
  Droplets, Construction, Trash2, Users, Landmark, Building2, Zap, Siren, type LucideIcon,
} from "lucide-react";

export type CategoryId = "water" | "roads" | "garbage" | "meetings" | "services" | "development" | "electricity" | "emergency";
export type Status = "upcoming" | "info" | "completed";
export type SourceType = "demo" | "unverified" | "verified";
type L = { en: string; te: string };

export const categories: { id: CategoryId; icon: LucideIcon; name: L; agency: L }[] = [
  { id: "water", icon: Droplets, name: { en: "Water Supply", te: "నీటి సరఫరా" }, agency: { en: "Municipal Corporation – Water Works", te: "మున్సిపల్ కార్పొరేషన్ – నీటి సరఫరా విభాగం" } },
  { id: "roads", icon: Construction, name: { en: "Roads and Traffic", te: "రోడ్లు & ట్రాఫిక్" }, agency: { en: "Engineering Dept. / Traffic Police", te: "ఇంజనీరింగ్ విభాగం / ట్రాఫిక్ పోలీస్" } },
  { id: "garbage", icon: Trash2, name: { en: "Garbage Collection", te: "చెత్త సేకరణ" }, agency: { en: "Municipal Public Health & Sanitation", te: "మున్సిపల్ ప్రజారోగ్యం & పారిశుధ్యం" } },
  { id: "meetings", icon: Users, name: { en: "Public Meetings", te: "ప్రజా సమావేశాలు" }, agency: { en: "Ward Secretariat / Municipal Council", te: "వార్డు సచివాలయం / మున్సిపల్ కౌన్సిల్" } },
  { id: "services", icon: Landmark, name: { en: "Government Services", te: "ప్రభుత్వ సేవలు" }, agency: { en: "State citizen-services portal", te: "రాష్ట్ర పౌర సేవల పోర్టల్" } },
  { id: "development", icon: Building2, name: { en: "Local Development", te: "స్థానిక అభివృద్ధి" }, agency: { en: "Urban Development Authority", te: "పట్టణాభివృద్ధి సంస్థ" } },
  { id: "electricity", icon: Zap, name: { en: "Electricity & Utilities", te: "విద్యుత్ & ప్రజా సౌకర్యాలు" }, agency: { en: "Power Distribution Company (DISCOM)", te: "విద్యుత్ పంపిణీ సంస్థ (డిస్కామ్)" } },
  { id: "emergency", icon: Siren, name: { en: "Emergency Announcements", te: "అత్యవసర ప్రకటనలు" }, agency: { en: "District Disaster Management Authority", te: "జిల్లా విపత్తు నిర్వహణ సంస్థ" } },
];
export const catById = (id: CategoryId) => categories.find((c) => c.id === id)!;

export const localities: { id: string; name: L }[] = [
  { id: "guntur-brodipet", name: { en: "Brodipet, Guntur", te: "బ్రాడీపేట, గుంటూరు" } },
  { id: "guntur-arundelpet", name: { en: "Arundelpet, Guntur", te: "అరండల్‌పేట, గుంటూరు" } },
  { id: "guntur-lakshmipuram", name: { en: "Lakshmipuram, Guntur", te: "లక్ష్మీపురం, గుంటూరు" } },
  { id: "vja-benz", name: { en: "Benz Circle, Vijayawada", te: "బెంజ్ సర్కిల్, విజయవాడ" } },
  { id: "vja-governorpet", name: { en: "Governorpet, Vijayawada", te: "గవర్నర్‌పేట, విజయవాడ" } },
  { id: "vja-patamata", name: { en: "Patamata, Vijayawada", te: "పటమట, విజయవాడ" } },
  { id: "tenali", name: { en: "Tenali", te: "తెనాలి" } },
  { id: "mangalagiri", name: { en: "Mangalagiri", te: "మంగళగిరి" } },
];
export const locById = (id: string) => localities.find((l) => l.id === id)!;

export type Update = {
  id: string; category: CategoryId; locality: string; date: string; status: Status; source: SourceType;
  officialUrl?: string; title: L; summary: L; body: L;
};

export const updates: Update[] = [
  { id: "u1", category: "water", locality: "guntur-brodipet", date: "2026-10-16T06:00", status: "upcoming", source: "demo",
    title: { en: "Water supply paused for pipeline maintenance", te: "పైప్‌లైన్ మరమ్మతుల కోసం నీటి సరఫరా నిలిపివేత" },
    summary: { en: "Supply expected to pause from 6 AM to 2 PM. Store water in advance.", te: "ఉదయం 6 నుండి మధ్యాహ్నం 2 వరకు సరఫరా ఆగే అవకాశం. ముందే నీరు నిల్వ చేసుకోండి." },
    body: { en: "Sample notice: Routine maintenance on the main distribution line may pause household water supply across parts of Brodipet between 6 AM and 2 PM. Residents are advised to store enough water for drinking and cooking. Supply should resume gradually in the afternoon.", te: "నమూనా ప్రకటన: ప్రధాన పంపిణీ లైన్‌లో సాధారణ మరమ్మతుల కారణంగా బ్రాడీపేటలోని కొన్ని ప్రాంతాల్లో ఉదయం 6 నుండి మధ్యాహ్నం 2 వరకు నీటి సరఫరా ఆగవచ్చు. తాగడానికి, వంటకు సరిపడా నీరు నిల్వ చేసుకోండి. మధ్యాహ్నం తర్వాత సరఫరా క్రమంగా పునరుద్ధరించబడుతుంది." } },
  { id: "u2", category: "roads", locality: "vja-benz", date: "2026-10-15T09:30", status: "upcoming", source: "demo",
    title: { en: "Lane closure near Benz Circle flyover", te: "బెంజ్ సర్కిల్ ఫ్లైఓవర్ వద్ద లేన్ మూసివేత" },
    summary: { en: "One lane closed for resurfacing for three nights. Expect slow traffic.", te: "రోడ్డు మరమ్మతు కోసం మూడు రాత్రులు ఒక లేన్ మూసివేత. ట్రాఫిక్ నెమ్మదిగా ఉంటుంది." },
    body: { en: "Sample notice: One lane on the service road near Benz Circle will be closed from 10 PM to 5 AM for three nights for resurfacing work. Commuters may use alternate routes and allow extra travel time.", te: "నమూనా ప్రకటన: బెంజ్ సర్కిల్ సమీపంలోని సర్వీస్ రోడ్డులో ఒక లేన్ రాత్రి 10 నుండి ఉదయం 5 వరకు మూడు రాత్రులు మూసివేయబడుతుంది. ప్రయాణికులు ప్రత్యామ్నాయ మార్గాలు ఉపయోగించి, అదనపు సమయం కేటాయించుకోండి." } },
  { id: "u3", category: "garbage", locality: "guntur-arundelpet", date: "2026-10-13T08:00", status: "info", source: "demo",
    title: { en: "Revised garbage collection timings", te: "చెత్త సేకరణ సమయాల్లో మార్పు" },
    summary: { en: "Door-to-door collection now between 7 AM and 10 AM. Separate wet and dry waste.", te: "ఇంటింటి సేకరణ ఇప్పుడు ఉదయం 7 నుండి 10 వరకు. తడి, పొడి చెత్తను వేరు చేయండి." },
    body: { en: "Sample notice: Door-to-door garbage collection in Arundelpet will now happen between 7 AM and 10 AM daily. Please keep wet and dry waste in separate bins for faster pickup.", te: "నమూనా ప్రకటన: అరండల్‌పేటలో ఇంటింటి చెత్త సేకరణ ఇకపై ప్రతిరోజూ ఉదయం 7 నుండి 10 వరకు జరుగుతుంది. త్వరిత సేకరణ కోసం తడి, పొడి చెత్తను వేర్వేరు డబ్బాల్లో ఉంచండి." } },
  { id: "u4", category: "meetings", locality: "vja-patamata", date: "2026-10-20T16:00", status: "upcoming", source: "demo",
    title: { en: "Ward-level public meeting on drainage", te: "డ్రైనేజీపై వార్డు స్థాయి ప్రజా సమావేశం" },
    summary: { en: "Residents invited to share drainage concerns at the community hall.", te: "కమ్యూనిటీ హాల్‌లో డ్రైనేజీ సమస్యలు చెప్పడానికి నివాసితులకు ఆహ్వానం." },
    body: { en: "Sample notice: A ward-level meeting will be held at the local community hall to discuss monsoon drainage issues. Residents may share concerns and suggestions. Bring any photos or details of problem spots.", te: "నమూనా ప్రకటన: వర్షాకాల డ్రైనేజీ సమస్యలపై చర్చించడానికి స్థానిక కమ్యూనిటీ హాల్‌లో వార్డు స్థాయి సమావేశం జరుగుతుంది. నివాసితులు తమ సమస్యలు, సూచనలు తెలపవచ్చు. సమస్య ఉన్న ప్రదేశాల ఫోటోలు లేదా వివరాలు తీసుకురండి." } },
  { id: "u5", category: "services", locality: "guntur-lakshmipuram", date: "2026-10-12T10:00", status: "info", source: "demo",
    title: { en: "Certificate help desk at ward secretariat", te: "వార్డు సచివాలయంలో సర్టిఫికెట్ సహాయ కేంద్రం" },
    summary: { en: "Help desk for income and caste certificate applications this week.", te: "ఈ వారం ఆదాయ, కుల ధృవీకరణ పత్రాల దరఖాస్తులకు సహాయ కేంద్రం." },
    body: { en: "Sample notice: A help desk at the ward secretariat will guide residents applying for income and caste certificates. Carry your identity proof and existing documents. Check the official portal for the current application process.", te: "నమూనా ప్రకటన: ఆదాయ, కుల ధృవీకరణ పత్రాల కోసం దరఖాస్తు చేసేవారికి వార్డు సచివాలయంలో సహాయ కేంద్రం మార్గదర్శనం చేస్తుంది. గుర్తింపు పత్రం, ఉన్న పత్రాలు తీసుకురండి. ప్రస్తుత దరఖాస్తు విధానం కోసం అధికారిక పోర్టల్ చూడండి." } },
  { id: "u6", category: "development", locality: "vja-governorpet", date: "2026-10-08T11:00", status: "info", source: "demo",
    title: { en: "New footpath work begins on main road", te: "ప్రధాన రహదారిపై కొత్త ఫుట్‌పాత్ పనులు ప్రారంభం" },
    summary: { en: "Footpath widening planned over six weeks. Pedestrian diversions in place.", te: "ఆరు వారాల పాటు ఫుట్‌పాత్ విస్తరణ. పాదచారులకు మళ్లింపులు." },
    body: { en: "Sample notice: Footpath widening and tactile paving work is planned along the main road in Governorpet over about six weeks. Temporary pedestrian diversions will be marked.", te: "నమూనా ప్రకటన: గవర్నర్‌పేట ప్రధాన రహదారి వెంట సుమారు ఆరు వారాల పాటు ఫుట్‌పాత్ విస్తరణ, దృష్టి లోపం ఉన్నవారి కోసం టైల్స్ పనులు జరుగుతాయి. తాత్కాలిక పాదచారుల మళ్లింపులు గుర్తించబడతాయి." } },
  { id: "u7", category: "electricity", locality: "tenali", date: "2026-10-17T10:00", status: "upcoming", source: "demo",
    title: { en: "Planned power shutdown for line upgrade", te: "లైన్ అప్‌గ్రేడ్ కోసం ప్రణాళికాబద్ధ విద్యుత్ నిలిపివేత" },
    summary: { en: "Power may be off from 10 AM to 1 PM in parts of Tenali.", te: "తెనాలిలోని కొన్ని ప్రాంతాల్లో ఉదయం 10 నుండి మధ్యాహ్నం 1 వరకు కరెంటు ఉండకపోవచ్చు." },
    body: { en: "Sample notice: Power supply may be interrupted from 10 AM to 1 PM for overhead line upgrades. Charge essential devices beforehand.", te: "నమూనా ప్రకటన: విద్యుత్ లైన్ల అప్‌గ్రేడ్ కోసం ఉదయం 10 నుండి మధ్యాహ్నం 1 వరకు సరఫరా నిలిచిపోవచ్చు. అవసరమైన పరికరాలను ముందే ఛార్జ్ చేసుకోండి." } },
  { id: "u8", category: "emergency", locality: "vja-patamata", date: "2026-10-14T07:00", status: "info", source: "demo",
    title: { en: "Heavy rain advisory for low-lying areas", te: "లోతట్టు ప్రాంతాలకు భారీ వర్ష హెచ్చరిక" },
    summary: { en: "Avoid waterlogged roads and keep emergency supplies ready.", te: "నీరు నిలిచిన రోడ్లను తప్పించండి, అత్యవసర సామాగ్రి సిద్ధంగా ఉంచండి." },
    body: { en: "Sample advisory: Heavy rain is possible over the next 48 hours. Residents in low-lying areas should avoid waterlogged roads, keep a torch and drinking water ready, and follow official weather updates.", te: "నమూనా హెచ్చరిక: రాబోయే 48 గంటల్లో భారీ వర్షం పడే అవకాశం ఉంది. లోతట్టు ప్రాంతాల వారు నీరు నిలిచిన రోడ్లను తప్పించి, టార్చ్, తాగునీరు సిద్ధంగా ఉంచుకోండి. అధికారిక వాతావరణ సమాచారం అనుసరించండి." } },
  { id: "u9", category: "water", locality: "vja-benz", date: "2026-10-05T07:00", status: "completed", source: "demo",
    title: { en: "Overhead tank cleaning completed", te: "ఓవర్‌హెడ్ ట్యాంక్ శుభ్రత పూర్తి" },
    summary: { en: "Tank cleaning finished; normal supply restored.", te: "ట్యాంక్ శుభ్రత పూర్తయింది; సాధారణ సరఫరా పునరుద్ధరించబడింది." },
    body: { en: "Sample notice: Cleaning of the overhead tank serving the area has been completed and regular supply timings have resumed.", te: "నమూనా ప్రకటన: ఈ ప్రాంతానికి నీరు అందించే ఓవర్‌హెడ్ ట్యాంక్ శుభ్రత పూర్తయింది, సాధారణ సరఫరా సమయాలు తిరిగి ప్రారంభమయ్యాయి." } },
  { id: "u10", category: "roads", locality: "mangalagiri", date: "2026-10-03T12:00", status: "completed", source: "demo",
    title: { en: "Pothole repairs completed on bypass road", te: "బైపాస్ రోడ్డుపై గుంతల మరమ్మతు పూర్తి" },
    summary: { en: "Repair work on the bypass stretch is finished.", te: "బైపాస్ రోడ్డు భాగంపై మరమ్మతు పనులు పూర్తయ్యాయి." },
    body: { en: "Sample notice: Pothole patching along the bypass stretch has been completed. Report new road damage through the official grievance channel.", te: "నమూనా ప్రకటన: బైపాస్ రోడ్డు వెంట గుంతల మరమ్మతు పూర్తయింది. కొత్త రోడ్డు నష్టాన్ని అధికారిక ఫిర్యాదు మార్గం ద్వారా తెలపండి." } },
  { id: "u11", category: "garbage", locality: "tenali", date: "2026-10-18T07:00", status: "upcoming", source: "demo",
    title: { en: "Special cleanliness drive this Sunday", te: "ఈ ఆదివారం ప్రత్యేక పరిశుభ్రత కార్యక్రమం" },
    summary: { en: "Bulk waste pickup and drain cleaning in market area.", te: "మార్కెట్ ప్రాంతంలో భారీ చెత్త సేకరణ, కాలువల శుభ్రత." },
    body: { en: "Sample notice: A cleanliness drive will include bulk waste pickup and drain desilting around the market area. Residents can keep old bulky items outside for collection.", te: "నమూనా ప్రకటన: మార్కెట్ పరిసరాల్లో భారీ చెత్త సేకరణ, కాలువల పూడికతీత జరుగుతుంది. పాత పెద్ద వస్తువులను సేకరణ కోసం బయట ఉంచవచ్చు." } },
  { id: "u12", category: "meetings", locality: "guntur-brodipet", date: "2026-10-22T11:00", status: "upcoming", source: "demo",
    title: { en: "Budget suggestions meeting for residents", te: "నివాసితుల కోసం బడ్జెట్ సూచనల సమావేశం" },
    summary: { en: "Share ideas for next year's ward works.", te: "వచ్చే ఏడాది వార్డు పనులకు మీ ఆలోచనలు తెలపండి." },
    body: { en: "Sample notice: Residents are invited to suggest priorities for next year's ward-level works such as streetlights, parks and drains.", te: "నమూనా ప్రకటన: వీధి దీపాలు, పార్కులు, కాలువలు వంటి వచ్చే ఏడాది వార్డు పనుల ప్రాధాన్యతలను సూచించడానికి నివాసితులకు ఆహ్వానం." } },
];

export function filterUpdates(list: Update[], o: { q?: string | undefined; cat?: string | undefined; status?: string | undefined; loc?: string | undefined; sort?: "new" | "old" | undefined }) {
  const q = (o.q ?? "").trim().toLowerCase();
  return list
    .filter((u) => !o.cat || u.category === o.cat)
    .filter((u) => !o.status || u.status === o.status)
    .filter((u) => !o.loc || u.locality === o.loc)
    .filter((u) => {
      if (!q) return true;
      const l = locById(u.locality).name;
      const c = catById(u.category).name;
      return [u.title.en, u.title.te, u.summary.en, u.summary.te, l.en, l.te, c.en, c.te].join(" ").toLowerCase().includes(q);
    })
    .sort((a, b) => (o.sort === "old" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
}

export function formatDate(iso: string, lang: "en" | "te") {
  return new Date(iso).toLocaleString(lang === "te" ? "te-IN" : "en-IN", { dateStyle: "medium", timeStyle: "short" });
}
