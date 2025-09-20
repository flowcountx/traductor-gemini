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


// --- LÓGICA DEL TRADUTOR ---
const textInput = document.getElementById('text-input');
const languageSelector = document.getElementById('language-selector');
const translateBtn = document.getElementById('translate-btn');
const outputContainer = document.getElementById('output-container');
const spinner = document.getElementById('spinner');

const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

clearBtn.addEventListener('click', () => {
    textInput.value = '';
});

copyBtn.addEventListener('click', () => {
    const textToCopy = outputContainer.innerText;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    }
});

translateBtn.addEventListener('click', () => {
    const textToTranslate = textInput.value;
    const targetLanguage = languageSelector.value;

    if (!textToTranslate.trim()) {
        return;
    }

    spinner.style.display = 'block';
    outputContainer.innerText = '';
    translateBtn.disabled = true;

    // Usamos el prompt en inglés para máxima fiabilidad
    const prompt = `Translate the following text to ${targetLanguage}. The original language is auto-detected. Provide only the translated text as your response, without any additional explanations or introductions. The text to translate is: "${textToTranslate}"`;

    // --- CAMBIO CLAVE AQUÍ ---
    // Hemos eliminado la especificación del modelo para usar el motor por defecto de Puter.js, que es más estable.
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