// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 15: EXAMEN FINAL) ---
const lessonQuestions = [
    {
        type: 'visualChoice',
        question: 'Pregunta 1: Raíces. Al observar esta gráfica de convergencia, ¿a qué método pertenece la Línea Roja que cae en picada (velocidad cuadrática)?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 150">
                <line x1="40" y1="120" x2="360" y2="120" stroke="#333" stroke-width="2"/>
                <line x1="40" y1="20" x2="40" y2="120" stroke="#333" stroke-width="2"/>
                
                <path d="M 60 30 L 140 60 L 220 90 L 300 110" fill="none" stroke="#58cc02" stroke-width="4"/>
                <path d="M 60 30 L 120 100 L 180 118 L 240 119" fill="none" stroke="#e52b2b" stroke-width="4"/>
                
                <text x="310" y="105" font-weight="bold" fill="#58cc02">Línea Verde</text>
                <text x="250" y="135" font-weight="bold" fill="#e52b2b">Línea Roja</text>
            </svg>
        `,
        options: [
            'Método de Bisección.',
            'Método de Newton-Raphson.',
            'Regla de Simpson.'
        ],
        correctAnswer: 1,
        hint: 'La línea roja destruye el error casi instantáneamente gracias a que usa derivadas (tangentes).'
    },
    {
        type: 'fill',
        question: 'Pregunta 2: Sistemas. En la Eliminación Gaussiana, el proceso de ir de la última ecuación hacia la primera despejando variables se llama Sustitución hacia _____________.',
        chips: ['Adelante', 'Atrás', 'Arriba', 'Abajo'],
        correctAnswer: 'Atrás',
        hint: 'También conocido en inglés como "Back Substitution". Empiezas con "z", retrocedes a "y" y terminas en "x".'
    },
    {
        type: 'choice',
        question: 'Pregunta 3: Integración. ¿Qué regla de integración numérica utiliza polinomios de segundo grado (parábolas) para conectar los puntos?',
        options: [
            'Regla del Trapecio.',
            'Regla de Simpson 1/3.',
            'Regla de Simpson 3/8.'
        ],
        correctAnswer: 1,
        hint: 'El Trapecio usa líneas rectas (grado 1). Simpson 3/8 usa curvas cúbicas (grado 3). ¿Cuál queda en medio?'
    },
    {
        type: 'visualChoice',
        question: 'Pregunta 4: Diagnóstico. ¿Por qué este sistema fallará si intentas resolverlo iterativamente con Gauss-Seidel?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Ecuación 1</th><td>1x + 8y = 10</td></tr>
                <tr><th>Ecuación 2</th><td>7x + 2y = 5</td></tr>
            </table>
        `,
        options: [
            'Porque no tiene términos en "z".',
            'Porque la matriz NO es diagonalmente dominante (1 no es mayor que 8).',
            'Porque los resultados (10 y 5) son positivos.'
        ],
        correctAnswer: 1,
        hint: 'En la diagonal principal tendrías el 1 y el 2. Para que converja, la diagonal debe tener los números más "pesados" de su fila.'
    },
    {
        type: 'fill',
        question: 'Pregunta 5: Para arreglar el problema anterior, solo necesitas aplicar un _____________ de filas (poner la Ec. 2 arriba y la Ec. 1 abajo).',
        chips: ['Corte', 'Pivoteo', 'Borrado', 'Bucle'],
        correctAnswer: 'Pivoteo',
        hint: 'Es la misma técnica que usamos para evitar la división entre cero en Eliminación Gaussiana.'
    },
    {
        type: 'order',
        question: 'Pregunta 6: El ciclo de vida universal. Ordena las etapas fundamentales de CUALQUIER método iterativo programado.',
        pool: [
            'Inicializar variables (x0, tolerancias, max_iter).',
            'Ejecutar el cálculo del método (ej. Fórmula de Newton).',
            'Calcular el Error entre el valor nuevo y el viejo.',
            'Verificar si Error < Tolerancia (Si sí: salir. Si no: repetir).'
        ],
        correctOrder: [
            'Inicializar variables (x0, tolerancias, max_iter).',
            'Ejecutar el cálculo del método (ej. Fórmula de Newton).',
            'Calcular el Error entre el valor nuevo y el viejo.',
            'Verificar si Error < Tolerancia (Si sí: salir. Si no: repetir).'
        ],
        hint: 'Preparas el terreno, haces el cálculo, mides qué tan bien te fue, y decides si sigues o te detienes.'
    },
    {
        type: 'truefalse',
        question: 'Pregunta 7: Verdadero o Falso. En Bisección, si el intervalo [a, b] es [2, 4], el primer punto medio "c" siempre será 3.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'La fórmula es c = (a+b)/2. -> (2+4)/2 = 6/2 = 3. Las matemáticas no mienten.'
    },
    {
        type: 'choice',
        question: 'Pregunta 8: Conceptos. ¿Cuál es el enemigo principal de los métodos numéricos ejecutados en computadora?',
        options: [
            'El polvo en la tarjeta madre.',
            'El Error de Truncamiento y Redondeo por el límite de decimales (bits).',
            'Que el lenguaje de programación no esté en inglés.'
        ],
        correctAnswer: 1,
        hint: 'Las computadoras no tienen memoria infinita. Un número como Pi o 1/3 se corta (trunca) en algún punto, generando pequeños errores que se acumulan.'
    },
    {
        type: 'visualChoice',
        question: 'Pregunta 9: Integración. Si tuvieras que calcular el área de este terreno irregular usando coordenadas tomadas cada 5 metros, ¿qué método usarías?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 150">
                <line x1="20" y1="120" x2="380" y2="120" stroke="#333" stroke-width="3"/>
                <path d="M 50 120 L 50 60 Q 150 20 250 80 T 350 100 L 350 120 Z" fill="rgba(229, 43, 43, 0.3)" stroke="#e52b2b" stroke-width="3"/>
                <line x1="100" y1="120" x2="100" y2="40" stroke="#333" stroke-dasharray="4"/>
                <line x1="150" y1="120" x2="150" y2="30" stroke="#333" stroke-dasharray="4"/>
                <line x1="200" y1="120" x2="200" y2="50" stroke="#333" stroke-dasharray="4"/>
                <line x1="250" y1="120" x2="250" y2="80" stroke="#333" stroke-dasharray="4"/>
                <line x1="300" y1="120" x2="300" y2="90" stroke="#333" stroke-dasharray="4"/>
            </svg>
        `,
        options: [
            'Una integral analítica de cálculo diferencial.',
            'Regla de Simpson (1/3 o 3/8) compuesta.',
            'No se puede calcular, hay que medirlo a mano.'
        ],
        correctAnswer: 1,
        hint: 'No tienes una fórmula bonita para integrar a mano, solo tienes puntos separados por la misma distancia (h=5). Esto es trabajo perfecto para Simpson.'
    },
    {
        type: 'tableChoice',
        question: 'Pregunta 10: La Decisión Final. Tienes una matriz dispersa (llena de ceros) de 100,000 x 100,000 para simular el clima. ¿Cuál es tu arma final?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Método</th><th>Memoria (RAM)</th><th>Tipo</th></tr>
                <tr><td>Eliminación Gauss</td><td>Gigante (Guarda Ceros)</td><td>Directo</td></tr>
                <tr><td class="good-zone">Gauss-Seidel</td><td class="good-zone">Baja (Solo Ecuaciones)</td><td class="good-zone">Iterativo</td></tr>
            </table>
        `,
        options: [
            'Eliminación Gaussiana',
            'Gauss-Seidel',
            'Cramer'
        ],
        correctAnswer: 1,
        hint: 'La tabla te lo está gritando. Para simulaciones gigantes en la vida real, los métodos iterativos salvan la memoria de tu computadora.'
    }
];

// --- MOTOR DEL JUEGO (NIVEL DE JEFE FINAL) ---
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
    let formattedQuestion = q.question.replace('_____________', `<span id="blank-target" class="blank-space" style="color: var(--dark-red); border-color: var(--dark-red);" onclick="removeChip()"></span>`);
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
                    <div class="order-target" id="order-target" style="border-color: var(--gold); background-color: #fffae6;"></div>
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

function activateCheckButton() { 
    btnCheck.classList.add('active'); 
    btnCheck.style.backgroundColor = 'var(--gold)';
    btnCheck.style.boxShadow = '0 4px 0 #cc9e00';
    btnCheck.style.color = '#333';
}
function deactivateCheckButton() { 
    btnCheck.classList.remove('active'); 
    btnCheck.style.backgroundColor = '';
    btnCheck.style.boxShadow = '';
    btnCheck.style.color = '';
}

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
    deactivateCheckButton(); 

    if (isCorrect) {
        NumeraAudio.correct();
        footer.classList.add('correct');
        feedbackMessage.innerText = '¡Aprobado!';
        btnCheck.innerText = 'CONTINUAR';
        btnCheck.classList.add('active'); 
        questionsAnsweredCorrectly++;
        consecutiveCorrect++; 
        let progress = (questionsAnsweredCorrectly / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        NumeraAudio.incorrect();
        footer.classList.add('incorrect');
        questionContainer.classList.add('shake');
        setTimeout(() => questionContainer.classList.remove('shake'), 500);
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-triangle-exclamation"></i> ¡Cuidado!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
        btnCheck.innerText = 'ENTENDIDO';
        btnCheck.classList.add('active'); 
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
        title.innerText = '¡Racha de Maestro!';
        text.innerText = '3 aciertos consecutivos en el examen final. La graduación está cerca.';
    } else if (type === 'correction') {
        title.innerText = '¡Repaso Final!';
        text.innerText = 'Un ingeniero no deja cabos sueltos. Corrijamos estas últimas dudas.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 EL JUEGO ESTÁ COMPLETADO - MARCAMOS LA LECCIÓN 16 (VICTORIA)
    localStorage.setItem('numera_current_lesson', '16');
    questionContainer.innerHTML = `
        <i class="fa-solid fa-graduation-cap" style="font-size: 100px; color: var(--gold); margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center; color: var(--gold); font-size: 40px;">¡MÁSTER NUMÉRICO!</h1>
        <p style="font-size: 20px; font-weight: 700; color: var(--text-dark); text-align: center;">
            ¡Felicidades, Iterauta!<br><br>
            Has superado todas las unidades, dominado las raíces, resuelto los sistemas y calculado las áreas. 
            ¡Estás listo para programar el futuro!
        </p>
    `;
    footer.className = 'lesson-footer correct';
    footer.style.backgroundColor = '#fff2cc';
    footer.style.borderTopColor = 'var(--gold)';
    btnCheck.innerText = 'RECLAMAR MI TÍTULO';
    btnCheck.className = 'btn-check active';
    btnCheck.style.backgroundColor = 'var(--gold)';
    btnCheck.style.boxShadow = '0 4px 0 #cc9e00';
    btnCheck.style.color = '#333';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver()
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Examen Reprobado!</h1><p>Estuviste tan cerca... ¡Respira, repasa tus notas y vuelve a presentar el examen!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR EXAMEN';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
