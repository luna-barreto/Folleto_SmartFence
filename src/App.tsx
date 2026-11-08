import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Sparkles, Stethoscope, Layers, Rocket, ListChecks, MapPin, Bell, Wifi, ShieldOff, ShieldCheck, TrendingDown, Flame, ArrowRightFromLine, Banknote, ChevronLeft, ChevronRight, Hexagon, CircleCheck, CircleX, LocateFixed, Bookmark, Signal, Globe, Zap, X } from "lucide-react";
import platformScreenshot from "./assets/platform-screenshot.png";

// ─── data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", label: "Collar",     detail: "El animal lleva el dispositivo." },
  { n: "02", label: "GPS",        detail: "Calcula la posición del animal." },
  { n: "03", label: "LoRa",       detail: "Transmite a larga distancia." },
  { n: "04", label: "Plataforma", detail: "Ubica al animal en el mapa." },
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
    Icon: Sparkles,
    title: "IA y comportamiento animal",
    items: [
      "Analizar patrones de movimiento.",
      "Detectar comportamientos anormales.",
      "Predecir posibles escapes.",
      "Identificar cambios en actividad.",
    ],
  },
  {
    Icon: Stethoscope,
    title: "Salud",
    items: [
      "Integrar sensores para temperatura y actividad.",
      "Detectar posibles cambios de comportamiento.",
      "Generar alertas preventivas.",
    ],
  },
  {
    Icon: Layers,
    title: "Sistema",
    items: [
      "Mejorar autonomía energética.",
      "Optimizar el alcance de comunicación.",
      "Incorporar más sensores.",
      "Escalar el sistema a más animales y fincas.",
    ],
  },
];

const PRES_NAMES = ["Portada","Video","Problemática","¿Qué es?","Cómo funciona","Prototipo","Plataforma","Resultados","Futuro","Cierre"];

// ─── helpers ───────────────────────────────────────────────────────────────────

function Tag({ light = false, children }: { light?: boolean; children: React.ReactNode }) {
  return (
    <p className={`font-mono text-[12px] uppercase tracking-[0.22em] sm:text-[11px] ${light ? "text-signal-300" : "text-pasture-500"}`}>
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
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-6 pb-[52px] pt-6 sm:px-8 sm:pt-6 md:px-10 lg:px-14">
        {children}
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
    <div className="relative flex h-full w-full flex-col overflow-hidden px-8 pb-[52px] pt-6 sm:px-8 sm:pt-6 md:px-12 lg:px-16"
      style={{ background: "#0B2416" }}>

      {/* cow — full bleed background */}
      <img
        src="/portada-nueva.jpg"
        alt="Vaca con collar SmartFence"
        className="absolute inset-0 h-full w-full object-cover object-[70%_50%] sm:object-center"
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
      <div className="relative z-10 flex items-center gap-2.5 mt-1 sm:mt-0">
        <img src="/icono.png" alt="SmartFence" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
        <span className="font-display text-base font-semibold text-paper-0 sm:text-lg">SmartFence</span>
      </div>

      {/* Main content — centered vertically */}
      <div className="relative z-10 my-auto max-w-xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 sm:mb-4 sm:px-4 sm:py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M12 2C12 2 4 8 4 14a8 8 0 0016 0C20 8 12 2 12 2z" fill="#7ED957"/>
            <line x1="12" y1="22" x2="12" y2="10" stroke="#7ED957" strokeWidth="1.5"/>
          </svg>
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-forest-800 sm:text-[11px]">Proyecto · 2026</span>
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
          Sistema inteligente de monitoreo ganadero, diseñado para conocer la ubicación del ganado en tiempo real y generar alertas cuando abandona el perímetro establecido.
        </p>

        {/* fade-in chips con iconos */}
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2"
          style={{ opacity: showContent ? undefined : 0, animation: showContent ? "fade-up 0.8s 0.2s ease forwards" : "none" }}>
          {([
            { Icon: MapPin, label: "Monitoreo en tiempo real" },
            { Icon: Bell,   label: "Alertas inteligentes"     },
            { Icon: Wifi,   label: "Tecnología IoT"           },
          ] as const).map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-signal-400/35 bg-signal-400/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-signal-300 sm:px-3 sm:py-1.5 sm:text-[12px]">
              <Icon size={10} className="shrink-0 text-signal-400" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── slide 3 · Problemática ───────────────────────────────────────────────────

function S3_Problematica({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-forest-950 text-paper-0">
      <div className="mx-auto w-full max-w-3xl">

        <Tag light>Problemática</Tag>
        <AnimatedTitle isActive={isActive} text="Una problemática real en la ganadería colombiana." light
          className="mt-1 font-display font-semibold sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />

        <p className="mt-2 text-[12px] leading-relaxed text-paper-0/60">
          La ganadería colombiana enfrenta importantes pérdidas por el robo, el extravío, el desplazamiento y la muerte de animales debido a enfermedades, sequías, falta de alimento y otras situaciones de riesgo.
        </p>

        {/* Stat cards */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
          {([
            { Icon: ShieldOff,         value: "10.893",     label: "Hurtados en 2024",       sub: "~30 al día",                   accent: "#ef4444", bg: "rgba(239,68,68,0.08)"   },
            { Icon: TrendingDown,      value: "179.000+",   label: "Hurtados 2015–2025",     sub: "14,2 % recuperado",            accent: "#f87171", bg: "rgba(239,68,68,0.05)"   },
            { Icon: Flame,             value: "8.879",      label: "Muertos en 45 días",     sub: "El Niño 2023–2024",            accent: "#fbbf24", bg: "rgba(251,191,36,0.08)"  },
            { Icon: ArrowRightFromLine,value: "308.481",    label: "Desplazados",            sub: "En busca de agua y alimento",  accent: "#7ED957", bg: "rgba(126,217,87,0.07)"  },
            { Icon: Banknote,          value: "$122.000M+", label: "Pérdidas económicas",    sub: "Por la emergencia climática",  accent: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
          ] as const).map(({ Icon, value, label, sub, accent, bg }, i) => (
            <div key={i}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-3 ${i === 4 ? "col-span-2" : ""}`}
              style={{ background: bg, border: `1px solid ${accent}22` }}>
              <div className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full" style={{ background: accent }} />
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accent}18` }}>
                <Icon size={13} style={{ color: accent }} />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold leading-none" style={{ fontSize:"clamp(1rem,3.5vw,1.35rem)", color: accent }}>{value}</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-paper-0/55">{label}</p>
                <p className="mt-0.5 text-[9px] text-paper-0/30">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-2 text-[12px] leading-relaxed text-paper-0/50 sm:mt-3">
          A estas situaciones se suman las dificultades para supervisar grandes extensiones de terreno, detectar escapes y reconocer oportunamente cambios en el comportamiento y la salud del ganado.
        </p>

        {/* CTA line */}
        <div className="mt-2 rounded-xl border border-signal-400/15 bg-gradient-to-r from-signal-400/8 to-transparent p-3 sm:mt-3 sm:rounded-2xl sm:p-4">
          <p className="text-[12px] leading-relaxed text-paper-0/65">
            <strong className="text-paper-0">SmartFence</strong> propone integrar <strong className="text-signal-300">geolocalización</strong>, <strong className="text-signal-300">cercado virtual</strong> y <strong className="text-signal-300">monitoreo inteligente</strong> para fortalecer la seguridad, facilitar la supervisión y contribuir al bienestar animal.
          </p>
        </div>

      </div>
    </Shell>
  );
}

// ─── slide 4 · Qué es ──────────────────────────────────────────────────────────

const OBJECTIVES = [
  { Icon: LocateFixed,        text: "Monitorear la ubicación del ganado en tiempo real." },
  { Icon: ArrowRightFromLine, text: "Detectar salidas de la cerca virtual." },
  { Icon: Bell,               text: "Generar alertas para el cuidador." },
  { Icon: ShieldCheck,        text: "Reducir pérdidas y facilitar el manejo del ganado." },
  { Icon: Zap,                text: "Crear una solución tecnológica de bajo costo y escalable." },
];

function S3_QueEs({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto w-full max-w-3xl">

        {/* Header */}
        <Tag>¿Qué es SmartFence?</Tag>
        <AnimatedTitle isActive={isActive} text="Una herramienta tecnológica para el ganadero." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.5vw,2.2rem)" }} />

        <div className="mt-3 flex flex-col gap-4 md:grid md:grid-cols-2 md:items-start md:gap-6">
          {/* Párrafos */}
          <div className="space-y-2">
            <p className="text-[12px] leading-relaxed text-ink-600">
              SmartFence es una herramienta tecnológica creada para ayudar a los ganaderos a optimizar sus labores, reducir costos de infraestructura a largo plazo y disminuir el riesgo de pérdida de ganado.
            </p>
            <p className="text-[12px] leading-relaxed text-ink-600">
              La solución integra una aplicación de monitoreo y un collar inteligente que permite conocer la ubicación de cada animal mediante GPS, transmitir la información a través de LoRa y visualizarla en un mapa con geocercas virtuales.
            </p>
            <p className="text-[12px] leading-relaxed text-ink-600">
              El sistema permite identificar cuándo un animal sale del área establecida, generar alertas y facilitar al productor el seguimiento de su ganado sin tener que realizar constantemente recorridos físicos por toda la finca.
            </p>
          </div>

          {/* Dark objectives card */}
          <div className="rounded-2xl bg-forest-900 p-4 text-paper-0 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <ListChecks size={16} className="text-signal-400" />
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-400 sm:text-[11px]">Objetivos</span>
            </div>
            <ul className="space-y-2">
              {OBJECTIVES.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-[12px] leading-snug text-paper-0/85">
                  <Icon size={12} className="mt-[2px] shrink-0 text-signal-400" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-paper-0/10 pt-4">
              <div className="grid grid-cols-3">
                {[
                  { Icon: MapPin,  l: "GPS",  s: "Ubicación"    },
                  { Icon: Signal,  l: "LoRa", s: "Comunicación" },
                  { Icon: Globe,   l: "Web",  s: "Plataforma"   },
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
      </div>
    </Shell>
  );
}

// ─── shared lightbox hook ──────────────────────────────────────────────────────

function useLightbox() {
  const [src, setSrc] = useState<string | null>(null);

  const portal = src ? createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={() => setSrc(null)}
    >
      <img
        src={src}
        alt="Foto ampliada"
        className="max-h-[88vh] max-w-[92vw] w-auto h-auto rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        aria-label="Cerrar"
        onClick={() => setSrc(null)}
        className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </div>,
    document.body
  ) : null;

  return { open: setSrc, portal };
}

// ─── slide 4 · Cómo funciona ───────────────────────────────────────────────────

function S4_ComoFunciona({ isActive = true }: { isActive?: boolean }) {
  const { open, portal } = useLightbox();

  return (
    <Shell className="bg-forest-950 text-paper-0">
      <div className="mx-auto w-full max-w-3xl">
        <Tag light>¿Cómo funciona?</Tag>
        <AnimatedTitle isActive={isActive} text="Diseño y creación del prototipo." light className="mt-1 font-display font-semibold sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />

        <div className="mt-3 sm:mt-4">
          <p className="text-[12px] leading-relaxed text-paper-0/60">
            SmartFence AI nace de la integración de hardware y software para desarrollar una
            solución tecnológica orientada a la protección del ganado. Durante la construcción
            del prototipo, integramos los componentes electrónicos, el sistema de alimentación
            y la carcasa que protege los circuitos.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-paper-0/60">
            Cada etapa nos permitió avanzar desde el diseño hasta la implementación de un
            collar inteligente capaz de obtener y transmitir la ubicación del animal.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2">
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative">
                <div className="rounded-xl border border-paper-0/10 bg-paper-0/5 p-2 h-full">
                  <p className="font-mono text-[9px] text-signal-300">{step.n}</p>
                  <p className="mt-1 font-display text-[12px] font-semibold sm:text-[11px]">{step.label}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-paper-0/45">{step.detail}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <span className="hidden sm:flex absolute top-1/2 -right-2 -translate-y-1/2 text-signal-400/40 z-10 text-xs">→</span>
                )}
              </div>
            ))}
          </div>

          {/* galería de imágenes — clic para ampliar */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 sm:mt-4">
            {["/proto1.jpg", "/proto2.jpg", "/proto3.jpg"].map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => open(src)}
                className="group overflow-hidden rounded-xl border border-paper-0/10 sm:rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400"
              >
                <img
                  src={src}
                  alt={`Construcción prototipo ${i + 1}`}
                  className="w-full object-cover aspect-[16/9] sm:aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {portal}
    </Shell>
  );
}

// ─── slide 5 · Prototipo ───────────────────────────────────────────────────────

function S5_Prototipo({ isActive = true }: { isActive?: boolean }) {
  const { open, portal } = useLightbox();
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto grid w-full max-w-3xl gap-4 md:grid-cols-2 md:items-center md:gap-8">
        <div>
          <Tag>El collar inteligente</Tag>
          <AnimatedTitle isActive={isActive} text="El prototipo físico, pieza por pieza." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-600">
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
              <div key={c.l} className="flex items-start gap-2 border-b border-forest-800/8 pb-2 last:border-0">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
                <div className="min-w-0">
                  <p className="font-mono text-[12px] font-medium text-forest-900 sm:text-[11px]">{c.l}</p>
                  <p className="text-[12px] text-ink-500">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => open("/collar-final.jpg")}
          className="group overflow-hidden rounded-xl border border-forest-800/10 shadow-sm sm:rounded-2xl md:max-h-[65vh] focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400"
        >
          <img
            src="/collar-final.jpg"
            alt="Collar SmartFence"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>
      </div>
      {portal}
    </Shell>
  );
}

// ─── slide 6 · Plataforma ──────────────────────────────────────────────────────

const PLATFORM_ICONS = [
  <Hexagon     key="geo" size={20} className="text-signal-400" strokeDasharray="3 2" />,
  <CircleCheck key="den" size={20} className="text-signal-400" />,
  <CircleX     key="fue" size={20} className="text-red-400" />,
  <LocateFixed key="gps" size={20} className="text-signal-400" />,
  <Bell        key="ale" size={20} className="text-signal-400" />,
];

function S6_Plataforma({ isActive = true }: { isActive?: boolean }) {
  const { open, portal } = useLightbox();
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <Tag>La plataforma</Tag>
            <AnimatedTitle isActive={isActive} text="Cerca virtual, vista desde el mapa." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-600">
              La interfaz muestra el perímetro y la posición de cada animal en tiempo real,
              distinguiendo quién está dentro y quién ha salido.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-forest-800/8 pt-3 sm:mt-4 sm:grid-cols-5 sm:gap-2 sm:pt-4">
              {PLATFORM_ITEMS.map((item, i) => (
                <div key={item.label} className="flex flex-col items-start gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center">{PLATFORM_ICONS[i]}</div>
                  <p className="font-mono text-[12px] font-semibold text-forest-900">{item.label}</p>
                  <p className="text-[12px] leading-snug text-ink-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => open(platformScreenshot)}
            className="group overflow-hidden rounded-2xl border border-forest-800/10 shadow-[0_8px_30px_rgba(11,36,22,0.10)] md:flex md:items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400"
          >
            <img src={platformScreenshot} alt="Plataforma SmartFence" className="w-full h-auto md:max-h-[58vh] md:object-cover md:object-top transition-transform duration-300 group-hover:scale-[1.03]" />
          </button>
        </div>
      </div>
      {portal}
    </Shell>
  );
}

// ─── slide 7 · Resultados ──────────────────────────────────────────────────────

function S7_Resultados({ isActive = true }: { isActive?: boolean }) {
  const { open, portal } = useLightbox();
  const TITLE = "La ciencia respalda el sistema.";
  const { text: titleText, done: titleDone } = useTypewriter(TITLE, 42, 180, isActive);
  const p1 = titleText.slice(0, 11);
  const p2 = titleText.slice(11, 19);
  const p3 = titleText.slice(19);

  return (
    <Shell className="relative bg-forest-950 text-paper-0">
      <div className="relative z-10 mx-auto w-full max-w-3xl md:max-w-5xl">

        {/* Badge */}
        <div className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5">
          <Bookmark size={12} className="text-signal-400" />
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-signal-400">Investigación y antecedentes</span>
        </div>

        {/* Title bicolor */}
        <h2 className="font-display font-bold leading-[1.05] sm:mt-1" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }}>
          <span className="text-paper-0">{p1}</span>
          <span className="text-signal-400">{p2}</span>
          <span className="text-paper-0">{p3}</span>
          {!titleDone && <span className="cursor-blink text-signal-400">|</span>}
        </h2>

        {/* Cards + chart — mobile stacked, desktop side by side */}
        <div className="mt-3 md:grid md:grid-cols-2 md:gap-6 md:items-start">

          {/* Cards column */}
          <div className="grid grid-cols-1 gap-2 sm:gap-3">

            {/* LoRa card */}
            <div className="rounded-xl bg-paper-0/5 p-3 sm:rounded-2xl sm:p-4">
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-signal-400">LoRa · largo alcance</p>
                <p className="mt-1 text-[12px] leading-relaxed text-paper-0/70">
                  Diseñada para IoT de bajo consumo. Alcanza <strong className="text-paper-0">hasta 15 km en zonas rurales</strong> y ~5 km en urbano (Semtech). El alcance real depende de antena, altura y terreno.
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-paper-0/50">
                  En SmartFence: el collar envía GPS, batería, estado del animal y eventos de alerta al gateway.
                </p>
              </div>
            </div>

            {/* Vacas card */}
            <div className="rounded-xl bg-paper-0/5 p-3 sm:rounded-2xl sm:p-4">
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-signal-400">¿Cómo aprenden las vacas?</p>
                <p className="mt-1 text-[12px] leading-relaxed text-paper-0/70">
                  Aprendizaje asociativo: <strong className="text-paper-0">Sonido → retrocede → evita la zona.</strong> Con sonido + estímulo controlado, los animales aprenden a responder antes del segundo estímulo.
                </p>
                <ul className="mt-1.5 space-y-1">
                  {[
                    "6 interacciones para que el 50 % de 12 novillas aprendiera.",
                    "3 eventos acústicos para formar la asociación.",
                    "5 eventos para completar el período de aprendizaje.",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-1.5 text-[12px] leading-snug text-paper-0/55">
                      <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Chart column */}
          <div className="mt-2 sm:mt-3 md:mt-0">
            <button
              type="button"
              onClick={() => open("/research-chart.png")}
              className="group w-full overflow-hidden rounded-xl border border-paper-0/10 bg-paper-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-400"
            >
              <img src="/research-chart.png" alt="Progresión del aprendizaje asociativo ganadero" className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]" />
            </button>
            <p className="mt-1.5 text-[9px] leading-relaxed text-paper-0/35">
              Los estímulos eléctricos disminuyen a medida que el animal aprende a responder solo al tono sonoro. (Confessore et al., 2022 · Fuchs et al., 2024)
            </p>
          </div>
        </div>
      </div>
      {portal}
    </Shell>
  );
}

// ─── slide 8 · Futuro ──────────────────────────────────────────────────────────

function S8_Futuro({ isActive = true }: { isActive?: boolean }) {
  return (
    <Shell className="bg-paper-0">
      <div className="mx-auto w-full max-w-3xl">
        <Tag>Trabajos futuros</Tag>
        <AnimatedTitle isActive={isActive} text="De la ubicación a la prevención." className="mt-1 font-display font-semibold text-forest-900 sm:mt-2" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }} />
        <div className="mt-3 grid grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
          {FUTURE.map(f=>(
            <div key={f.title} className="rounded-xl border border-forest-800/8 bg-paper-50 p-3 sm:rounded-2xl sm:p-4">
              <div className="flex items-center gap-2">
                <f.Icon size={16} className="shrink-0 text-pasture-600" />
                <p className="font-display text-[12px] font-semibold text-forest-900">{f.title}</p>
              </div>
              <ul className="mt-2 space-y-1">
                {f.items.map(item => (
                  <li key={item} className="flex items-start gap-1.5 text-[12px] leading-snug text-ink-600">
                    <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-signal-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-pasture-600/20 bg-pasture-600/5 p-3 sm:mt-4 sm:rounded-2xl sm:p-4">
          <Rocket size={16} className="mt-0.5 shrink-0 text-pasture-600" />
          <div>
            <p className="font-display text-[12px] font-semibold text-forest-900">Nuestro objetivo</p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-600">
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
    <div className="relative flex h-full w-full flex-col overflow-hidden px-8 pb-[52px] pt-6 text-paper-0 sm:px-8 sm:pt-6 md:px-12 lg:px-16"
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
          className="mb-4 w-44 sm:w-64 md:w-80"
          style={{ mixBlendMode: "screen" }}
        />
        <h2 className="font-display font-semibold max-w-xs leading-tight sm:max-w-md" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }}>
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
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-signal-400/35 bg-signal-400/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-signal-300 sm:px-3 sm:py-1.5 sm:text-[12px]">
              <Icon size={10} className="shrink-0 text-signal-400" />
              {label}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-5 h-px w-10 bg-paper-0/10 sm:mt-6" />
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-paper-0/35 sm:text-[10px]">
          Autora
        </p>
        <p className="mt-1 font-display text-sm font-semibold text-paper-0/70 sm:text-base">
          Luna Barreto
        </p>
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
    <div className="flex h-full w-full flex-col bg-forest-950 px-10 pb-[52px] pt-8 text-paper-0 md:px-14 lg:px-20">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">

        {/* Badge */}
        <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5">
          <Bookmark size={13} className="text-signal-400" />
          <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-400">Experimento</span>
        </div>

        {/* Title */}
        <h2 className="font-display font-bold leading-[1.05]" style={{ fontSize:"clamp(1rem,3.2vw,2rem)" }}>
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
            {/* móvil — centrado vertical y horizontal */}
            <div className="flex h-full items-center justify-center sm:hidden">
              <div className="relative h-full overflow-hidden rounded-2xl border border-paper-0/10 bg-forest-900"
                   style={{ aspectRatio: "9/16", maxWidth: "90vw" }}>
                <video ref={v1MobileRef} className="absolute inset-0 h-full w-full object-cover object-[75%_15%]"
                  src="/prueba-campo.mp4" controls muted playsInline onEnded={onFirstEnded} />
              </div>
            </div>
            {/* desktop */}
            <div className="hidden h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-paper-0/10 bg-forest-900 sm:flex">
              <video ref={v1DesktopRef} className="h-full w-auto max-w-full"
                src="/prueba-campo.mp4" controls muted playsInline onEnded={onFirstEnded} />
            </div>
          </div>

          {/* VIDEO 2 */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${showSecond ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* móvil — centrado vertical y horizontal */}
            <div className="flex h-full items-center justify-center sm:hidden">
              <div className="relative h-full overflow-hidden rounded-2xl border border-paper-0/10 bg-forest-900"
                   style={{ aspectRatio: "9/16", maxWidth: "90vw" }}>
                <video ref={v2MobileRef} className="absolute inset-0 h-full w-full object-cover"
                  src="/smartfence2.mp4" controls muted playsInline />
              </div>
            </div>
            {/* desktop */}
            <div className="hidden h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-paper-0/10 bg-forest-900 sm:flex">
              <video ref={v2DesktopRef} className="h-full w-auto max-w-full"
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
  const total = 10;

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
    <S1_Hero           isActive={cur === 0} />,
    <SlideVideo        isActive={cur === 1} />,
    <S3_Problematica   isActive={cur === 2} />,
    <S3_QueEs          isActive={cur === 3} />,
    <S4_ComoFunciona   isActive={cur === 4} />,
    <S5_Prototipo      isActive={cur === 5} />,
    <S6_Plataforma     isActive={cur === 6} />,
    <S7_Resultados     isActive={cur === 7} />,
    <S8_Futuro         isActive={cur === 8} />,
    <S9_Cierre         isActive={cur === 9} />,
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
          className={`absolute left-3 top-1/2 -translate-y-1/2 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-all active:scale-90 sm:left-3 sm:h-11 sm:w-11 ${btnVis}`}
          style={{ touchAction:"manipulation" }}>
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
        </button>
      )}

      {/* next arrow */}
      {cur < total - 1 && (
        <button onClick={next} aria-label="Siguiente"
          className={`absolute right-3 top-1/2 -translate-y-1/2 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-all active:scale-90 sm:right-3 sm:h-11 sm:w-11 ${btnVis}`}
          style={{ touchAction:"manipulation" }}>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
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
