import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, AlertTriangle, ShieldCheck, ShieldQuestion, FlaskConical, Clock, MapPin, ArrowRight } from "lucide-react";
import { useLang, type TKey } from "@/lib/i18n";
import { catById, formatDate, locById, type Status, type SourceType, type Update } from "@/lib/data";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="jmg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="oklch(0.6 0.14 230)" />
        </linearGradient>
      </defs>
      <path d="M20 2C12 2 6 8 6 16c0 10 14 22 14 22s14-12 14-22C34 8 28 2 20 2z" fill="url(#jmg)" />
      <path d="M12.5 12.5h15a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-8l-4 3.2v-3.2h-3a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" fill="var(--card)" />
      <circle cx="16" cy="17.5" r="1.3" fill="var(--primary)" />
      <circle cx="20" cy="17.5" r="1.3" fill="var(--primary)" />
      <circle cx="24" cy="17.5" r="1.3" fill="var(--primary)" />
    </svg>
  );
}

const nav: { to: "/" | "/updates" | "/assistant" | "/feedback" | "/sources" | "/about"; k: TKey }[] = [
  { to: "/", k: "nav_home" }, { to: "/updates", k: "nav_updates" }, { to: "/assistant", k: "nav_assistant" },
  { to: "/feedback", k: "nav_feedback" }, { to: "/sources", k: "nav_sources" }, { to: "/about", k: "nav_about" },
];

export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t("language")} className="flex rounded-full border bg-card p-0.5 text-sm">
      {(["en", "te"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 font-medium transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {l === "en" ? "English" : "తెలుగు"}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-card/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <Logo className="h-8 w-8" /> Janamitra <span className="text-primary">AI</span>
        </Link>
        <nav className="ml-6 hidden flex-1 gap-1 lg:flex" aria-label="Main">
          {nav.slice(1).map((n) => (
            <Link key={n.to} to={n.to} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-primary-soft text-primary" }}>{t(n.k)}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LangSwitch />
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-card px-4 py-2 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium hover:bg-muted"
              activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>{t(n.k)}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-20 border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 font-bold"><Logo className="h-7 w-7" /> Janamitra AI</div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("footer_note")}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium" aria-label="Footer">
          <Link to="/about" className="hover:text-primary">{t("nav_about")}</Link>
          <Link to="/about" hash="accessibility" className="hover:text-primary">{t("accessibility")}</Link>
          <Link to="/about" hash="privacy" className="hover:text-primary">{t("privacy")}</Link>
          <Link to="/sources" className="hover:text-primary">{t("nav_sources")}</Link>
        </nav>
      </div>
    </footer>
  );
}

export function PageHeader({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="bg-hero border-b">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h1 className="animate-rise text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
        {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

export function DemoLabel({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <span className={`inline-flex items-center gap-1 rounded-md bg-warning-soft px-2 py-1 text-[11px] font-bold tracking-wide text-warning ${className}`}>
      <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> {t("demo_label")}
    </span>
  );
}

const stMap: Record<Status, { k: TKey; c: string }> = {
  upcoming: { k: "st_upcoming", c: "bg-primary-soft text-primary" },
  info: { k: "st_info", c: "bg-muted text-secondary-foreground" },
  completed: { k: "st_completed", c: "bg-success-soft text-success" },
};
export function StatusBadge({ s }: { s: Status }) {
  const { t } = useLang();
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${stMap[s].c}`}>{t(stMap[s].k)}</span>;
}

export function SourceBadge({ s }: { s: SourceType }) {
  const { t } = useLang();
  const m = { demo: [FlaskConical, "src_demo"], unverified: [ShieldQuestion, "src_unverified"], verified: [ShieldCheck, "src_verified"] } as const;
  const [Icon, k] = m[s];
  return <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" aria-hidden />{t("source")}: {t(k)}</span>;
}

export function UpdateCard({ u, i = 0 }: { u: Update; i?: number }) {
  const { lang, t } = useLang();
  const c = catById(u.category);
  const Icon = c.icon;
  return (
    <article className="animate-rise group flex flex-col rounded-2xl border bg-card p-5 shadow-card transition-shadow hover:shadow-lift" style={{ animationDelay: `${i * 40}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
          <span className="text-xs font-semibold text-muted-foreground">{c.name[lang]}</span>
        </div>
        <StatusBadge s={u.status} />
      </div>
      <h3 className="mt-4 font-bold leading-snug">{u.title[lang]}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{u.summary[lang]}</p>
      <div className="mt-4 space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden />{locById(u.locality).name[lang]}</div>
        <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden />{formatDate(u.date, lang)}</div>
        <SourceBadge s={u.source} />
      </div>
      {u.source === "demo" && <DemoLabel className="mt-3 self-start" />}
      <Link to="/updates/$id" params={{ id: u.id }}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
        {t("view_details")} <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}

export const inputCls = "w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
export const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-primary-foreground shadow-lift transition hover:brightness-110";
export const btnSecondary = "inline-flex items-center justify-center gap-2 rounded-xl border bg-card px-5 py-3 font-semibold text-foreground transition hover:bg-muted";
