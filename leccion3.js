// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 3: IDENTIFICACIÓN) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: 'Si partes un intervalo matemático a la mitad repetidamente para encontrar una raíz, estás usando el método de...',
        options: [
            'Newton-Raphson',
            'Bisección',
            'Cramer'
        ],
        correctAnswer: 1,
        hint: 'Su nombre literal significa "cortar en dos secciones".'
    },
    {
        type: 'fill',
        question: 'El método de Newton-Raphson es muy rápido, pero requiere que conozcamos la _____________ de la función.',
        chips: ['Integral', 'Derivada', 'Matriz', 'Inversa'],
        correctAnswer: 'Derivada',
        hint: 'Es la operación fundamental del cálculo diferencial que nos da la pendiente de una curva.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Gauss-Jordan sirve para resolver sistemas de ecuaciones lineales.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0,
        hint: 'Este método transforma una matriz para encontrar directamente el valor de todas las incógnitas (x, y, z).'
    },
    {
        type: 'choice',
        question: '¿Qué significa que un método iterativo "converge"?',
        options: [
            'Que la computadora se congela por un error.',
            'Que con cada paso se aleja más de la respuesta.',
            'Que con cada paso se acerca más a la solución correcta.'
        ],
        correctAnswer: 2,
        hint: 'Piensa en dos líneas que se unen en un mismo punto exacto.'
    },
    {
        type: 'fill',
        question: 'Mientras que Eliminación Gaussiana es un método directo, Gauss-_____________ es un método iterativo.',
        chips: ['Jordan', 'Seidel', 'Newton', 'Cramer'],
        correctAnswer: 'Seidel',
        hint: 'Empieza con S y suena como un apellido alemán.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Todos los métodos numéricos requieren que adivines un "valor inicial" antes de empezar.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 1, // Falso
        hint: 'Los iterativos (como Newton o Jacobi) sí lo necesitan, pero los directos (como Eliminación Gaussiana) no.'
    },
    {
        type: 'choice',
        question: '¿Cuál de los siguientes NO es un método para encontrar raíces (ceros) de una función?',
        options: [
            'Método de la Bisección',
            'Método de la Secante',
            'Regla de Cramer'
        ],
        correctAnswer: 2,
        hint: 'Uno de estos se usa exclusivamente para matrices y determinantes, no para encontrar puntos en una curva.'
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
        title.innerText = '¡Qué inteligencia!';
        text.innerText = '3 métodos identificados correctamente al hilo. ¡Eres imparable!';
    } else if (type === 'correction') {
        title.innerText = '¡Ya casi terminamos!';
        text.innerText = 'Vamos a repasar los métodos que se nos escaparon. ¡Tú puedes!';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 4
    localStorage.setItem('numera_current_lesson', '4');
    questionContainer.innerHTML = `<i class="fa-solid fa-magnifying-glass" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Lección 3 Superada!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Ya sabes identificar los métodos más importantes.</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Sin vidas!</h1><p>Hay muchos métodos y es normal confundirlos. ¡Intenta de nuevo!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
