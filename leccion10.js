// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 10: INTEGRACIÓN NUMÉRICA) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: 'En cálculo, la integral definida de una función nos da un valor geométrico muy específico. ¿Cuál es?',
        options: [
            'El punto más alto de la gráfica.',
            'El área exacta debajo de la curva.',
            'El ángulo de inclinación de la línea.'
        ],
        correctAnswer: 1,
        hint: 'Es la suma de todo el espacio que hay entre la línea de la función y el suelo (eje X).'
    },
    {
        type: 'visualChoice',
        question: '¿Qué figura geométrica está usando este método numérico para aproximar el área roja bajo la curva azul?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="180" x2="380" y2="180" stroke="#333" stroke-width="2"/>
                <polygon points="100,180 100,100 300,50 300,180" fill="rgba(229, 43, 43, 0.2)" stroke="#e52b2b" stroke-width="2"/>
                <path d="M 50 160 Q 200 40 350 20" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                
                <line x1="100" y1="180" x2="100" y2="100" stroke="#333" stroke-width="2"/>
                <line x1="300" y1="180" x2="300" y2="50" stroke="#333" stroke-width="2"/>
                <text x="95" y="195" font-weight="bold">a</text>
                <text x="295" y="195" font-weight="bold">b</text>
            </svg>
        `,
        options: [
            'Un círculo.',
            'Un cuadrado perfecto.',
            'Un trapecio.'
        ],
        correctAnswer: 2,
        hint: 'Tiene una base recta en el piso, dos paredes verticales de diferente tamaño, y un techo recto inclinado.'
    },
    {
        type: 'fill',
        question: 'La Regla del Trapecio conecta el punto "a" y el punto "b" de la curva usando una línea _____________.',
        chips: ['Curva', 'Recta', 'Invisible', 'Ondulada'],
        correctAnswer: 'Recta',
        hint: 'Como se ve en la imagen anterior, el "techo" de la figura roja no se dobla, va directo del punto A al punto B.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Si la curva real está muy "doblada", usar un solo trapecio gigante nos dará un error muy grande.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'Un techo recto no puede cubrir bien una curva muy pronunciada. Quedarán muchos huecos vacíos o pedazos sobrantes.'
    },
    {
        type: 'visualChoice',
        question: 'Para solucionar ese gran error, usamos la "Regla Múltiple" (o compuesta). ¿Qué se está haciendo aquí?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="180" x2="380" y2="180" stroke="#333" stroke-width="2"/>
                <polygon points="50,180 50,130 150,60 150,180" fill="rgba(88, 204, 2, 0.2)" stroke="#58cc02" stroke-width="2"/>
                <polygon points="150,180 150,60 250,40 250,180" fill="rgba(88, 204, 2, 0.2)" stroke="#58cc02" stroke-width="2"/>
                <polygon points="250,180 250,40 350,30 350,180" fill="rgba(88, 204, 2, 0.2)" stroke="#58cc02" stroke-width="2"/>
                <path d="M 50 130 Q 150 40 350 30" fill="none" stroke="#1cb0f6" stroke-width="4"/>
            </svg>
        `,
        options: [
            'Dividir el área total en varios trapecios más pequeños (segmentos).',
            'Sumar el mismo trapecio tres veces.',
            'Cambiar la forma de la curva para que sea recta.'
        ],
        correctAnswer: 0,
        hint: 'En lugar de un solo bloque gigante, la computadora calcula el área de "n" columnas delgadas y las suma todas.'
    },
    {
        type: 'fill',
        question: 'En las fórmulas de integración numérica, la letra "h" representa el _____________ de cada segmento o trapecio.',
        chips: ['Color', 'Ancho', 'Alto', 'Peso'],
        correctAnswer: 'Ancho',
        hint: 'Es la distancia horizontal entre un punto y el siguiente en el eje X. h = (b - a) / n.'
    },
    {
        type: 'choice',
        question: 'La Regla de Simpson 1/3 es más precisa que la del Trapecio porque, en lugar de usar techos rectos, une los puntos usando...',
        options: [
            'Líneas en zig-zag.',
            'Parábolas (curvas cuadráticas).',
            'Círculos perfectos.'
        ],
        correctAnswer: 1,
        hint: 'Como las funciones suelen ser curvas, usar una "curva adaptativa" como techo en lugar de una línea rígida reduce drásticamente el error.'
    },
    {
        type: 'fill',
        question: 'Una regla estricta matemática de la Regla de Simpson 1/3 compuesta es que el número de segmentos (n) DEBE ser un número _____________.',
        chips: ['Impar', 'Par', 'Negativo', 'Primo'],
        correctAnswer: 'Par',
        hint: 'Las parábolas necesitan 3 puntos para dibujarse (inicio, medio, fin), lo que significa que siempre abarcan 2 segmentos a la vez (2, 4, 6, 8...).'
    },
    {
        type: 'order',
        question: 'Ordena los pasos de un algoritmo de integración numérica en código.',
        pool: [
            'Definir límites (a, b) y cantidad de segmentos (n).',
            'Calcular el ancho (h).',
            'Hacer un ciclo FOR para sumar el área de cada segmento.',
            'Multiplicar la suma total por la fórmula del método.'
        ],
        correctOrder: [
            'Definir límites (a, b) y cantidad de segmentos (n).',
            'Calcular el ancho (h).',
            'Hacer un ciclo FOR para sumar el área de cada segmento.',
            'Multiplicar la suma total por la fórmula del método.'
        ],
        hint: 'Primero las variables de inicio, luego defines el tamaño del paso, después iteras sumando todas las "rebanadas", y al final aplicas el factor de ajuste.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Mientras más segmentos (n) uses, el resultado será más exacto, pero la computadora tardará más en calcularlo.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'Es el eterno dilema de la ingeniería: si partes el área en 1 millón de trapecios será ultra preciso, pero el bucle `for` dará 1 millón de vueltas.'
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
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-lightbulb"></i> ¡Calcula el área de nuevo!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
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
        title.innerText = '¡Cálculo Integral Preciso!';
        text.innerText = '3 aciertos consecutivos sumando áreas. ¡No hay curva que se te escape!';
    } else if (type === 'correction') {
        title.innerText = '¡Ajustando Trapecios!';
        text.innerText = 'Vamos a repasar esas integrales que nos dejaron algo de error sobrante.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 11 (O marcamos el fin de la Unidad 2)
    localStorage.setItem('numera_current_lesson', '11');
    questionContainer.innerHTML = `
        <i class="fa-solid fa-wave-square" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center;">¡UNIDAD 2 COMPLETADA!</h1>
        <p style="font-size: 18px; font-weight: 700; color: var(--text-light); text-align: center;">
            Has dominado las raíces, sistemas lineales e integrales numéricas.<br>
            ¡Eres oficialmente un Programador Matemático!
        </p>
    `;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'RECLAMAR TROFEO';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Error de Segmentación!</h1><p>El error fue demasiado grande. ¡Recarga vidas y vuelve a integrar!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
