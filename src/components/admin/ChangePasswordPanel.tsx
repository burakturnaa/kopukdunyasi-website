"use client";

import { useEffect, useState } from "react";
import { AdminCard, AdminCardGrid, EditorPageHeader, TextField } from "./ui";

export function ChangePasswordPanel() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) setEmail(data.email);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Yeni şifreler eşleşmiyor");
      return;
    }

    if (newPassword.length < 8) {
      setError("Yeni şifre en az 8 karakter olmalıdır");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Şifre güncellenemedi");
        return;
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-8">
      <EditorPageHeader
        description="Yönetim paneli giriş şifrenizi güncelleyin"
        title="Şifre Değiştir"
      />

      <form onSubmit={handleSubmit}>
        <AdminCardGrid>
          <AdminCard description="Giriş şifrenizi güvenli şekilde güncelleyin" span="full" title="Hesap Bilgileri">
          {email && (
            <div>
              <span className="text-sm font-medium text-slate-700 mb-1.5 block">
                E-posta
              </span>
              <p className="text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200">
                {email}
              </p>
            </div>
          )}
          <TextField
            label="Mevcut Şifre"
            onChange={setCurrentPassword}
            type="password"
            value={currentPassword}
          />
          <TextField
            label="Yeni Şifre"
            onChange={setNewPassword}
            type="password"
            value={newPassword}
          />
          <TextField
            label="Yeni Şifre (Tekrar)"
            onChange={setConfirmPassword}
            type="password"
            value={confirmPassword}
          />
          <p className="text-xs text-slate-500">Yeni şifre en az 8 karakter olmalıdır.</p>

          {error && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">
              Şifreniz başarıyla güncellendi.
            </div>
          )}

          <button
            className="w-full sm:w-auto px-8 py-3 bg-secondary hover:bg-primary text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-secondary/25"
            disabled={saving}
            type="submit"
          >
            {saving ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
          </AdminCard>
        </AdminCardGrid>
      </form>
    </div>
  );
}
