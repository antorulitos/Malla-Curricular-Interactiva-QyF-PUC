document.addEventListener('DOMContentLoaded', () => {
    const courses = document.querySelectorAll('.course');
    const completedCourses = new Set(); // To store IDs of completed courses

    // Load saved state from localStorage
    loadCourseState();

    courses.forEach(course => {
        // Check if the course is already completed from previous session
        if (completedCourses.has(course.id)) {
            course.classList.add('completed');
            course.classList.remove('locked');
        }

        // Initial check for locking/unlocking based on prerequisites
        checkCourseLockStatus(course);

        course.addEventListener('click', () => {
            // Only allow clicking if the course is not locked and not already completed
            if (!course.classList.contains('locked') && !course.classList.contains('completed')) {
                course.classList.add('completed');
                completedCourses.add(course.id); // Add to completed set
                saveCourseState(); // Save state

                // Unlock dependent courses
                unlockDependentCourses(course.id);
            }
        });
    });

    function checkCourseLockStatus(course) {
        const prerequisites = course.dataset.prerequisites ? course.dataset.prerequisites.split(',') : [];

        if (prerequisites.length > 0) {
            const allPrerequisitesMet = prerequisites.every(prereqId => completedCourses.has(prereqId.trim()));
            if (allPrerequisitesMet) {
                course.classList.remove('locked');
            } else {
                course.classList.add('locked');
            }
        }
    }

    function unlockDependentCourses(completedCourseId) {
        courses.forEach(course => {
            const prerequisites = course.dataset.prerequisites ? course.dataset.prerequisites.split(',') : [];
            if (prerequisites.includes(completedCourseId)) {
                // If this course has the just-completed course as a prerequisite, re-check its lock status
                checkCourseLockStatus(course);
            }
        });
    }

    function saveCourseState() {
        localStorage.setItem('completedCourses', JSON.stringify(Array.from(completedCourses)));
    }

    function loadCourseState() {
        const savedState = localStorage.getItem('completedCourses');
        if (savedState) {
            const savedCourseIds = JSON.parse(savedState);
            savedCourseIds.forEach(id => completedCourses.add(id));
        }
    }

    // After loading, iterate through all courses again to apply initial lock/unlock states
    // This is important for courses that might be unlocked by multiple prerequisites
    // and for cases where page is reloaded.
    courses.forEach(course => {
        checkCourseLockStatus(course);
    });
});
