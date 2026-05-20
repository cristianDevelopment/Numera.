// --- BASE DE DATOS DE PREGUNTAS (CON PISTAS) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: '¿Qué es un Método Numérico?',
        options: [
            'Una técnica para formular problemas matemáticos y resolverlos con operaciones aritméticas.',
            'Un dispositivo de hardware usado para guardar números.',
            'Una fórmula mágica que siempre da el resultado exacto sin error.'
        ],
        correctAnswer: 0,
        hint: 'Piensa en cómo las ecuaciones matemáticas complejas se traducen a simples sumas y multiplicaciones.'
    },
    {
        type: 'fill',
        question: 'Los métodos numéricos son muy útiles cuando un problema matemático no tiene una solución _____________.',
        chips: ['Analítica', 'Imposible', 'Mágica', 'Aleatoria'],
        correctAnswer: 'Analítica',
        hint: 'Es la palabra que describe a una solución matemática exacta, como cuando despejas "x" con álgebra tradicional en tu cuaderno.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Los métodos numéricos siempre nos dan la respuesta matemáticamente exacta.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 1, 
        hint: 'Recuerda que estos métodos se basan en aproximarse poco a poco al resultado, siempre hay un pequeño margen de diferencia.'
    },
    {
        type: 'fill',
        question: 'El proceso de repetir una serie de pasos una y otra vez para acercarse a la solución se llama _____________.',
        chips: ['Iteración', 'Adivinanza', 'Compilación', 'Derivación'],
        correctAnswer: 'Iteración',
        hint: 'Es un sinónimo de ciclo o bucle. Nuestro personaje "Iterauta" basa su nombre en esta palabra.'
    },
    {
        type: 'choice',
        question: '¿Qué es el "error" en el contexto de los métodos numéricos?',
        options: [
            'Un pantallazo azul en la computadora.',
            'La diferencia entre el valor verdadero (exacto) y el valor aproximado.',
            'Un número que olvidaste sumar en la ecuación.'
        ],
        correctAnswer: 1,
        hint: 'No lo veas como una falla del sistema informático, sino como una medida de qué tan lejos te quedaste de la realidad.'
    },
    {
        type: 'fill',
        question: 'Para aplicar métodos numéricos en problemas reales, hoy en día es indispensable el uso de una _____________.',
        chips: ['Computadora', 'Calculadora Solar', 'Regla de cálculo', 'Libreta'],
        correctAnswer: 'Computadora',
        hint: 'Se necesitan hacer miles o millones de operaciones aritméticas por segundo. Ningún humano, ni con el mejor lápiz, podría hacerlo a tiempo.'
    },
    {
        type: 'choice',
        question: '¿Cuál es una ventaja principal de usar métodos numéricos?',
        options: [
            'No se necesita saber nada de matemáticas.',
            'Permiten resolver problemas muy complejos que serían imposibles de hacer a mano.',
            'Eliminan por completo cualquier tipo de error en el mundo.'
        ],
        correctAnswer: 1,
        hint: 'Nos dan la capacidad de atacar ecuaciones del mundo real (clima, ingeniería, física) que el álgebra escolar no puede resolver.'
    }
];

// --- VARIABLES DE ESTADO ---
let currentQueue = [...lessonQuestions]; 
let failedQuestions = []; 
let currentQuestionIndex = 0;
let lives = 20;
let totalQuestions = lessonQuestions.length; 
let questionsAnsweredCorrectly = 0;

let selectedAnswer = null; 
let isChecking = false; 

// Variables para la gamificación
let consecutiveCorrect = 0; 
let isCorrectionPhase = false; 

// --- ELEMENTOS DEL DOM ---
const questionContainer = document.getElementById('question-container');
const btnCheck = document.getElementById('check-btn');
const footer = document.getElementById('lesson-footer');
const feedbackMessage = document.getElementById('feedback-message');
const progressBar = document.getElementById('progress-bar');
const livesCount = document.getElementById('lives-count');

// --- INICIALIZACIÓN ---
function initLesson() {
    renderQuestion();
}

function renderQuestion() {
    if (currentQuestionIndex >= currentQueue.length) {
        if (failedQuestions.length > 0) {
            currentQueue = [...failedQuestions];
            failedQuestions = [];
            currentQuestionIndex = 0;
            isCorrectionPhase = true;
            
            showInterstitial('correction');
            return;
        } else {
            finishLesson();
            return;
        }
    }

    const q = currentQueue[currentQuestionIndex];
    selectedAnswer = null;
    isChecking = false;
    
    footer.className = 'lesson-footer';
    feedbackMessage.innerHTML = '';
    btnCheck.innerText = 'COMPROBAR';
    btnCheck.className = 'btn-check';

    if (q.type === 'choice' || q.type === 'truefalse') {
        renderChoiceQuestion(q);
    } else if (q.type === 'fill') {
        renderFillQuestion(q);
    }
}

function renderChoiceQuestion(q) {
    let html = `<h1 class="question-title">${q.question}</h1><div class="options-grid">`;
    q.options.forEach((opt, index) => {
        html += `<div class="option-card" onclick="selectOption(${index}, this)">${opt}</div>`;
    });
    html += `</div>`;
    questionContainer.innerHTML = html;
}

function renderFillQuestion(q) {
    let formattedQuestion = q.question.replace('_____________', `<span id="blank-target" class="blank-space" onclick="removeChip()"></span>`);
    let html = `<h1 class="question-title" style="line-height: 1.5;">${formattedQuestion}</h1><div class="chip-container">`;
    q.chips.forEach((chip) => {
        html += `<div class="chip" onclick="placeChip('${chip}', this)">${chip}</div>`;
    });
    html += `</div>`;
    questionContainer.innerHTML = html;
}

// --- INTERACCIÓN DEL USUARIO ---
window.selectOption = function(index, element) {
    if (isChecking) return;
    NumeraAudio.click();
    selectedAnswer = index;
    document.querySelectorAll('.option-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    activateCheckButton();
}

window.placeChip = function(text, element) {
    if (isChecking) return;
    const blank = document.getElementById('blank-target');
    if (blank.innerText !== '') {
        document.querySelectorAll('.chip').forEach(c => {
            if (c.innerText === blank.innerText) c.style.display = 'block';
        });
    }
    blank.innerText = text;
    selectedAnswer = text;
    element.style.display = 'none'; 
    activateCheckButton();
}

window.removeChip = function() {
    if (isChecking) return;
    const blank = document.getElementById('blank-target');
    if (blank.innerText === '') return;
    document.querySelectorAll('.chip').forEach(c => {
        if (c.innerText === blank.innerText) c.style.display = 'block';
    });
    blank.innerText = '';
    selectedAnswer = null;
    deactivateCheckButton();
}

function activateCheckButton() { btnCheck.classList.add('active'); }
function deactivateCheckButton() { btnCheck.classList.remove('active'); }

// --- LÓGICA DE VALIDACIÓN ---
btnCheck.addEventListener('click', () => {
    if (!btnCheck.classList.contains('active')) return;
        NumeraAudio.click();
    if (isChecking) {
        currentQuestionIndex++;
        
        if (consecutiveCorrect >= 3 && !isCorrectionPhase) {
            consecutiveCorrect = 0; 
            showInterstitial('motivation');
            return; 
        }

        renderQuestion();
        return;
    }

    const q = currentQueue[currentQuestionIndex];
    let isCorrect = (selectedAnswer === q.correctAnswer);

    isChecking = true;

    if (isCorrect) {
        NumeraAudio.correct();
        footer.classList.add('correct');
        feedbackMessage.innerText = '¡Excelente!';
        btnCheck.innerText = 'CONTINUAR';
        
        questionsAnsweredCorrectly++;
        consecutiveCorrect++; 
        
        let progress = (questionsAnsweredCorrectly / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;

    } else {
        NumeraAudio.incorrect();
        footer.classList.add('incorrect');
        questionContainer.classList.add('shake');
        setTimeout(() => questionContainer.classList.remove('shake'), 500);

        // AQUÍ ESTÁ EL CAMBIO: Mensaje motivacional y pista, no la respuesta
        feedbackMessage.innerHTML = `
            <div style="line-height: 1.2;">
                <span style="font-size: 20px;"><i class="fa-solid fa-lightbulb"></i> ¡No te rindas! Inténtalo de nuevo.</span><br>
                <span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span>
            </div>
        `;
        btnCheck.innerText = 'ENTENDIDO';
        
        lives--;
        livesCount.innerText = lives;
        consecutiveCorrect = 0; 
        
        if (lives <= 0) {
            gameOver();
            return;
        }

        failedQuestions.push(q);
    }
});

// --- PANTALLAS INTERMEDIAS ---
function showInterstitial(type) {
    const overlay = document.getElementById('interstitial-overlay');
    const title = document.getElementById('interstitial-title');
    const text = document.getElementById('interstitial-text');

    if (type === 'motivation') {
        title.innerText = '¡Impresionante!';
        text.innerText = 'Llevas 3 respuestas correctas seguidas. ¡Estás dominando estos conceptos!';
    } else if (type === 'correction') {
        title.innerText = '¡Muy bien, falta poco!';
        text.innerText = 'Solo corrige tus errores y la lección será tuya. ¡Tú puedes!';
    }

    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    const overlay = document.getElementById('interstitial-overlay');
    overlay.classList.add('interstitial-hidden');
    renderQuestion(); 
}

// --- FINALES DEL JUEGO ---
function finishLesson() {
    NumeraAudio.success();
    localStorage.setItem('numera_current_lesson', '2');

    questionContainer.innerHTML = `
        <i class="fa-solid fa-trophy" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center;">¡Lección Completada!</h1>
        <p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Has dado tu primer paso hacia el dominio de los métodos numéricos con ${lives} vidas restantes.</p>
    `;
    footer.className = 'lesson-footer correct';
    feedbackMessage.innerText = '';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `
        <i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center;">¡Te quedaste sin vidas!</h1>
        <p style="font-size: 18px; font-weight: 700; color: var(--text-light);">No te rindas, los métodos numéricos requieren iteración. ¡Inténtalo de nuevo!</p>
    `;
    footer.className = 'lesson-footer incorrect';
    feedbackMessage.innerText = '';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

// Iniciar
initLesson();
