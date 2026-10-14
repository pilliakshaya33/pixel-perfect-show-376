import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SearchX, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { categories, localities, updates, filterUpdates } from "@/lib/data";
import { PageHeader, UpdateCard, inputCls, DemoLabel } from "@/components/site";

type S = { q?: string; cat?: string; status?: string; loc?: string; sort?: "new" | "old" };
const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/updates/")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: str(s.q), cat: str(s.cat), status: str(s.status), loc: str(s.loc), sort: s.sort === "old" ? "old" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Local Updates Dashboard — Janamitra AI" },
      { name: "description", content: "Search and filter sample local updates on water, roads, garbage, meetings and services." },
      { property: "og:title", content: "Local Updates — Janamitra AI" },
      { property: "og:description", content: "Search and filter local public-service updates." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t, lang } = useLang();
  const s = Route.useSearch();
  const nav = useNavigate({ from: "/updates/" });
  const set = (p: Partial<S>) => nav({ search: (prev) => ({ ...prev, ...p }), replace: true });
  const list = filterUpdates(updates, s);
  const has = s.q || s.cat || s.status || s.loc || s.sort;

  return (
    <>
      <PageHeader title={t("dash_title")} sub={t("dash_sub")}><DemoLabel className="mt-4" /></PageHeader>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border bg-card p-4 shadow-card">
          <label className="relative block">
            <span className="sr-only">{t("search_ph")}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={s.q ?? ""} onChange={(e) => set({ q: e.target.value || undefined })} placeholder={t("search_ph")} className={`${inputCls} pl-9`} />
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Sel label={t("locality")} value={s.loc} onChange={(v) => set({ loc: v })} opts={localities.map((l) => [l.id, l.name[lang]])} all={t("all_localities")} />
            <Sel label={t("status")} value={s.status} onChange={(v) => set({ status: v })} all={t("all")}
              opts={[["upcoming", t("st_upcoming")], ["info", t("st_info")], ["completed", t("st_completed")]]} />
            <label className="text-xs font-semibold text-muted-foreground">Sort
              <select value={s.sort ?? "new"} onChange={(e) => set({ sort: e.target.value === "old" ? "old" : undefined })} className={`${inputCls} mt-1`}>
                <option value="new">{t("sort_newest")}</option><option value="old">{t("sort_oldest")}</option>
              </select>
            </label>
            <button onClick={() => nav({ search: {}, replace: true })} disabled={!has}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted disabled:opacity-40">
              <RotateCcw className="h-4 w-4" /> {t("clear")}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t("category")}>
            <Chip on={!s.cat} onClick={() => set({ cat: undefined })}>{t("all")}</Chip>
            {categories.map((c) => { const I = c.icon; return (
              <Chip key={c.id} on={s.cat === c.id} onClick={() => set({ cat: s.cat === c.id ? undefined : c.id })}><I className="h-3.5 w-3.5" />{c.name[lang]}</Chip>
            ); })}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} {t("results")}</p>
        {list.length ? (
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((u, i) => <UpdateCard key={u.id} u={u} i={i} />)}</div>
        ) : (
          <div className="mt-3 rounded-2xl border border-dashed bg-card p-12 text-center">
            <SearchX className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-3 font-bold">{t("empty_title")}</h2>
            <p className="text-sm text-muted-foreground">{t("empty_desc")}</p>
            <button onClick={() => nav({ search: {} })} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{t("clear")}</button>
          </div>
        )}
      </div>
    </>
  );
}

function Sel({ label, value, onChange, opts, all }: { label: string; value?: string; onChange: (v?: string) => void; opts: string[][]; all: string }) {
  return (
    <label className="text-xs font-semibold text-muted-foreground">{label}
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value || undefined)} className={`${inputCls} mt-1 text-foreground`}>
        <option value="">{all}</option>
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${on ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-muted"}`}>
      {children}
    </button>
  );
}
