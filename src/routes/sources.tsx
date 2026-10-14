import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ShieldQuestion, FlaskConical, Link2Off } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { categories } from "@/lib/data";
import { PageHeader } from "@/components/site";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Verify Before You Act — Official Sources | Janamitra AI" },
      { name: "description", content: "How to verify local announcements and which departments typically publish each kind of information." },
      { property: "og:title", content: "Official Source Directory — Janamitra AI" },
      { property: "og:description", content: "Verify important announcements through authorised channels." },
    ],
  }),
  component: Sources,
});

function Sources() {
  const { t, lang } = useLang();
  const levels = [
    { I: ShieldCheck, k: "src_verified", c: "text-success bg-success-soft", d: { en: "Only when a real official source has been checked.", te: "నిజమైన అధికారిక వనరు తనిఖీ చేసినప్పుడు మాత్రమే." } },
    { I: ShieldQuestion, k: "src_unverified", c: "text-secondary-foreground bg-muted", d: { en: "Reported, but not yet confirmed from an official source.", te: "తెలిసింది, కానీ అధికారిక వనరు నుండి ఇంకా నిర్ధారించలేదు." } },
    { I: FlaskConical, k: "src_demo", c: "text-warning bg-warning-soft", d: { en: "Fictional sample records used in this prototype.", te: "ఈ ప్రోటోటైప్‌లో వాడిన కల్పిత నమూనా రికార్డులు." } },
  ] as const;
  return (
    <>
      <PageHeader title={t("verify_title")} sub={t("verify_desc")} />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {levels.map(({ I, k, c, d }) => (
            <div key={k} className="rounded-2xl border bg-card p-5 shadow-card">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${c}`}><I className="h-5 w-5" /></span>
              <h3 className="mt-3 font-bold">{t(k)}</h3>
              <p className="text-sm text-muted-foreground">{d[lang]}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-14 text-2xl font-bold">{t("src_title")}</h2>
        <p className="text-muted-foreground">{t("src_sub")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {categories.map((c) => { const I = c.icon; return (
            <div key={c.id} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-card">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary"><I className="h-5 w-5" /></span>
              <div>
                <h3 className="font-bold">{c.name[lang]}</h3>
                <p className="text-sm"><span className="text-muted-foreground">{t("src_where")}:</span> {c.agency[lang]}</p>
                <p className="mt-2 flex gap-1.5 text-xs text-muted-foreground"><Link2Off className="h-3.5 w-3.5 shrink-0" />{t("src_not_conf")}</p>
              </div>
            </div>
          ); })}
        </div>
      </div>
    </>
  );
}
