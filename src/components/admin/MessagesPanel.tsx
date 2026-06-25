"use client";

import { useCallback, useEffect, useState } from "react";
import { EditorPageHeader } from "./ui";

type ContactMessage = {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function MessagesPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const filtered = messages.filter((m) => filter === "all" || !m.read);
  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const unreadCount = messages.filter((m) => !m.read).length;

  const markRead = async (id: string, read: boolean) => {
    const res = await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    if (res.ok) {
      const updated = await res.json();
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedId === id) setSelectedId(null);
    }
  };

  const openMessage = (message: ContactMessage) => {
    setSelectedId(message.id);
    if (!message.read) markRead(message.id, true);
  };

  return (
    <div className="pb-8">
      <EditorPageHeader
        description="İletişim formundan gelen mesajları görüntüleyin ve yönetin"
        title="Mesajlar"
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === "all"
              ? "bg-secondary text-white shadow-md shadow-secondary/20"
              : "bg-white text-slate-600 border border-slate-200 hover:border-secondary/30"
          }`}
          onClick={() => setFilter("all")}
          type="button"
        >
          Tümü ({messages.length})
        </button>
        <button
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === "unread"
              ? "bg-secondary text-white shadow-md shadow-secondary/20"
              : "bg-white text-slate-600 border border-slate-200 hover:border-secondary/30"
          }`}
          onClick={() => setFilter("unread")}
          type="button"
        >
          Okunmamış ({unreadCount})
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-12 text-center text-slate-500">
          Yükleniyor...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-12 text-center">
          <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
          </svg>
          <p className="text-slate-500">
            {filter === "unread" ? "Okunmamış mesaj yok." : "Henüz mesaj bulunmuyor."}
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {filtered.map((message) => (
              <button
                key={message.id}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedId === message.id
                    ? "bg-secondary/5 border-secondary/40 shadow-sm"
                    : message.read
                      ? "bg-white border-slate-200/80 hover:border-slate-300"
                      : "bg-white border-secondary/30 shadow-sm hover:border-secondary/50"
                }`}
                onClick={() => openMessage(message)}
                type="button"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className={`font-semibold text-sm truncate ${message.read ? "text-slate-700" : "text-slate-900"}`}>
                    {message.name}
                  </span>
                  {!message.read && (
                    <span className="shrink-0 w-2 h-2 rounded-full bg-secondary mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-slate-600 truncate mb-1">{message.subject}</p>
                <p className="text-xs text-slate-400">{formatDate(message.createdAt)}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,25,59,0.04)] overflow-hidden sticky top-4">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{selected.subject}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{formatDate(selected.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      className="text-xs font-medium text-slate-500 hover:text-secondary px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      onClick={() => markRead(selected.id, !selected.read)}
                      type="button"
                    >
                      {selected.read ? "Okunmadı işaretle" : "Okundu işaretle"}
                    </button>
                    <button
                      className="text-xs font-medium text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      onClick={() => deleteMessage(selected.id)}
                      type="button"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Ad Soyad</p>
                      <p className="text-sm text-slate-800">{selected.name}</p>
                    </div>
                    {selected.company && (
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Firma</p>
                        <p className="text-sm text-slate-800">{selected.company}</p>
                      </div>
                    )}
                    {selected.phone && (
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Telefon</p>
                        <a className="text-sm text-secondary hover:underline" href={`tel:${selected.phone.replace(/\s/g, "")}`}>
                          {selected.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Mesaj</p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-400 h-full min-h-[300px] flex items-center justify-center">
                Detayları görmek için bir mesaj seçin
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
