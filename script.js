const data = {
  "Primer año": {
    "I Semestre": [
      "Química General I",
      "Laboratorio de Química General",
      "Introducción a las Ciencias Farmacéuticas",
      "Mundo de los Medicamentos",
      "Precálculo",
      "Filosofía: ¿Para Qué?"
    ],
    "II Semestre": [
      ["Química General II", ["Química General I", "Laboratorio de Química General"]],
      "Física para Ciencias",
      ["Cálculo I", ["Precálculo"]],
      "Electivo",
      "Electivo"
    ]
  },
  "Segundo año": {
    "III Semestre": [
      ["Química Orgánica I", ["Química General II"]],
      ["Botánica y Farmacognosia", ["Mundo de los Medicamentos", "Química General II"]],
      ["Estadística para Química y Farmacia", ["Cálculo I"]],
      "Biología de la Célula",
      "Electivo"
    ],
    "IV Semestre": [
      ["Química Orgánica II", ["Química Orgánica I"]],
      ["Química Analítica I", ["Química General II", "Estadística para Química y Farmacia"]],
      ["Fisiología", ["Biología de la Célula"]],
      "Electivo Teológico",
      "Electivo"
    ]
  },
  "Tercer año": {
    "V Semestre": [
      ["Laboratorio de Química Orgánica", ["Química Orgánica II"]],
      ["Bioquímica", ["Química Orgánica II"]],
      ["Química-Física", ["Química General II", "Física para Ciencias", "Cálculo I"]],
      ["Análisis Instrumental", ["Química Analítica I"]],
      ["Fisiopatología", ["Fisiología"]]
    ],
    "VI Semestre": [
      ["Microbiología e Inmunología", ["Fisiología", "Bioquímica"]],
      ["Fármaco-Química I", ["Laboratorio de Química Orgánica", "Química-Física"]],
      ["Farmacocinética y Bio-farmacia", ["Química-Física"]],
      ["Farmacología I", ["Bioquímica", "Fisiopatología"]],
      "Electivo"
    ]
  },
  "Cuarto año": {
    "VII Semestre": [
      ["Fármaco-Química II", ["Fármaco-Química I", "Farmacología I"]],
      ["Tecnología Farmacéutica I", ["Análisis Instrumental", "Farmacocinética y Bio-farmacia"]],
      ["Farmacología II", ["Farmacología I"]],
      ["Bioquímica Clínica", ["Bioquímica", "Química-Física", "Fisiopatología"]],
      "Electivo"
    ],
    "VIII Semestre": [
      "Toxicología",
      "Tesis de grado"
    ]
  },
  "Quinto año": {
    "IX Semestre": [
      ["Fármaco-Química III", ["Fármaco-Química II"]],
      ["Farmacia Clínica y Atención Farmacéutica", ["Fármaco-Química I", "Farmacología II"]],
      ["Farmacología III", ["Farmacología II"]],
      ["Tecnología Farmacéutica II", ["Tecnología Farmacéutica I"]],
      "Optativo de Profundización",
      ["Práctica Profesional I", ["Tecnología Farmacéutica I"]]
    ],
    "X Semestre": [
      ["Salud Pública para Química y Farmacia", ["Farmacología I"]],
      ["Internado Clínico", ["Fármaco-Química II", "Farmacología III"]],
      ["Farmacia Privada", ["Fármaco-Química II"]],
      ["Legislación y Deontología Farmacéutica", ["Fármaco-Química I"]],
      "Optativo de Profundización",
      "Optativo de Profundización",
      ["Práctica Profesional II", ["Fármaco-Química II", "Tecnología Farmacéutica II"]]
    ]
  }
};

const estadoRamos = {};

function crearMalla() {
  const malla = document.getElementById("malla");
  for (const [año, semestres] of Object.entries(data)) {
    for (const [nombreSemestre, ramos] of Object.entries(semestres)) {
      const col = document.createElement("div");
      col.className = "semestre";
      col.innerHTML = `<h3>${nombreSemestre}</h3>`;
      ramos.forEach(ramo => {
        const div = document.createElement("div");
        let nombre, requisitos = [];

        if (typeof ramo === "string") {
          nombre = ramo;
        } else {
          [nombre, requisitos] = ramo;
        }

        div.textContent = nombre;
        div.className = "ramo";
        if (requisitos.length) {
          div.classList.add("locked");
        }

        estadoRamos[nombre] = { element: div, requisitos, completado: false };
        div.addEventListener("click", () => toggleRamo(nombre));
        col.appendChild(div);
      });
      malla.appendChild(col);
    }
  }
}

function toggleRamo(nombre) {
  const ramo = estadoRamos[nombre];
  if (ramo.requisitos.length && ramo.requisitos.some(r => !estadoRamos[r]?.completado)) {
    return;
  }

  if (!ramo.completado) {
    ramo.completado = true;
    ramo.element.classList.add("completed");
    ramo.element.classList.remove("locked");
  } else {
    return;
  }

  actualizarRamos();
}

function actualizarRamos() {
  for (const [nombre, ramo] of Object.entries(estadoRamos)) {
    if (!ramo.completado && ramo.requisitos.length) {
      const puedeDesbloquearse = ramo.requisitos.every(r => estadoRamos[r]?.completado);
      if (puedeDesbloquearse) {
        ramo.element.classList.remove("locked");
      }
    }
  }
}

crearMalla();
