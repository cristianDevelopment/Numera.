==========================================

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



// 1. DIBUJAR EL TABLERO

document.addEventListener("DOMContentLoaded", () => {

    const gridContainer = document.getElementById('cw-grid');

   

    gridData.forEach(row => {

        row.forEach(cell => {

            const cellDiv = document.createElement('div');

           

            if (cell === null) {

                // Es un cuadro negro/vacío

                cellDiv.className = 'cw-cell empty';

            } else {

                // Es un cuadro para escribir

                cellDiv.className = 'cw-cell';

               

                // Si la celda es el inicio de una palabra, ponerle número

                if (cell.num) {

                    const numSpan = document.createElement('span');

                    numSpan.className = 'cw-number';

                    numSpan.innerText = cell.num;

                    cellDiv.appendChild(numSpan);

                }



                // Crear el Input para la letra

                const input = document.createElement('input');

                input.type = 'text';

                input.maxLength = 1; // Solo 1 letra por cuadro

                input.id = cell.id;

               

                // Auto-salto y sonido al escribir

                input.addEventListener('input', function() {

                    this.value = this.value.toUpperCase(); // Forzar mayúscula

                    NumeraAudio.click(); // Efecto de sonido de máquina de escribir

                });



                cellDiv.appendChild(input);

            }

            gridContainer.appendChild(cellDiv);

        });

    });

});



// 2. VALIDAR RESPUESTAS

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

                    // Resaltar errores temporalmente

                    inputElement.style.color = 'white';

                    inputElement.style.backgroundColor = '#ff4b4b';

                    setTimeout(() => {

                        inputElement.style.color = 'var(--primary-red)';

                        inputElement.style.backgroundColor = 'transparent';

                    }, 1000);

                }

            }

        });

    });



    const feedback = document.getElementById('cw-feedback');



    if (emptyBoxes > 0) {

        NumeraAudio.hit();

        feedback.style.color = '#ff9600';

        feedback.innerText = "Aún faltan letras por rellenar.";

    } else if (!isCompleteAndCorrect) {

        NumeraAudio.incorrect();

        feedback.style.color = '#ff4b4b';

        feedback.innerText = "Hay algunos errores. Los he marcado en rojo.";

    } else {

        // VICTORIA!

        NumeraAudio.success();

        feedback.style.color = '#58cc02';

        feedback.innerText = "¡PERFECTO! Has dominado los conceptos.";

       

        // Efecto visual

        confetti({

            particleCount: 150,

            spread: 80,

            origin: { y: 0.6 },

            colors: ['#ffc800', '#58cc02', '#1cb0f6']

        });



        // Mostrar pantalla de victoria

        setTimeout(() => {

            document.getElementById('interstitial-overlay').classList.remove('interstitial-hidden');

        }, 1000);

    }

}
