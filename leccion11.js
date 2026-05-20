// --- BASE DE DATOS DE PREGUNTAS (LECCIÓN 11: RETO DE RAÍCES) ---
const lessonQuestions = [
    {
        type: 'visualChoice',
        question: 'Análisis de Caso 1: Tienes esta gráfica donde la curva solo "toca" el eje X y rebota. ¿Qué método FRACASARÁ rotundamente aquí?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="150" x2="380" y2="150" stroke="#333" stroke-width="3"/>
                <path d="M 50 20 Q 200 280 350 20" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                <circle cx="200" cy="150" r="6" fill="#e52b2b"/>
                <text x="215" y="145" font-weight="bold" fill="#e52b2b">Raíz</text>
            </svg>
        `,
        options: [
            'Newton-Raphson',
            'Método de Bisección',
            'Ambos funcionarán perfecto'
        ],
        correctAnswer: 1,
        hint: 'Fíjate que todo el dibujo azul está por encima de la línea negra. No hay cambio de signo (+ a -). Si f(a) y f(b) son positivos, no puedes usar este método.'
    },
    {
        type: 'visualChoice',
        question: 'Análisis de Caso 2: Quieres usar Newton-Raphson y eliges el punto inicial rojo (x0). ¿Por qué es una PÉSIMA idea?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="160" x2="380" y2="160" stroke="#333" stroke-width="2"/>
                <path d="M 50 180 Q 150 20 250 120 T 350 80" fill="none" stroke="#1cb0f6" stroke-width="4"/>
                
                <circle cx="250" cy="120" r="6" fill="#e52b2b"/>
                <text x="245" y="140" font-weight="bold" fill="#e52b2b">x0</text>
                
                <line x1="150" y1="120" x2="350" y2="120" stroke="#ff9600" stroke-dasharray="6" stroke-width="3"/>
            </svg>
        `,
        options: [
            'Porque la línea tangente es horizontal (derivada = 0), causando división entre cero.',
            'Porque la gráfica está pintada de azul.',
            'Porque el punto x0 está muy cerca de la raíz.'
        ],
        correctAnswer: 0,
        hint: 'Si te paras en un "valle" o una "cima", la pendiente es totalmente plana. En la fórmula de Newton, f\'(x) va abajo en una división.'
    },
    {
        type: 'choice',
        question: 'Estás programando el cerebro de un misil. Necesitas encontrar una raíz lo MÁS RÁPIDO posible (velocidad cuadrática) y sabes calcular la derivada. Eliges:',
        options: [
            'Método de Bisección',
            'Newton-Raphson',
            'Sustitución hacia Atrás'
        ],
        correctAnswer: 1,
        hint: 'Para velocidad bruta y derivadas conocidas, el método abierto que usa tangentes es el rey.'
    },
    {
        type: 'fill',
        question: 'A veces derivar una función es imposible o muy difícil. Si quieres la velocidad de Newton pero SIN derivar, usas el Método de la _____________.',
        chips: ['Secante', 'Bisección', 'Regla', 'Cramer'],
        correctAnswer: 'Secante',
        hint: 'En lugar de una tangente (que requiere derivada), usa una línea que corta la gráfica en dos puntos para "aproximar" la pendiente.'
    },
    {
        type: 'visualChoice',
        question: 'Análisis de Caso 3: Esta gráfica oscila como loca y tiene MUCHAS raíces. ¿Cómo garantizas que la computadora encuentre específicamente la raíz verde?',
        visualHTML: `
            <svg class="svg-graph" viewBox="0 0 400 200">
                <line x1="20" y1="100" x2="380" y2="100" stroke="#333" stroke-width="2"/>
                <path d="M 30 100 Q 60 20 90 100 T 150 100 T 210 100 T 270 100 T 330 100" fill="none" stroke="#1cb0f6" stroke-width="3"/>
                
                <circle cx="210" cy="100" r="7" fill="#58cc02"/>
                <text x="180" y="80" font-weight="bold" fill="#58cc02">Raíz deseada</text>
            </svg>
        `,
        options: [
            'Dando cualquier punto al azar a Newton-Raphson.',
            'Usando Bisección y poniendo "a" y "b" muy cerquita de la raíz verde.',
            'Borrando las otras raíces del código.'
        ],
        correctAnswer: 1,
        hint: 'Con Newton, si empiezas mal, la tangente te puede botar a cualquier otra raíz. Bisección te permite "atrapar" o encerrar justo el pedazo que quieres.'
    },
    {
        type: 'order',
        question: 'Metodología de Ingeniero: Ordena los pasos para resolver un problema de raíces en el mundo real.',
        pool: [
            'Graficar la función para entender su comportamiento visual.',
            'Elegir el método (Bisección si es inestable, Newton si es suave).',
            'Programar el ciclo con una tolerancia y un "seguro" de max_iteraciones.',
            'Correr el algoritmo y validar que la respuesta tiene sentido físico.'
        ],
        correctOrder: [
            'Graficar la función para entender su comportamiento visual.',
            'Elegir el método (Bisección si es inestable, Newton si es suave).',
            'Programar el ciclo con una tolerancia y un "seguro" de max_iteraciones.',
            'Correr el algoritmo y validar que la respuesta tiene sentido físico.'
        ],
        hint: 'Primero observas el problema, luego eliges el arma, preparas el código con cuidado, y al final validas el resultado.'
    },
    {
        type: 'truefalse',
        question: 'Mito o Realidad: "El mejor método numérico siempre es el que requiere menos iteraciones para converger".',
        options: ['Mito', 'Realidad'],
        correctAnswer: 0, // Mito
        hint: 'A veces un método converge muy rápido (Newton), pero si la función es muy rara o no puedes derivarla, es mejor usar uno lento pero 100% seguro (Bisección).'
    },
    {
        type: 'fill',
        question: 'Al programar Newton-Raphson, si la línea tangente apunta casi en paralelo al eje X, el nuevo punto calculado "saldrá disparado" hacia el _____________.',
        chips: ['Infinito', 'Origen', 'Punto inicial', 'Eje Y'],
        correctAnswer: 'Infinito',
        hint: 'Las líneas casi paralelas tardan muchísimo en chocar. El valor de "x" crecerá a números inmanejables por la RAM.'
    },
    {
        type: 'tableChoice',
        question: 'Duelo de Algoritmos: Tienes esta tabla comparativa para encontrar la misma raíz. ¿Quién es el Algoritmo B?',
        visualHTML: `
            <table class="math-table">
                <tr><th>Iteraciones</th><th>Algoritmo A</th><th>Algoritmo B</th></tr>
                <tr><td>Error en paso 1</td><td>0.5000</td><td>0.5000</td></tr>
                <tr><td>Error en paso 2</td><td>0.2500</td><td>0.0800</td></tr>
                <tr><td>Error en paso 3</td><td>0.1250</td><td>0.0001</td></tr>
                <tr><td>Error en paso 4</td><td>0.0625</td><td>Exacto</td></tr>
            </table>
        `,
        options: [
            'Algoritmo B es Bisección (Convergencia Lineal).',
            'Algoritmo B es Newton-Raphson (Convergencia Cuadrática).',
            'Algoritmo B está dañado.'
        ],
        correctAnswer: 1,
        hint: 'Observa cómo el error del Algoritmo A se reduce a la mitad tranquilamente. El Algoritmo B destruye los decimales de error a una velocidad masiva.'
    },
    {
        type: 'choice',
        question: 'Decisión Ejecutiva: Estás diseñando un software médico crítico donde un fallo puede ser fatal. El tiempo de procesamiento no es problema. ¿Qué método de raíces usas para el núcleo del sistema?',
        options: [
            'Bisección (100% seguro, imposible que diverja si f(a)*f(b)<0).',
            'Newton-Raphson (Súper veloz, pero puede divergir).',
            'Adivinar valores al azar.'
        ],
        correctAnswer: 0,
        hint: 'En sistemas de misión crítica (aviones, hospitales, plantas nucleares), la confiabilidad ("Robustez") SIEMPRE le gana a la velocidad.'
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
        feedbackMessage.innerText = '¡Criterio Excelente!';
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
        
        feedbackMessage.innerHTML = `<div style="line-height: 1.2;"><span style="font-size: 20px;"><i class="fa-solid fa-lightbulb"></i> ¡Analiza la gráfica!</span><br><span style="font-size: 16px; font-weight: 700; color: #b71c1c;">Pista: ${q.hint}</span></div>`;
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
        title.innerText = '¡Criterio de Ingeniero!';
        text.innerText = '3 aciertos analizando problemas reales. Estás pensando como todo un profesional.';
    } else if (type === 'correction') {
        title.innerText = '¡Fase de Depuración!';
        text.innerText = 'Un ingeniero también se equivoca, pero corrige su código. ¡Vamos a repasar los errores!';
    }
    overlay.classList.remove('interstitial-hidden');
}

window.closeInterstitial = function() {
    document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');
    renderQuestion(); 
}

function finishLesson() {
    NumeraAudio.success();
    // 🔥 Desbloqueamos la Lección 12
    localStorage.setItem('numera_current_lesson', '12');
    questionContainer.innerHTML = `
        <i class="fa-solid fa-bolt" style="font-size: 80px; color: var(--gold); margin-bottom: 20px;"></i>
        <h1 class="question-title" style="text-align: center;">¡Reto Superado!</h1>
        <p style="font-size: 18px; font-weight: 700; color: var(--text-light); text-align: center;">
            Ya no solo resuelves ecuaciones, ahora sabes exactamente QUÉ herramienta sacar de tu caja.
        </p>
    `;
    footer.className = 'lesson-footer correct';
    btnCheck.innerText = 'VOLVER AL MAPA';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.href = 'mapa.html';
}

function gameOver() {
    NumeraAudio.gameOver();
    questionContainer.innerHTML = `<i class="fa-solid fa-heart-crack" style="font-size: 80px; color: #ff4b4b; margin-bottom: 20px;"></i><h1 class="question-title" style="text-align: center;">¡Fallo en el Sistema!</h1><p>Elegiste el método incorrecto y el servidor colapsó. ¡Recarga vidas e inténtalo de nuevo!</p>`;
    footer.className = 'lesson-footer incorrect';
    btnCheck.innerText = 'REINTENTAR';
    btnCheck.className = 'btn-check active';
    btnCheck.onclick = () => window.location.reload();
}

initLesson();
