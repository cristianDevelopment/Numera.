// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 12: RETO DE SISTEMAS) ---
const lessonQuestions = [
    {
        type: 'visualChoice',
        question: 'Análisis de Memoria: Tienes una matriz de 10,000 x 10,000 para un modelo 3D. El 95% de la matriz son ceros (Matriz Dispersa). ¿Qué método usas para no colapsar la RAM?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <rect x="50" y="20" width="120" height="120" fill="#333"/>
                <text x="60" y="85" fill="white" font-weight="bold">Matriz Densa</text>
                
                <rect x="230" y="20" width="120" height="120" fill="white" stroke="#333" stroke-width="2"/>
                <circle cx="250" cy="40" r="3" fill="#e52b2b"/><circle cx="280" cy="70" r="3" fill="#e52b2b"/>
                <circle cx="320" cy="110" r="3" fill="#e52b2b"/><circle cx="240" cy="100" r="3" fill="#e52b2b"/>
                <text x="240" y="85" fill="#333" font-weight="bold">Dispersa</text>
            </svg>
        `,
        options: [
            'Eliminación Gaussiana (Directo).',
            'Gauss-Seidel (Iterativo).',
            'Sustitución hacia atrás pura.'
        ],
        correctAnswer: 1,
        hint: 'Los métodos directos guardan toda la matriz y hacen operaciones con todos los ceros, gastando RAM. Los métodos iterativos solo procesan las ecuaciones como fórmulas individuales.'
    },
    {
        type: 'tableChoice',
        question: 'Peligro Crítico: Un programa falló al iniciar. Revisa la matriz original. ¿Cuál es el problema si intentas aplicar Eliminación Gaussiana directamente?',
        visualHTML: `
            <table class="math-table">
                <tr><th>x</th><th>y</th><th>z</th><th class="divider">R</th></tr>
                <tr><td class="highlight">0</td><td>4</td><td>2</td><td class="divider">10</td></tr>
                <tr><td>3</td><td>1</td><td>5</td><td class="divider">14</td></tr>
                <tr><td>2</td><td>7</td><td>1</td><td class="divider">8</td></tr>
            </table>
        `,
        options: [
            'La matriz tiene demasiadas filas.',
            'El primer pivote es CERO, causará una división por cero.',
            'El resultado de R es más grande que X.'
        ],
        correctAnswer: 1,
        hint: 'Para eliminar la columna X, el algoritmo divide la Fila 2 y 3 entre el pivote (Fila 1, Columna 1). ¡No se puede dividir entre 0!'
    },
    {
        type: 'fill',
        question: 'Para arreglar el error anterior sin alterar el resultado, la computadora debe ejecutar la subrutina de _____________ parcial, intercambiando la Fila 1 con la Fila 2.',
        chips: ['Pivoteo', 'Borrado', 'Bisección', 'Interpolación'],
        correctAnswer: 'Pivoteo',
        hint: 'Es la acción de buscar un número distinto de cero (preferiblemente el mayor) en esa columna para usarlo como nuevo "eje" o punto de apoyo.'
    },
    {
        type: 'visualChoice',
        question: 'Análisis Geométrico: Si al intentar resolver un sistema de 2x2 la gráfica luce así, ¿qué puedes deducir de la matriz?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="100" x2="380" y2="100" stroke="#333" stroke-width="2"/> <line x1="200" y1="20" x2="200" y2="180" stroke="#333" stroke-width="2"/> <line x1="50" y1="150" x2="350" y2="50" stroke="#1cb0f6" stroke-width="4"/> <line x1="50" y1="110" x2="350" y2="10" stroke="#e52b2b" stroke-width="4"/> <text x="100" y="180" font-weight="bold" fill="#777">Líneas 100% Paralelas</text>
            </svg>
        `,
        options: [
            'El sistema tiene infinitas soluciones.',
            'El sistema NO tiene solución (Matriz Singular / Determinante = 0).',
            'El método de Gauss lo resolverá en 1 paso.'
        ],
        correctAnswer: 1,
        hint: 'Si las líneas nunca se cruzan, no existe ningún par de números (x,y) que cumplan ambas ecuaciones al mismo tiempo. El determinante de la matriz es exactamente 0.'
    },
    {
        type: 'choice',
        question: 'Concepto Avanzado: ¿Qué diferencia hay entre Gauss-Jordan y Eliminación Gaussiana normal?',
        options: [
            'Gauss-Jordan solo sirve para matrices 2x2.',
            'Eliminación Gaussiana hace ceros ABAJO de la diagonal; Gauss-Jordan hace ceros ARRIBA y ABAJO.',
            'Ninguna, son dos nombres para el mismo algoritmo.'
        ],
        correctAnswer: 1,
        hint: 'Gauss normal te deja una matriz triangular (necesita sustitución hacia atrás). Jordan convierte la matriz directamente en la matriz Identidad (ceros por todos lados excepto la diagonal).'
    },
    {
        type: 'fill',
        question: 'Un sistema está "mal _____________" cuando un pequeñísimo cambio en los datos iniciales (ej. un decimal) provoca un cambio GIGANTE en la solución final.',
        chips: ['Condicionado', 'Programado', 'Iterado', 'Graficado'],
        correctAnswer: 'Condicionado',
        hint: 'Es un término de análisis numérico (Ill-conditioned). Ocurre cuando las líneas de las ecuaciones son "casi" paralelas, pero no del todo.'
    },
    {
        type: 'order',
        question: 'Eres un ingeniero civil calculando las fuerzas de un puente nuevo. Ordena el proceso lógico para programar tu solución:',
        pool: [
            'Verificar si la matriz es Diagonalmente Dominante.',
            'Extraer las ecuaciones de fuerza de los nodos del puente.',
            'Programar un ciclo while (Gauss-Seidel) hasta alcanzar la tolerancia.',
            'Construir la matriz del sistema en código.'
        ],
        correctOrder: [
            'Extraer las ecuaciones de fuerza de los nodos del puente.',
            'Construir la matriz del sistema en código.',
            'Verificar si la matriz es Diagonalmente Dominante.',
            'Programar un ciclo while (Gauss-Seidel) hasta alcanzar la tolerancia.'
        ],
        hint: 'Primero sacas la física al papel, luego la pasas a una matriz en la PC, verificas si el método iterativo funcionará, y finalmente lo ejecutas.'
    },
    {
        type: 'visualChoice',
        question: 'Revisa este log de un algoritmo iterativo. ¿Qué método es, sabiendo que "y" usa el valor de "x" viejo en lugar del recién calculado?',
        visualHTML: `
            <table class="math-table" style="font-size: 14px;">
                <tr><th>Iter</th><th>x_nueva</th><th>y_nueva</th></tr>
                <tr><td>1</td><td>x = F(<b>y_vieja</b>)</td><td>y = F(<b>x_vieja</b>)</td></tr>
                <tr><td>2</td><td>x = F(y_vieja_it1)</td><td>y = F(x_vieja_it1)</td></tr>
            </table>
        `,
        options: [
            'Método de Jacobi.',
            'Método de Gauss-Seidel.',
            'Método de Cramer.'
        ],
        correctAnswer: 0,
        hint: 'Si NO actualiza las variables instantáneamente durante el ciclo, sino que espera hasta que termine toda la "ronda" para usar las nuevas, es el método más lento y clásico.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Si tienes 100 ecuaciones y 100 incógnitas, usar la "Regla de Cramer" (calcular puros determinantes) es la opción más rápida para una computadora.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 1, // Falso
        hint: 'Cramer es útil para hacer a mano sistemas de 2x2 o 3x3. Para 100x100, la computadora tardaría literalmente millones de años en calcular tantos determinantes.'
    },
    {
        type: 'choice',
        question: 'Decisión Ejecutiva: Tienes una matriz muy densa y bien condicionada, de un tamaño razonable (100x100). Necesitas la solución 100% exacta sin importar el tiempo. ¿Qué método usas?',
        options: [
            'Eliminación Gaussiana con pivoteo.',
            'Bisección repetida.',
            'Gauss-Seidel con tolerancia baja.'
        ],
        correctAnswer: 0,
        hint: 'Si la matriz cabe en RAM y quieres la exactitud matemática sin aproximaciones iterativas, los métodos directos (álgebra matricial pura) son tu mejor opción.'
    }
];

// --- MOTOR DEL JUEGO (ADAPTADO AL NIVEL DE JEFE) ---
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
    // Ajuste de color para Nivel 3
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
    deactivateCheckButton(); // Reset button styles before applying correct/incorrect

    if (isCorrect) {
        NumeraAudio.correct();
        footer.classList.add('correct');
        feedbackMessage.innerText = '¡Decisión Correcta!';
        btnCheck.innerText = 'CONTINUAR';
        btnCheck.classList.add('active'); // Mantener activo para dar click
        questionsAnsweredCorrectly++;
        consecutiveCorrect++; 
        let progress = (questionsAnsweredCorrectly / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    } else {
        NumeraAudio.incorrect();
        footer.classList.add('incorrect');
        questionContainer.classList.add('shake');
        setTimeout(() => questionContainer.classList.remove('shake'), 500);
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-triangle-exclamation"></i> ¡Cuidado con la RAM!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
        btnCheck.innerText = 'ENTENDIDO';
        btnCheck.classList.add('active'); // Mantener activo
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
        title.innerText = '¡Instinto Matemático!';
        text.innerText = '3 aciertos consecutivos previniendo desastres matriciales. Eres un experto en sistemas.';
    } else if (type === 'correction') {
        title.innerText = '¡Optimizando el Código!';
        text.innerText = 'Algunas decisiones te costarían memoria o procesador. Vamos a reevaluarlas.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 13
    localStorage.setItem('numera_current_lesson', '13');
    questionContainer.innerHTML = `
        <i class="fa-solid fa-network-wired" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center;">¡Sistemas Dominados!</h1>
        <p style="font-size: 18px; font-weight: 700; color: var(--text-light); text-align: center;">
            Ya no te asustan las matrices gigantes ni las divisiones entre cero. Tienes el control total.
        </p>
    `;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Stack Overflow!</h1><p>Tomaste una mala decisión de optimización y la memoria colapsó. ¡Inténtalo de nuevo!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
