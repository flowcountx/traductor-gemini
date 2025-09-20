// --- LÓGICA PARA EL MODO OSCURO ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

const toggleDarkMode = () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙';
    }
};

if (localStorage.getItem('darkMode') !== 'disabled') {
    toggleDarkMode();
}

darkModeToggle.addEventListener('click', toggleDarkMode);


// --- LÓGICA DEL TRADUCTOR ---
const textInput = document.getElementById('text-input');
const languageSelector = document.getElementById('language-selector');
const translateBtn = document.getElementById('translate-btn');
const outputContainer = document.getElementById('output-container');
const spinner = document.getElementById('spinner');

// Nuevos botones
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');


// Evento para el botón de limpiar
clearBtn.addEventListener('click', () => {
    textInput.value = '';
});

// Evento para el botón de copiar
copyBtn.addEventListener('click', () => {
    const textToCopy = outputContainer.innerText;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Feedback visual para el usuario
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000); // Vuelve al ícono original después de 2 segundos
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    }
});


// Evento principal para el botón de traducir
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

    puter.ai.chat(prompt, { model: 'gemini-1.0-pro' })
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