import { useEffect, useState } from "react";

const LINKS = [
  { id: "inicio", label: "Inicio" },
  { id: "smartfence", label: "SmartFence" },
  { id: "funcionamiento", label: "Funcionamiento" },
  { id: "prototipo", label: "Prototipo" },
  { id: "prueba", label: "Prueba" },
  { id: "resultados", label: "Resultados" },
];

export function Nav() {
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <nav className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-forest-800/10 bg-paper-0/90 px-3 py-2 shadow-[0_4px_24px_rgba(11,36,22,0.08)] backdrop-blur">
        <a href="#inicio" className="flex items-center gap-2 pl-1 shrink-0">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-forest-800">
            <span className="h-2 w-2 rounded-full bg-signal-400" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-forest-900">
            SmartFence
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wide">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active === link.id
                    ? "bg-forest-800 text-paper-0"
                    : "text-forest-800/70 hover:bg-forest-800/8"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#prueba"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-signal-400 px-3 py-1.5 font-mono text-xs font-medium text-forest-950 hover:bg-signal-300 transition-colors"
        >
          ▶ Ver prueba
        </a>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex h-8 w-8 items-center justify-center rounded-full text-forest-800"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden absolute top-16 left-4 right-4 rounded-2xl border border-forest-800/10 bg-paper-0 p-3 shadow-lg">
          <ul className="flex flex-col gap-1 font-mono text-sm uppercase tracking-wide">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 ${
                    active === link.id
                      ? "bg-forest-800 text-paper-0"
                      : "text-forest-800/80 hover:bg-forest-800/8"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
