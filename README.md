# 5 CLAVES DE PLANEACIÓN

**Completa las características de Planeación de Producción**

Microjuego educativo web (mobile-first) para aprender y memorizar las **5 características del cuadro "Planeación de Producción"**.

- **Curso:** Optimización I
- **Sesión:** Gimnasio 2 — Modelos de Programación Lineal
- **Fuente académica:** `GYM 2_251005_202412 (1).pdf`, **página 18** (cuadro conceptual "Planeación de Producción")

---

## Objetivo académico

Al terminar la partida, el alumno debe poder recibir el **cuadro vacío de la profesora** de Planeación de Producción y llenar correctamente los cinco espacios:

| # | Característica (texto exacto del juego) |
|---|------------------------------------------|
| 1 | Función objetivo maximizada |
| 2 | Al menos una restricción menor o igual que (≤) |
| 3 | Variables de decisión son niveles de producción |
| 4 | Restricciones = capacidad de materia prima, personal |
| 5 | Las variables son enteras y mayores o iguales que cero (≥ 0) |

Los textos de las respuestas se muestran **exactamente igual** en el banco de preguntas, el feedback de cada estación, el reto final, la pantalla de repaso y la pantalla de resultados. Las preguntas sí varían; las respuestas nunca.

## Mecánica

Una **línea de producción con 5 estaciones**. En cada estación:

1. Una pregunta breve con **3 opciones plausibles**.
2. **TAP** para responder (sin drag & drop).
3. Feedback inmediato (con pista si falla).
4. Al acertar, la estación se activa (luz verde + engrane girando) y **la caja avanza por la banda transportadora**.

Después de las 5 estaciones:

- **Reto final "COMPLETA EL CUADRO":** 8 tarjetas (las 5 correctas + 3 distractores plausibles). El alumno debe seleccionar exactamente las 5 correctas.

La partida termina en la pantalla **¡Planeación completada!** con el cuadro de las 5 claves ✓, tiempo de juego y botones **VOLVER A JUGAR** y **REPASAR LAS 5 CLAVES**.

## Banco de preguntas

- **20 preguntas**: 4 por cada característica (5 grupos).
- Cada partida selecciona **una pregunta aleatoria por grupo**, de modo que **siempre se cubren las 5 características**, pero las preguntas cambian entre intentos.
- La posición de la respuesta correcta se baraja en cada aparición.
- Distractores plausibles tomados de conceptos reales de Programación Lineal (capacidad, coeficientes, demanda, precios, horas disponibles).

## Duración

- 5 estaciones + reto final ≈ **45–90 segundos** por partida.

## Mobile-first

Diseñado primero para **390 × 844 px**:

- Cero overflow horizontal.
- Botones táctiles ≥ 44 px.
- Respuestas largas hacen wrap (2–3 líneas por tarjeta).
- Símbolos ≤ y ≥ claramente visibles.
- Sin scroll durante cada reto; una sola columna; usable con una mano.
- No depende de hover ni solo del color (íconos ✓/✕ en feedback).

## Stack

- HTML + CSS + **JavaScript vanilla** + SVG (sin frameworks, sin build).
- Audio con Web Audio API (opcional, con botón **MUTE/UNMUTE** persistente).
- `data.js` → contenido académico (banco de preguntas, claves exactas, distractores, repaso).
- `script.js` → lógica del juego.

## Estructura

```
index.html                     → estructura y pantallas
styles.css                     → estilos mobile-first
data.js                        → contenido académico
script.js                      → lógica del juego
assets/favicon.svg             → ícono
.github/workflows/pages.yml    → autodeploy a GitHub Pages
```

## Ejecución local

```bash
# desde la carpeta del proyecto
python3 -m http.server 8000
# abrir http://localhost:8000
```

(También basta con abrir `index.html` en el navegador.)

## URL publicada

**https://israeltiburcio-ai.github.io/claves-planeacion-produccion/**

Deploy automático por GitHub Actions en cada push a `main`.

---

*Documento fuente verificado visualmente: página 18 del PDF del Gimnasio 2, cuadro "Planeación de Producción" (no el cuadro de "Proceso de Producción").*
