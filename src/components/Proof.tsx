import { MediaPlaceholder, StatusChip } from "./ui";

const TIMELINE = [
  "Vaca con collar",
  "Movimiento",
  "Salida de la geocerca",
  "Detección",
  "Alerta",
  "Regreso",
];

export function Proof() {
  return (
    <section id="prueba" className="bg-forest-950 py-20 text-paper-0 md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-signal-400/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-300">
              Prueba real
            </span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold md:text-5xl">
            SmartFence en acción
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-paper-0/65 md:text-base">
            Observa cómo el collar permite monitorear la ubicación del animal
            y detectar cuando abandona el perímetro establecido. No es una
            simulación: es un prototipo físico probado con un animal real.
          </p>
        </div>

        {/* The video is the centerpiece, not a secondary element */}
        <div className="relative mt-10 md:mt-14">
          <MediaPlaceholder
            label="Video de la prueba con la vaca (reproductor aquí)"
            ratio="aspect-video"
            kind="video"
            className="border-signal-400/30 bg-forest-900/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          />

          {/* Labels illustrating on-screen callouts to add once the footage is in */}
          <span className="absolute left-4 top-4 hidden sm:block">
            <StatusChip label="GPS ACTIVO" />
          </span>
          <span className="absolute right-4 top-4 hidden sm:block">
            <StatusChip label="DENTRO DE LA GEOCERCA" />
          </span>
          <span className="absolute bottom-4 left-4 hidden sm:block">
            <StatusChip label="SALIDA DETECTADA" tone="alert" />
          </span>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TIMELINE.map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <span className="rounded-full border border-paper-0/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-paper-0/70">
                {t}
              </span>
              {i < TIMELINE.length - 1 && (
                <span className="text-paper-0/25">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
