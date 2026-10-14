import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, User, FlaskConical } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { answer, examples } from "@/lib/assistant";
import { PageHeader, Logo, inputCls } from "@/components/site";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Ask Janamitra AI — Demo assistant" },
      { name: "description", content: "Ask questions about local public information in simple English or Telugu (demo assistant)." },
      { property: "og:title", content: "Ask Janamitra AI" },
      { property: "og:description", content: "Understand local public information in simple language." },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user" | "bot"; text: string };

function Assistant() {
  const { t, lang } = useLang();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [msgs, typing]);

  const ask = (q: string) => {
    if (!q.trim() || typing) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => { setMsgs((m) => [...m, { role: "bot", text: answer(q, lang) }]); setTyping(false); }, 600);
  };

  return (
    <>
      <PageHeader title={t("asst_title")} sub={t("asst_desc")}>
        <p className="mt-4 inline-flex items-start gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground"><FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-warning" />{t("asst_demo")}</p>
      </PageHeader>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <div className="flex h-[560px] flex-col rounded-3xl border bg-card shadow-card">
          <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
            <Bubble m={{ role: "bot", text: t("asst_hello") }} />
            {msgs.map((m, i) => <Bubble key={i} m={m} />)}
            {typing && <div className="flex gap-1 pl-12" aria-label="typing"><Dot /><Dot d={150} /><Dot d={300} /></div>}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t p-3">
            <label className="flex-1"><span className="sr-only">{t("asst_ph")}</span>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("asst_ph")} className={inputCls} /></label>
            <button type="submit" disabled={!input.trim() || typing} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground disabled:opacity-50">
              <Send className="h-4 w-4" /><span className="hidden sm:inline">{t("send")}</span>
            </button>
          </form>
        </div>
        <aside>
          <h2 className="flex items-center gap-2 font-bold"><Sparkles className="h-4 w-4 text-primary" />{t("try_asking")}</h2>
          <div className="mt-3 flex flex-col gap-2">
            {examples[lang].map((e) => (
              <button key={e} onClick={() => ask(e)} className="rounded-xl border bg-card px-4 py-3 text-left text-sm shadow-card transition hover:border-primary hover:text-primary">{e}</button>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

function Bubble({ m }: { m: Msg }) {
  const bot = m.role === "bot";
  return (
    <div className={`animate-rise flex gap-3 ${bot ? "" : "flex-row-reverse"}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${bot ? "bg-primary-soft" : "bg-muted"}`}>
        {bot ? <Logo className="h-6 w-6" /> : <User className="h-4 w-4" />}
      </span>
      <div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${bot ? "rounded-tl-sm bg-muted" : "rounded-tr-sm bg-primary text-primary-foreground"}`}>{m.text}</div>
    </div>
  );
}
const Dot = ({ d = 0 }: { d?: number }) => <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d}ms` }} />;
