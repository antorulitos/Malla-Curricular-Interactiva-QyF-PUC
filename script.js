document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');

    // Cargar estado guardado de localStorage
    const completedCourses = new Set(JSON.parse(localStorage.getItem('completedCourses') || '[]'));

    // Función para verificar y actualizar el estado de un ramo
    function updateCourseState(course) {
        const prerequisites = course.dataset.prerequisites ? course.dataset.prerequisites.split(',') : [];

        // Si el ramo ya está completado, aplicar el estilo de completado
        if (completedCourses.has(course.id)) {
            course.classList.remove('locked');
            course.classList.remove('unlocked');
            course.classList.add('completed');
            course.style.cursor = 'default';
        } else {
            // Si el ramo no está completado, verificar si está desbloqueado
            const allPrerequisitesMet = prerequisites.every(prereqId => completedCourses.has(prereqId.trim()));
            if (prerequisites.length === 0 || allPrerequisitesMet) {
                course.classList.remove('locked');
                course.classList.add('unlocked');
                course.style.cursor = 'pointer';
            } else {
                course.classList.add('locked');
                course.classList.remove('unlocked');
                course.style.cursor = 'not-allowed';
            }
        }
    }

    // Inicializar el estado de todos los ramos al cargar la página
    courses.forEach(updateCourseState);

    // Añadir el event listener para cada ramo
    courses.forEach(course => {
        course.addEventListener('click', () => {
            // Solo se puede hacer clic en ramos desbloqueados y no completados
            if (course.classList.contains('unlocked') && !course.classList.contains('completed')) {
                completedCourses.add(course.id);
                localStorage.setItem('completedCourses', JSON.stringify(Array.from(completedCourses)));

                // Actualizar el estado de todos los ramos para desbloquear los siguientes
                courses.forEach(updateCourseState);
            }
        });
    });
});
