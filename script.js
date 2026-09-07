/* ============================================================
   5 CLAVES DE PLANEACIÓN — script.js
   Lógica del juego: estaciones, reto final, audio y accesibilidad.
   ============================================================ */
"use strict";

/* ---------- Utilidades ---------- */
const $ = (sel) => document.querySelector(sel);
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const SVG_NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent = null) => {
  const n = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (parent) parent.appendChild(n);
  return n;
};
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Audio (WebAudio, sin archivos) ---------- */
const FX = (() => {
  let ctx = null;
  let muted = localStorage.getItem("claves-mute") === "1";
  const ensure = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  };
  const beep = (freq, dur, type = "sine", vol = 0.16, when = 0, slide = 0) => {
    if (muted) return;
    const c = ensure();
    if (!c) return;
    const t = c.currentTime + when;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(c.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  };
  return {
    tap() { beep(340, 0.06, "square", 0.07); },
    correct() {
      beep(523, 0.09, "sine", 0.16);
      beep(659, 0.09, "sine", 0.16, 0.09);
      beep(784, 0.14, "sine", 0.16, 0.18);
    },
    wrong() { beep(200, 0.16, "sawtooth", 0.12, 0, -90); },
    machine() { beep(90, 0.18, "triangle", 0.2, 0, -30); beep(140, 0.1, "square", 0.06, 0.05); },
    fanfare() {
      [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.14, "triangle", 0.16, i * 0.11));
      beep(1319, 0.3, "sine", 0.14, 0.46);
    },
    get muted() { return muted; },
    toggle() {
      muted = !muted;
      localStorage.setItem("claves-mute", muted ? "1" : "0");
      return muted;
    }
  };
})();

/* ---------- Referencias DOM ---------- */
const screens = {
  start: $("#screen-start"),
  game: $("#screen-game"),
  final: $("#screen-final"),
  result: $("#screen-result"),
  review: $("#screen-review"),
};
const btnMute = $("#btn-mute");
const iconSlash = $("#snd-slash");
const iconWaves = $("#snd-waves");

let reviewOrigin = "start";

/* ---------- SVG: fábrica (banda + estaciones) ---------- */
const STATION_X = [44, 112, 180, 248, 316];
const BELT_Y = 84;

function gearPath(cx, cy, r = 8, teeth = 8) {
  let d = "";
  const inner = r * 0.72;
  for (let i = 0; i < teeth * 2; i++) {
    const rad = (Math.PI * i) / teeth;
    const rr = i % 2 === 0 ? r : inner;
    const x = cx + rr * Math.cos(rad);
    const y = cy + rr * Math.sin(rad);
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2);
  }
  return d + "Z";
}

function buildFactory(svg, withCrate) {
  svg.innerHTML = "";
  /* banda transportadora */
  el("rect", { x: 16, y: BELT_Y, width: 328, height: 18, rx: 9, class: "belt-band" }, svg);
  el("line", { x1: 26, y1: BELT_Y + 9, x2: 334, y2: BELT_Y + 9, class: "belt-tread" }, svg);
  [52, 132, 212, 292].forEach((x) =>
    el("circle", { cx: x, cy: BELT_Y + 20, r: 6, class: "roller" }, svg)
  );

  /* 5 estaciones */
  STATION_X.forEach((cx, i) => {
    const g = el("g", { class: "station", "data-i": i, style: `--sc:${GRUPOS[i].color}` }, svg);
    el("rect", { x: cx - 3, y: 44, width: 6, height: BELT_Y - 44, class: "post" }, g);
    el("circle", { cx, cy: 10, r: 4.5, class: "lamp" }, g);
    el("rect", { x: cx - 20, y: 18, width: 40, height: 26, rx: 6, class: "machine-box" }, g);
    el("rect", { x: cx - 13, y: 25, width: 12, height: 12, rx: 2, class: "machine-slot" }, g);
    el("path", { d: gearPath(cx + 6, 31, 6), fill: "#4a5b8f", class: "gear" }, g);
  });

  if (withCrate) {
    const crate = el("g", { id: "crate" }, svg);
    el("rect", { x: -14, y: -14, width: 28, height: 28, rx: 4, class: "crate-box" }, crate);
    el("line", { x1: 0, y1: -14, x2: 0, y2: 14, class: "crate-tape" }, crate);
    const badge = el("g", { id: "done-badge", transform: "translate(14,-20)" }, crate);
    el("circle", { cx: 0, cy: 0, r: 9 }, badge);
    el("path", { d: "M-4.5 0.2 L-1.2 3.6 L5 -3" }, badge);
    crate.style.transform = `translate(44px, ${BELT_Y - 14}px)`;
  }
}

function setStationState(container, idx, state) {
  container.querySelectorAll(".station").forEach((st, i) => {
    st.classList.toggle("active", i === idx && state === "active");
    st.classList.toggle("done", i < idx || (i === idx && state === "done"));
  });
}

function moveCrate(svg, idx) {
  const crate = svg.querySelector("#crate");
  if (!crate) return;
  if (REDUCED) crate.style.transition = "none";
  crate.style.transform = `translate(${STATION_X[idx]}px, ${BELT_Y - 14}px)`;
}

/* ---------- SVG: hub "Planeación de Producción" ---------- */
function buildHub(svg, idSuffix) {
  svg.innerHTML = "";
  const defs = el("defs", {}, svg);
  const grad = el("linearGradient", { id: "hubGrad-" + idSuffix, x1: "0", y1: "0", x2: "1", y2: "1" }, defs);
  el("stop", { offset: "0", "stop-color": "#ffb020" }, grad);
  el("stop", { offset: "1", "stop-color": "#ff7a1a" }, grad);

  const cx = 160, topY = 8, boxW = 168, boxH = 58, boxX = cx - boxW / 2;
  const dotY = 124, dotXs = [40, 100, 160, 220, 280];

  el("rect", { x: boxX, y: topY, width: boxW, height: boxH, rx: 14, class: "hub-box", fill: `url(#hubGrad-${idSuffix})` }, svg);
  const txt = el("text", {
    x: cx, y: topY + 18, "text-anchor": "middle",
    fill: "#241300", "font-weight": "800", "font-family": "Archivo, sans-serif",
  }, svg);
  [
    { t: "PLANEACIÓN", s: 14, dy: 0 },
    { t: "DE", s: 9, dy: 14 },
    { t: "PRODUCCIÓN", s: 14, dy: 14 },
  ].forEach((line, i) => {
    const tspan = el("tspan", { x: cx, dy: i === 0 ? 0 : line.dy, "font-size": line.s }, txt);
    tspan.textContent = line.t;
  });

  dotXs.forEach((x, i) => {
    el("line", { x1: cx, y1: topY + boxH, x2: x, y2: dotY, class: "hub-spoke" }, svg);
    el("circle", {
      cx: x, cy: dotY, r: 8, class: "hub-dot",
      style: `--c:${GRUPOS[i].color}`, "data-i": i,
    }, svg);
  });
}

function lightHub(svg, upTo) {
  svg.querySelectorAll(".hub-dot").forEach((d, i) => {
    d.classList.toggle("lit", i <= upTo);
  });
}

/* ---------- Estado ---------- */
const state = {
  partida: [],
  estacion: 0,
  fallosPrimerIntento: 0,
  t0: null,
  seleccion: new Set(),
};

function mostrarPantalla(nombre) {
  Object.entries(screens).forEach(([k, s]) => s.classList.toggle("active", k === nombre));
  const focusables = {
    start: "#start-title",
    game: "#question",
    final: "#final-title",
    result: "#result-title",
    review: "#review-title",
  };
  const f = document.querySelector(focusables[nombre]);
  if (f) f.focus({ preventScroll: true });
}

/* ---------- Riel de progreso ---------- */
function buildRail(current, doneCount) {
  const track = $("#rail-track");
  track.innerHTML = "";
  GRUPOS.forEach((g, i) => {
    if (i > 0) {
      const seg = document.createElement("span");
      seg.className = "rail-seg";
      track.appendChild(seg);
    }
    const dot = document.createElement("span");
    dot.className = "rail-dot";
    dot.style.setProperty("--dotc", g.color);
    if (i < doneCount) dot.classList.add("done");
    else if (i === current) dot.classList.add("current");
    dot.setAttribute("role", "presentation");
    track.appendChild(dot);
  });
  $("#rail-count").textContent = `${Math.min(current + 1, 5)} / 5`;
}

/* ---------- Partida ---------- */
function nuevaPartida() {
  state.partida = GRUPOS.map((g) => {
    const preg = g.preguntas[Math.floor(Math.random() * g.preguntas.length)];
    const orden = shuffle([0, 1, 2]);
    return {
      grupo: g,
      pregunta: preg,
      opciones: orden.map((i) => preg.opciones[i]),
      correcta: orden.indexOf(preg.correcta),
      tocada: false,
    };
  });
  state.estacion = 0;
  state.fallosPrimerIntento = 0;
  state.t0 = Date.now();
  buildFactory($("#belt-svg"), true);
  buildFactory($("#start-svg"), false);
  mostrarPantalla("game");
  renderEstacion(0);
}

function renderEstacion(idx) {
  state.estacion = idx;
  const item = state.partida[idx];
  const g = item.grupo;

  buildRail(idx, idx);
  setStationState($("#belt-svg"), idx, "active");
  moveCrate($("#belt-svg"), idx);

  const chip = $("#station-chip");
  chip.textContent = g.chip;
  chip.style.setProperty("--c", g.color);

  const q = $("#question");
  q.innerHTML = item.pregunta.q;
  q.focus({ preventScroll: true });

  const opts = $("#options");
  opts.innerHTML = "";
  item.opciones.forEach((op, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option";
    b.innerHTML = `<span class="marker" aria-hidden="true"></span><span>${op}</span>`;
    b.setAttribute("aria-label", `Opción ${String.fromCharCode(65 + i)}: ${b.textContent}`);
    b.addEventListener("click", () => responder(i, b));
    opts.appendChild(b);
  });

  const fb = $("#feedback");
  fb.className = "feedback";
  fb.innerHTML = `<span class="fb-ico" aria-hidden="true">·</span><span>Elige la opción correcta para activar la estación.</span>`;
}

function responder(i, btn) {
  const item = state.partida[state.estacion];
  if (!item || btn.disabled) return;
  FX.tap();

  if (i === item.correcta) {
    btn.classList.add("is-correct");
    btn.disabled = true;
    const fb = $("#feedback");
    fb.className = "feedback ok";
    fb.innerHTML = `<span class="fb-ico" aria-hidden="true">✓</span><span><b>Correcto.</b> ${item.grupo.feedback}</span>`;

    /* animación de fábrica */
    FX.machine();
    setStationState($("#belt-svg"), state.estacion, "done");
    buildRail(state.estacion + 1, state.estacion + 1);
    setTimeout(() => {
      if (state.estacion < 4) {
        moveCrate($("#belt-svg"), state.estacion + 1);
      } else {
        moveCrate($("#belt-svg"), 4);
        const badge = $("#belt-svg").querySelector("#done-badge");
        if (badge) badge.classList.add("show");
        FX.fanfare();
      }
    }, 120);

    if (state.estacion < 4) {
      setTimeout(() => renderEstacion(state.estacion + 1), REDUCED ? 250 : 900);
    } else {
      setTimeout(mostrarRetoFinal, REDUCED ? 250 : 1300);
    }
  } else {
    if (!item.tocada) {
      state.fallosPrimerIntento++;
      item.tocada = true;
    }
    btn.classList.add("is-wrong");
    btn.disabled = true;
    const fb = $("#feedback");
    fb.className = "feedback err";
    fb.innerHTML = `<span class="fb-ico" aria-hidden="true">✕</span><span><b>Incorrecto.</b> Pista: ${item.pregunta.hint}</span>`;
    FX.wrong();
  }
}

/* ---------- Reto final ---------- */
function mostrarRetoFinal() {
  state.seleccion = new Set();
  buildHub($("#hub-svg"), "final");
  lightHub($("#hub-svg"), -1);

  const correctas = CLAVES_EXACTAS.map((t) => ({ t, ok: true }));
  const distractores = DISTRACTORES_FINALES.map((t) => ({ t, ok: false }));
  const mezcla = shuffle([...correctas, ...distractores]);

  const cont = $("#cards");
  cont.innerHTML = "";
  mezcla.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "card";
    b.setAttribute("aria-pressed", "false");
    b.innerHTML = `<span class="tick" aria-hidden="true"></span><span>${c.t}</span>`;
    b.dataset.ok = c.ok ? "1" : "0";
    b.addEventListener("click", () => toggleCard(b));
    cont.appendChild(b);
  });

  $("#card-counter").textContent = "0 / 5 seleccionadas";
  $("#btn-check").disabled = true;
  const fb = $("#final-feedback");
  fb.className = "feedback";
  fb.innerHTML = `<span class="fb-ico" aria-hidden="true">·</span><span>Marca exactamente las 5 características correctas.</span>`;
  mostrarPantalla("final");
}

function toggleCard(btn) {
  if (btn.disabled) return;
  FX.tap();
  const key = btn.querySelector("span:last-child").textContent;
  if (state.seleccion.has(key)) {
    state.seleccion.delete(key);
    btn.setAttribute("aria-pressed", "false");
  } else {
    state.seleccion.add(key);
    btn.setAttribute("aria-pressed", "true");
  }
  const n = state.seleccion.size;
  $("#card-counter").textContent = `${n} / 5 seleccionadas`;
  $("#btn-check").disabled = n !== 5;
  const fb = $("#final-feedback");
  if (fb.classList.contains("err") || fb.classList.contains("ok")) {
    fb.className = "feedback";
    fb.innerHTML = `<span class="fb-ico" aria-hidden="true">·</span><span>Marca exactamente las 5 características correctas.</span>`;
  }
}

function comprobarCuadro() {
  const botones = [...$("#cards").querySelectorAll(".card")];
  const malas = botones.filter((b) => b.getAttribute("aria-pressed") === "true" && b.dataset.ok === "0");
  const fb = $("#final-feedback");

  if (malas.length === 0) {
    botones.forEach((b) => {
      if (b.dataset.ok === "1") {
        b.classList.add("is-good");
        b.disabled = true;
      }
    });
    lightHub($("#hub-svg"), 4);
    fb.className = "feedback ok";
    fb.innerHTML = `<span class="fb-ico" aria-hidden="true">✓</span><span><b>¡Cuadro completo!</b> Las 5 características son correctas.</span>`;
    $("#btn-check").disabled = true;
    FX.fanfare();
    setTimeout(mostrarResultado, REDUCED ? 300 : 1400);
  } else {
    malas.forEach((b) => {
      b.classList.add("is-bad");
      b.disabled = true;
    });
    FX.wrong();
    fb.className = "feedback err";
    fb.innerHTML = `<span class="fb-ico" aria-hidden="true">✕</span><span><b>${malas.length === 1 ? "1 tarjeta no pertenece" : malas.length + " tarjetas no pertenecen"}</b> al cuadro. Se desmarcan: revisa e intenta de nuevo.</span>`;
    setTimeout(() => {
      malas.forEach((b) => {
        b.classList.remove("is-bad");
        b.disabled = false;
        b.setAttribute("aria-pressed", "false");
        state.seleccion.delete(b.querySelector("span:last-child").textContent);
      });
      const n = state.seleccion.size;
      $("#card-counter").textContent = `${n} / 5 seleccionadas`;
      $("#btn-check").disabled = n !== 5;
    }, REDUCED ? 100 : 1100);
  }
}

/* ---------- Resultado ---------- */
function mostrarResultado() {
  const seg = Math.round((Date.now() - state.t0) / 1000);
  buildHub($("#hub2-svg"), "res");
  lightHub($("#hub2-svg"), 4);

  const ul = $("#clave-list");
  ul.innerHTML = "";
  CLAVES_EXACTAS.forEach((t, i) => {
    const li = document.createElement("li");
    li.style.setProperty("--c", GRUPOS[i].color);
    li.style.setProperty("--i", i);
    li.innerHTML = `<span class="check" aria-hidden="true">✓</span><span>${t}</span>`;
    ul.appendChild(li);
  });

  const primerIntento = 5 - state.fallosPrimerIntento;
  $("#stats").innerHTML = `
    <span class="stat">⏱ <b>${seg}s</b></span>
    <span class="stat">Estaciones al primer intento: <b>${primerIntento}/5</b></span>`;

  mostrarPantalla("result");
}

/* ---------- Repaso ---------- */
function abrirRepaso(desde) {
  reviewOrigin = desde;
  const ul = $("#review-list");
  ul.innerHTML = "";
  REPASO.forEach((r) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="rev-top">
        <span class="num" style="--c:${r.color}">${r.n}</span>
        <span class="rev-text">${r.texto}</span>
      </div>
      <span class="rev-det">${r.detalle}</span>`;
    ul.appendChild(li);
  });
  mostrarPantalla("review");
}

/* ---------- Mute ---------- */
function pintarMute() {
  const m = FX.muted;
  btnMute.setAttribute("aria-pressed", m ? "true" : "false");
  btnMute.setAttribute("aria-label", m ? "Activar efectos de sonido" : "Silenciar efectos de sonido");
  iconSlash.style.display = m ? "" : "none";
  iconWaves.style.display = m ? "none" : "";
}

/* ---------- Eventos ---------- */
$("#btn-start").addEventListener("click", () => { FX.tap(); nuevaPartida(); });
$("#btn-replay").addEventListener("click", () => { FX.tap(); nuevaPartida(); });
$("#btn-check").addEventListener("click", () => { FX.tap(); comprobarCuadro(); });
$("#btn-review-start").addEventListener("click", () => { FX.tap(); abrirRepaso("start"); });
$("#btn-review-result").addEventListener("click", () => { FX.tap(); abrirRepaso("result"); });
$("#btn-review-back").addEventListener("click", () => {
  FX.tap();
  mostrarPantalla(reviewOrigin === "result" ? "result" : "start");
});
btnMute.addEventListener("click", () => { FX.toggle(); pintarMute(); FX.tap(); });

/* ---------- Inicialización ---------- */
buildFactory($("#start-svg"), false);
buildHub($("#hub2-svg"), "res");
lightHub($("#hub2-svg"), 4);
pintarMute();
