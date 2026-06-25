"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <p className="text-brand-green text-sm font-medium">
        Teşekkürler! Bültenimize kaydoldunuz.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-posta adresiniz"
        required
        className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-brand-blue transition-colors"
        aria-label="E-posta adresi"
      />
      <button
        type="submit"
        className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center hover:bg-brand-blue-light transition-colors shrink-0"
        aria-label="Abone ol"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
