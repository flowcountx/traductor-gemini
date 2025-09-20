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

// Comprobar la preferencia del usuario al cargar la página.
// Si NUNCA ha elegido el modo claro ('disabled'), se activará el modo oscuro por defecto.
if (localStorage.getItem('darkMode') !== 'disabled') {
    toggleDarkMode();
}

// Añadir el evento de clic al botón del tema
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

    // Validación para no traducir si no hay texto
    if (!textToTranslate.trim()) {
        return;
    }

    // Actualizar la interfaz para el estado de carga
    spinner.style.display = 'block';
    outputContainer.innerText = '';
    translateBtn.disabled = true;

    // Crear la instrucción detallada para la IA
    const prompt = `Traduce el siguiente texto a ${targetLanguage}. Detecta automáticamente el idioma de origen. Responde únicamente con el texto traducido, sin añadir explicaciones ni nada más. El texto es: "${textToTranslate}"`;

    // ¡Aquí está la magia! Llamamos a Puter.js y le especificamos que use Gemini.
    puter.ai.chat(prompt, { model: 'gemini-1.0-pro' })
        .then(translatedText => {
            // Si la traducción es exitosa, la mostramos
            outputContainer.innerText = translatedText;
        })
        .catch(error => {
            // Si hay un error, lo mostramos en la consola y al usuario
            console.error('Error desde Puter.js:', error);
            outputContainer.innerText = 'Error: No se pudo completar la traducción. Inténtalo de nuevo.';
        })
        .finally(() => {
            // Esto se ejecuta siempre al final, para limpiar la interfaz
            spinner.style.display = 'none';
            translateBtn.disabled = false;
        });
});