import { Eyebrow } from "./ui";

const RESULTS = [
  { label: "GPS", detail: "Ubicación detectada" },
  { label: "LoRa", detail: "Comunicación establecida" },
  { label: "Geocerca", detail: "Perímetro configurado" },
  { label: "Alerta", detail: "Salida detectada" },
  { label: "Plataforma", detail: "Información visualizada" },
];

export function Results() {
  return (
    <section id="resultados" className="bg-paper-0 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>Resultados</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest-900 md:text-4xl">
            Lo que la prueba confirmó.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {RESULTS.map((r) => (
            <div
              key={r.label}
              className="rounded-2xl border border-forest-800/10 bg-paper-50 p-5"
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-signal-400" />
              <p className="mt-3 font-display text-base font-semibold text-forest-900">
                {r.label}
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-600">
                {r.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TECH = ["ESP32-S3", "GPS", "LoRa", "MQTT", "Redis", "Geocerca", "Plataforma web"];

export function Tech() {
  return (
    <section className="bg-paper-50 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Eyebrow>Tecnologías</Eyebrow>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {TECH.map((t) => (
            <span
              key={t}
              className="rounded-full border border-forest-800/15 bg-paper-0 px-4 py-2 font-mono text-xs text-forest-800"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
