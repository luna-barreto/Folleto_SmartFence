import { MediaPlaceholder } from "./ui";

export function Closing() {
  return (
    <footer className="bg-forest-950 py-16 text-paper-0 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mx-auto max-w-xs">
          <MediaPlaceholder
            label="Foto: vaca con el collar"
            ratio="aspect-[4/3]"
            className="border-paper-0/15 bg-forest-900/40"
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal-400">
            <span className="h-2 w-2 rounded-full bg-forest-950" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            SMARTFENCE
          </span>
        </div>
        <p className="mt-2 text-sm text-paper-0/60">
          Tecnología para el monitoreo inteligente del ganado.
        </p>

        <div className="mx-auto mt-8 h-px w-16 bg-paper-0/15" />

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-paper-0/40">
          Proyecto de formación · SENA
        </p>
        <p className="mt-1 text-xs text-paper-0/30">
          [ Nombre del proyecto · Aprendices · Ficha · Año ]
        </p>
      </div>
    </footer>
  );
}
