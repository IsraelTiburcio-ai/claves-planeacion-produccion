/* ============================================================
   5 CLAVES DE PLANEACIÓN — data.js
   Contenido académico (fuente: GYM 2, página 18 — cuadro
   "Planeación de Producción", Optimización I).

   REGLA: los textos en `clave` y `feedback` son EXACTOS.
   No parafrasear, no abreviar, no sustituir.
   ============================================================ */

/* --- Las 5 respuestas exactas (texto final del cuadro) --- */
const CLAVES_EXACTAS = [
  "Función objetivo maximizada",
  "Al menos una restricción menor o igual que (≤)",
  "Variables de decisión son niveles de producción",
  "Restricciones = capacidad de materia prima, personal",
  "Las variables son enteras y mayores o iguales que cero (≥ 0)"
];

/* --- Distractores del reto final (plausibles, INCORRECTOS) --- */
const DISTRACTORES_FINALES = [
  "Función objetivo minimizada",
  "Variables de decisión son capacidades disponibles",
  "Todas las restricciones son mayores o iguales que (≥)"
];

/* --- Banco: 5 grupos × 4 preguntas = 20 preguntas --- */
/* correcta = índice de la opción correcta ANTES de barajar. */
const GRUPOS = [
  {
    id: 1,
    chip: "ESTACIÓN 1 · FUNCIÓN OBJETIVO",
    nombre: "Función objetivo",
    color: "#ffb020",
    clave: "Función objetivo maximizada",
    feedback: "Función objetivo maximizada.",
    accion: "Se activa el objetivo de producción",
    preguntas: [
      {
        q: "Según el cuadro de Planeación de Producción, ¿qué característica tiene la función objetivo?",
        opciones: ["Maximizada", "Minimizada", "Puede omitirse"],
        correcta: 0,
        hint: "En producción se busca la mayor utilidad, no la menor."
      },
      {
        q: "¿Cuál expresión corresponde a la orientación de la función objetivo en este planteamiento?",
        opciones: ["MAX Z", "MIN Z", "Z = 0"],
        correcta: 0,
        hint: "El cuadro pide obtener el valor más grande posible de Z."
      },
      {
        q: "En la práctica Baya Extra (compañía ANCE) se busca la mayor utilidad. ¿Cómo se plantea su función objetivo?",
        opciones: [
          "Max Z = (100−50)x<sub>1</sub> + (300−200)x<sub>2</sub> + …",
          "Min Z = (100−50)x<sub>1</sub> + (300−200)x<sub>2</sub> + …",
          "Z = 100 + 300 + 160 + 250"
        ],
        correcta: 0,
        hint: "Precio de venta menos costo, buscando el máximo."
      },
      {
        q: "¿Qué busca la función objetivo en un problema de Planeación de Producción?",
        opciones: [
          "El valor máximo de la utilidad",
          "El valor mínimo de la utilidad",
          "Que Z valga exactamente cero"
        ],
        correcta: 0,
        hint: "Mayor utilidad posible."
      }
    ]
  },
  {
    id: 2,
    chip: "ESTACIÓN 2 · RESTRICCIONES",
    nombre: "Restricción ≤",
    color: "#58c7f3",
    clave: "Al menos una restricción menor o igual que (≤)",
    feedback: "Al menos una restricción menor o igual que (≤).",
    accion: "Aparece un límite de capacidad",
    preguntas: [
      {
        q: "¿Cuál condición debe aparecer al menos una vez entre las restricciones?",
        opciones: ["Una restricción ≤", "Todas las restricciones ≥", "Todas las restricciones ="],
        correcta: 0,
        hint: "Los recursos disponibles limitan: no puedes usar más de lo que hay."
      },
      {
        q: "¿Cuál de estas expresiones puede representar un límite de capacidad?",
        opciones: ["2x<sub>1</sub> + x<sub>2</sub> ≤ 100", "2x<sub>1</sub> + x<sub>2</sub> ≥ 100", "2x<sub>1</sub> + x<sub>2</sub> ≠ 100"],
        correcta: 0,
        hint: "La capacidad disponible funciona como un techo."
      },
      {
        q: "En el modelo del gimnasio, las horas de corte se comparan con 400 h disponibles. ¿Qué línea corresponde?",
        opciones: [
          "X<sub>1</sub>/25 + X<sub>2</sub>/6 + X<sub>3</sub>/20 + X<sub>4</sub>/10 ≤ 400",
          "X<sub>1</sub>/25 + X<sub>2</sub>/6 + X<sub>3</sub>/20 + X<sub>4</sub>/10 ≥ 400",
          "X<sub>1</sub>/25 + X<sub>2</sub>/6 + X<sub>3</sub>/20 + X<sub>4</sub>/10 = utilidad"
        ],
        correcta: 0,
        hint: "Las horas usadas no pueden pasar de 400."
      },
      {
        q: "Si TODAS las restricciones fueran ≥, ¿qué riesgo aparece en las soluciones?",
        opciones: ["Soluciones no acotadas", "La función objetivo se maximiza sola", "Las variables se vuelven precios"],
        correcta: 0,
        hint: "Una zona factible infinita impide hallar un máximo."
      }
    ]
  },
  {
    id: 3,
    chip: "ESTACIÓN 3 · VARIABLES DE DECISIÓN",
    nombre: "Variables",
    color: "#a78bfa",
    clave: "Variables de decisión son niveles de producción",
    feedback: "Variables de decisión son niveles de producción.",
    accion: "Se define cuánto producir",
    preguntas: [
      {
        q: "¿Qué representan las variables de decisión?",
        opciones: ["Niveles de producción", "Capacidad disponible", "Coeficientes de utilidad"],
        correcta: 0,
        hint: "Son lo que tú decides: cuánto fabricar."
      },
      {
        q: "Si x<sub>1</sub> es una variable de decisión, ¿qué interpretación corresponde a este tipo de planteamiento?",
        opciones: [
          "Nivel de producción",
          "Cantidad total de materia prima disponible",
          "Coeficiente de la función objetivo"
        ],
        correcta: 0,
        hint: "x<sub>1</sub> cuenta unidades fabricadas."
      },
      {
        q: "En el modelo del gimnasio, X<sub>1</sub>, X<sub>2</sub>, X<sub>3</sub>, X<sub>4</sub> representan…",
        opciones: [
          "# de artículos a producir de cada tipo",
          "Horas disponibles de cada departamento",
          "Precios de venta de cada producto"
        ],
        correcta: 0,
        hint: "Una variable por cada producto a fabricar."
      },
      {
        q: "En la solución, x<sub>2</sub> = 300 unidades fabricadas. ¿Qué es x<sub>2</sub> dentro del modelo?",
        opciones: [
          "Una variable de decisión: un nivel de producción",
          "Una capacidad de horas del departamento",
          "Un precio de venta por unidad"
        ],
        correcta: 0,
        hint: "Es una cantidad que el modelo decide producir."
      }
    ]
  },
  {
    id: 4,
    chip: "ESTACIÓN 4 · CAPACIDAD",
    nombre: "Capacidad",
    color: "#f472b6",
    clave: "Restricciones = capacidad de materia prima, personal",
    feedback: "Restricciones = capacidad de materia prima, personal.",
    accion: "Se muestran recursos de materia prima y personal",
    preguntas: [
      {
        q: "¿Qué representan las restricciones?",
        opciones: [
          "Capacidad de materia prima y personal",
          "Niveles de producción",
          "Utilidad total"
        ],
        correcta: 0,
        hint: "Recursos limitados: insumos y gente disponible."
      },
      {
        q: "Una restricción como 2x<sub>1</sub> + x<sub>2</sub> ≤ 100 podría utilizarse principalmente para representar:",
        opciones: ["Una capacidad disponible", "Una función objetivo", "Una variable de decisión"],
        correcta: 0,
        hint: "El lado derecho es la cantidad disponible del recurso."
      },
      {
        q: "En el gimnasio, 0.50x<sub>1</sub> + 0.80x<sub>2</sub> ≤ 1200 limita los m² de lámina. ¿Qué representa esa restricción?",
        opciones: [
          "Capacidad de materia prima",
          "Demanda mínima mensual",
          "La utilidad por unidad"
        ],
        correcta: 0,
        hint: "La lámina es un insumo con existencia limitada."
      },
      {
        q: "¿De qué recursos habla el cuadro al definir las restricciones?",
        opciones: [
          "Materia prima y personal",
          "Demanda y precios",
          "Coeficientes y constantes"
        ],
        correcta: 0,
        hint: "Lo que se compra y lo que trabaja."
      }
    ]
  },
  {
    id: 5,
    chip: "ESTACIÓN 5 · CONDICIÓN DE VARIABLES",
    nombre: "Variables enteras ≥ 0",
    color: "#34d399",
    clave: "Las variables son enteras y mayores o iguales que cero (≥ 0)",
    feedback: "Las variables son enteras y mayores o iguales que cero (≥ 0).",
    accion: "El producto terminado sale de la línea",
    preguntas: [
      {
        q: "¿Qué condición deben cumplir las variables?",
        opciones: [
          "Ser enteras y ≥ 0",
          "Ser necesariamente negativas",
          "Ser exclusivamente decimales"
        ],
        correcta: 0,
        hint: "No se producen fracciones de pieza ni cantidades negativas."
      },
      {
        q: "¿Cuál condición corresponde a las variables?",
        opciones: [
          "x<sub>i</sub> ∈ ℤ y x<sub>i</sub> ≥ 0",
          "x<sub>i</sub> &lt; 0",
          "0 &lt; x<sub>i</sub> &lt; 1 obligatoriamente"
        ],
        correcta: 0,
        hint: "Enteras y no negativas."
      },
      {
        q: "En el modelo manuscrito aparece: X<sub>1</sub>, X<sub>2</sub>, X<sub>3</sub>, X<sub>4</sub> ∈ ℤ y X<sub>i</sub> ≥ 0. ¿Qué indica esa línea?",
        opciones: [
          "Las variables deben ser enteras y no negativas",
          "Las variables pueden tomar cualquier valor real",
          "Las variables dependen de la demanda"
        ],
        correcta: 0,
        hint: "ℤ = enteros; ≥ 0 = no negativos."
      },
      {
        q: "En la solución propuesta, x<sub>3</sub> = 150.5 unidades. ¿Por qué NO cumple la condición del cuadro?",
        opciones: [
          "Porque las variables deben ser enteras y ≥ 0",
          "Porque 150.5 es mayor que la capacidad",
          "Porque le falta multiplicarse por el precio"
        ],
        correcta: 0,
        hint: "Medio artículo no se puede producir."
      }
    ]
  }
];

/* --- Textos de repaso (pantalla REPASAR LAS 5 CLAVES) --- */
const REPASO = [
  { n: 1, color: "#ffb020", texto: "Función objetivo maximizada", detalle: "Se busca el mayor valor de Z: la utilidad máxima." },
  { n: 2, color: "#58c7f3", texto: "Al menos una restricción menor o igual que (≤)", detalle: "Al menos una restricción usa ≤: un límite de recurso." },
  { n: 3, color: "#a78bfa", texto: "Variables de decisión son niveles de producción", detalle: "Las variables indican cuánto producir de cada artículo." },
  { n: 4, color: "#f472b6", texto: "Restricciones = capacidad de materia prima, personal", detalle: "Los recursos limitantes: insumos y personal disponible." },
  { n: 5, color: "#34d399", texto: "Las variables son enteras y mayores o iguales que cero (≥ 0)", detalle: "Unidades completas y nunca negativas." }
];
