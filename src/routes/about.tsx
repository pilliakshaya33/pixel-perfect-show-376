import { createFileRoute } from "@tanstack/react-router";
import { Layers, Search, Languages, ShieldCheck, FlaskConical, Accessibility, Lock, Quote } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Janamitra AI — Making public information usable" },
      { name: "description", content: "Why Janamitra AI exists, how Telugu accessibility and transparent labels help citizens, and the prototype's current status." },
      { property: "og:title", content: "About Janamitra AI" },
      { property: "og:description", content: "Making local public information easier to understand and use." },
    ],
  }),
  component: About,
});

const blocks = [
  { I: Layers, t: { en: "The problem", te: "సమస్య" }, d: { en: "Notices about water, roads, waste and services are scattered across websites, posters and announcements — often in complex language.", te: "నీరు, రోడ్లు, చెత్త, సేవలపై ప్రకటనలు వెబ్‌సైట్లు, పోస్టర్లు, ప్రకటనల్లో చెల్లాచెదురుగా ఉంటాయి — తరచూ కష్టమైన భాషలో." } },
  { I: Search, t: { en: "Easier discovery", te: "సులభంగా కనుగొనడం" }, d: { en: "One place, organised by area and category, with search and filters so people find what matters in seconds.", te: "ప్రాంతం, వర్గం వారీగా ఒకే చోట, వెతుకు & ఫిల్టర్లతో — సెకన్లలో అవసరమైనది కనుగొనండి." } },
  { I: Languages, t: { en: "Telugu accessibility", te: "తెలుగులో అందుబాటు" }, d: { en: "Full Telugu support helps citizens understand notices in the language they're most comfortable with.", te: "పూర్తి తెలుగు మద్దతుతో పౌరులు తమకు సౌకర్యమైన భాషలో ప్రకటనలు అర్థం చేసుకోగలరు." } },
  { I: ShieldCheck, t: { en: "Trust through transparency", te: "పారదర్శకతతో నమ్మకం" }, d: { en: "Every update carries a source label — verified, unverified or demo — so people know what to double-check.", te: "ప్రతి సమాచారానికి వనరు గుర్తు ఉంటుంది — నిర్ధారిత, నిర్ధారించని లేదా డెమో — కాబట్టి ఏది తనిఖీ చేయాలో తెలుస్తుంది." } },
  { I: FlaskConical, t: { en: "Prototype status", te: "ప్రోటోటైప్ స్థితి" }, d: { en: "This is a student prototype using fictional data. Becoming a live service requires genuine public data integrations and official partnerships.", te: "ఇది కల్పిత డేటాతో విద్యార్థి ప్రోటోటైప్. నిజమైన సేవగా మారడానికి అసలైన ప్రజా డేటా అనుసంధానాలు, అధికారిక భాగస్వామ్యాలు అవసరం." } },
];

function About() {
  const { t, lang } = useLang();
  return (
    <>
      <PageHeader title={t("about_title")} sub={t("tagline")} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <figure className="bg-brand rounded-3xl p-8 text-primary-foreground md:p-10">
          <Quote className="h-8 w-8 opacity-70" />
          <blockquote className="mt-3 text-xl font-bold leading-snug md:text-2xl">“{t("about_quote")}”</blockquote>
        </figure>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {blocks.map(({ I, t: ti, d }) => (
            <div key={ti.en} className="rounded-2xl border bg-card p-6 shadow-card">
              <I className="h-6 w-6 text-primary" />
              <h2 className="mt-3 text-lg font-bold">{ti[lang]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{d[lang]}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section id="accessibility" className="rounded-2xl border bg-card p-6 shadow-card">
            <Accessibility className="h-6 w-6 text-primary" />
            <h2 className="mt-3 text-lg font-bold">{t("accessibility")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{lang === "te" ? "కీబోర్డ్‌తో నడపగలిగే నియంత్రణలు, స్పష్టమైన కాంట్రాస్ట్, వివరణాత్మక లేబుల్స్, తక్కువ కదలిక సెట్టింగ్‌కు గౌరవం." : "Keyboard-friendly controls, readable contrast, descriptive labels, and respect for reduced-motion settings."}</p>
          </section>
          <section id="privacy" className="rounded-2xl border bg-card p-6 shadow-card">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="mt-3 text-lg font-bold">{t("privacy")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{lang === "te" ? "లాగిన్ అవసరం లేదు. వ్యక్తిగత వివరాలు అడగము. మీ భాష ఎంపిక మాత్రమే మీ బ్రౌజర్‌లో నిల్వ అవుతుంది." : "No login required. We don't ask for personal details. Only your language choice is saved in your browser."}</p>
          </section>
        </div>
      </div>
    </>
  );
}
