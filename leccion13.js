// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 13: RETO DE INTEGRALES) ---
const lessonQuestions = [
    {
        type: 'visualChoice',
        question: 'Análisis de Error: ¿Por qué aplicar un solo trapecio a esta función oscilatoria es un desastre matemático?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="180" x2="380" y2="180" stroke="#333" stroke-width="2"/>
                <path d="M 50 180 Q 100 20 150 180 T 250 180 T 350 180" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                <polygon points="50,180 50,180 350,180 350,180" fill="rgba(229, 43, 43, 0.4)" stroke="#e52b2b" stroke-width="4"/>
                
                <text x="45" y="195" font-weight="bold">a</text>
                <text x="345" y="195" font-weight="bold">b</text>
                <text x="120" y="195" font-weight="bold" fill="#e52b2b">Área calculada = 0</text>
            </svg>
        `,
        options: [
            'Porque la computadora no sabe dibujar curvas.',
            'Porque f(a) y f(b) valen cero, así que el "techo" del trapecio es totalmente plano, ignorando las montañas de en medio.',
            'Porque los trapecios no pueden usarse en funciones trigonométricas.'
        ],
        correctAnswer: 1,
        hint: 'El trapecio normal es ciego: solo mira el primer y el último punto. Si ambos están en el suelo, asume que no hay área, ignorando todo lo que ocurre en el medio.'
    },
    {
        type: 'choice',
        question: 'Tienes datos de un sensor de velocidad guardados en un arreglo. En total tienes EXACTAMENTE 3 puntos de datos. ¿Qué método te dará la mejor precisión?',
        options: [
            'La Regla del Trapecio Múltiple.',
            'La Regla de Simpson 1/3.',
            'La Regla de Simpson 3/8.'
        ],
        correctAnswer: 1,
        hint: '3 puntos generan 2 segmentos (n=2). Simpson 1/3 requiere un número par de segmentos y dibuja una parábola perfecta usando exactamente 3 puntos.'
    },
    {
        type: 'fill',
        question: 'Simpson 3/8 usa curvas cúbicas en lugar de parábolas, por lo que requiere que el número de segmentos (n) sea un múltiplo de _____________.',
        chips: ['Dos', 'Tres', 'Diez', 'Cero'],
        correctAnswer: 'Tres',
        hint: 'Cada curva de Simpson 3/8 abarca 3 bloques de datos.'
    },
    {
        type: 'tableChoice',
        question: 'Datos Corruptos: El sensor falló y tomó lecturas a intervalos de tiempo (X) irregulares. ¿Qué método es el ÚNICO que puedes aplicar directamente aquí?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Tiempo (X)</th><th>Velocidad (Y)</th></tr>
                <tr><td>0.0 s</td><td>0.0</td></tr>
                <tr><td class="warning-zone">0.2 s (h=0.2)</td><td>5.1</td></tr>
                <tr><td class="warning-zone">0.7 s (h=0.5)</td><td>12.4</td></tr>
                <tr><td class="warning-zone">0.8 s (h=0.1)</td><td>14.0</td></tr>
            </table>
        `,
        options: [
            'La Regla de Simpson 1/3 Compuesta.',
            'La Regla del Trapecio aplicando la fórmula individual a cada pedazo.',
            'La Integración Directa de Gauss.'
        ],
        correctAnswer: 1,
        hint: 'Las reglas de Simpson y la fórmula general del Trapecio asumen que la base "h" es constante. Si "h" cambia a cada rato, debes calcular área por área con trapecios simples.'
    },
    {
        type: 'visualChoice',
        question: 'Decisión de Diseño: Si tu gráfica es cóncava hacia abajo (forma de cueva), ¿qué le pasará al área si usas un solo Trapecio?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="180" x2="380" y2="180" stroke="#333" stroke-width="2"/>
                <path d="M 50 180 Q 200 20 350 180" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                <polygon points="50,180 50,150 350,150 350,180" fill="none" stroke="#e52b2b" stroke-width="4" stroke-dasharray="6"/>
                <line x1="50" y1="150" x2="350" y2="150" stroke="#e52b2b" stroke-width="4"/>
            </svg>
        `,
        options: [
            'Sobreestimará el área (dará un resultado mayor al real).',
            'Subestimará el área (dará un resultado menor al real, faltando pedazos).',
            'Dará el área exacta.'
        ],
        correctAnswer: 1,
        hint: 'Mira la línea roja recta (el techo del trapecio). Todo el espacio curvo azul que queda por encima de la línea roja NO será calculado.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: En la programación del mundo real, la "Integración Numérica" es mucho más estable y segura que la "Diferenciación Numérica" (calcular derivadas).',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'La integración suma áreas y suaviza los errores. La derivación calcula pendientes y amplifica cualquier pequeño ruido o error en los datos de los sensores.'
    },
    {
        type: 'order',
        question: 'Algoritmo de Fusión: Tienes 7 puntos de datos (n=6 segmentos). Ordena cómo aplicarías la mejor combinación de métodos.',
        pool: [
            'Dividir el problema: Usar Simpson 1/3 para los primeros 4 segmentos.',
            'Comprobar que los puntos tienen separación constante (h).',
            'Usar Simpson 3/8 para los últimos 3 puntos (2 segmentos). ¡Espera, 3/8 requiere n=3!',
            'Sumar el resultado de la parte 1 y la parte 2.'
        ],
        correctOrder: [
            'Comprobar que los puntos tienen separación constante (h).',
            'Dividir el problema: Usar Simpson 1/3 para los primeros 4 segmentos.',
            'Usar Simpson 3/8 para los últimos 3 puntos (2 segmentos). ¡Espera, 3/8 requiere n=3!',
            'Sumar el resultado de la parte 1 y la parte 2.'
        ],
        hint: 'Disculpa el truco en la opción 3 (Simpson 1/3 y 3/8 se pueden combinar cuando n es impar, pero con n=6, Simpson 1/3 puede hacer todo solo. Sin embargo, si quieres combinarlos, primero verificas "h", partes el problema y luego sumas las áreas.'
        // NOTA: Para no confundir, usaré un texto más claro en la corrección de abajo
    },
    {
        type: 'fill',
        question: 'Si quieres aumentar dramáticamente la precisión de la Regla del Trapecio sin cambiar el método, simplemente debes _____________ el tamaño de "h" (aumentando la cantidad de segmentos "n").',
        chips: ['Aumentar', 'Disminuir', 'Ignorar', 'Elevar'],
        correctAnswer: 'Disminuir',
        hint: 'Mientras más delgados sean los trapecios (h menor), mejor se pegarán al contorno de la curva azul.'
    },
    {
        type: 'choice',
        question: '¿Qué método de integración de nivel superior usa un cambio de variable y "puntos de evaluación óptimos" en lugar de intervalos fijos?',
        options: [
            'Cuadratura de Gauss.',
            'Regla del Trapecio Compuesta.',
            'Método de Newton-Raphson.'
        ],
        correctAnswer: 0,
        hint: 'Es un método muy elegante donde la computadora no parte la gráfica en pedazos iguales, sino que evalúa la función en puntos estratégicos "pesados" para máxima precisión con poco esfuerzo.'
    },
    {
        type: 'tableChoice',
        question: 'Tienes 11 puntos de datos (10 segmentos). ¿Qué combinación de métodos te dará la mejor precisión para integrar toda el área?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Segmentos Totales (n)</th><th>Opciones Disponibles</th></tr>
                <tr><td class="highlight">n = 10</td><td>Trapecio Múltiple, Simpson 1/3 Múltiple</td></tr>
            </table>
        `,
        options: [
            'Usar solo la Regla del Trapecio.',
            'Usar Simpson 3/8 para todo.',
            'Usar Simpson 1/3 para los 10 segmentos.'
        ],
        correctAnswer: 2,
        hint: 'Como n=10 es un número par, la Regla de Simpson 1/3 compuesta puede cubrir todo el trayecto perfectamente y es más precisa que el Trapecio.'
    }
];

// Arreglo especial para la pregunta de Order (Corregido para claridad)
lessonQuestions[6].pool = [
    'Verificar que el paso "h" sea constante.',
    'Aplicar Simpson 1/3 a los segmentos pares.',
    'Aplicar Trapecio o Simpson 3/8 a los segmentos restantes si n es impar.',
    'Sumar todas las áreas parciales.'
];
lessonQuestions[6].correctOrder = [
    'Verificar que el paso "h" sea constante.',
    'Aplicar Simpson 1/3 a los segmentos pares.',
    'Aplicar Trapecio o Simpson 3/8 a los segmentos restantes si n es impar.',
    'Sumar todas las áreas parciales.'
];
lessonQuestions[6].hint = 'Primero confirmas que puedes usar el método, luego aplicas la regla principal, después tapas los "huecos" sobrantes y al final sumas el área total.';

// --- MOTOR DEL JUEGO (NIVEL DE JEFE) ---
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
                    <div class="order-target" id="order-target" style="border-color: var(--dark-red); background-color: #fdf2f2;"></div>
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
    btnCheck.style.backgroundColor = 'var(--dark-red)';
    btnCheck.style.boxShadow = '0 4px 0 #8a1717';
    btnCheck.style.color = 'white';
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
        feedbackMessage.innerText = '¡Cálculo Preciso!';
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
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-triangle-exclamation"></i> ¡Cuidado con el error!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
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
        title.innerText = '¡Integración Perfecta!';
        text.innerText = '3 aciertos consecutivos dominando áreas. ¡No dejas ni un decimal fuera!';
    } else if (type === 'correction') {
        title.innerText = '¡Ajustando Trapecios!';
        text.innerText = 'A veces los sensores mienten o las curvas engañan. ¡Corrijamos el rumbo!';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 14
    localStorage.setItem('numera_current_lesson', '14');
    questionContainer.innerHTML = `
        <i class="fa-solid fa-chart-area" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center;">¡Reto de Áreas Superado!</h1>
        <p style="font-size: 18px; font-weight: 700; color: var(--text-light); text-align: center;">
            Sabes exactamente qué método aplicar sin importar qué tan feos sean los datos reales.
        </p>
    `;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Límite de Integración!</h1><p>El margen de error te venció. ¡Recarga vidas e intenta calcularlo de nuevo!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
