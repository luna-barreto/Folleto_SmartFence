import { Eyebrow, StatusChip } from "./ui";

export function Problem() {
  return (
    <section className="border-t border-forest-800/8 bg-paper-0 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <Eyebrow>El problema</Eyebrow>
        <h2 className="mt-3 font-display text-2xl font-semibold text-forest-900 md:text-3xl">
          Supervisar ganado en terrenos extensos es difícil de hacer a tiempo.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
          En predios grandes, un productor no siempre puede saber dónde está
          cada animal ni si ha salido del área asignada. La supervisión manual
          consume tiempo, depende de cercas físicas costosas y suele detectar
          un problema solo después de que ya ocurrió.
        </p>
      </div>
    </section>
  );
}

const objectives = [
  "Monitorear la ubicación del ganado en tiempo real.",
  "Detectar salidas de la cerca virtual.",
  "Generar alertas para el cuidador.",
  "Reducir pérdidas y facilitar el manejo del ganado.",
  "Crear una solución tecnológica de bajo costo y escalable.",
];

export function WhatIs() {
  return (
    <section id="smartfence" className="bg-paper-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <Eyebrow>¿Qué es SmartFence?</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest-900 md:text-4xl">
            Una herramienta tecnológica para el ganadero moderno.
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          {/* Left column */}
          <div>
            <p className="text-sm leading-relaxed text-ink-600 md:text-base">
              SmartFence es una herramienta tecnológica creada para ayudar a
              los ganaderos a <strong className="font-medium text-forest-900">optimizar sus labores</strong>,
              reducir costos de infraestructura a largo plazo y disminuir el
              riesgo de pérdida de ganado.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
              La solución integra una <strong className="font-medium text-forest-900">aplicación de monitoreo</strong> y
              un <strong className="font-medium text-forest-900">collar inteligente</strong> que permite conocer la
              ubicación de cada animal mediante GPS, transmitir la información
              a través de LoRa y visualizarla en un mapa con geocercas virtuales.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
              El sistema permite identificar cuándo un animal sale del área
              establecida, generar alertas y facilitar al productor el
              seguimiento de su ganado sin tener que realizar constantemente
              recorridos físicos por toda la finca.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <StatusChip label="UBICACIÓN EN TIEMPO REAL" />
              <StatusChip label="GEOCERCA CONFIGURABLE" />
              <StatusChip label="ALERTA DE SALIDA" />
            </div>
          </div>

          {/* Right column */}
          <div className="rounded-3xl border border-forest-800/10 bg-forest-900 p-8 text-paper-0 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">
              Objetivos del sistema
            </p>
            <ul className="mt-5 space-y-3">
              {objectives.map((obj) => (
                <li key={obj} className="flex items-start gap-3 text-sm leading-snug text-paper-0/80">
                  <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full bg-signal-300" />
                  {obj}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-paper-0/10 pt-6 font-mono text-[11px] uppercase tracking-wide text-paper-0/60">
              <div>
                <p className="text-signal-300">GPS</p>
                <p className="mt-1">Ubicación</p>
              </div>
              <div>
                <p className="text-signal-300">LoRa</p>
                <p className="mt-1">Comunicación</p>
              </div>
              <div>
                <p className="text-signal-300">Web</p>
                <p className="mt-1">Plataforma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
