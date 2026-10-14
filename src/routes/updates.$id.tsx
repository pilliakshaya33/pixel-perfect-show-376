import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { catById, formatDate, locById, updates } from "@/lib/data";
import { DemoLabel, StatusBadge, SourceBadge } from "@/components/site";

export const Route = createFileRoute("/updates/$id")({
  loader: ({ params }) => {
    const u = updates.find((x) => x.id === params.id);
    if (!u) throw notFound();
    return u;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title.en} — Janamitra AI (demo)` },
          { name: "description", content: loaderData.summary.en },
          { property: "og:title", content: loaderData.title.en },
          { property: "og:description", content: loaderData.summary.en },
          { name: "robots", content: "noindex" },
        ]
      : [{ title: "Update unavailable — Janamitra AI" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Update not found</h1>
      <Link to="/updates" className="mt-4 inline-block font-semibold text-primary">← Back</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const u = Route.useLoaderData();
  const { t, lang } = useLang();
  const c = catById(u.category);
  const I = c.icon;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/updates" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" />{t("back")}</Link>
      <article className="animate-rise mt-5 rounded-3xl border bg-card p-6 shadow-card md:p-10">
        <DemoLabel />
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary"><I className="h-4 w-4" />{c.name[lang]}</span>
          <StatusBadge s={u.status} />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">{u.title[lang]}</h1>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{locById(u.locality).name[lang]}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{t("published")}: {formatDate(u.date, lang)}</span>
        </div>
        <p className="mt-6 leading-relaxed">{u.body[lang]}</p>
        <div className="mt-8 rounded-2xl bg-muted p-5">
          <SourceBadge s={u.source} />
          <p className="mt-2 text-sm"><span className="font-semibold">{t("src_where")}:</span> {c.agency[lang]}</p>
          {u.officialUrl ? (
            <a href={u.officialUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-semibold text-primary underline">Official source ↗</a>
          ) : (
            <p className="mt-3 flex gap-2 text-sm text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0" />{t("no_official_link")}</p>
          )}
        </div>
        <Link to="/updates" className="mt-8 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">{t("back")}</Link>
      </article>
    </div>
  );
}
