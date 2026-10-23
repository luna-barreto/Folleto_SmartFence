import { useState, useEffect, useCallback, useRef } from "react";
import { Brain, HeartPulse, Cpu, Target, MapPin, Bell, Wifi, Radio, Volume2, Monitor } from "lucide-react";
import platformScreenshot from "./assets/platform-screenshot.png";

// ─── data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", label: "Collar",     detail: "El animal lleva el dispositivo." },
  { n: "02", label: "GPS",        detail: "Calcula la posición del animal." },
  { n: "03", label: "LoRa",       detail: "Transmite a larga distancia." },
  { n: "04", label: "Gateway",    detail: "Recibe y reenvía la señal." },
  { n: "05", label: "Plataforma", detail: "Ubica al animal en el mapa." },
  { n: "06", label: "Alerta",     detail: "Notifica la salida del perímetro." },
];


const PLATFORM_ITEMS = [
  { label: "Geocerca",      detail: "Perímetro virtual sobre el mapa." },
  { label: "Vacas dentro",  detail: "Animales actualmente dentro del área." },
  { label: "Vacas fuera",   detail: "Animales que salieron del perímetro." },
  { label: "Ubicación GPS", detail: "Posición de cada collar en tiempo real." },
  { label: "Alertas",       detail: "Notificación inmediata ante salida." },
];


const FUTURE = [
  {
    Icon: Brain,
    title: "IA y comportamiento animal",
    items: [
      "Analizar patrones de movimiento.",
      "Detectar comportamientos anormales.",
      "Predecir posibles escapes.",
      "Identificar cambios en actividad.",
    ],
  },
  {
    Icon: HeartPulse,
    title: "Salud",
    items: [
      "Integrar sensores para temperatura y actividad.",
      "Detectar posibles cambios de comportamiento.",
      "Generar alertas preventivas.",
    ],
  },
  {
    Icon: Cpu,
    title: "Sistema",
    items: [
      "Mejorar autonomía energética.",
      "Optimizar el alcance de comunicación.",
      "Incorporar más sensores.",
      "Escalar el sistema a más animales y fincas.",
    ],
  },
];

const PRES_NAMES = ["Portada","Video","¿Qué es?","Cómo funciona","Prototipo","Plataforma","Resultados","Futuro","Cierre"];

// ─── helpers ───────────────────────────────────────────────────────────────────

function Tag({ light = false, children }: { light?: boolean; children: React.ReactNode }) {
  return (
    <p className={`font-mono text-[10px] uppercase tracking-[0.22em] sm:text-[11px] ${light ? "text-signal-300" : "text-pasture-500"}`}>
      {children}
    </p>
  );
}


// Full-viewport slide shell: overflow hidden, flex column, safe bottom padding for nav dots
function Shell({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden ${className}`}
      style={style}
    >
      {/* inner scroll area — allows scrolling ONLY if content genuinely overflows on very small devices */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 pb-[52px] pt-4 sm:px-8 sm:pt-6 md:px-12 lg:px-16">
        <div className="my-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── typewriter hook ───────────────────────────────────────────────────────────

function useTypewriter(text: string, speed: number, startDelay: number, isActive = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) { setCount(0); return; }
    setCount(0);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [isActive, text]);
  return { text: text.slice(0, count), done: count >= text.length };
}

// animated h2 title — resets each time the slide becomes active
function AnimatedTitle({
  text, isActive, className = "", style = {}, light = false,
}: {
  text: string; isActive: boolean; className?: string; style?: React.CSSProperties; light?: boolean;
}) {
  const { text: shown, done } = useTypewriter(text, 42, 180, isActive);
  return (
    <h2 className={className} style={style}>
      {shown}
      {!done && (
        <span className={`cursor-blink ${light ? "text-signal-300" : "text-pasture-500"}`}>|</span>
      )}
    </h2>
  );
}

// ─── slide 1 · Hero ────────────────────────────────────────────────────────────

function S1_Hero({ isActive = true }: { isActive?: boolean }) {
  const TITLE   = "SmartFence";
  const TAGLINE = "Protección inteligente para tu ganado.";

  const title   = useTypewriter(TITLE,   75, 400,                           isActive);
  const tagline = useTypewriter(TAGLINE, 38, 400 + TITLE.length * 75 + 350, isActive);

  const showContent   = tagline.done;
  const smartPart     = title.text.slice(0, 5);
  const fencePart     = title.text.slice(5);
  const titleCursor   = !title.done;
  const taglineCursor = title.done && !tagline.done;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden px-4 pb-[52px] pt-4 sm:px-8 sm:pt-6 md:px-12 lg:px-16"
      style={{ background: "#0B2416" }}>

      {/* cow — full bleed background */}
      <img
        src="/portada-nueva.jpg"
        alt="Vaca con collar SmartFence"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* dark green overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,36,22,0.92) 0%, rgba(11,36,22,0.75) 55%, rgba(11,36,22,0.35) 100%)" }} />
      {/* grid pattern */}
      <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage:"linear-gradient(#7ED957 1px,transparent 1px),linear-gradient(90deg,#7ED957 1px,transparent 1px)", backgroundSize:"36px 36px" }} />

      {/* Falling leaves */}
      {[
        { left: "62%",  delay: "0s",    dur: "7s",  size: 18, rotate: 15  },
        { left: "75%",  delay: "2.5s",  dur: "9s",  size: 13, rotate: -20 },
        { left: "83%",  delay: "1.2s",  dur: "6s",  size: 22, rotate: 30  },
        { left: "70%",  delay: "4s",    dur: "8s",  size: 15, rotate: -10 },
        { left: "88%",  delay: "3.3s",  dur: "10s", size: 11, rotate: 45  },
        { left: "57%",  delay: "5.8s",  dur: "7.5s",size: 16, rotate: -35 },
      ].map((leaf, i) => (
        <svg key={i} className="leaf-fall absolute top-0 pointer-events-none"
          style={{ left: leaf.left, width: leaf.size, height: leaf.size, animationDuration: leaf.dur, animationDelay: leaf.delay, opacity: 0 }}
          viewBox="0 0 24 24" fill="none">
          <path d="M12 2C12 2 4 8 4 14a8 8 0 0016 0C20 8 12 2 12 2z" fill="#7ED957" opacity="0.7"
            transform={`rotate(${leaf.rotate} 12 12)`} />
          <line x1="12" y1="22" x2="12" y2="10" stroke="#7ED957" strokeWidth="1" opacity="0.5" />
        </svg>
      ))}

      {/* Logo row — top */}
      <div className="relative z-10 flex items-center gap-2.5">
        <img src="/icono.png" alt="SmartFence" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
        <span className="font-display text-base font-semibold text-paper-0 sm:text-lg">SmartFence</span>
      </div>

      {/* Main content — centered vertically */}
      <div className="relative z-10 my-auto max-w-xl ml-2 sm:ml-4">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 sm:mb-4 sm:px-4 sm:py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M12 2C12 2 4 8 4 14a8 8 0 0016 0C20 8 12 2 12 2z" fill="#7ED957"/>
            <line x1="12" y1="22" x2="12" y2="10" stroke="#7ED957" strokeWidth="1.5"/>
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-forest-800 sm:text-[11px]">Proyecto · 2026</span>
        </div>

        {/* animated title */}
        <h1 className="font-display font-semibold leading-none" style={{ fontSize:"clamp(2.2rem,10vw,5rem)", minHeight:"1.1em" }}>
          <span className="text-paper-0">{smartPart}</span>
          <span className="text-signal-400">{fencePart}</span>
          {titleCursor && <span className="cursor-blink text-signal-400">|</span>}
        </h1>

        {/* animated tagline */}
        <p className="mt-2 font-display text-paper-0/80 sm:mt-3" style={{ fontSize:"clamp(0.85rem,2.5vw,1.25rem)", minHeight:"1.5em" }}>
          {tagline.text}
          {taglineCursor && <span className="cursor-blink text-signal-400/80">|</span>}
        </p>

        {/* fade-in description */}
        <p className="mt-2 max-w-sm text-[11px] leading-relaxed text-paper-0/50 sm:text-sm sm:mt-3"
          style={{ opacity: showContent ? undefined : 0, animation: showContent ? "fade-up 0.7s ease forwards" : "none" }}>
          Sistema inteligente de monitoreo ganadero mediante GPS, LoRa y geocercas
          virtuales, diseñado para conocer la ubicación del ganado en tiempo real
          y generar alertas cuando abandona el perímetro establecido.
        </p>

        {/* fade-in chips con iconos */}
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2"
          style={{ opacity: showContent ? undefined : 0, animation: showContent ? "fade-up 0.8s 0.2s ease forwards" : "none" }}>
          {([
            { Icon: MapPin, label: "Monitoreo en tiempo real" },
            { Icon: Bell,   label: "Alertas inteligentes"     },
            { Icon: Wifi,   label: "Tecnología IoT"           },
          ] as const).map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-signal-400/35 bg-signal-400/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-signal-300 sm:px-3 sm:py-1.5 sm:text-[10px]">
              <Icon size={10} className="shrink-0 text-signal-400" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── slide 3 · Qué es ──────────────────────────────────────────────────────────

const OBJECTIVES = [
  "Monitorear la ubicación del ganado en tiempo real.",
  "Detectar salidas de la cerca virtual.",
  "Generar alertas para el cuidador.",
  "Reducir pérdidas y facilitar el manejo del ganado.",
  "Crear una solución tecnológica de bajo costo y escalable.",
];

function S3_QueEs({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 md:px-6">

        {/* Header */}
        <Tag>¿Qué es SmartFence?</Tag>
        <AnimatedTitle isActive={isActive} text="Una herramienta tecnológica para el ganadero." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.5vw,2.2rem)" }} />

        {/* Paragraphs */}
        <p className="mt-2 text-[11px] leading-relaxed text-ink-600 sm:text-sm">
          SmartFence es una herramienta tecnológica creada para ayudar a los ganaderos a optimizar sus labores, reducir costos de infraestructura a largo plazo y disminuir el riesgo de pérdida de ganado.
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-600 sm:text-sm">
          La solución integra una aplicación de monitoreo y un collar inteligente que permite conocer la ubicación de cada animal mediante GPS, transmitir la información a través de LoRa y visualizarla en un mapa con geocercas virtuales.
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-600 sm:text-sm">
          El sistema permite identificar cuándo un animal sale del área establecida, generar alertas y facilitar al productor el seguimiento de su ganado sin tener que realizar constantemente recorridos físicos por toda la finca.
        </p>

        {/* Dark objectives card */}
        <div className="mt-3 rounded-2xl bg-forest-900 p-4 text-paper-0 sm:mt-4 sm:p-5">

          {/* Objetivos header */}
          <div className="mb-3 flex items-center gap-2">
            <Target size={16} className="text-signal-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-400 sm:text-[11px]">Objetivos</span>
          </div>

          {/* List */}
          <ul className="space-y-2">
            {OBJECTIVES.map(obj => (
              <li key={obj} className="flex items-start gap-2.5 text-[11px] leading-snug text-paper-0/85 sm:text-xs">
                <span className="mt-[3px] h-2 w-2 shrink-0 rounded-full bg-signal-400" />
                {obj}
              </li>
            ))}
          </ul>

          {/* Divider + tech row */}
          <div className="mt-4 border-t border-paper-0/10 pt-4">
            <div className="grid grid-cols-3">
              {[
                { Icon: MapPin,  l: "GPS",  s: "Ubicación"    },
                { Icon: Radio,   l: "LoRa", s: "Comunicación" },
                { Icon: Monitor, l: "Web",  s: "Plataforma"   },
              ].map(({ Icon, l, s }, i) => (
                <div key={l} className={`flex flex-col items-center gap-1.5 ${i < 2 ? "border-r border-paper-0/10" : ""}`}>
                  <Icon size={22} className="text-signal-400" />
                  <p className="font-mono text-sm font-semibold text-signal-300">{l}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-paper-0/45">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── slide 4 · Cómo funciona ───────────────────────────────────────────────────

function S4_ComoFunciona({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-forest-950 text-paper-0">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 md:px-6">
        <Tag light>¿Cómo funciona?</Tag>
        <AnimatedTitle isActive={isActive} text="Diseño y creación del prototipo." light className="mt-1 font-display font-semibold sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />

        {/* layout 2 columnas en desktop */}
        <div className="mt-3 flex flex-col gap-3 sm:mt-4 md:flex-row md:items-start md:gap-6">

          {/* columna izquierda: texto + pasos */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] leading-relaxed text-paper-0/60 sm:text-xs">
              SmartFence AI nace de la integración de hardware y software para desarrollar una
              solución tecnológica orientada a la protección del ganado. Durante la construcción
              del prototipo, integramos los componentes electrónicos, el sistema de alimentación
              y la carcasa que protege los circuitos.
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-paper-0/60 sm:text-xs">
              Cada etapa nos permitió avanzar desde el diseño hasta la implementación de un
              collar inteligente capaz de obtener y transmitir la ubicación del animal.
            </p>

            <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2">
              {STEPS.map((step, i) => (
                <div key={step.n} className="relative">
                  <div className="rounded-xl border border-paper-0/10 bg-paper-0/5 p-2 h-full">
                    <p className="font-mono text-[9px] text-signal-300">{step.n}</p>
                    <p className="mt-1 font-display text-[10px] font-semibold sm:text-[11px]">{step.label}</p>
                    <p className="mt-0.5 text-[9px] leading-relaxed text-paper-0/45 sm:text-[10px]">{step.detail}</p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className="hidden sm:flex absolute top-1/2 -right-2 -translate-y-1/2 text-signal-400/40 z-10 text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* columna derecha: galería de imágenes */}
          <div className="flex gap-1.5 md:flex-col md:w-44 md:gap-2 shrink-0">
            {["/proto1.jpg", "/proto2.jpg", "/proto3.jpg"].map((src, i) => (
              <div key={i} className="flex-1 md:flex-none overflow-hidden rounded-xl border border-paper-0/10 md:rounded-2xl">
                <img src={src} alt={`Construcción prototipo ${i + 1}`}
                  className="w-full h-full object-cover aspect-square md:aspect-auto md:h-24" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </Shell>
  );
}

// ─── slide 5 · Prototipo ───────────────────────────────────────────────────────

function S5_Prototipo({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 sm:px-8 md:grid-cols-2 md:items-center md:gap-8 md:px-6">
        <div>
          <Tag>El collar inteligente</Tag>
          <AnimatedTitle isActive={isActive} text="El prototipo físico, pieza por pieza." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />
          <p className="mt-1.5 text-[11px] leading-relaxed text-ink-600 sm:text-sm">
            El GPS obtiene la ubicación del animal y el sistema determina si está dentro o
            fuera de la cerca virtual. La información se transmite mediante LoRa al gateway.
          </p>
          <div className="mt-3 space-y-2">
            {[
              { l:"LILYGO LoRa32",          d:"Microcontrolador con LoRa integrado" },
              { l:"GPS NEO-6M",            d:"Obtiene la ubicación y verifica el perímetro" },
              { l:"2× Batería LiPo 5000", d:"Recargables con panel solar integrado" },
              { l:"Panel solar",           d:"Recarga continua las baterías en campo" },
              { l:"Buzzer",                d:"Estímulo sonoro al detectar salida" },
              { l:"Carcasa IP67",          d:"Resistente al agua y al polvo" },
            ].map(c=>(
              <div key={c.l} className="flex items-center gap-2 border-b border-forest-800/8 pb-2 last:border-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
                <span className="font-mono text-[10px] font-medium text-forest-900 sm:text-[11px]">{c.l}</span>
                <span className="text-[10px] text-ink-500 sm:text-[11px]">— {c.d}</span>
              </div>
            ))}
          </div>
        </div>
        <figure className="overflow-hidden rounded-xl border border-forest-800/10 shadow-sm sm:rounded-2xl">
          <img
            src="/collar-final.jpg"
            alt="Collar SmartFence"
            className="w-full h-auto"
          />
        </figure>
      </div>
    </Shell>
  );
}

// ─── slide 6 · Plataforma ──────────────────────────────────────────────────────

const PLATFORM_ICONS = [
  // Geocerca — dashed pentagon
  <svg key="geo" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7ED957" strokeWidth="1.8" strokeDasharray="3 2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 21,8.5 17.5,19 6.5,19 3,8.5" />
  </svg>,
  // Vacas dentro — circle outline green
  <svg key="den" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#7ED957" strokeWidth="2"/>
  </svg>,
  // Vacas fuera — circle outline red
  <svg key="fue" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#ef4444" strokeWidth="2"/>
  </svg>,
  // Ubicación GPS — filled dot green
  <svg key="gps" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="6" fill="#7ED957"/>
  </svg>,
  // Alertas — bell
  <Bell key="ale" size={20} stroke="#7ED957" fill="none" strokeWidth={1.8} />,
];

function S6_Plataforma({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 md:px-6">

        {/* Header */}
        <Tag>La plataforma</Tag>
        <AnimatedTitle isActive={isActive} text="Cerca virtual, vista desde el mapa." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />
        <p className="mt-1.5 text-[11px] leading-relaxed text-ink-600 sm:text-sm">
          La interfaz muestra el perímetro y la posición de cada animal en tiempo real,
          distinguiendo quién está dentro y quién ha salido.
        </p>

        {/* Feature row */}
        <div className="mt-3 grid grid-cols-5 gap-2 border-t border-forest-800/8 pt-3 sm:mt-4 sm:pt-4">
          {PLATFORM_ITEMS.map((item, i) => (
            <div key={item.label} className="flex flex-col items-start gap-1">
              <div className="flex h-8 w-8 items-center justify-center">{PLATFORM_ICONS[i]}</div>
              <p className="font-mono text-[9px] font-semibold text-forest-900 sm:text-[10px]">{item.label}</p>
              <p className="text-[9px] leading-snug text-ink-500 sm:text-[10px]">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Map screenshot */}
        <figure className="mt-3 overflow-hidden rounded-2xl border border-forest-800/10 shadow-[0_8px_30px_rgba(11,36,22,0.10)] sm:mt-4">
          <img src={platformScreenshot} alt="Plataforma SmartFence" className="w-full h-auto" />
        </figure>
      </div>
    </Shell>
  );
}

// ─── slide 7 · Resultados ──────────────────────────────────────────────────────

function S7_Resultados({ isActive = true }: { isActive?: boolean }) {
  const TITLE = "La ciencia respalda el sistema.";
  const { text: titleText, done: titleDone } = useTypewriter(TITLE, 42, 180, isActive);
  const p1 = titleText.slice(0, 11);
  const p2 = titleText.slice(11, 19);
  const p3 = titleText.slice(19);

  return (
    <Shell className="relative bg-forest-950 text-paper-0">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-8 md:px-6">

        {/* Badge */}
        <div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7ED957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3H5v11l7 7 7-7V3h-4"/><line x1="9" y1="3" x2="15" y2="3"/>
          </svg>
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-signal-400">Investigación y antecedentes</span>
        </div>

        {/* Title bicolor */}
        <h2 className="font-display font-bold leading-[1.05] sm:mt-1" style={{ fontSize:"clamp(1.4rem,4.5vw,2.6rem)" }}>
          <span className="text-paper-0">{p1}</span>
          <span className="text-signal-400">{p2}</span>
          <span className="text-paper-0">{p3}</span>
          {!titleDone && <span className="cursor-blink text-signal-400">|</span>}
        </h2>

        {/* Cards */}
        <div className="mt-3 flex flex-col gap-2 sm:gap-3">

          {/* LoRa card */}
          <div className="flex items-start gap-3 rounded-xl bg-paper-0/5 p-3 sm:rounded-2xl sm:p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal-400/15 sm:h-10 sm:w-10">
              <Radio size={18} className="text-signal-400" />
            </div>
            <div className="flex-1">
              <p className="font-mono text-[9px] uppercase tracking-widest text-signal-400 sm:text-[10px]">LoRa · largo alcance</p>
              <p className="mt-1 text-[10px] leading-relaxed text-paper-0/70 sm:text-[11px]">
                Diseñada para IoT de bajo consumo. Alcanza <strong className="text-paper-0">hasta 15 km en zonas rurales</strong> y ~5 km en urbano (Semtech). El alcance real depende de antena, altura y terreno.
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-paper-0/50 sm:text-[11px]">
                En SmartFence: el collar envía GPS, batería, estado del animal y eventos de alerta al gateway.
              </p>
            </div>
          </div>

          {/* Vacas card */}
          <div className="flex items-start gap-3 rounded-xl bg-paper-0/5 p-3 sm:rounded-2xl sm:p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal-400/15 sm:h-10 sm:w-10">
              <Volume2 size={18} className="text-signal-400" />
            </div>
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-4">
              <div className="flex-1">
                <p className="font-mono text-[9px] uppercase tracking-widest text-signal-400 sm:text-[10px]">¿Cómo aprenden las vacas?</p>
                <p className="mt-1 text-[10px] leading-relaxed text-paper-0/70 sm:text-[11px]">
                  Aprendizaje asociativo: <strong className="text-paper-0">Sonido → retrocede → evita la zona.</strong> Con sonido + estímulo controlado, los animales aprenden a responder antes del segundo estímulo.
                </p>
              </div>
              <ul className="space-y-1 sm:w-44 sm:shrink-0">
                {[
                  "≈ 6 interacciones para que el 50 % de 12 novillas aprendiera.",
                  "≈ 3 eventos acústicos para formar la asociación.",
                  "≈ 5 eventos para completar el período de aprendizaje.",
                ].map(t => (
                  <li key={t} className="flex items-start gap-1.5 text-[10px] leading-snug text-paper-0/55">
                    <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* chart */}
        <div className="mt-2 sm:mt-3">
          <figure className="overflow-hidden rounded-xl border border-paper-0/10 bg-paper-50">
            <img src="/research-chart.png" alt="Progresión del aprendizaje asociativo ganadero" className="w-full h-auto" />
          </figure>
          <p className="mt-1.5 text-[9px] leading-relaxed text-paper-0/35">
            Los estímulos eléctricos disminuyen a medida que el animal aprende a responder solo al tono sonoro. (Confessore et al., 2022 · Fuchs et al., 2024)
          </p>
        </div>
      </div>
    </Shell>
  );
}

// ─── slide 8 · Futuro ──────────────────────────────────────────────────────────

function S8_Futuro({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 md:px-6">
        <Tag>Trabajos futuros</Tag>
        <AnimatedTitle isActive={isActive} text="De la ubicación al comportamiento." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />
        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
          {FUTURE.map(f=>(
            <div key={f.title} className="rounded-xl border border-forest-800/8 bg-paper-50 p-3 sm:rounded-2xl sm:p-4">
              <div className="flex items-center gap-2">
                <f.Icon size={16} className="shrink-0 text-pasture-600" />
                <p className="font-display text-xs font-semibold text-forest-900 sm:text-sm">{f.title}</p>
              </div>
              <ul className="mt-2 space-y-1">
                {f.items.map(item => (
                  <li key={item} className="flex items-start gap-1.5 text-[10px] leading-snug text-ink-600 sm:text-[11px]">
                    <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-signal-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-pasture-600/20 bg-pasture-600/5 p-3 sm:mt-4 sm:rounded-2xl sm:p-4">
          <Target size={16} className="mt-0.5 shrink-0 text-pasture-600" />
          <div>
            <p className="font-display text-xs font-semibold text-forest-900 sm:text-sm">Nuestro objetivo</p>
            <p className="mt-1 text-[10px] leading-relaxed text-ink-600 sm:text-[11px]">
              Convertir SmartFence en una plataforma inteligente de monitoreo ganadero que combine
              IoT, GPS, LoRa e inteligencia artificial para mejorar la seguridad, el bienestar
              animal y la gestión del ganado.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── slide 9 · Cierre ──────────────────────────────────────────────────────────

function S9_Cierre({ isActive = true }: { isActive?: boolean }) {
  void isActive;
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden px-4 pb-[52px] pt-4 text-paper-0 sm:px-8 sm:pt-6 md:px-12 lg:px-16"
      style={{ background:"#0B2416" }}>
      {/* cow — full bleed background */}
      <img src="/vaca-32.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none" />
      {/* dark green overlay */}
      <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(11,36,22,0.85) 0%, rgba(11,36,22,0.65) 50%, rgba(11,36,22,0.85) 100%)" }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage:"linear-gradient(#7ED957 1px,transparent 1px),linear-gradient(90deg,#7ED957 1px,transparent 1px)", backgroundSize:"36px 36px" }} />

      {/* Falling leaves */}
      {[
        { left: "58%",  delay: "0s",    dur: "7s",  size: 18, rotate: 15  },
        { left: "72%",  delay: "2.5s",  dur: "9s",  size: 13, rotate: -20 },
        { left: "81%",  delay: "1.2s",  dur: "6s",  size: 22, rotate: 30  },
        { left: "67%",  delay: "4s",    dur: "8s",  size: 15, rotate: -10 },
        { left: "86%",  delay: "3.3s",  dur: "10s", size: 11, rotate: 45  },
        { left: "55%",  delay: "5.8s",  dur: "7.5s",size: 16, rotate: -35 },
      ].map((leaf, i) => (
        <svg key={i} className="leaf-fall absolute top-0 pointer-events-none"
          style={{ left: leaf.left, width: leaf.size, height: leaf.size, animationDuration: leaf.dur, animationDelay: leaf.delay, opacity: 0 }}
          viewBox="0 0 24 24" fill="none">
          <path d="M12 2C12 2 4 8 4 14a8 8 0 0016 0C20 8 12 2 12 2z" fill="#7ED957" opacity="0.7"
            transform={`rotate(${leaf.rotate} 12 12)`} />
          <line x1="12" y1="22" x2="12" y2="10" stroke="#7ED957" strokeWidth="1" opacity="0.5" />
        </svg>
      ))}

      {/* Center content */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center">
        <img
          src="/logo.png"
          alt="SmartFence logo"
          className="mb-4 w-56 sm:w-68 md:w-80"
          style={{ mixBlendMode: "screen" }}
        />
        <h2 className="font-display font-semibold max-w-xs leading-tight sm:max-w-md" style={{ fontSize:"clamp(1.2rem,4vw,2.5rem)" }}>
          Tecnología para el monitoreo inteligente del ganado.
        </h2>
        <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-paper-0/50 sm:max-w-sm sm:text-sm sm:mt-3">
          Prototipo que conecta el campo con el futuro, cuidando cada animal y
          haciendo más inteligente la ganadería.
        </p>
        <div className="mx-auto mt-4 h-px w-10 bg-paper-0/20 sm:mt-5" />
        <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {([
            { Icon: MapPin, label: "Monitoreo en tiempo real" },
            { Icon: Bell,   label: "Alertas inteligentes"     },
            { Icon: Wifi,   label: "Tecnología IoT"           },
          ] as const).map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-signal-400/35 bg-signal-400/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-signal-300 sm:px-3 sm:py-1.5 sm:text-[10px]">
              <Icon size={10} className="shrink-0 text-signal-400" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── video slide ───────────────────────────────────────────────────────────────

function SlideVideo({ isActive = true }: { isActive?: boolean }) {
  const v1MobileRef  = useRef<HTMLVideoElement>(null);
  const v1DesktopRef = useRef<HTMLVideoElement>(null);
  const v2MobileRef  = useRef<HTMLVideoElement>(null);
  const v2DesktopRef = useRef<HTMLVideoElement>(null);
  const [showSecond, setShowSecond] = useState(false);

  // cuando el slide se activa/desactiva, controla reproducción
  useEffect(() => {
    if (isActive) {
      setShowSecond(false);
      v1MobileRef.current!  && (v1MobileRef.current!.currentTime  = 0);
      v1DesktopRef.current! && (v1DesktopRef.current!.currentTime = 0);
      v1MobileRef.current?.play().catch(() => {});
      v1DesktopRef.current?.play().catch(() => {});
    } else {
      [v1MobileRef, v1DesktopRef, v2MobileRef, v2DesktopRef].forEach(r => {
        if (!r.current) return;
        r.current.pause();
        r.current.currentTime = 0;
      });
      setShowSecond(false);
    }
  }, [isActive]);

  // cuando termina el primer video, pasa al segundo
  const onFirstEnded = () => {
    setShowSecond(true);
    setTimeout(() => {
      v2MobileRef.current?.play().catch(() => {});
      v2DesktopRef.current?.play().catch(() => {});
    }, 50);
  };

  return (
    <div className="flex h-full w-full flex-col bg-forest-950 px-5 pb-[52px] pt-5 text-paper-0 sm:px-10 sm:pt-7">
      <div className="flex w-full flex-1 flex-col max-w-3xl mx-auto">

        {/* Badge */}
        <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7ED957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3H5v11l7 7 7-7V3h-4"/><line x1="9" y1="3" x2="15" y2="3"/>
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-400">Experimento</span>
        </div>

        {/* Title */}
        <h2 className="font-display font-bold leading-[1.05]" style={{ fontSize:"clamp(1.2rem,3.5vw,2rem)" }}>
          Prueba del{" "}
          <span className="text-signal-400">collar</span>{" "}
          en finca.
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-md text-[11px] leading-relaxed text-paper-0/55 sm:text-sm">
          En este video se evidencia la prueba del prototipo del collar SmartFence colocado en una vaca.
        </p>

        {/* Videos — el segundo aparece automáticamente al terminar el primero */}
        <div className="mt-4 flex-1 min-h-0 relative">

          {/* VIDEO 1 */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${showSecond ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {/* móvil */}
            <div className="relative mx-auto block overflow-hidden rounded-2xl border border-paper-0/10 bg-forest-900 sm:hidden"
                 style={{ width: "72vw", aspectRatio: "9/16", maxHeight: "72svh" }}>
              <video ref={v1MobileRef} className="absolute inset-0 h-full w-full object-cover"
                src="/prueba-campo.mp4" controls muted playsInline onEnded={onFirstEnded} />
            </div>
            {/* desktop */}
            <div className="relative hidden h-full w-full overflow-hidden rounded-3xl border border-paper-0/10 bg-forest-900 sm:block">
              <video ref={v1DesktopRef} className="h-full w-full object-cover"
                src="/prueba-campo.mp4" controls muted playsInline onEnded={onFirstEnded} />
            </div>
          </div>

          {/* VIDEO 2 */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${showSecond ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* móvil */}
            <div className="relative mx-auto block overflow-hidden rounded-2xl border border-paper-0/10 bg-forest-900 sm:hidden"
                 style={{ width: "72vw", aspectRatio: "9/16", maxHeight: "72svh" }}>
              <video ref={v2MobileRef} className="absolute inset-0 h-full w-full object-cover"
                src="/smartfence2.mp4" controls muted playsInline />
            </div>
            {/* desktop */}
            <div className="relative hidden h-full w-full overflow-hidden rounded-3xl border border-paper-0/10 bg-forest-900 sm:block">
              <video ref={v2DesktopRef} className="h-full w-full object-cover"
                src="/smartfence2.mp4" controls muted playsInline />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// ─── swipe hook (native, non-passive touchmove) ────────────────────────────────

function useSwipe(ref: React.RefObject<HTMLDivElement | null>, onLeft: () => void, onRight: () => void) {
  const sx = useRef(0);
  const sy = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      sx.current = e.touches[0].clientX;
      sy.current = e.touches[0].clientY;
    };
    const onMove = (e: TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - sx.current);
      const dy = Math.abs(e.touches[0].clientY - sy.current);
      // if horizontal movement is dominant, prevent default (stops vertical scroll steal)
      if (dx > dy && dx > 8) e.preventDefault();
    };
    const onEnd = (e: TouchEvent) => {
      const dx = sx.current - e.changedTouches[0].clientX;
      const dy = sy.current - e.changedTouches[0].clientY;
      if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx) * 0.9) return;
      if (dx > 0) onLeft(); else onRight();
    };

    el.addEventListener("touchstart", onStart,  { passive: true  });
    el.addEventListener("touchmove",  onMove,   { passive: false }); // must be non-passive to preventDefault
    el.addEventListener("touchend",   onEnd,    { passive: true  });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
    };
  }, [ref, onLeft, onRight]);
}

// ─── presentation inner slider ─────────────────────────────────────────────────

function PresentationSlider() {
  const [cur, setCur] = useState(0);
  const [busy, setBusy] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = 9;

  const revealControls = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 2500);
  }, []);

  const go = useCallback((i: number) => {
    if (busy || i === cur) return;
    setBusy(true);
    setCur(i);
    setTimeout(() => setBusy(false), 650);
  }, [busy, cur]);

  const prev = useCallback(() => go(Math.max(0, cur - 1)), [go, cur]);
  const next = useCallback(() => go(Math.min(total - 1, cur + 1)), [go, cur]);

  // keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  // touch swipe
  useSwipe(wrapRef, next, prev);

  const slides = [
    <S1_Hero         isActive={cur === 0} />,
    <SlideVideo isActive={cur === 1} />,
    <S3_QueEs        isActive={cur === 2} />,
    <S4_ComoFunciona isActive={cur === 3} />,
    <S5_Prototipo    isActive={cur === 4} />,
    <S6_Plataforma   isActive={cur === 5} />,
    <S7_Resultados   isActive={cur === 6} />,
    <S8_Futuro       isActive={cur === 7} />,
    <S9_Cierre       isActive={cur === 8} />,
  ];

  const btnVis = `transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 sm:opacity-100"}`;

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden"
      onMouseMove={revealControls} onTouchStart={revealControls}>
      {/* track */}
      <div style={{
        display:"flex", width:`${total * 100}%`, height:"100%",
        transform:`translateX(calc(-${cur} * (100% / ${total})))`,
        transition:"transform 0.6s cubic-bezier(0.76,0,0.24,1)",
        willChange:"transform",
      }}>
        {slides.map((slide, i) => (
          <div key={i} style={{ width:`${100 / total}%`, height:"100%", flexShrink:0, overflow:"hidden" }}>
            {slide}
          </div>
        ))}
      </div>

      {/* prev arrow */}
      {cur > 0 && (
        <button onClick={prev} aria-label="Anterior"
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-all active:scale-90 sm:left-3 sm:h-11 sm:w-11 ${btnVis}`}
          style={{ touchAction:"manipulation" }}>
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
      )}

      {/* next arrow */}
      {cur < total - 1 && (
        <button onClick={next} aria-label="Siguiente"
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-all active:scale-90 sm:right-3 sm:h-11 sm:w-11 ${btnVis}`}
          style={{ touchAction:"manipulation" }}>
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      )}

      {/* dots */}
      <nav aria-label="Diapositivas"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={PRES_NAMES[i]} title={PRES_NAMES[i]}
            className={`rounded-full transition-all duration-300 ${i === cur ? "h-2.5 w-6 bg-signal-400 shadow-[0_0_8px_rgba(126,217,87,0.85)]" : "h-2.5 w-2.5 bg-white/60 hover:bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.4)]"}`}
            style={{ touchAction:"manipulation" }}
          />
        ))}
      </nav>

      {/* slide label — sm+ */}
      <div className="absolute bottom-3 left-3 z-50 hidden sm:block">
        <span className="rounded-full border border-white/12 bg-black/35 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-white/40 backdrop-blur-sm">
          {PRES_NAMES[cur]}
        </span>
      </div>

      {/* counter */}
      <div className="absolute top-3 right-3 z-50 font-mono text-[9px] text-white/35 select-none sm:top-4 sm:right-4 sm:text-[11px]">
        {cur + 1}/{total}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="slider-wrap">
      <PresentationSlider />
    </div>
  );
}
