import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Sparkles, ArrowRight, ShieldCheck, Compass, Lightbulb } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { categories, localities, updates, filterUpdates } from "@/lib/data";
import { UpdateCard, inputCls, btnPrimary, btnSecondary, Logo } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Janamitra AI — Local public updates made simple" },
      { name: "description", content: "Discover and understand water, road, garbage and public-service updates for Guntur, Vijayawada and nearby areas, in English and Telugu." },
      { property: "og:title", content: "Janamitra AI — Your Area. Your Updates. Your Voice." },
      { property: "og:description", content: "Local public-service information, easy to find and understand." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useLang();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const upcoming = filterUpdates(updates, { status: "upcoming", loc: loc || undefined }).reverse().slice(0, 3);
  const go = () => nav({ to: "/updates", search: { q: q || undefined, loc: loc || undefined } });

  return (
    <>
      <section className="bg-hero relative overflow-hidden border-b">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.2fr_1fr]">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {t("prototype_note")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              Janamitra <span className="bg-brand bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="mt-3 text-xl font-semibold text-secondary-foreground md:text-2xl">{t("tagline")}</p>
            <p className="mt-4 max-w-xl text-muted-foreground">{t("hero_desc")}</p>

            <form className="mt-8 rounded-2xl border bg-card p-3 shadow-lift" onSubmit={(e) => { e.preventDefault(); go(); }}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="relative sm:w-56">
                  <span className="sr-only">{t("select_locality")}</span>
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <select value={loc} onChange={(e) => setLoc(e.target.value)} className={`${inputCls} appearance-none pl-9`}>
                    <option value="">{t("all_localities")}</option>
                    {localities.map((l) => <option key={l.id} value={l.id}>{l.name[lang]}</option>)}
                  </select>
                </label>
                <label className="relative flex-1">
                  <span className="sr-only">{t("search_ph")}</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_ph")} className={`${inputCls} pl-9`} />
                </label>
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button type="submit" className={btnPrimary}>{t("explore")} <ArrowRight className="h-4 w-4" /></button>
                <Link to="/assistant" className={btnSecondary}><Sparkles className="h-4 w-4 text-primary" /> {t("ask")}</Link>
              </div>
            </form>
          </div>
          <div className="relative hidden lg:block" aria-hidden>
            <div className="mx-auto grid aspect-square max-w-sm place-items-center rounded-full bg-primary-soft">
              <Logo className="h-48 w-48 drop-shadow-xl" />
            </div>
            {categories.slice(0, 4).map((c, i) => {
              const I = c.icon;
              const pos = ["left-0 top-8", "right-0 top-16", "left-6 bottom-10", "right-6 bottom-4"][i];
              return (
                <div key={c.id} className={`animate-rise absolute ${pos} flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm font-semibold shadow-card`} style={{ animationDelay: `${200 + i * 120}ms` }}>
                  <I className="h-4 w-4 text-primary" /> {c.name[lang]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold md:text-3xl">{t("happening")}</h2>
        <p className="mt-1 text-muted-foreground">{t("happening_sub")}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c) => {
            const I = c.icon;
            const n = updates.filter((u) => u.category === c.id).length;
            return (
              <Link key={c.id} to="/updates" search={{ cat: c.id }}
                className="group rounded-2xl border bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><I className="h-5 w-5" /></span>
                <div className="mt-3 font-semibold leading-tight">{c.name[lang]}</div>
                <div className="text-xs text-muted-foreground">{n} · demo</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold md:text-3xl">{t("upcoming")}</h2>
          <Link to="/updates" search={{ status: "upcoming" }} className="text-sm font-semibold text-primary hover:underline">{t("see_all")} →</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {(upcoming.length ? upcoming : filterUpdates(updates, { status: "upcoming" }).slice(0, 3)).map((u, i) => <UpdateCard key={u.id} u={u} i={i} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl">{t("how")}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[[MapPin, "step1", "step1d"], [Compass, "step2", "step2d"], [Lightbulb, "step3", "step3d"]].map(([I, a, b], i) => {
            const Icon = I as typeof MapPin;
            return (
              <li key={i} className="relative rounded-2xl border bg-card p-6 shadow-card">
                <span className="absolute right-5 top-4 text-5xl font-extrabold text-primary-soft">{i + 1}</span>
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-lg font-bold">{t(a as "step1")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(b as "step1d")}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="bg-brand flex flex-col items-start gap-4 rounded-3xl p-8 text-primary-foreground md:flex-row md:items-center md:p-10">
          <ShieldCheck className="h-12 w-12 shrink-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{t("verify_title")}</h2>
            <p className="mt-1 opacity-90">{t("verify_desc")}</p>
          </div>
          <Link to="/sources" className="rounded-xl bg-card px-5 py-3 font-semibold text-primary">{t("nav_sources")}</Link>
        </div>
      </section>
    </>
  );
}
