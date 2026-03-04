# Particle Background — Guía de Implementación

Fondo animado con partículas flotantes usando Canvas 2D. Ideal para pantallas de login o landing pages.

---

## Vista previa del efecto

- 180 partículas circulares de colores flotando suavemente
- Movimiento tipo "deriva" con oscilación senoidal (efecto nube viva)
- Wrap-around: las partículas que salen por un borde reaparecen por el opuesto
- No interfiere con clicks ni interacción del usuario
- Se adapta automáticamente al resize de ventana

---

## Requisitos

- **React 18+** (usa `useEffect` + `useRef`)
- No requiere librerías externas — solo Canvas 2D nativo del navegador

---

## Componente: `ParticleBackground.jsx`

```jsx
import { useEffect, useRef } from 'react';

// ── Personalización ──────────────────────────────────────────
// Cambia estos colores por los de tu marca/proyecto
const COLORS = ['#FED519', '#F79617', '#7CC141', '#419E46', '#0A9561'];

// Cantidad de partículas (más = más denso, más CPU)
const PARTICLE_COUNT = 180;
// ─────────────────────────────────────────────────────────────

function initParticles(w, h) {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: Math.random() * w,              // posición X inicial aleatoria
    y: Math.random() * h,              // posición Y inicial aleatoria
    vx: (Math.random() - 0.5) * 0.6,  // velocidad horizontal (-0.3 a +0.3)
    vy: (Math.random() - 0.5) * 0.4,  // velocidad vertical (-0.2 a +0.2)
    r: 2 + Math.random() * 3.5,       // radio entre 2px y 5.5px
    alpha: 0.35 + Math.random() * 0.5, // opacidad entre 35% y 85%
    color: COLORS[i % COLORS.length],  // color cíclico del array
    phase: Math.random() * Math.PI * 2, // fase aleatoria para oscilación
  }));
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;
    let time = 0;
    let particles;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = initParticles(canvas.width, canvas.height);
    }

    function draw() {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      time += 0.008; // velocidad de oscilación (menor = más lento)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Movimiento lineal + oscilación senoidal vertical
        p.x += p.vx;
        p.y += p.vy + Math.sin(time + p.phase) * 0.18;

        // Wrap-around: reaparece por el lado opuesto
        if (p.x < -p.r) p.x = w + p.r;
        else if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        else if (p.y > h + p.r) p.y = -p.r;

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(draw);

    // Cleanup: cancelar animación y listener al desmontar
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // no bloquea clicks
        zIndex: 0,
      }}
    />
  );
}
```

---

## Uso en una pantalla de Login

El componente se coloca como hijo directo del contenedor principal. El formulario va encima con `z-index` mayor.

```jsx
import ParticleBackground from './components/ParticleBackground';

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F8FAFC', // color de fondo base
    }}>
      {/* Fondo de partículas (z-index: 0) */}
      <ParticleBackground />

      {/* Contenido del formulario (z-index: 10, encima de las partículas) */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 400 }}>
        {/* Tu formulario de login aquí */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 32,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h2>Iniciar sesión</h2>
          <form>
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

### Con Tailwind CSS

```jsx
<div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gray-50">
  <ParticleBackground />
  <div className="w-full max-w-sm relative z-10">
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* formulario */}
    </div>
  </div>
</div>
```

---

## Parámetros ajustables

| Parámetro | Ubicación | Default | Efecto |
|---|---|---|---|
| `COLORS` | Constante top | 5 colores | Paleta de colores de las partículas |
| `PARTICLE_COUNT` | Constante top | `180` | Densidad. 100 = sutil, 300 = muy denso |
| `vx` rango | `initParticles` | `±0.3` | Velocidad horizontal. Mayor = más rápido |
| `vy` rango | `initParticles` | `±0.2` | Velocidad vertical |
| `r` rango | `initParticles` | `2–5.5px` | Tamaño de partículas |
| `alpha` rango | `initParticles` | `0.35–0.85` | Opacidad. Menor = más sutil |
| `time += 0.008` | `draw()` | `0.008` | Velocidad de oscilación senoidal |
| `* 0.18` | `draw()` | `0.18` | Amplitud de la oscilación vertical |

---

## Variaciones comunes

### Efecto más sutil (fondo corporativo)
```js
const PARTICLE_COUNT = 80;
// En initParticles:
alpha: 0.15 + Math.random() * 0.25,  // más transparente
r: 1.5 + Math.random() * 2,          // más pequeñas
```

### Efecto más dinámico (landing page)
```js
const PARTICLE_COUNT = 250;
// En initParticles:
vx: (Math.random() - 0.5) * 1.2,     // más rápido
vy: (Math.random() - 0.5) * 0.8,
// En draw():
time += 0.015;                         // oscilación más rápida
```

### Solo 2-3 colores (monocromático)
```js
const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD']; // tonos de azul
```

---

## Versión Vanilla JS (sin React)

Para proyectos sin React, pega este script antes del `</body>`:

```html
<canvas id="particles" style="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;"></canvas>

<script>
(function() {
  const COLORS = ['#FED519', '#F79617', '#7CC141', '#419E46', '#0A9561'];
  const COUNT = 180;
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles, time = 0;

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.4,
      r: 2 + Math.random() * 3.5,
      alpha: 0.35 + Math.random() * 0.5,
      color: COLORS[i % COLORS.length],
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    time += 0.008;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy + Math.sin(time + p.phase) * 0.18;
      if (p.x < -p.r) p.x = w + p.r;
      else if (p.x > w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
      else if (p.y > h + p.r) p.y = -p.r;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  init();
  window.addEventListener('resize', init);
  requestAnimationFrame(draw);
})();
</script>
```

---

## Notas de rendimiento

- Canvas 2D es muy eficiente para este tipo de animación (180 círculos = ~0.5ms por frame)
- En móviles, considera reducir `PARTICLE_COUNT` a 80-100 para ahorrar batería
- El cleanup en `useEffect` es esencial para evitar memory leaks si el componente se desmonta
- `pointerEvents: 'none'` garantiza que el canvas no intercepte ninguna interacción del usuario
