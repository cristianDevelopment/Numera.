// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 9: GAUSS-SEIDEL) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: 'A diferencia de la Eliminación Gaussiana (que es un método directo), Gauss-Seidel es un método...',
        options: [
            'Imaginario.',
            'Iterativo.',
            'Gráfico.'
        ],
        correctAnswer: 1,
        hint: 'En lugar de despejar variables de un solo golpe, Gauss-Seidel "adivina" una respuesta y la va mejorando ciclo tras ciclo.'
    },
    {
        type: 'visualChoice',
        question: 'Para garantizar que el método converja, la matriz debe ser "Diagonalmente Dominante". ¿Qué matriz cumple esto?',
        visualHTML: `
            <div style="display: flex; gap: 20px; justify-content: center; margin-bottom: 20px;">
                <table class="math-table" style="max-width: 250px;">
                    <tr><th colspan="3">Matriz A</th></tr>
                    <tr><td class="good-zone">8</td><td>1</td><td>2</td></tr>
                    <tr><td>3</td><td class="good-zone">9</td><td>1</td></tr>
                    <tr><td>2</td><td>4</td><td class="good-zone">7</td></tr>
                </table>
                <table class="math-table" style="max-width: 250px;">
                    <tr><th colspan="3">Matriz B</th></tr>
                    <tr><td class="bad-zone">2</td><td>5</td><td>6</td></tr>
                    <tr><td>8</td><td class="bad-zone">1</td><td>3</td></tr>
                    <tr><td>4</td><td>7</td><td class="bad-zone">2</td></tr>
                </table>
            </div>
        `,
        options: [
            'La Matriz A',
            'La Matriz B',
            'Ninguna de las dos'
        ],
        correctAnswer: 0,
        hint: 'En la Matriz A, el número de la diagonal principal SIEMPRE es mayor que la suma del resto de números de su misma fila (Ej: 8 > 1 + 2).'
    },
    {
        type: 'fill',
        question: 'Como es un método iterativo, antes de entrar al bucle `while`, necesitamos asignar valores _____________ a las incógnitas (usualmente ceros).',
        chips: ['Finales', 'Iniciales', 'Negativos', 'Complejos'],
        correctAnswer: 'Iniciales',
        hint: 'Necesitas un punto de partida para que la primera iteración tenga números con qué operar.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: La gran ventaja de Gauss-Seidel sobre el método de Jacobi es que utiliza los valores nuevos en cuanto los calcula.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'Si calculas la nueva "x", la usas inmediatamente para calcular "y". No esperas a la siguiente iteración como lo hace Jacobi.'
    },
    {
        type: 'tableChoice',
        question: 'Calcula la primera iteración de "x". Ecuación: 4x + y = 9. Si el valor inicial de "y" es 0, ¿cuánto vale "x"?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Paso</th><th>Fórmula Despejada</th><th>Sustitución</th></tr>
                <tr><td>1</td><td>x = (9 - y) / 4</td><td>x = (9 - 0) / 4</td></tr>
            </table>
        `,
        options: ['2.25', '9.0', '0.0'],
        correctAnswer: 0,
        hint: 'Solo realiza la operación: nueve menos cero, dividido entre cuatro.'
    },
    {
        type: 'fill',
        question: 'Una vez que calculaste que x = 2.25, para despejar la "y" en la segunda ecuación usarás ese valor _____________, en lugar del cero inicial.',
        chips: ['Viejo', 'Nuevo', 'Imaginario', 'Aleatorio'],
        correctAnswer: 'Nuevo',
        hint: 'Esta es la clave de Gauss-Seidel: siempre usar la información más reciente que se tenga disponible.'
    },
    {
        type: 'order',
        question: 'Ordena el ciclo lógico de programación de Gauss-Seidel.',
        pool: [
            'Asignar valores iniciales (ej. x=0, y=0).',
            'Calcular nueva X usando la vieja Y.',
            'Calcular nueva Y usando la NUEVA X.',
            'Comparar el error contra la tolerancia.'
        ],
        correctOrder: [
            'Asignar valores iniciales (ej. x=0, y=0).',
            'Calcular nueva X usando la vieja Y.',
            'Calcular nueva Y usando la NUEVA X.',
            'Comparar el error contra la tolerancia.'
        ],
        hint: 'Primero inicializas todo, luego calculas la primera variable, inmediatamente usas esa respuesta para la segunda variable, y al final revisas si ya terminaste.'
    },
    {
        type: 'visualChoice',
        question: '¿Qué sucede si aplicas Gauss-Seidel a una matriz que NO es diagonalmente dominante?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="180" x2="380" y2="180" stroke="#ccc" stroke-width="2"/>
                <line x1="20" y1="20" x2="20" y2="180" stroke="#ccc" stroke-width="2"/>
                
                <path d="M 20 180 L 100 170 L 150 140 L 200 90 L 250 20" fill="none" stroke="#e52b2b" stroke-width="3" stroke-dasharray="5"/>
                <circle cx="250" cy="20" r="5" fill="#e52b2b"/>
                <text x="260" y="25" fill="#e52b2b" font-weight="bold">Error = ∞</text>
            </svg>
        `,
        options: [
            'Converge más rápido.',
            'El método puede divergir (el error crece hacia el infinito).',
            'Se transforma en una matriz de ceros.'
        ],
        correctAnswer: 1,
        hint: 'Si la diagonal es débil, las divisiones generan números cada vez más gigantes, causando que el algoritmo explote.'
    },
    {
        type: 'choice',
        question: 'En programación, ¿por qué Gauss-Seidel gasta menos memoria RAM que un método directo como Eliminación Gaussiana?',
        options: [
            'Porque no usa números decimales.',
            'Porque solo necesita guardar los valores actuales de x, y, z; no modifica toda una matriz gigante.',
            'Porque borra el disco duro.'
        ],
        correctAnswer: 1,
        hint: 'Solo reescribes las variables (x, y, z) una y otra vez en las mismas cajitas de memoria.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: En Gauss-Seidel, el ciclo termina únicamente cuando TODAS las incógnitas tienen un error menor a la tolerancia.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'No puedes parar el algoritmo si "x" ya es exacta pero "y" sigue con mucho error. Tienes que esperar a que todas converjan.'
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
        title.innerText = '¡Ciclo Perfecto!';
        text.innerText = '3 aciertos consecutivos. Tus variables se están actualizando sin errores.';
    } else if (type === 'correction') {
        title.innerText = '¡Error de Convergencia!';
        text.innerText = 'Vamos a reevaluar las iteraciones que fallaron. ¡No dejes que diverja!';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 10
    localStorage.setItem('numera_current_lesson', '10');
    questionContainer.innerHTML = `<i class="fa-solid fa-arrow-rotate-left" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Sistemas Iterados!</h1><p style="font-size: 18px; font-weight: 700; color: var(--text-light);">Lograste comprender cómo la computadora ahorra memoria iterando matrices.</p>`;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Tolerancia Excedida!</h1><p>El método divergió por falta de vidas. ¡Reinicia los valores y vuelve a empezar!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
