const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');
const toggleColors = document.getElementById('toggle-colors');
const rootStyles = document.documentElement.style;
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

// Función para cambiar el idioma
const changeLanguage = async language => {
    const requestJson = await fetch(`/languages/${language}.json`);
    const texts = await requestJson.json();
    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
}

// Evento para cambiar el idioma
flagsElement.addEventListener("click", (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});

// Modo oscuro
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle("dark");
    if (toggleIcon.src.includes('moon.svg')) {
        toggleIcon.src = 'assets/icons/sun.svg';
        toggleText.textContent = 'Light Mode';
    } else {
        toggleIcon.src = 'assets/icons/moon.svg';
        toggleText.textContent = 'Dark Mode';
    }
});

// Cambio de colores
toggleColors.addEventListener('click', (e) => {
    if (e.target.dataset.color) {
        const selectedColor = e.target.dataset.color;
        rootStyles.setProperty("--primary-color", selectedColor);
        localStorage.setItem('selectedColor', selectedColor); // Guarda el color seleccionado en el almacenamiento local
    }
});

// Carga el color seleccionado desde el almacenamiento local
document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        rootStyles.setProperty("--primary-color", savedColor);
    }
});
