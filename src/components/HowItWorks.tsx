import { Eyebrow } from "./ui";

const STEPS = [
  { n: "01", label: "Collar", detail: "El animal lleva el dispositivo en el cuello." },
  { n: "02", label: "GPS", detail: "Calcula la posición geográfica del animal." },
  { n: "03", label: "LoRa", detail: "Transmite la posición a larga distancia y bajo consumo." },
  { n: "04", label: "Gateway", detail: "Recibe la señal y la envía a la plataforma." },
  { n: "05", label: "Plataforma", detail: "Ubica al animal sobre la geocerca configurada." },
  { n: "06", label: "Alerta", detail: "Notifica si el animal sale del perímetro." },
];

export function HowItWorks() {
  return (
    <section id="funcionamiento" className="bg-forest-950 py-16 text-paper-0 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-xl">
          <Eyebrow>
            <span className="text-signal-300">¿Cómo funciona?</span>
          </Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold md:text-4xl">
            La ruta de la señal, del collar a la alerta.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative">
              <div className="rounded-2xl border border-paper-0/10 bg-paper-0/5 p-4 h-full">
                <p className="font-mono text-[11px] text-signal-300">{step.n}</p>
                <p className="mt-3 font-display text-base font-semibold">{step.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-paper-0/55">
                  {step.detail}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden md:flex absolute top-1/2 -right-2.5 -translate-y-1/2 h-4 w-4 items-center justify-center text-signal-400/60 z-10">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
