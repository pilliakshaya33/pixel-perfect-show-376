import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, FlaskConical } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { categories, localities } from "@/lib/data";
import { PageHeader, inputCls, btnPrimary } from "@/components/site";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share Your Concern — Janamitra AI" },
      { name: "description", content: "Share a local concern in a simple form. Demonstration only — not officially filed." },
      { property: "og:title", content: "Share Your Concern — Janamitra AI" },
      { property: "og:description", content: "A simple, privacy-friendly concern form (demo)." },
    ],
  }),
  component: Feedback,
});

const empty = { cat: "", loc: "", desc: "", sugg: "" };

function Feedback() {
  const { t, lang } = useLang();
  const [f, setF] = useState(empty);
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.cat) er.cat = t("fb_req");
    if (!f.loc) er.loc = t("fb_req");
    if (!f.desc.trim()) er.desc = t("fb_req"); else if (f.desc.trim().length < 10) er.desc = t("fb_min");
    setErr(er);
    if (!Object.keys(er).length) setDone(true);
  };

  return (
    <>
      <PageHeader title={t("fb_title")} sub={t("fb_desc")} />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <p className="mb-5 flex gap-2 rounded-xl bg-warning-soft px-4 py-3 text-sm font-medium text-warning"><FlaskConical className="mt-0.5 h-4 w-4 shrink-0" />{t("fb_demo")}</p>
        {done ? (
          <div className="animate-rise rounded-3xl border bg-card p-10 text-center shadow-card" role="status">
            <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
            <h2 className="mt-4 text-xl font-bold">{t("fb_ok_t")}</h2>
            <p className="mt-2 text-muted-foreground">{t("fb_ok_d")}</p>
            <button onClick={() => { setF(empty); setDone(false); }} className="mt-6 rounded-xl border px-5 py-2.5 font-semibold hover:bg-muted">{t("fb_another")}</button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="space-y-5 rounded-3xl border bg-card p-6 shadow-card md:p-8">
            <Field id="cat" label={t("fb_cat")} err={err.cat} req>
              <select id="cat" value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} className={inputCls} aria-invalid={!!err.cat}>
                <option value="">{t("fb_choose")}</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name[lang]}</option>)}
              </select>
            </Field>
            <Field id="loc" label={t("fb_loc")} err={err.loc} req>
              <select id="loc" value={f.loc} onChange={(e) => setF({ ...f, loc: e.target.value })} className={inputCls} aria-invalid={!!err.loc}>
                <option value="">{t("fb_choose")}</option>
                {localities.map((l) => <option key={l.id} value={l.id}>{l.name[lang]}</option>)}
              </select>
            </Field>
            <Field id="desc" label={t("fb_desc_l")} err={err.desc} req>
              <textarea id="desc" rows={4} maxLength={500} value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} className={inputCls} aria-invalid={!!err.desc} />
            </Field>
            <Field id="sugg" label={t("fb_sugg")}>
              <textarea id="sugg" rows={3} maxLength={500} value={f.sugg} onChange={(e) => setF({ ...f, sugg: e.target.value })} className={inputCls} />
            </Field>
            <button type="submit" className={`${btnPrimary} w-full`}>{t("fb_submit")}</button>
          </form>
        )}
      </div>
    </>
  );
}

function Field({ id, label, err, req, children }: { id: string; label: string; err?: string; req?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}{req && <span className="text-destructive"> *</span>}</label>
      {children}
      {err && <p className="mt-1 text-sm text-destructive" role="alert">{err}</p>}
    </div>
  );
}
