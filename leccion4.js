// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 4: LÓGICA E ITERACIÓN) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: '¿Qué es un "criterio de paro" en un algoritmo iterativo?',
        options: [
            'Una condición lógica que decide cuándo detener el bucle.',
            'Un botón físico en la computadora.',
            'Un error de compilación.'
        ],
        correctAnswer: 0,
        hint: 'Piensa en la condición que pones dentro de un condicional lógico para ejecutar un "break" y salir de un ciclo.'
    },
    {
        type: 'fill',
        question: 'En programación, un ciclo muy usado para repetir cálculos numéricos hasta alcanzar la tolerancia es el ciclo _____________.',
        chips: ['while', 'if', 'class', 'try'],
        correctAnswer: 'while',
        hint: 'En español significa "mientras". Ejecuta el bloque de código *mientras* la condición siga siendo verdadera.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Es una buena práctica programar un método numérico sin un límite máximo de iteraciones.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 1, // Falso
        hint: 'Si el método diverge o nunca alcanza la tolerancia, se quedaría calculando por siempre. ¡Siempre declara un "max_iteraciones"!'
    },
    {
        type: 'fill',
        question: 'Para saber si debemos detener el ciclo, comparamos el _____________ calculado contra una tolerancia predefinida.',
        chips: ['Error', 'Teclado', 'Píxel', 'Fondo'],
        correctAnswer: 'Error',
        hint: 'Es la métrica de diferencia entre nuestra aproximación actual y el valor real que buscamos.'
    },
    {
        type: 'choice',
        question: '¿Qué pasa si le pides a tu algoritmo una tolerancia extremandamente pequeña pero el tipo de dato de tu lenguaje no soporta tantos decimales?',
        options: [
            'El lenguaje crea más memoria automáticamente.',
            'Podrías caer en un bucle infinito porque la condición nunca se cumplirá.',
            'El algoritmo encuentra la respuesta en menos tiempo.'
        ],
        correctAnswer: 1,
        hint: 'Imagina el ciclo principal de un videojuego: si la condición de victoria es inalcanzable por un límite técnico, el código se queda colgado.'
    },
    {
        type: 'fill',
        question: 'En un método iterativo, el valor que calculaste en la iteración actual se convierte en el valor _____________ para la siguiente.',
        chips: ['Anterior', 'Final', 'Nulo', 'Constante'],
        correctAnswer: 'Anterior',
        hint: 'Tienes que actualizar tus variables al final del ciclo lógico, algo como: "x_viejo = x_nuevo".'
    },
    {
        type: 'choice',
        question: 'Si estás depurando (haciendo debug) un método que no converge, ¿qué variable es la más importante vigilar en cada paso?',
        options: [
            'El nombre de la función matemática.',
            'Cómo cambia el valor del error en cada iteración.',
            'La cantidad total de líneas de código.'
        ],
        correctAnswer: 1,
        hint: 'Necesitas observar si esa métrica va disminuyendo hacia cero (bien), o si está explotando hacia el infinito (mal).'
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
        title.innerText = '¡Lógica implacable!';
        text.innerText = '3 aciertos seguidos. ¡Tienes mente de programador!';
    } else if (type === 'correction') {
        title.innerText = '¡Casi compilamos!';
        text.innerText = 'Vamos a corregir esos errores lógicos para cerrar la lección.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 5
    localStorage.setItem('numera_current_lesson', '5');
    questionContainer.innerHTML = `<i class="fa-solid fa-rotate-right" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Lección 4 Superada!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Tu lógica es perfecta. Solo queda la aplicación práctica.</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Sin vidas!</h1><p>A veces el código entra en bucle. ¡Depura tu mente e inténtalo de nuevo!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
