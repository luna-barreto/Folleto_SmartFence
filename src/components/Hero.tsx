import { MediaPlaceholder, StatusChip } from "./ui";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-forest-950 pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 md:flex-row md:gap-10">
        <div className="flex flex-1 flex-col items-start gap-6 text-left">
          <div className="flex items-center gap-2">
            <img src="/icono.png" alt="SmartFence icon" className="h-8 w-8 object-contain" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-signal-300">
              Proyecto SENA
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-paper-0 md:text-6xl">
            SmartFence
          </h1>
          <p className="max-w-md font-display text-xl text-signal-300 md:text-2xl">
            Tecnología que protege lo que importa.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-paper-100/70 md:text-base">
            Collar inteligente con GPS y comunicación LoRa que monitorea la
            ubicación del ganado y detecta, en tiempo real, cuándo un animal
            abandona el perímetro establecido.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#prueba"
              className="inline-flex items-center gap-2 rounded-full bg-signal-400 px-6 py-3 font-mono text-sm font-medium text-forest-950 transition-colors hover:bg-signal-300"
            >
              ▶ Ver demostración
            </a>
            <a
              href="#smartfence"
              className="inline-flex items-center gap-2 rounded-full border border-paper-0/20 px-6 py-3 font-mono text-sm text-paper-0/80 transition-colors hover:border-paper-0/40"
            >
              Conocer el sistema
            </a>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <StatusChip label="PROTOTIPO FÍSICO" />
            <StatusChip label="PROBADO CON ANIMAL REAL" />
          </div>
        </div>

        {/* Signature element: dashed geofence ring with pulsing signal, framing the collar photo */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute h-64 w-64 rounded-full border border-dashed border-signal-400/25 spin-slow md:h-80 md:w-80" />
          <div className="absolute h-64 w-64 rounded-full border border-signal-400/20 signal-pulse md:h-80 md:w-80" />
          <div className="relative w-64 md:w-80">
            <MediaPlaceholder
              label="Foto: collar sobre la vaca"
              ratio="aspect-square"
              className="border-signal-400/30 bg-forest-900/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
