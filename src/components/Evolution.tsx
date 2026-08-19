import { Eyebrow } from "./ui";

export function Connectivity() {
  return (
    <section className="bg-paper-0 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <Eyebrow>Futuro de la conectividad</Eyebrow>
        <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold text-forest-900 md:text-4xl">
          📡 Mayor cobertura
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-forest-800/10 bg-paper-50 p-5 font-mono text-xs uppercase tracking-wide text-forest-800">
          <span className="rounded-full bg-forest-800 px-3 py-1.5 text-paper-0">
            Gateway principal
          </span>
          <span className="text-ink-400">→</span>
          <span className="rounded-full border border-dashed border-amber-500/50 px-3 py-1.5 text-amber-500">
            zona sin cobertura
          </span>
          <span className="text-ink-400">→</span>
          <span className="rounded-full bg-pasture-600 px-3 py-1.5 text-paper-0">
            Gateway adicional
          </span>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-600">
          Si una finca supera la cobertura confiable del gateway, la
          expansión se determinará mediante pruebas reales de RSSI, SNR y
          pérdida de paquetes — no mediante una cifra genérica de distancia.
        </p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {[
            "Múltiples gateways.",
            "Almacenamiento temporal sin Internet.",
            "Conectividad 4G/LTE.",
            "Sincronización automática al recuperar conexión.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pasture-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const CURRENT_FLOW = ["GPS", "LoRa", "Gateway", "Geocerca", "Mapa + alertas"];
const FUTURE_FLOW = [
  "GPS + sensores",
  "LoRa / conectividad híbrida",
  "Gateway",
  "Historial de datos",
  "IA",
  "Predicción + salud + comportamiento",
];

export function SystemEvolution() {
  return (
    <section className="bg-paper-50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Evolución del sistema</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest-900 md:text-4xl">
            De la ubicación a la predicción.
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          <div className="rounded-2xl border border-pasture-600/25 bg-paper-0 p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-pasture-600">
              SmartFence actual
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {CURRENT_FLOW.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-forest-800/15 bg-paper-50 px-3 py-1.5 font-mono text-xs text-forest-800">
                    {step}
                  </span>
                  {i < CURRENT_FLOW.length - 1 && <span className="text-ink-400">↓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-forest-800/40">⬇️</div>

          <div className="rounded-2xl border border-dashed border-forest-800/25 bg-paper-0 p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-400">
              SmartFence futuro
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {FUTURE_FLOW.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-forest-800/15 bg-paper-50 px-3 py-1.5 font-mono text-xs text-forest-800">
                    {step}
                  </span>
                  {i < FUTURE_FLOW.length - 1 && <span className="text-ink-400">↓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-display text-base leading-relaxed text-forest-900 md:text-lg">
          "SmartFence comienza detectando dónde está el animal. Su siguiente
          evolución será comprender cómo se comporta, identificar cambios
          anormales y ayudar al productor a actuar antes de que ocurra una
          situación crítica."
        </p>
      </div>
    </section>
  );
}
