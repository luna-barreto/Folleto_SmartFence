# SmartFence — Folleto interactivo

Proyecto **React + Vite + TypeScript + Tailwind CSS**, listo para desplegar en Vercel.

## Cómo abrir en VS Code

1. Descomprime el ZIP.
2. Abre la carpeta `smartfence-brochure` en VS Code.
3. En la terminal integrada:
   ```bash
   npm install
   npm run dev
   ```
4. Abre el enlace que aparece (normalmente `http://localhost:5173`).

## Estructura

```
src/
  components/
    Nav.tsx          → menú superior (Inicio | SmartFence | Funcionamiento | Prototipo | Prueba | Resultados)
    Hero.tsx          → portada
    Intro.tsx         → El problema + ¿Qué es SmartFence?
    HowItWorks.tsx     → pipeline Collar → GPS → LoRa → Gateway → Plataforma → Alerta
    Prototipo.tsx      → collar (piezas) + plataforma (captura real incluida)
    Proof.tsx          → sección "Prueba real" con el video (placeholder listo para reemplazar)
    Results.tsx        → tarjetas de resultados + tecnologías
    Welfare.tsx        → adaptación y bienestar animal
    Future.tsx         → IA, salud, entrenamiento por estímulos
    Evolution.tsx      → conectividad futura + evolución del sistema
    Closing.tsx        → cierre + datos del proyecto/SENA
  assets/
    platform-screenshot.png → captura real de la plataforma que enviaste
```

## Pendientes para reemplazar (marcados como placeholder en el código)

- Logo SmartFence
- Foto del collar real
- Foto de la vaca con el collar
- Video de la prueba con la vaca (sección `Proof.tsx`)
- Datos del equipo / ficha SENA (en `Closing.tsx`)

## Desplegar en Vercel

```bash
npm run build
```
Sube la carpeta a un repositorio de GitHub y conéctalo en vercel.com, o usa `vercel` (CLI) directamente sobre esta carpeta.
