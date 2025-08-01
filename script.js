const ramos = [
  // PRIMER AÑO
  { id: "quimica1", nombre: "Química General I", semestre: 1, requisitos: [] },
  { id: "lab_quimica1", nombre: "Laboratorio de Química General", semestre: 1, requisitos: [] },
  { id: "intro_ciencias", nombre: "Introducción a las Ciencias Farmacéuticas", semestre: 1, requisitos: [] },
  { id: "mundo_meds", nombre: "Mundo de los Medicamentos", semestre: 1, requisitos: [] },
  { id: "precalculo", nombre: "Precálculo", semestre: 1, requisitos: [] },
  { id: "filosofia", nombre: "Filosofía: ¿Para Qué?", semestre: 1, requisitos: [] },

  { id: "quimica2", nombre: "Química General II", semestre: 2, requisitos: ["quimica1", "lab_quimica1"] },
  { id: "fisica", nombre: "Física para Ciencias", semestre: 2, requisitos: [] },
  { id: "calculo1", nombre: "Cálculo I", semestre: 2, requisitos: ["precalculo"] },
  { id: "electivo1", nombre: "Electivo", semestre: 2, requisitos: [] },
  { id: "electivo2", nombre: "Electivo", semestre: 2, requisitos: [] },

  // SEGUNDO AÑO
  { id: "org1", nombre: "Química Orgánica I", semestre: 3, requisitos: ["quimica2"] },
  { id: "botanica", nombre: "Botánica y Farmacognosia", semestre: 3, requisitos: ["quimica2", "mundo_meds"] },
  { id: "estadistica", nombre: "Estadística para QF", semestre: 3, requisitos: ["calculo1"] },
  { id: "biocel", nombre: "Biología de la Célula", semestre: 3, requisitos: [] },
  { id: "electivo3", nombre: "Electivo", semestre: 3, requisitos: [] },

  { id: "org2", nombre: "Química Orgánica II", semestre: 4, requisitos: ["org1"] },
  { id: "analitica1", nombre: "Química Analítica I", semestre: 4, requisitos: ["quimica2", "estadistica"] },
  { id: "fisiologia", nombre: "Fisiología", semestre: 4, requisitos: ["biocel"] },
  { id: "teo", nombre: "Electivo Teológico", semestre: 4, requisitos: [] },
  { id: "electivo4", nombre: "Electivo", semestre: 4, requisitos: [] },

  // TERCER AÑO
  { id: "lab_org", nombre: "Lab. Química Orgánica", semestre: 5, requisitos: ["org2"] },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 5, requisitos: ["org2"] },
  { id: "quimica_fisica", nombre: "Química-Física", semestre: 5, requisitos: ["quimica2", "fisica", "calculo1"] },
  { id: "instrumental", nombre: "Análisis Instrumental", semestre: 5, requisitos: ["analitica1"] },
  { id: "fisiopato", nombre: "Fisiopatología", semestre: 5, requisitos: ["fisiologia"] },

  { id: "microbio", nombre: "Microbiología e Inmunología", semestre: 6, requisitos: ["bioquimica"] },
  { id: "farmaqui1", nombre: "Fármaco-Química I", semestre: 6, requisitos: ["lab_org", "quimica_fisica"] },
  { id: "farmacocinetica", nombre: "Farmacocinética y Bio-farmacia", semestre: 6, requisitos: ["quimica_fisica"] },
  { id: "farmaco1", nombre: "Farmacología I", semestre: 6, requisitos: ["bioquimica", "fisiopato"] },
  { id: "electivo5", nombre: "Electivo", semestre: 6, requisitos: [] },

  // CUARTO AÑO
  { id: "farmaqui2", nombre: "Fármaco-Química II", semestre: 7, requisitos: ["farmaqui1", "farmaco1"] },
  { id: "tecfarm1", nombre: "Tecnología Farmacéutica I", semestre: 7, requisitos: ["instrumental", "farmacocinetica"] },
  { id: "farmaco2", nombre: "Farmacología II", semestre: 7, requisitos: ["farmaco1"] },
  { id: "bioq_clinica", nombre: "Bioquímica Clínica", semestre: 7, requisitos: ["bioquimica", "quimica_fisica", "fisiopato"] },
  { id: "electivo6", nombre: "Electivo", semestre: 7, requisitos: [] },

  { id: "toxico", nombre: "Toxicología", semestre: 8, requisitos: [] },
  { id: "tesis", nombre: "Tesis de grado", semestre: 8, requisitos: [] },

  // QUINTO AÑO
  { id: "farmaqui3", nombre: "Fármaco-Química III", semestre: 9, requisitos: ["farmaqui2"] },
  { id: "clinica", nombre: "Farmacia Clínica y Atención Farmacéutica", semestre: 9, requisitos: ["farmaqui2", "farmaco2"] },
  { id: "farmaco3", nombre: "Farmacología III", semestre: 9, requisitos: ["farmaco2"] },
  { id: "tecfarm2", nombre: "Tecnología Farmacéutica II", semestre: 9, requisitos: ["tecfarm1"] },
  { id: "optativo1", nombre: "Optativo de Profundización", semestre: 9, requisitos: [] },
  { id: "practica1", nombre: "Práctica Profesional I", semestre: 9, requisitos: ["tecfarm1"] },

  { id: "salud_pub", nombre: "Salud Pública QF", semestre: 10, requisitos: ["farmaco1"] },
  { id: "internado", nombre: "Internado Clínico", semestre: 10, requisitos: ["farmaqui2", "farmaco3"] },
  { id: "privada", nombre: "Farmacia Privada", semestre: 10, requisitos: ["farmaqui2"] },
  { id: "legal", nombre: "Legislación y Deontología Farmacéutica", semestre: 10, requisitos: ["farmaqui1"] },
  { id: "optativo2", nombre: "Optativo de Profundización", semestre: 10, requisitos: [] },
  { id: "optativo3", nombre: "Optativo de Profundización", semestre: 10, requisitos: [] },
  { id: "practica2", nombre: "Práctica Profesional II", semestre: 10, requisitos: ["tecfarm2", "farmaqui2"] }
];

const mallaDiv = document.getElementById("malla");
const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function crearMalla() {
  const semestres = {};
  ramos.forEach(ramo => {
    if (!semestres[ramo.semestre]) semestres[ramo.semestre] = [];
    semestres[ramo.semestre].push(ramo);
  });

  Object.keys(semestres).sort((a, b) => a - b).forEach(num => {
    const columna = document.createElement("div");
    columna.className = "semestre";
    columna.innerHTML = `<h2>Semestre ${num}</h2>`;
    semestres[num].forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.nombre;
      div.id = ramo.id;
      columna.appendChild(div);
    });
    mallaDiv.appendChild(columna);
  });

  actualizarEstado();
}

function actualizarEstado() {
  ramos.forEach(ramo => {
    const div = document.getElementById(ramo.id);
    const aprobado = estado[ramo.id];
    const habilitado = ramo.requisitos.every(req => estado[req]);

    div.classList.remove("aprobado", "bloqueado");

    if (aprobado) {
      div.classList.add("aprobado");
    } else if (!habilitado && ramo.requisitos.length > 0) {
      div.classList.add("bloqueado");
    }

    if (!div.classList.contains("aprobado") && habilitado) {
      div.onclick = () => {
        estado[ramo.id] = true;
        localStorage.setItem("estadoRamos", JSON.stringify(estado));
        actualizarEstado();
      };
    } else {
      div.onclick = null;
    }
  });
}

crearMalla();
