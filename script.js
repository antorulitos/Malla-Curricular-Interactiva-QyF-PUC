document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');

    // Cargar estado guardado de localStorage
    const completedCourses = new Set(JSON.parse(localStorage.getItem('completedCourses') || '[]'));

    // Función para verificar y actualizar el estado de un ramo
    function updateCourseState(course) {
        const prerequisites = course.dataset.prerequisites ? course.dataset.prerequisites.split(',').map(p => p.trim()) : [];

        if (completedCourses.has(course.id)) {
            // Si el ramo ya está completado
            course.classList.remove('unlocked', 'locked');
            course.classList.add('completed');
        } else {
            // Si el ramo no está completado, verificar si está desbloqueado
            const allPrerequisitesMet = prerequisites.every(prereqId => completedCourses.has(prereqId));
            if (prerequisites.length === 0 || allPrerequisitesMet) {
                course.classList.remove('locked', 'completed');
                course.classList.add('unlocked');
            } else {
                course.classList.remove('unlocked', 'completed');
                course.classList.add('locked');
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
