// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 14: PROBLEMAS MIXTOS) ---
const lessonQuestions = [
    {
        type: 'choice',
        question: 'Problema Industrial: Necesitas saber la cantidad exacta de galones de agua almacenados en un tanque irregular a lo largo de un día. ¿Qué familia de métodos debes usar?',
        options: [
            'Búsqueda de Raíces (Newton, Bisección).',
            'Sistemas de Ecuaciones (Gauss, Seidel).',
            'Integración Numérica (Trapecio, Simpson).'
        ],
        correctAnswer: 2,
        hint: 'Cuando quieres acumular, sumar o encontrar un volumen/área total basado en curvas o datos de sensores, necesitas integrar.'
    },
    {
        type: 'visualChoice',
        question: 'Identificación Visual: ¿A qué método corresponde este comportamiento, donde el intervalo se va acorralando hacia el centro?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 150">
                <line x1="20" y1="75" x2="380" y2="75" stroke="#333" stroke-width="2"/>
                <path d="M 50 140 Q 200 75 350 10" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                
                <line x1="50" y1="100" x2="50" y2="50" stroke="#e52b2b" stroke-width="3"/>
                <line x1="350" y1="100" x2="350" y2="50" stroke="#e52b2b" stroke-width="3"/>
                
                <line x1="125" y1="90" x2="125" y2="60" stroke="#58cc02" stroke-width="3"/>
                <line x1="275" y1="90" x2="275" y2="60" stroke="#58cc02" stroke-width="3"/>
                
                <line x1="162" y1="80" x2="162" y2="70" stroke="#ff9600" stroke-width="3"/>
                <line x1="237" y1="80" x2="237" y2="70" stroke="#ff9600" stroke-width="3"/>
            </svg>
        `,
        options: [
            'Newton-Raphson',
            'Bisección',
            'Gauss-Jordan'
        ],
        correctAnswer: 1,
        hint: 'Fíjate cómo los límites (primero rojos, luego verdes, luego naranjas) se van acercando desde ambos lados para atrapar el punto central. Así funciona la técnica de "cortar por la mitad".'
    },
    {
        type: 'fill',
        question: 'Un método _____________ es aquel que garantiza llegar a la solución exacta en un número finito y predecible de pasos (ej: Eliminación Gaussiana).',
        chips: ['Iterativo', 'Directo', 'Cerrado', 'Cúbico'],
        correctAnswer: 'Directo',
        hint: 'Su contraparte son los métodos "iterativos", que no te dan la respuesta exacta de golpe, sino que dan vueltas aproximándose poco a poco.'
    },
    {
        type: 'tableChoice',
        question: 'Tienes 5 sensores que tomaron la temperatura cada segundo. Tienes 5 puntos (x=0,1,2,3,4). Esto significa que tienes 4 segmentos (n=4). ¿Qué método es ideal para integrar esta área?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Puntos (N)</th><th>Segmentos (n = N-1)</th><th>Método Óptimo</th></tr>
                <tr><td>5 puntos</td><td class="highlight">n = 4 segmentos</td><td><b>?</b></td></tr>
            </table>
        `,
        options: [
            'Regla de Simpson 3/8.',
            'Regla de Simpson 1/3 Compuesta.',
            'Solo Regla del Trapecio simple.'
        ],
        correctAnswer: 1,
        hint: 'Simpson 1/3 exige que el número de segmentos (n) sea par (2, 4, 6, 8...). 4 es par, así que calza perfectamente.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Newton-Raphson se puede usar tanto para encontrar raíces de funciones simples como para resolver Sistemas de Ecuaciones No Lineales complejos.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'El método es tan poderoso que existe una versión multivariable (usando la Matriz Jacobiana) para resolver sistemas donde las líneas no son rectas (ej: intersección de dos círculos).'
    },
    {
        type: 'visualChoice',
        question: 'Diagnóstico de Código: Un sistema de resortes colapsó en la simulación. En el log del código se muestra esto. ¿Qué fue lo que falló?',
        visualHTML: `
            <table class="math-table" style="font-family: monospace; font-size: 14px;">
                <tr><th colspan="2">LOG DE ITERACIONES (GAUSS-SEIDEL)</th></tr>
                <tr><td>Iter 1</td><td>x = 2.50, y = -1.20</td></tr>
                <tr><td>Iter 2</td><td>x = 18.40, y = -15.90</td></tr>
                <tr><td>Iter 3</td><td>x = 345.10, y = -298.50</td></tr>
                <tr><td>Iter 4</td><td class="highlight">x = 8904.22, y = -7500.11</td></tr>
                <tr><td>Iter 5</td><td class="highlight">ERROR: Stack Overflow</td></tr>
            </table>
        `,
        options: [
            'El método convergió demasiado rápido.',
            'La matriz no era diagonalmente dominante y el método divergió (explotó hacia el infinito).',
            'Faltó poner un pivoteo parcial en el bucle.'
        ],
        correctAnswer: 1,
        hint: 'Mira los números: 2 -> 18 -> 345 -> 8900. En lugar de estabilizarse en un valor, se están saliendo de control. Esto es "divergencia".'
    },
    {
        type: 'order',
        question: '¡Megaproyecto! Para aterrizar un rover en Marte necesitas: 1) Modelar el viento (Curva), 2) Calcular la fuerza (Área), 3) Ajustar los 4 propulsores (Sistema 4x4). Ordena los métodos a usar:',
        pool: [
            '2) Integrar el área bajo la curva con Regla de Simpson.',
            '1) Encontrar el momento exacto donde el viento es 0 con Bisección.',
            '3) Equilibrar los 4 propulsores usando Eliminación Gaussiana.'
        ],
        correctOrder: [
            '1) Encontrar el momento exacto donde el viento es 0 con Bisección.',
            '2) Integrar el área bajo la curva con Regla de Simpson.',
            '3) Equilibrar los 4 propulsores usando Eliminación Gaussiana.'
        ],
        hint: 'El orden lógico de los pasos te da la respuesta. Primero la raíz (cuando es 0), luego el área (integrar), y al final equilibrar el sistema (Gauss).'
    },
    {
        type: 'fill',
        question: 'En Bisección, encerramos la raíz entre "a" y "b". Si f(a) * f(c) > 0, sabemos que tienen el mismo signo. Por lo tanto, la raíz NO está de ese lado y nuestro nuevo punto "a" será igual a _____________.',
        chips: ['b', 'c', 'cero', 'infinito'],
        correctAnswer: 'c',
        hint: 'Si no está en el lado izquierdo, recorres tu límite izquierdo (a) hasta el centro (c) para enfocarte solo en la mitad derecha.'
    },
    {
        type: 'choice',
        question: 'Debes elegir entre Gauss-Seidel o Jacobi. ¿Por qué casi siempre elegirás Gauss-Seidel?',
        options: [
            'Porque Jacobi requiere derivadas y Seidel no.',
            'Porque Gauss-Seidel utiliza los valores nuevos INMEDIATAMENTE, haciendo que converja casi el doble de rápido.',
            'Porque Jacobi solo funciona en calculadoras.'
        ],
        correctAnswer: 1,
        hint: 'Jacobi espera a terminar toda la iteración para actualizar sus variables. Seidel actualiza "x" e inmediatamente usa esa nueva "x" para calcular "y" en el mismo milisegundo.'
    },
    {
        type: 'truefalse',
        question: 'Verdadero o Falso: Los métodos numéricos se usan principalmente porque la mayoría de las ecuaciones del mundo real (clima, dinámica de fluidos, robótica) NO tienen una solución algebraica exacta.',
        options: ['Verdadero', 'Falso'],
        correctAnswer: 0, // Verdadero
        hint: 'Esta es la verdadera razón de existir de esta materia. El álgebra escolar solo resuelve casos perfectos; los métodos numéricos resuelven la vida real imperfecta mediante aproximaciones.'
    }
];

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
        feedbackMessage.innerText = '¡Fusión Perfecta!';
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
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-triangle-exclamation"></i> ¡Cuidado con el caos!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
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
        title.innerText = '¡Ingeniero Híbrido!';
        text.innerText = '3 aciertos resolviendo problemas mezclados. Nada te toma por sorpresa.';
    } else if (type === 'correction') {
        title.innerText = '¡Ordenando el Caos!';
        text.innerText = 'Al mezclar métodos es fácil confundirse. Reacomodemos las ideas.';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos el Examen Final (Lección 15)
    localStorage.setItem('numera_current_lesson', '15');
    questionContainer.innerHTML = `
        <i class="fa-solid fa-shuffle" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center;">¡Preparado para la Batalla!</h1>
        <p style="font-size: 18px; font-weight: 700; color: var(--text-light); text-align: center;">
            Has demostrado que puedes combinar todas tus herramientas en un solo proyecto.
            ¡El Examen Final te espera!
        </p>
    `;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Colapso del Proyecto!</h1><p>Confundiste los métodos y la nave se estrelló. ¡Recarga vidas e inténtalo de nuevo!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
