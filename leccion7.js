// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 7: NEWTON-RAPHSON) ---
const lessonQuestions = [
    {
        type: 'visualChoice',
        question: '¿Qué representa la línea punteada roja en el método de Newton-Raphson?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="160" x2="380" y2="160" stroke="#333" stroke-width="2"/>
                <path d="M 50 180 Q 200 150 350 20" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                <circle cx="300" cy="58" r="5" fill="#333"/>
                <text x="310" y="55" font-weight="bold">xi (Punto actual)</text>
                <line x1="350" y1="0" x2="162" y2="160" stroke="#e52b2b" stroke-width="3" stroke-dasharray="6"/>
                <circle cx="162" cy="160" r="6" fill="#58cc02"/>
                <text x="140" y="185" font-weight="bold" fill="#58cc02">xi+1 (Siguiente)</text>
            </svg>
        `,
        options: [
            'El radio de un círculo imaginario.',
            'La línea tangente a la curva en el punto actual.',
            'El intervalo cerrado [a, b].'
        ],
        correctAnswer: 1,
        hint: 'Observa cómo la línea "roza" la curva azul en un solo punto y sigue la misma inclinación hasta chocar con el eje X.'
    },
    {
        type: 'fill',
        question: 'Para poder trazar esa línea tangente matemática, la fórmula de Newton-Raphson necesita conocer la _____________ de la función.',
        chips: ['Integral', 'Derivada', 'Suma', 'Matriz'],
        correctAnswer: 'Derivada',
        hint: 'En cálculo, esta operación (f\'(x)) nos da la pendiente o inclinación exacta de una curva en cualquier punto.'
    },
    {
        type: 'choice',
        question: 'A diferencia de la Bisección, que necesita dos puntos (a y b) para encerrar la raíz, ¿cuántos puntos iniciales necesita Newton-Raphson?',
        options: [
            'Ninguno.',
            'Solo uno (x0).',
            'Tres puntos.'
        ],
        correctAnswer: 1,
        hint: 'Es un método "abierto". Tú te paras en un solo lugar de la curva, trazas la tangente, y te deslizas por ella.'
    },
    {
        type: 'order',
        question: '¡Construye la fórmula! Elige el orden correcto de las partes de la ecuación de Newton-Raphson: x(i+1) = ...',
        pool: [
            'x(i)',
            '- (menos)',
            'f(x(i)) / f\'(x(i))'
        ],
        correctOrder: [
            'x(i)',
            '- (menos)',
            'f(x(i)) / f\'(x(i))'
        ],
        hint: 'Al punto actual (x_i) le restas el resultado de dividir la función normal entre su derivada.'
    },
    {
        type: 'visualChoice',
        question: '¡Peligro! ¿Qué sucede en este escenario donde la línea tangente es totalmente horizontal?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="160" x2="380" y2="160" stroke="#333" stroke-width="2"/>
                <path d="M 100 20 Q 200 150 300 20" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                <circle cx="200" cy="85" r="6" fill="#333"/>
                <line x1="50" y1="85" x2="350" y2="85" stroke="#e52b2b" stroke-width="4" stroke-dasharray="6"/>
                <text x="140" y="70" font-weight="bold" fill="#e52b2b">f'(x) = 0</text>
            </svg>
        `,
        options: [
            'Encontramos la raíz inmediatamente.',
            'La línea nunca cruza el eje X, provocando un error de división entre cero.',
            'El método cambia a bisección automáticamente.'
        ],
        correctAnswer: 1,
        hint: 'Si la pendiente f\'(x) es 0, en la fórmula tendrás un / 0. Matemáticamente, esa línea roja nunca chocará con el piso negro.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Newton-Raphson es mucho más lento que el Método de Bisección.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 1, // Falso
        hint: 'Es famoso por su convergencia "cuadrática". Generalmente encuentra la respuesta en 3 o 4 pasos, mientras bisección tarda 20.'
    },
    {
        type: 'tableChoice',
        question: 'Aplica la fórmula: x(i+1) = x(i) - [f(x) / f\'(x)]. Si estás en x=2, f(2)=4 y f\'(2)=8. ¿Cuál es el nuevo "x"?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Punto Actual (x)</th><th>f(x)</th><th>f'(x)</th><th>Nuevo x</th></tr>
                <tr><td>2.0</td><td>4.0</td><td>8.0</td><td class="highlight">?</td></tr>
            </table>
        `,
        options: ['1.5', '2.5', '0.5'],
        correctAnswer: 0,
        hint: 'Sustituye en la mente: 2.0 - (4.0 / 8.0) = 2.0 - 0.5 = ...'
    },
    {
        type: 'fill',
        question: 'Una desventaja de este método es que si el punto inicial x0 está muy _____________ de la raíz, el algoritmo puede desviarse o rebotar sin fin.',
        chips: ['Lejos', 'Cerca', 'Oscuro', 'Elevado'],
        correctAnswer: 'Lejos',
        hint: 'Como el método es ciego y solo sigue tangentes, si no empiezas cerca del objetivo, la tangente te puede mandar al otro lado del mapa.'
    },
    {
        type: 'visualChoice',
        question: 'Según esta gráfica de errores, ¿cómo describirías la "convergencia cuadrática" de Newton-Raphson?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 150">
                <line x1="40" y1="120" x2="360" y2="120" stroke="#ccc" stroke-width="2"/>
                <line x1="40" y1="20" x2="40" y2="120" stroke="#ccc" stroke-width="2"/>
                
                <path d="M 60 30 L 140 100 L 220 118 L 300 119" fill="none" stroke="#e52b2b" stroke-width="4"/>
                <circle cx="60" cy="30" r="5" fill="#e52b2b"/> <text x="50" y="20">Error it.1</text>
                <circle cx="140" cy="100" r="5" fill="#e52b2b"/> <text x="145" y="95">it.2</text>
                <circle cx="220" cy="118" r="5" fill="#e52b2b"/>
            </svg>
        `,
        options: [
            'El error disminuye a un ritmo constante poco a poco.',
            'El error se desploma masivamente, multiplicando sus ceros correctos casi al doble cada paso.',
            'El error sube primero y luego baja.'
        ],
        correctAnswer: 1,
        hint: 'Observa la caída en picada de la línea roja. Si en el paso 1 tienes 2 decimales correctos, en el paso 2 tendrás 4, en el paso 3 tendrás 8...'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Como Newton-Raphson es un "método abierto", no te garantiza que siempre encontrará la raíz.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'Es el precio a pagar por su velocidad. A diferencia de Bisección que es 100% seguro, NR es veloz pero puede divergir.'
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
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-lightbulb"></i> ¡Cuidado con la derivada!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
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
        title.innerText = '¡Velocidad Cuadrática!';
        text.innerText = 'Llevas 3 respuestas correctas seguidas. Tu mente procesa como un CPU de última generación.';
    } else if (type === 'correction') {
        title.innerText = '¡Cuidado con la pendiente!';
        text.innerText = 'Vamos a repasar esas tangentes y derivadas para que cierres perfecto.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 8
    localStorage.setItem('numera_current_lesson', '8');
    questionContainer.innerHTML = `<i class="fa-solid fa-chart-line" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Felicidades, Sir Isaac Newton!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Acabas de dominar el método abierto más famoso y veloz del mundo numérico.</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Te saliste del límite!</h1><p>Tu punto inicial divergió lejos de la raíz. ¡Recarga energías y vuelve a intentar!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
