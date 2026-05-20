// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 2: ESTRUCTURAS) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: 'En métodos numéricos, ¿qué es un vector?',
        options: [
            'Una flecha que indica una dirección en un mapa.',
            'Una lista ordenada de números representados en una fila o columna.',
            'Un virus informático que borra los datos.'
        ],
        correctAnswer: 1,
        hint: 'Míralo como una colección de datos en una sola dimensión (1D).'
    },
    {
        type: 'fill',
        question: 'Una matriz es un conjunto de números organizados en filas y _____________.',
        chips: ['Columnas', 'Diagonales', 'Celdas', 'Puntos'],
        correctAnswer: 'Columnas',
        hint: 'Si las filas son horizontales, ¿cómo se llaman las líneas verticales?'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Una matriz "cuadrada" tiene el mismo número de filas que de columnas.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0,
        hint: 'Igual que un cuadrado geométrico, sus dimensiones deben ser iguales (ej. 3x3).'
    },
    {
        type: 'choice',
        question: '¿Qué estructura es mejor para representar un sistema de 3 ecuaciones con 3 incógnitas?',
        options: [
            'Tres puntos en un plano.',
            'Una matriz de 3x3.',
            'Un solo número escalar.'
        ],
        correctAnswer: 1,
        hint: 'Necesitas una cuadrícula donde cada fila represente una ecuación.'
    },
    {
        type: 'fill',
        question: 'La _____________ principal de una matriz va desde la esquina superior izquierda a la inferior derecha.',
        chips: ['Diagonal', 'Fila', 'Base', 'Arista'],
        correctAnswer: 'Diagonal',
        hint: 'Es la línea cruzada que divide a la matriz en dos.'
    },
    {
        type: 'truefalse',
        question: 'En computación, ¿los arreglos (arrays) sirven para guardar vectores y matrices?',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0,
        hint: 'Los lenguajes de programación usan arreglos para que la computadora entienda estas estructuras.'
    },
    {
        type: 'choice',
        question: '¿Cuál de estos es un ejemplo de un vector de 3 elementos?',
        options: [
            '[5, 10, 15]',
            '[[1, 2], [3, 4]]',
            '42'
        ],
        correctAnswer: 0,
        hint: 'Busca una sola lista simple que contenga exactamente tres valores.'
    }
];

// --- MOTOR DEL JUEGO (Mismo que Lección 1 pero con guardado de progreso 3) ---
let currentQueue = [...lessonQuestions]; 
let failedQuestions = []; 
let currentQuestionIndex = 0;
let lives = 20;
let totalQuestions = lessonQuestions.length; 
let questionsAnsweredCorrectly = 0;
let selectedAnswer = null; 
let isChecking = false; 
let consecutiveCorrect = 0; 
let isCorrectionPhase = false; 

const questionContainer = document.getElementById('question-container');
const btnCheck = document.getElementById('check-btn');
const footer = document.getElementById('lesson-footer');
const feedbackMessage = document.getElementById('feedback-message');
const progressBar = document.getElementById('progress-bar');
const livesCount = document.getElementById('lives-count');

function initLesson() { renderQuestion(); }

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
    if (q.type === 'choice' || q.type === 'truefalse') renderChoiceQuestion(q);
    else if (q.type === 'fill') renderFillQuestion(q);
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
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-lightbulb"></i> ¡Inténtalo de nuevo!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
        btnCheck.innerText = 'ENTENDIDO';
        lives--;
        livesCount.innerText = lives;
        consecutiveCorrect = 0; 
        if (lives <= 0) { gameOver(); return; }
        failedQuestions.push(q);
    }
});

function showInterstitial(type) {
    const overlay = document.getElementById('interstitial-overlay');
    const title = document.getElementById('interstitial-title');
    const text = document.getElementById('interstitial-text');
    if (type === 'motivation') {
        title.innerText = '¡Vas muy bien!';
        text.innerText = '3 correctas seguidas. ¡Las estructuras ya no tienen secretos para ti!';
    } else if (type === 'correction') {
        title.innerText = '¡Casi lo tienes!';
        text.innerText = 'Repasemos los errores para que seas un experto en matrices.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 3
    localStorage.setItem('numera_current_lesson', '3');
    questionContainer.innerHTML = `<i class="fa-solid fa-medal" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Lección 2 Superada!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Ahora conoces las estructuras. Prepárate para identificar métodos.</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Sin vidas!</h1><p>Las matrices pueden ser confusas al principio. ¡Itera una vez más!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
