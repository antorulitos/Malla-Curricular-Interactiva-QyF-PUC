const cursos = [
  // Formato: [nombre, semestre (0-indexed), requisitos (por nombre)]
  ["Química General I", 0, []],
  ["Laboratorio de Química General", 0, []],
  ["Introducción a las Ciencias Farmacéuticas", 0, []],
  ["Mundo de los Medicamentos", 0, []],
  ["Precálculo", 0, []],
  ["Filosofía: ¿Para Qué?", 0, []],

  ["Química General II", 1, ["Química General I", "Laboratorio de Química General"]],
  ["Física para Ciencias", 1, []],
  ["Cálculo I", 1, ["Precálculo"]],
  ["Electivo 1", 1, []],
  ["Electivo 2", 1, []],

  ["Química Orgánica I", 2, ["Química General II"]],
  ["Botánica y Farmacognosia", 2, ["Mundo de los Medicamentos", "Química General II"]],
  ["Estadística para Química y Farmacia", 2, ["Cálculo I"]],
  ["Biología de la Célula", 2, []],
  ["Electivo 3", 2, []],

  ["Química Orgánica II", 3, ["Química Orgánica I"]],
  ["Química Analítica I", 3, ["Química General II", "Estadística para Química y Farmacia"]],
  ["Fisiología", 3, ["Biología de la Célula"]],
  ["Electivo Teológico", 3, []],
  ["Electivo 4", 3, []],

  ["Laboratorio de Química Orgánica", 4, ["Química Orgánica II"]],
  ["Bioquímica", 4, ["Química Orgánica II"]],
  ["Química-Física", 4, ["Cálculo I", "Física para Ciencias", "Química General II"]],
  ["Análisis Instrumental", 4, ["Química Analítica I"]],
  ["Fisiopatología", 4, ["Fisiología"]],

  ["Microbiología e Inmunología", 5, ["Fisiología", "Bioquímica"]],
  ["Fármaco-Química I", 5, ["Laboratorio de Química Orgánica", "Química-Física"]],
  ["Farmacocinética y Bio-farmacia", 5, ["Química-Física"]],
  ["Farmacología I", 5, ["Fisiopatología", "Bioquímica"]],
  ["Electivo 5", 5, []],

  ["Fármaco-Química II", 6, ["Fármaco-Química I", "Farmacología I"]],
  ["Tecnología Farmacéutica I", 6, ["Análisis Instrumental", "Farmacocinética y Bio-farmacia"]],
  ["Farmacología II", 6, ["Farmacología I"]],
  ["Bioquímica Clínica", 6, ["Bioquímica", "Fisiopatología", "Química-Física"]],
  ["Electivo 6", 6, []],

  ["Fármaco-Química III", 7, ["Fármaco-Química II"]],
  ["Práctica Profesional II", 7, ["Fármaco-Química II", "Tecnología Farmacéutica II"]],
  ["Internado Clínico", 7, ["Fármaco-Química II", "Farmacología III"]],
  ["Farmacia Privada", 7, ["Fármaco-Química II"]],
  ["Farmacia Clínica y Atención Farmacéutica", 7, ["Fármaco-Química I", "Farmacología II"]],
  ["Tecnología Farmacéutica II", 7, ["Tecnología Farmacéutica I"]],
  ["Práctica Profesional I", 7, ["Tecnología Farmacéutica I"]],
  ["Toxicología", 7, []],
  ["Tesis de grado", 7, []],

  ["Farmacología III", 8, ["Farmacología II"]],
  ["Optativo de Profundización 1", 8, []],
  ["Fármaco-Química III", 8, ["Fármaco-Química II"]],
  ["Legislación y Deontología Farmacéutica", 8, ["Fármaco-Química I"]],
  ["Salud Pública para Química y Farmacia", 9, ["Farmacología I"]],
  ["Optativo de Profundización 2", 9, []],
  ["Optativo de Profundización 3", 9, []],
];

const malla = document.getElementById("malla");

const estado = {};
cursos.forEach(([nombre]) => (estado[nombre] = false));

function actualizarHabilitados() {
  cursos.forEach(([nombre, , requisitos]) => {
    const curso = document.querySelector(`[data-nombre="${nombre}"]`);
    const habilitado = requisitos.every(req => estado[req]);
    curso.classList.toggle("habilitado", habilitado);
  });
}

function crearMalla() {
  const semestres = Array.from({ length: 10 }, (_, i) => {
    const div = document.createElement("div");
    div.classList.add("semestre");
    div.innerHTML = `<h3>Semestre ${i + 1}</h3>`;
    malla.appendChild(div);
    return div;
  });

  cursos.forEach(([nombre, semestre]) => {
    const div = document.createElement("div");
    div.classList.add("curso");
    div.textContent = nombre;
    div.dataset.nombre = nombre;
    div.addEventListener("click", () => {
      if (!div.classList.contains("habilitado") && !estado[nombre]) return;
      estado[nombre] = !estado[nombre];
      div.classList.toggle("aprobado", estado[nombre]);
      actualizarHabilitados();
    });
    semestres[semestre].appendChild(div);
  });

  actualizarHabilitados();
}

crearMalla();
