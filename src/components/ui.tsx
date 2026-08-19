import type { ReactNode } from "react";

export function StatusChip({
  label,
  tone = "active",
}: {
  label: string;
  tone?: "active" | "alert" | "idle";
}) {
  const dot =
    tone === "active" ? "bg-signal-400" : tone === "alert" ? "bg-amber-500" : "bg-ink-400";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-forest-800/15 bg-paper-0 px-3 py-1 font-mono text-[11px] tracking-wide text-forest-800">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-pasture-600">
      {children}
    </div>
  );
}

export function MediaPlaceholder({
  label,
  ratio = "aspect-[4/3]",
  kind = "image",
  className = "",
}: {
  label: string;
  ratio?: string;
  kind?: "image" | "video";
  className?: string;
}) {
  return (
    <div
      className={`relative flex ${ratio} w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-forest-800/25 bg-fence-grid bg-[length:22px_22px] bg-paper-0 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-800/8">
          {kind === "video" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-forest-800">
              <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-forest-800">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path d="M21 15l-5-5-9 9" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-400">
          {label}
        </p>
      </div>
    </div>
  );
}
