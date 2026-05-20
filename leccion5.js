// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 5: APLICACIÓN) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: '¿Para qué se usan los métodos numéricos en la industria aeroespacial?',
        options: [
            'Para pintar los cohetes de colores bonitos.',
            'Para calcular trayectorias de vuelo que no tienen una solución exacta simple.',
            'Para contar cuántas personas caben en la cabina.'
        ],
        correctAnswer: 1,
        hint: 'Moverse en el espacio implica ecuaciones diferenciales muy complejas que solo se resuelven por aproximaciones.'
    },
    {
        type: 'fill',
        question: 'En ingeniería civil, se usan matrices gigantes para calcular la estabilidad de un _____________.',
        chips: ['Puente', 'Martillo', 'Ladrillo', 'Casco'],
        correctAnswer: 'Puente',
        hint: 'Es una estructura enorme que debe soportar peso y viento; se analiza dividiéndola en miles de partes pequeñas.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Los simuladores de clima usan métodos numéricos para predecir si lloverá mañana.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0,
        hint: 'La atmósfera es un fluido. Las leyes que la rigen son tan complejas que solo las supercomputadoras usando iteraciones pueden resolverlas.'
    },
    {
        type: 'choice',
        question: 'Si un ingeniero quiere optimizar el gasto de combustible en un motor, ¿qué buscaría con un método numérico?',
        options: [
            'El punto donde el error es máximo.',
            'El punto (raíz) donde la eficiencia es máxima.',
            'El nombre del motor en la base de datos.'
        ],
        correctAnswer: 1,
        hint: 'La optimización es como buscar el pico más alto o el valle más bajo en una curva matemática.'
    },
    {
        type: 'fill',
        question: 'Cuando una computadora procesa una imagen digital pesada, está aplicando operaciones de _____________ a gran escala.',
        chips: ['Matrices', 'Teclados', 'Cables', 'Audios'],
        correctAnswer: 'Matrices',
        hint: 'Cada píxel de color es un número en una cuadrícula gigante de filas y columnas.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: En economía, los métodos numéricos NO sirven para predecir el valor de las acciones.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 1, // Falso
        hint: 'Las finanzas modernas dependen de algoritmos numéricos para analizar riesgos y tendencias del mercado.'
    },
    {
        type: 'choice',
        question: '¿Cuál es el objetivo final de aprender Métodos Numéricos?',
        options: [
            'Poder resolver cualquier problema del mundo real usando el poder del cálculo computacional.',
            'Sustituir por completo a los matemáticos.',
            'Aprender a escribir números muy rápido.'
        ],
        correctAnswer: 0,
        hint: 'Es la herramienta que une la teoría matemática con la realidad física y tecnológica.'
    }
];

// --- MOTOR DEL JUEGO ---
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
        title.innerText = '¡Eres un experto!';
        text.innerText = '3 aciertos seguidos. ¡El mundo real te espera!';
    } else if (type === 'correction') {
        title.innerText = '¡Falta el último empujón!';
        text.innerText = 'Corrigiendo estos últimos detalles habrás terminado el módulo.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 MARCAR TODO COMO COMPLETADO
    localStorage.setItem('numera_current_lesson', '6');
    questionContainer.innerHTML = `<i class="fa-solid fa-rocket" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Módulo de Introducción Completado!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Has demostrado que los métodos numéricos son tu fuerte. ¡Felicidades, Iterauta!</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VER MI PREMIO';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Sin vidas!</h1><p>Incluso los mejores ingenieros fallan en su primer intento. ¡Recarga energías!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
