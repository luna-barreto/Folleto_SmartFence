import { Eyebrow, MediaPlaceholder } from "./ui";
import platformScreenshot from "../assets/platform-screenshot.png";

const PARTS = [
  {
    label: "GPS",
    pos: "top-[8%] left-[50%] -translate-x-1/2",
    detail: "Obtiene la ubicación del animal y determina si está dentro o fuera de la cerca virtual.",
  },
  {
    label: "Microcontrolador",
    pos: "top-[20%] left-[4%]",
    detail: "Procesa la posición GPS y coordina todos los módulos del collar.",
  },
  {
    label: "Antena LoRa",
    pos: "top-[35%] left-[4%]",
    detail: "Transmite la información al gateway con largo alcance y bajo consumo.",
  },
  {
    label: "Panel solar",
    pos: "top-[35%] right-[4%]",
    detail: "Recarga las baterías de forma continua para extender la autonomía del collar.",
  },
  {
    label: "Batería",
    pos: "bottom-[35%] right-[4%]",
    detail: "2 baterías de 5 000 mAh recargables con apoyo del panel solar.",
  },
  {
    label: "Buzzer",
    pos: "bottom-[22%] left-[10%]",
    detail: "Emite un estímulo sonoro cuando se detecta que el animal salió del perímetro.",
  },
  {
    label: "Carcasa",
    pos: "bottom-[22%] right-[10%]",
    detail: "Protege los componentes electrónicos ante el ambiente ganadero.",
  },
];

export function Prototipo() {
  return (
    <section id="prototipo" className="bg-paper-0 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>El collar inteligente</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest-900 md:text-4xl">
            El prototipo físico, pieza por pieza.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
            El collar integra GPS, LoRa, microcontrolador, buzzer, batería y panel solar en un
            solo dispositivo. El GPS obtiene la ubicación del animal y el sistema determina si
            está dentro o fuera de la cerca virtual; la información se transmite mediante LoRa
            al gateway. Cuando se detecta una salida, el buzzer activa un estímulo de retorno.
            La energía proviene de 2 baterías de 5 000 mAh recargables con apoyo del panel
            solar para maximizar la autonomía en campo.
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative">
            <MediaPlaceholder
              label="Foto grande: collar real"
              ratio="aspect-square"
              className="border-forest-800/20"
            />
            {PARTS.map((p) => (
              <span
                key={p.label}
                className={`absolute ${p.pos} hidden lg:inline-flex items-center gap-1.5 rounded-full border border-forest-800/15 bg-paper-0 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-forest-800 shadow-sm`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
                {p.label}
              </span>
            ))}
          </div>

          <ul className="flex flex-col gap-4">
            {PARTS.map((p) => (
              <li key={p.label} className="flex items-start gap-3 border-b border-forest-800/8 pb-4 last:border-0">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal-400" />
                <div>
                  <p className="font-display text-sm font-semibold text-forest-900">
                    {p.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{p.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const PLATFORM_ITEMS = [
  { label: "Geocerca", detail: "Perímetro virtual dibujado sobre el mapa del predio." },
  { label: "Vacas dentro", detail: "Animales ubicados actualmente dentro del área." },
  { label: "Vacas fuera", detail: "Animales que salieron del perímetro configurado." },
  { label: "Ubicación", detail: "Posición GPS de cada collar sobre el mapa." },
  { label: "Alertas", detail: "Notificación inmediata ante una salida detectada." },
];

export function Platform() {
  return (
    <section className="bg-paper-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>La plataforma</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold text-forest-900 md:text-4xl">
              Cerca virtual, vista desde el mapa.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
              La interfaz muestra el perímetro configurado y la posición de
              cada animal en tiempo real, distinguiendo con claridad quién
              está dentro y quién ha salido.
            </p>

            <div className="mt-6 space-y-3">
              {PLATFORM_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pasture-600" />
                  <p className="text-sm text-ink-600">
                    <span className="font-mono font-medium text-forest-900">
                      {item.label}
                    </span>{" "}
                    — {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-forest-800/15 shadow-[0_12px_40px_rgba(11,36,22,0.14)]">
            <img
              src={platformScreenshot}
              alt="Captura real de la plataforma SmartFence mostrando la geocerca, las vacas dentro y fuera del perímetro, y el resumen del área"
              className="w-full h-auto"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
