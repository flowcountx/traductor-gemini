// --- LÓGICA PARA EL MODO OSCURO ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Función para activar/desactivar el modo oscuro
const toggleDarkMode = () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        // Si el modo oscuro está activado
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️'; // Cambia el ícono a un sol
    } else {
        // Si el modo oscuro está desactivado
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙'; // Cambia el ícono a una luna
    }
};

// Comprobar la preferencia del usuario al cargar la página
// Si NUNCA ha elegido el modo claro ('disabled'), se activará el modo oscuro por defecto.
if (localStorage.getItem('darkMode') !== 'disabled') {
    toggleDarkMode();
}

// Añadir el evento de clic al botón
darkModeToggle.addEventListener('click', toggleDarkMode);


// --- LÓGICA DEL TRADUCTOR ---
const textInput = document.getElementById('text-input');
const languageSelector = document.getElementById('language-selector');
const translateBtn = document.getElementById('translate-btn');
const outputContainer = document.getElementById('output-container');
const spinner = document.getElementById('spinner');

translateBtn.addEventListener('click', () => {
    const textToTranslate = textInput.value;
    const targetLanguage = languageSelector.value;

    if (!textToTranslate.trim()) {
        return;
    }

    spinner.style.display = 'block';
    outputContainer.innerText = '';
    translateBtn.disabled = true;

    const prompt = `Traduce el siguiente texto a ${targetLanguage}. Detecta automáticamente el idioma de origen. Responde únicamente con el texto traducido, sin añadir explicaciones ni nada más. El texto es: "${textToTranslate}"`;

    puter.ai.chat(prompt)
        .then(translatedText => {
            outputContainer.innerText = translatedText;
        })
        .catch(error => {
            console.error('Error desde Puter.js:', error);
            outputContainer.innerText = 'Error: No se pudo completar la traducción. Inténtalo de nuevo.';
        })
        .finally(() => {
            spinner.style.display = 'none';
            translateBtn.disabled = false;
        });
});