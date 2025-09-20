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
const detectedLanguageBox = document.getElementById('detected-language-box'); // Nuevo elemento

// Evento para el botón de limpiar, ahora limpia todo
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    outputContainer.innerText = '';
    detectedLanguageBox.style.display = 'none';
});

// Evento para el botón de copiar
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

// Evento principal para el botón de traducir
translateBtn.addEventListener('click', () => {
    const textToTranslate = textInput.value;
    const targetLanguage = languageSelector.value;

    if (!textToTranslate.trim()) {
        return;
    }

    // Limpiar resultados anteriores
    spinner.style.display = 'block';
    outputContainer.innerText = '';
    detectedLanguageBox.style.display = 'none';
    translateBtn.disabled = true;

    // --- NUEVO PROMPT MEJORADO ---
    // Le pedimos a la IA que responda en formato JSON para obtener dos datos.
    const prompt = `Your task is to translate text. First, auto-detect the source language of the provided text. Then, translate it to ${targetLanguage}.
    Your response MUST be a valid JSON object with two keys: "translation" and "detectedLanguage".
    - "translation": The translated text.
    - "detectedLanguage": The name of the language you detected.
    Do not add any text or explanations outside of the JSON object.
    The text to translate is: "${textToTranslate}"`;

    puter.ai.chat(prompt)
        .then(response => {
            try {
                // Intentamos procesar la respuesta como JSON
                const data = JSON.parse(response);
                outputContainer.innerText = data.translation;
                detectedLanguageBox.innerText = `Idioma detectado: ${data.detectedLanguage}`;
                detectedLanguageBox.style.display = 'inline-block'; // Mostramos el cuadro
            } catch (error) {
                // Si la IA no devuelve un JSON válido, lo mostramos como texto plano
                console.error("La respuesta de la IA no era un JSON válido:", error);
                outputContainer.innerText = response; // Muestra la respuesta tal cual
            }
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