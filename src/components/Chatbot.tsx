"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

type Msg = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [offline, setOffline] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setStreaming(true);
    setOffline(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        setOffline(true);
        setStreaming(false);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setOffline(true);
    } finally {
      setStreaming(false);
    }
  }

  const started = messages.length > 0;

  return (
    <section id="chat" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mb-12 max-w-2xl">
        <p data-reveal className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-green">
          {t("label")}
        </p>
        <h2 data-reveal className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]">
          {t("title")}
        </h2>
        <p data-reveal className="mt-4 text-lg text-ink-soft">
          {t("sub")}
        </p>
      </Reveal>

      <Reveal>
        <div
          data-reveal
          className="mx-auto flex h-[30rem] max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-canvas"
        >
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
            {!started && (
              <Bubble role="assistant">{t("greeting")}</Bubble>
            )}
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content || (streaming && i === messages.length - 1 ? <Thinking /> : "")}
              </Bubble>
            ))}
            {streaming && messages[messages.length - 1]?.role === "user" && (
              <Bubble role="assistant">
                <Thinking />
              </Bubble>
            )}
            {offline && <p className="text-sm text-ink-faint">{t("error")}</p>}
          </div>

          {!started && (
            <div className="flex flex-wrap gap-2 px-6 pb-3">
              {(["one", "two", "three"] as const).map((k) => (
                <button
                  key={k}
                  data-cursor="hover"
                  onClick={() => send(t(`suggestions.${k}`))}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {t(`suggestions.${k}`)}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-3 border-t border-line p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              aria-label={t("placeholder")}
              className="flex-1 bg-transparent px-3 py-2 text-[15px] outline-none placeholder:text-ink-faint"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              data-cursor="hover"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-opacity disabled:opacity-30"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
          isUser ? "bg-ink text-canvas" : "bg-canvas-deep text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/** The Living Flow as the assistant's thinking state — green pulses along a line. */
function Thinking() {
  return (
    <span className="inline-flex items-center gap-2 py-1" aria-label="Thinking">
      <span className="relative h-px w-16 overflow-hidden bg-line">
        <span
          className="absolute top-1/2 h-[3px] w-4 -translate-y-1/2 rounded-full bg-green"
          style={{ animation: "flowpulse 1.3s linear infinite" }}
        />
      </span>
      <style>{`@keyframes flowpulse{0%{left:-16px}100%{left:100%}}`}</style>
    </span>
  );
}
