import { Brain, HeartPulse, Volume2 } from "lucide-react";
import { Eyebrow } from "./ui";

const AI_POINTS = [
  "Cambios inusuales de movimiento.",
  "Inactividad prolongada.",
  "Cambios en los recorridos habituales.",
  "Comportamientos diferentes al patrón normal.",
  "Posibles situaciones de enfermedad o estrés.",
];

const HEALTH_POINTS = ["Temperatura.", "Actividad.", "Movimiento.", "Otros indicadores según los sensores disponibles."];

export function Future() {
  return (
    <section className="bg-forest-950 py-16 text-paper-0 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="max-w-2xl">
          <Eyebrow>
            <span className="text-signal-300">Futuro de SmartFence</span>
          </Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold md:text-4xl">
            De la ubicación al comportamiento.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-paper-0/10 bg-paper-0/5 p-6">
            <Brain size={20} className="text-signal-400" />
            <p className="mt-3 font-display text-base font-semibold">
              Inteligencia artificial
            </p>
            <p className="mt-2 text-xs leading-relaxed text-paper-0/60">
              La plataforma podrá usar el historial de posiciones y actividad
              para identificar patrones anormales:
            </p>
            <ul className="mt-3 space-y-1.5">
              {AI_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-paper-0/55">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-signal-400" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-paper-0/45">
              Primero obtenemos datos confiables; después los convertimos en
              inteligencia.
            </p>
          </div>

          <div className="rounded-2xl border border-paper-0/10 bg-paper-0/5 p-6">
            <HeartPulse size={20} className="text-signal-400" />
            <p className="mt-3 font-display text-base font-semibold">
              Monitoreo de salud
            </p>
            <p className="mt-2 text-xs leading-relaxed text-paper-0/60">
              En futuras versiones, el collar podría incorporar sensores
              adicionales para recopilar variables fisiológicas:
            </p>
            <ul className="mt-3 space-y-1.5">
              {HEALTH_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-paper-0/55">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-signal-400" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-paper-0/45">
              La IA podría combinar estos datos con la ubicación y el
              comportamiento histórico para generar alertas preventivas.
            </p>
          </div>

          <div className="rounded-2xl border border-paper-0/10 bg-paper-0/5 p-6">
            <Volume2 size={20} className="text-signal-400" />
            <p className="mt-3 font-display text-base font-semibold">
              Entrenamiento mediante estímulos
            </p>
            <p className="mt-2 text-xs leading-relaxed text-paper-0/60">
              La investigación sobre cercas virtuales muestra que el ganado
              puede aprender a asociar una señal acústica con el límite y
              modificar su comportamiento para evitar un estímulo aversivo.
              Una revisión reciente reporta adaptación generalmente en pocos
              días, con variabilidad entre animales.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-paper-0/60">
              Un estudio de 2026 evaluó 10 días de entrenamiento y no
              encontró evidencia de aumento de estrés bajo las condiciones y
              salvaguardas de ese sistema específico.
            </p>
            <div className="mt-4 rounded-xl border border-dashed border-paper-0/15 p-3">
              <p className="font-mono text-[12px] uppercase tracking-wide text-signal-300">
                Futuro
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-paper-0/70">
                Entrenamiento inteligente del ganado mediante señales
                acústicas y otros estímulos, acompañado de protocolos de
                bienestar y adaptación individual.
              </p>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-paper-0/40">
              No se define aún un voltaje específico como "seguro": los
              sistemas comerciales y experimentales usan distintas energías y
              configuraciones. Un estudio de 2026 evaluó 0,1–0,45 J, mientras
              otras revisiones reportan rangos diferentes entre sistemas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
