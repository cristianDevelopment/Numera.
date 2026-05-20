// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 8: ELIMINACIÓN GAUSSIANA) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: '¿A diferencia de Bisección, Eliminación Gaussiana es un método "Directo". ¿Qué significa esto?',
        options: [
            'Que adivina la respuesta al azar.',
            'Que llega a la solución exacta en un número fijo y conocido de pasos.',
            'Que necesita infinitas iteraciones para converger.'
        ],
        correctAnswer: 1,
        hint: 'No es iterativo. Si tienes 3 variables, sabes exactamente cuántas operaciones harás para encontrar la respuesta.'
    },
    {
        type: 'visualChoice',
        question: 'Observa esta matriz. ¿Cuál es el objetivo principal de la Eliminación Gaussiana?',
        visualHTML: `
            <table class="math-table">
                <tr><th>x</th><th>y</th><th>z</th><th class="divider">R</th></tr>
                <tr><td>2</td><td>1</td><td>-1</td><td class="divider">8</td></tr>
                <tr><td class="zero-zone">0</td><td>3</td><td>2</td><td class="divider">5</td></tr>
                <tr><td class="zero-zone">0</td><td class="zero-zone">0</td><td>4</td><td class="divider">12</td></tr>
            </table>
        `,
        options: [
            'Convertir toda la matriz en ceros.',
            'Lograr que todos los números de la matriz sean positivos.',
            'Convertir el sistema en una "Matriz Triangular Superior" (ceros debajo de la diagonal).'
        ],
        correctAnswer: 2,
        hint: 'Fíjate en el triángulo de ceros grises en la esquina inferior izquierda. Esa es la meta.'
    },
    {
        type: 'fill',
        question: 'El número en la diagonal que usamos para eliminar y volver cero a los números de abajo se llama _____________.',
        chips: ['Pivote', 'Vector', 'Raíz', 'Margen'],
        correctAnswer: 'Pivote',
        hint: 'Es un punto de apoyo, como en el baloncesto. Te apoyas en él para "girar" y modificar el resto de la columna.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: En una matriz de un sistema de ecuaciones, está permitido intercambiar de lugar dos filas completas.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'Las filas representan ecuaciones (Ej: x+y=2 y 3x-y=0). El orden en que las escribas no altera el resultado del sistema.'
    },
    {
        type: 'visualChoice',
        question: '¡Peligro en el código! ¿Qué pasa si el "Pivote" actual es un CERO exacto (como el elemento rojo)?',
        visualHTML: `
            <table class="math-table">
                <tr><th>x</th><th>y</th><th>z</th></tr>
                <tr><td>1</td><td>4</td><td>2</td></tr>
                <tr><td class="zero-zone">0</td><td class="highlight">0</td><td>5</td></tr>
                <tr><td class="zero-zone">0</td><td>3</td><td>7</td></tr>
            </table>
        `,
        options: [
            'El algoritmo termina porque encontramos la respuesta.',
            'Ocurre un error fatal de División entre Cero en la computadora.',
            'Los números se vuelven imaginarios.'
        ],
        correctAnswer: 1,
        hint: 'Para eliminar los números de abajo, la computadora divide entre el pivote. En programación, x / 0 detiene la ejecución del programa.'
    },
    {
        type: 'fill',
        question: 'Para evitar el error de división entre cero, aplicamos una técnica llamada _____________ Parcial, que consiste en buscar el número más grande de abajo y cambiar la fila.',
        chips: ['Iteración', 'Pivoteo', 'Reemplazo', 'Bisección'],
        correctAnswer: 'Pivoteo',
        hint: 'Su nombre viene de cambiar el "pivote" actual por uno mejor.'
    },
    {
        type: 'tableChoice',
        question: 'Analiza la última fila de esta matriz triangular. ¿Cuál es el valor exacto de la variable "z"?',
        visualHTML: `
            <table class="math-table">
                <tr><th>x</th><th>y</th><th>z</th><th class="divider">Resultado</th></tr>
                <tr><td>2</td><td>1</td><td>-1</td><td class="divider">8</td></tr>
                <tr><td class="zero-zone">0</td><td>3</td><td>2</td><td class="divider">5</td></tr>
                <tr><td class="zero-zone">0</td><td class="zero-zone">0</td><td class="highlight">4</td><td class="divider highlight">12</td></tr>
            </table>
        `,
        options: ['8', '3', '48'],
        correctAnswer: 1,
        hint: 'Traduce la última fila a una ecuación normal: 4z = 12. Despeja z dividiendo 12 / 4.'
    },
    {
        type: 'choice',
        question: 'Una vez que descubres cuánto vale la última variable (z), ¿cómo encuentras las demás (y, x)?',
        options: [
            'Adivinando números hasta que cuadren.',
            'Aplicando Sustitución hacia Atrás (Back Substitution).',
            'Sumando todos los valores de la diagonal.'
        ],
        correctAnswer: 1,
        hint: 'Agarras el valor de "z", lo subes a la fila de arriba para despejar "y", luego subes esos dos a la primera fila para despejar "x". Vas de reversa.'
    },
    {
        type: 'order',
        question: 'Ordena el algoritmo completo de Eliminación Gaussiana.',
        pool: [
            'Acomodar el sistema en una Matriz Aumentada.',
            'Aplicar Sustitución hacia Atrás para despejar las variables.',
            'Hacer operaciones entre filas para lograr ceros debajo de la diagonal.'
        ],
        correctOrder: [
            'Acomodar el sistema en una Matriz Aumentada.',
            'Hacer operaciones entre filas para lograr ceros debajo de la diagonal.',
            'Aplicar Sustitución hacia Atrás para despejar las variables.'
        ],
        hint: 'Primero organizas los datos, luego "triangulas" para obtener los ceros, y finalmente vas de abajo hacia arriba resolviendo las variables.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Aunque es un método exacto, en programación puede sufrir errores de redondeo si las matrices son gigantes.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'Al hacer miles de multiplicaciones y divisiones flotantes (floats/doubles), los decimales se van perdiendo y acumulando un pequeño error.'
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

let orderPool = [];
let orderTarget = [];
let correctOrderRef = [];

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

    if (q.type === 'choice' || q.type === 'truefalse') {
        renderChoiceQuestion(q);
    } else if (q.type === 'fill') {
        renderFillQuestion(q);
    } else if (q.type === 'visualChoice' || q.type === 'tableChoice') {
        renderVisualChoiceQuestion(q);
    } else if (q.type === 'order') {
        renderOrderQuestion(q);
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

function renderVisualChoiceQuestion(q) {
    let html = `<h1 class="question-title" style="text-align: center;">${q.question}</h1>
                ${q.visualHTML}
                <div class="options-grid">`;
    q.options.forEach((opt, index) => {
        html += `<div class="option-card" onclick="selectOption(${index}, this)">${opt}</div>`;
    });
    html += `</div>`;
    questionContainer.innerHTML = html;
}

function renderOrderQuestion(q) {
    orderPool = [...q.pool];
    orderTarget = [];
    correctOrderRef = q.correctOrder;

    let html = `<h1 class="question-title">${q.question}</h1>
                <div class="order-area">
                    <div class="order-target" id="order-target"></div>
                    <div class="order-pool" id="order-pool"></div>
                </div>`;
    questionContainer.innerHTML = html;
    updateOrderUI();
}

function updateOrderUI() {
    const targetDiv = document.getElementById('order-target');
    const poolDiv = document.getElementById('order-pool');
    
    targetDiv.innerHTML = '';
    poolDiv.innerHTML = '';

    orderTarget.forEach((item, index) => {
        targetDiv.innerHTML += `<div class="order-item" onclick="moveItemToPool(${index})">${item}</div>`;
    });

    orderPool.forEach((item, index) => {
        poolDiv.innerHTML += `<div class="order-item" onclick="moveItemToTarget(${index})">${item}</div>`;
    });

    if (orderTarget.length === correctOrderRef.length) {
        selectedAnswer = [...orderTarget]; 
        activateCheckButton();
    } else {
        selectedAnswer = null;
        deactivateCheckButton();
    }
}

window.moveItemToTarget = function(index) {
    if (isChecking) return;
    let item = orderPool.splice(index, 1)[0];
    orderTarget.push(item);
    updateOrderUI();
}

window.moveItemToPool = function(index) {
    if (isChecking) return;
    let item = orderTarget.splice(index, 1)[0];
    orderPool.push(item);
    updateOrderUI();
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
    let isCorrect = false;

    if (q.type === 'order') {
        isCorrect = JSON.stringify(selectedAnswer) === JSON.stringify(correctOrderRef);
    } else {
        isCorrect = (selectedAnswer === q.correctAnswer);
    }

    isChecking = true;

    if (isCorrect) {
        NumeraAudio.correct();
        footer.classList.add('correct');
        feedbackMessage.innerText = '¡Impecable!';
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
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-lightbulb"></i> ¡Cuidado con el álgebra!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
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
        title.innerText = '¡Ingeniería Pura!';
        text.innerText = '3 aciertos consecutivos manipulando matrices. ¡Eres un maestro algebraico!';
    } else if (type === 'correction') {
        title.innerText = '¡Revisando Pivotes!';
        text.innerText = 'Las matrices son traicioneras, pero con un buen pivoteo todo se arregla.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 9
    localStorage.setItem('numera_current_lesson', '9');
    questionContainer.innerHTML = `<i class="fa-solid fa-table-cells-large" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Matriz Triangulada!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Has comprendido el método directo más importante del álgebra lineal.</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {  
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡División entre Cero!</h1><p>Tu algoritmo se atascó. Analiza bien los pivotes y vuelve a intentarlo.</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
