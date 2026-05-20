// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 6: BISECCIÓN VISUAL) ---
const lessonQuestions = [
    {
        type: 'visualChoice',
        question: 'Observa la gráfica. ¿Qué representa el punto naranja "c" en el método de bisección?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="100" x2="380" y2="100" stroke="#ccc" stroke-width="2"/>
                <line x1="200" y1="20" x2="200" y2="180" stroke="#ccc" stroke-width="2"/>
                <path d="M 50 180 Q 200 100 350 20" fill="none" stroke="#e52b2b" stroke-width="4"/>
                <line x1="100" y1="153" x2="100" y2="100" stroke="#58cc02" stroke-dasharray="4"/>
                <circle cx="100" cy="153" r="5" fill="#58cc02"/> <text x="95" y="170" font-weight="bold">a</text>
                
                <line x1="300" y1="46" x2="300" y2="100" stroke="#58cc02" stroke-dasharray="4"/>
                <circle cx="300" cy="46" r="5" fill="#58cc02"/> <text x="295" y="35" font-weight="bold">b</text>
                
                <circle cx="200" cy="100" r="7" fill="#ff9600"/> <text x="185" y="125" fill="#ff9600" font-weight="bold">c</text>
            </svg>
        `,
        options: [
            'El límite superior del intervalo.',
            'La derivada de la función.',
            'El punto medio calculado entre "a" y "b".'
        ],
        correctAnswer: 2,
        hint: 'Fíjate en su posición: está exactamente a la mitad de la distancia horizontal entre "a" y "b".'
    },
    {
        type: 'fill',
        question: 'En la gráfica anterior, f(a) es negativo y f(b) es positivo. Esto demuestra que hay un cambio de _____________.',
        chips: ['Signo', 'Variable', 'Matriz', 'Tolerancia'],
        correctAnswer: 'Signo',
        hint: 'Uno está por debajo del eje X (-) y otro por encima (+).'
    },
    {
        type: 'tableChoice',
        question: 'Analiza esta tabla de iteración. ¿Qué valor tomará el nuevo límite "b" en la Iteración 2?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Iter</th><th>a</th><th>b</th><th>c (Medio)</th><th>f(a) * f(c)</th></tr>
                <tr><td>1</td><td>1.0</td><td>2.0</td><td class="highlight">1.5</td><td>Negativo (< 0)</td></tr>
                <tr><td>2</td><td>1.0</td><td><b>?</b></td><td>...</td><td>...</td></tr>
            </table>
        `,
        options: ['2.0', '1.5', '1.0'],
        correctAnswer: 1,
        hint: 'Si f(a)*f(c) es negativo, la raíz está en la mitad izquierda. Por lo tanto, "c" se convierte en el nuevo límite superior "b".'
    },
    {
        type: 'order',
        question: '¡Construye el bucle! Ordena los pasos lógicos del Método de Bisección.',
        pool: [
            'Si f(a)*f(c) < 0, entonces b = c. Si no, a = c.',
            'Calcular punto medio: c = (a+b)/2.',
            'Verificar si el intervalo es menor a la tolerancia.'
        ],
        correctOrder: [
            'Calcular punto medio: c = (a+b)/2.',
            'Si f(a)*f(c) < 0, entonces b = c. Si no, a = c.',
            'Verificar si el intervalo es menor a la tolerancia.'
        ],
        hint: 'Primero encuentras el centro, luego ajustas tus límites según de qué lado quedó la raíz, y al final revisas si ya terminaste.'
    },
    {
        type: 'visualChoice',
        question: '¿Qué le sucede al tamaño del intervalo rojo en cada iteración sucesiva?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 120">
                <line x1="50" y1="30" x2="350" y2="30" stroke="#ccc" stroke-width="4"/>
                <line x1="50" y1="30" x2="350" y2="30" stroke="#e52b2b" stroke-width="8"/>
                <text x="10" y="35" font-weight="bold">It 1</text>
                
                <line x1="50" y1="60" x2="350" y2="60" stroke="#ccc" stroke-width="4"/>
                <line x1="50" y1="60" x2="200" y2="60" stroke="#e52b2b" stroke-width="8"/>
                <text x="10" y="65" font-weight="bold">It 2</text>
                
                <line x1="50" y1="90" x2="350" y2="90" stroke="#ccc" stroke-width="4"/>
                <line x1="125" y1="90" x2="200" y2="90" stroke="#e52b2b" stroke-width="8"/>
                <text x="10" y="95" font-weight="bold">It 3</text>
            </svg>
        `,
        options: [
            'Se reduce a la mitad.',
            'Se multiplica por dos.',
            'Se mantiene constante.'
        ],
        correctAnswer: 0,
        hint: 'Observa la longitud de las barras rojas: 100%, 50%, 25%...'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: ¿La bisección puede encontrar una raíz si la curva solo "toca" el eje X y rebota (como x² = 0)?',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 1, // Falso
        hint: 'Si rebota, nunca cruza al otro lado, por lo que nunca habrá un cambio de signo (f(a) y f(b) siempre serán positivos).'
    },
    {
        type: 'fill',
        question: 'El error máximo en una iteración de bisección siempre es igual a la mitad de la _____________ del intervalo actual.',
        chips: ['Longitud', 'Altura', 'Derivada', 'Pendiente'],
        correctAnswer: 'Longitud',
        hint: 'Mide qué tan ancho es el espacio de "a" a "b".'
    },
    {
        type: 'visualChoice',
        question: 'Según esta gráfica, ¿en qué mitad se encuentra la raíz real?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="100" x2="380" y2="100" stroke="#333" stroke-width="2"/>
                <path d="M 50 20 Q 250 50 350 180" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                
                <rect x="50" y="20" width="150" height="160" fill="rgba(88, 204, 2, 0.1)"/>
                <rect x="200" y="20" width="150" height="160" fill="rgba(229, 43, 43, 0.1)"/>
                
                <circle cx="50" cy="20" r="5" fill="#333"/> <text x="45" y="15">a</text>
                <circle cx="350" cy="180" r="5" fill="#333"/> <text x="345" y="195">b</text>
                <line x1="200" y1="20" x2="200" y2="180" stroke="#777" stroke-dasharray="4"/>
                <text x="195" y="15">c</text>
                
                <text x="100" y="190" font-weight="bold" fill="#58cc02">Mitad Izquierda</text>
                <text x="230" y="190" font-weight="bold" fill="#e52b2b">Mitad Derecha</text>
            </svg>
        `,
        options: [
            'Mitad Izquierda (Verde)',
            'Mitad Derecha (Roja)',
            'Exactamente en "c"'
        ],
        correctAnswer: 1,
        hint: 'Busca en qué zona la línea azul cruza la línea negra horizontal (eje X).'
    },
    {
        type: 'tableChoice',
        question: 'En la Iteración 3, ¿qué valor tiene el error aproximado (la diferencia entre el nuevo c y el anterior)?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Iter</th><th>a</th><th>b</th><th>c (Raíz aprox)</th></tr>
                <tr><td>1</td><td>0.0</td><td>1.0</td><td>0.50</td></tr>
                <tr><td>2</td><td>0.5</td><td>1.0</td><td>0.75</td></tr>
                <tr><td>3</td><td>0.5</td><td>0.75</td><td class="highlight">0.625</td></tr>
            </table>
        `,
        options: ['0.125', '0.25', '0.50'],
        correctAnswer: 0,
        hint: 'Resta el "c" de la iteración 3 menos el "c" de la iteración 2: |0.625 - 0.75|'
    },
    {
        type: 'choice',
        question: 'Para programar este método en la computadora, ¿qué estructura de control es indispensable?',
        options: [
            'Un bucle infinito sin condiciones.',
            'Un ciclo WHILE que se detenga cuando el error sea menor a la tolerancia.',
            'Una matriz 3x3 vacía.'
        ],
        correctAnswer: 1,
        hint: 'Necesitas una estructura que repita el corte a la mitad "mientras" no hayas alcanzado la precisión deseada.'
    }
];

// --- MOTOR DEL JUEGO VISUAL ---
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

// Variables para el Rompecabezas
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
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-lightbulb"></i> ¡Analízalo bien!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
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
        title.innerText = '¡Visión Matemática!';
        text.innerText = '3 aciertos consecutivos leyendo gráficas y tablas. ¡Vas volando!';
    } else if (type === 'correction') {
        title.innerText = '¡Ajustando el Intervalo!';
        text.innerText = 'Vamos a reevaluar los pasos que fallaron. Tú eres quien controla el algoritmo.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    localStorage.setItem('numera_current_lesson', '7');
    questionContainer.innerHTML = `<i class="fa-solid fa-scissors" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Bisección Dominada!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Lograste comprender la esencia de tu primer algoritmo cerrado mediante análisis gráfico.</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Límite de Tolerancia!</h1><p>El algoritmo requiere más iteraciones en tu mente. ¡Inténtalo de nuevo!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
