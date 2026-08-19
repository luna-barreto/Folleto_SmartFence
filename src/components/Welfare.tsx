import { Eyebrow } from "./ui";

const CURRENT = [
  "GPS para ubicación.",
  "LoRa para comunicación.",
  "Geocerca virtual.",
  "Buzzer como alerta.",
  "Detección de salida.",
];

export function Welfare() {
  return (
    <section className="bg-paper-0 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="max-w-2xl">
          <Eyebrow>Adaptación y bienestar animal</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest-900 md:text-4xl">
            Lo que ya funciona, y lo que aún es una línea de investigación.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
            El tiempo de adaptación del ganado a un sistema de cerca virtual
            depende del método, el animal, el entrenamiento y las condiciones
            del predio: no existe una cifra universal. Por eso separamos con
            claridad lo que SmartFence ya implementa de lo que se propone
            explorar en el futuro.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-pasture-600/25 bg-paper-50 p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-pasture-600">
              SmartFence actualmente
            </p>
            <ul className="mt-4 space-y-2.5">
              {CURRENT.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pasture-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-dashed border-forest-800/25 bg-paper-0 p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-400">
              Evolución propuesta
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              La estimulación eléctrica o el entrenamiento mediante estímulos
              acústicos son líneas futuras de investigación, no
              características ya validadas del prototipo actual. Su
              incorporación estaría sujeta a protocolos de bienestar y
              adaptación individual del animal.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-400">
              No se establece un voltaje concreto como "seguro": el riesgo no
              depende solo del voltaje, sino también de la corriente, la
              duración del pulso, la forma de onda, el contacto, la
              resistencia de la piel y la configuración del dispositivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
