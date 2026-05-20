// ==========================================
// MOTOR DEL CRUCIGRAMA NUMÉRICO
// ==========================================

/* MAPA DEL TABLERO: 10 Filas x 9 Columnas
  Null = Espacio vacío (negro)
  Objeto = Cuadro blanco para escribir. 
  val = Letra correcta / num = Número de pista (opcional) / id = identificador
*/
const gridData = [
    // Fila 1
    [null, null, null, null, {num: 1, val: 'I', id: 'c1_5'}, null, null, null, null],
    // Fila 2
    [null, {num: 2, val: 'N', id: 'c2_2'}, {val: 'E', id: 'c2_3'}, {val: 'W', id: 'c2_4'}, {val: 'T', id: 'c2_5'}, {val: 'O', id: 'c2_6'}, {val: 'N', id: 'c2_7'}, null, null],
    // Fila 3
    [null, null, null, null, {val: 'E', id: 'c3_5'}, null, null, null, null],
    // Fila 4
    [null, null, {num: 3, val: 'E', id: 'c4_3'}, {val: 'R', id: 'c4_4'}, {val: 'R', id: 'c4_5'}, {val: 'O', id: 'c4_6'}, {val: 'R', id: 'c4_7'}, null, null],
    // Fila 5
    [null, null, null, null, {val: 'A', id: 'c5_5'}, {num: 4, val: 'M', id: 'c5_6'}, null, null, null],
    // Fila 6
    [null, null, {num: 5, val: 'S', id: 'c6_3'}, {val: 'E', id: 'c6_4'}, {val: 'C', id: 'c6_5'}, {val: 'A', id: 'c6_6'}, {val: 'N', id: 'c6_7'}, {val: 'T', id: 'c6_8'}, {val: 'E', id: 'c6_9'}],
    // Fila 7
    [null, null, null, null, {val: 'I', id: 'c7_5'}, {val: 'T', id: 'c7_6'}, null, null, null],
    // Fila 8
    [null, null, null, null, {val: 'O', id: 'c8_5'}, {val: 'R', id: 'c8_6'}, null, null, null],
    // Fila 9
    [null, null, null, null, {val: 'N', id: 'c9_5'}, {val: 'I', id: 'c9_6'}, null, null, null],
    // Fila 10
    [null, null, null, null, null, {val: 'Z', id: 'c10_6'}, null, null, null]
];

// 1. AGRUPAR CELDAS POR PALABRA
const crosswordWords = [
    // Horizontales
    { id: 'H2', cells: ['c2_2', 'c2_3', 'c2_4', 'c2_5', 'c2_6', 'c2_7'] }, // NEWTON
    { id: 'H3', cells: ['c4_3', 'c4_4', 'c4_5', 'c4_6', 'c4_7'] }, // ERROR
    { id: 'H5', cells: ['c6_3', 'c6_4', 'c6_5', 'c6_6', 'c6_7', 'c6_8', 'c6_9'] }, // SECANTE
    // Verticales
    { id: 'V1', cells: ['c1_5', 'c2_5', 'c3_5', 'c4_5', 'c5_5', 'c6_5', 'c7_5', 'c8_5', 'c9_5'] }, // ITERACION
    { id: 'V4', cells: ['c5_6', 'c6_6', 'c7_6', 'c8_6', 'c9_6', 'c10_6'] } // MATRIZ
];

// Función auxiliar para obtener la letra correcta de un ID específico
function getCorrectLetter(cellId) {
    for (let row of gridData) {
        for (let cell of row) {
            if (cell !== null && cell.id === cellId) {
                return cell.val;
            }
        }
    }
    return "";
}

// 2. FUNCIÓN PARA COLOREAR PALABRAS CORRECTAS (Se ejecuta en tiempo real)
function updateWordColors() {
    // A. Reiniciar todas las celdas a su color normal (excepto si están marcadas en rojo por error)
    gridData.forEach(row => {
        row.forEach(cell => {
            if (cell !== null) {
                const input = document.getElementById(cell.id);
                if (input.style.backgroundColor !== 'rgb(255, 75, 75)' && input.style.backgroundColor !== '#ff4b4b') {
                    input.style.backgroundColor = 'transparent';
                    input.style.color = 'var(--primary-red)';
                }
            }
        });
    });

    // B. Evaluar cada palabra completa
    crosswordWords.forEach(word => {
        let isWordCorrect = true;

        word.cells.forEach(cellId => {
            const input = document.getElementById(cellId);
            const correctLetter = getCorrectLetter(cellId);
            
            // Si la celda está vacía o la letra es incorrecta, la palabra no está lista
            if (input.value === "" || input.value.toUpperCase() !== correctLetter) {
                isWordCorrect = false;
            }
        });

        // C. Si TODA la palabra está correcta, la pintamos de verde
        if (isWordCorrect) {
            word.cells.forEach(cellId => {
                const input = document.getElementById(cellId);
                // Evitamos sobrescribir el rojo de error momentáneo
                if (input.style.backgroundColor !== 'rgb(255, 75, 75)' && input.style.backgroundColor !== '#ff4b4b') {
                    input.style.backgroundColor = '#d7ffb8'; // Fondo verde clarito
                    input.style.color = '#58cc02'; // Texto verde oscuro
                }
            });
        }
    });
}

// 3. DIBUJAR EL TABLERO
document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById('cw-grid');
    
    gridData.forEach(row => {
        row.forEach(cell => {
            const cellDiv = document.createElement('div');
            
            if (cell === null) {
                cellDiv.className = 'cw-cell empty';
            } else {
                cellDiv.className = 'cw-cell';
                
                if (cell.num) {
                    const numSpan = document.createElement('span');
                    numSpan.className = 'cw-number';
                    numSpan.innerText = cell.num;
                    cellDiv.appendChild(numSpan);
                }

                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.id = cell.id;
                
                input.addEventListener('input', function() {
                    this.value = this.value.toUpperCase();
                    if (typeof NumeraAudio !== 'undefined') NumeraAudio.click();
                    
                    // Comprobar los colores cada vez que el usuario teclea una letra
                    updateWordColors();
                });

                cellDiv.appendChild(input);
            }
            gridContainer.appendChild(cellDiv);
        });
    });
});

// 4. VALIDAR RESPUESTAS AL PRESIONAR EL BOTÓN
function checkCrossword() {
    let isCompleteAndCorrect = true;
    let emptyBoxes = 0;

    gridData.forEach(row => {
        row.forEach(cell => {
            if (cell !== null) {
                const inputElement = document.getElementById(cell.id);
                const userAnswer = inputElement.value.toUpperCase();
                
                if (userAnswer === "") {
                    emptyBoxes++;
                    isCompleteAndCorrect = false;
                } else if (userAnswer !== cell.val) {
                    isCompleteAndCorrect = false;
                    inputElement.style.color = 'white';
                    inputElement.style.backgroundColor = '#ff4b4b';
                    
                    setTimeout(() => {
                        // Al desaparecer el rojo, volvemos a pintar de verde las que sí estaban bien
                        updateWordColors();
                    }, 1000);
                }
            }
        });
    });

    const feedback = document.getElementById('cw-feedback');

    if (emptyBoxes > 0) {
        if (typeof NumeraAudio !== 'undefined') NumeraAudio.hit();
        feedback.style.color = '#ff9600';
        feedback.innerText = "Aún faltan letras por rellenar.";
    } else if (!isCompleteAndCorrect) {
        if (typeof NumeraAudio !== 'undefined') NumeraAudio.incorrect();
        feedback.style.color = '#ff4b4b';
        feedback.innerText = "Hay algunos errores. Los he marcado en rojo.";
    } else {
        if (typeof NumeraAudio !== 'undefined') NumeraAudio.success();
        feedback.style.color = '#58cc02';
        feedback.innerText = "¡PERFECTO! Has dominado los conceptos.";
        
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ffc800', '#58cc02', '#1cb0f6']
            });
        }

        setTimeout(() => {
            document.getElementById('interstitial-overlay').classList.remove('interstitial-hidden');
        }, 1000);
    }
}
