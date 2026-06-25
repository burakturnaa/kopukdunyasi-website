"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isManagedUploadUrl } from "@/lib/upload-utils";

export function EditorPageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 pb-6 border-b border-slate-200/80">
      <p className="text-xs font-semibold uppercase tracking-widest text-secondary/80 mb-2">
        İçerik Düzenleme
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        {title}
      </h1>
      <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-2xl">
        {description}
      </p>
    </div>
  );
}

export function AdminCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-start">
      {children}
    </div>
  );
}

export function AdminCard({
  title,
  description,
  children,
  span = "default",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  span?: "default" | "full";
}) {
  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,25,59,0.04)] hover:shadow-[0_8px_30px_rgba(0,25,59,0.08)] hover:border-slate-300/70 transition-all duration-300 overflow-hidden ${
        span === "full" ? "md:col-span-2" : ""
      }`}
    >
      <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/15 transition-colors">
            <div className="w-2 h-2 rounded-full bg-secondary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 text-[15px]">{title}</h3>
            {description && (
              <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-6 space-y-5">{children}</div>
    </div>
  );
}

export function FieldGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>
  );
}

export function FieldFull({ children }: { children: React.ReactNode }) {
  return <div className="sm:col-span-2">{children}</div>;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm shadow-slate-100/50 focus:outline-none focus:ring-2 focus:ring-secondary/25 focus:border-secondary transition-all";

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-sm font-medium text-slate-700 mb-1.5 block">
        {label}
      </span>
      <input
        className={inputClass}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-sm font-medium text-slate-700 mb-1.5 block">
        {label}
      </span>
      <textarea
        className={`${inputClass} resize-y min-h-[88px]`}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        value={value}
      />
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  previewFit = "cover",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  previewFit?: "cover" | "contain";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (value && isManagedUploadUrl(value)) {
        formData.append("replaceUrl", value);
      }
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) handleUpload(file);
  };

  return (
    <div>
      <span className="text-sm font-medium text-slate-700 mb-1.5 block">
        {label}
      </span>
      <div className="flex flex-col sm:flex-row gap-4">
        {value ? (
          <div
            className={`relative w-full sm:w-44 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 group/img ${
              previewFit === "contain" ? "h-32 p-3" : "h-28"
            }`}
          >
            <Image
              alt="Önizleme"
              className={previewFit === "contain" ? "object-contain" : "object-cover"}
              fill
              src={value}
              unoptimized={value.startsWith("/uploads")}
            />
            <button
              className="absolute inset-0 bg-primary/0 group-hover/img:bg-primary/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all"
              onClick={() => onChange("")}
              type="button"
            >
              <span className="text-white text-xs font-medium bg-red-500/90 px-3 py-1.5 rounded-lg">
                Kaldır
              </span>
            </button>
          </div>
        ) : (
          <div
            className={`w-full rounded-xl border-2 border-dashed flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
              previewFit === "contain" ? "sm:w-44 h-32" : "sm:w-40 h-28"
            } ${
              dragOver
                ? "border-secondary bg-secondary/5"
                : "border-slate-200 bg-slate-50/80 hover:border-secondary/40 hover:bg-secondary/5"
            }`}
            onClick={() => inputRef.current?.click()}
            onDragLeave={() => setDragOver(false)}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDrop={onDrop}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <div className="text-center px-4">
              <svg
                className="w-7 h-7 text-slate-300 mx-auto mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
              <p className="text-xs text-slate-400">Sürükle veya tıkla</p>
            </div>
          </div>
        )}
        <div className="flex-1 space-y-2.5 min-w-0">
          <input
            className={inputClass}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Görsel URL'si"
            value={value}
          />
          <input
            ref={inputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
              e.target.value = "";
            }}
            type="file"
          />
          <button
            className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-secondary/30 disabled:opacity-50 font-medium text-slate-700 transition-all"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            {uploading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    fill="currentColor"
                  />
                </svg>
                Yükleniyor...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
                Dosya Yükle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function RepeaterCard({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 sm:p-5 border border-slate-200/70 rounded-xl bg-gradient-to-br from-slate-50/80 to-white space-y-4 shadow-sm">
      <div className="flex justify-between items-center gap-3">
        <span className="font-semibold text-sm text-slate-800">{title}</span>
        {onRemove && (
          <button
            className="text-xs font-medium text-red-500 hover:text-red-600 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors shrink-0"
            onClick={onRemove}
            type="button"
          >
            Sil
          </button>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex items-center gap-2 text-sm text-secondary font-semibold hover:text-primary px-4 py-2.5 rounded-xl border border-dashed border-secondary/30 hover:border-secondary/50 hover:bg-secondary/5 transition-all w-full sm:w-auto justify-center"
      onClick={onClick}
      type="button"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 4v16m8-8H4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
      {label}
    </button>
  );
}

export function SaveBar({
  onSave,
  saving,
  saved,
}: {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}) {
  return (
    <div className="sticky bottom-4 z-20 mt-8 md:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_8px_32px_rgba(0,25,59,0.12)]">
        <div className="flex items-center gap-2.5">
          {saved ? (
            <>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                  />
                </svg>
              </div>
              <span className="text-sm text-emerald-700 font-medium">
                Değişiklikler kaydedildi
              </span>
            </>
          ) : (
            <>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <span className="text-sm text-slate-600">
                Kaydedilmemiş değişiklikler var
              </span>
            </>
          )}
        </div>
        <button
          className="w-full sm:w-auto px-8 py-3 bg-secondary hover:bg-primary text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-secondary/25 hover:shadow-primary/25"
          disabled={saving}
          onClick={onSave}
          type="button"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
}

export function useContentEditor<T>(initial: T, sectionKey: string) {
  const router = useRouter();
  const [data, setData] = useState<T>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const initialSnapshot = JSON.stringify(initial);

  useEffect(() => {
    setData(initial);
    setSaved(false);
  }, [sectionKey, initialSnapshot, initial]);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: sectionKey, data }),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return { data, setData, save, saving, saved };
}
