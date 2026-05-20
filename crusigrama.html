<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crucigrama Numérico - Numera</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

    <style>
        .crossword-container {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            justify-content: center;
            align-items: flex-start;
            margin-top: 20px;
            width: 100%;
        }

        /* Estilos del Tablero */
        .crossword-board {
            display: grid;
            grid-template-columns: repeat(9, 45px); /* 9 columnas */
            grid-template-rows: repeat(10, 45px); /* 10 filas */
            gap: 2px;
            background-color: var(--text-dark);
            padding: 4px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .cw-cell {
            width: 45px;
            height: 45px;
            background: var(--white);
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
        }

        .cw-cell.empty {
            background: transparent;
        }

        .cw-cell input {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            text-align: center;
            font-size: 22px;
            font-weight: 900;
            text-transform: uppercase;
            font-family: 'Nunito', sans-serif;
            color: var(--primary-red);
            outline: none;
        }

        .cw-cell input:focus {
            background-color: #fff2cc;
            border-radius: 4px;
        }

        .cw-number {
            position: absolute;
            top: 2px;
            left: 4px;
            font-size: 11px;
            font-weight: 900;
            color: #777;
            pointer-events: none;
        }

        /* Estilos de las Pistas */
        .clues-box {
            background: var(--white);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            border: 2px solid var(--grey-locked);
            max-width: 400px;
        }

        .clues-box h3 {
            color: var(--primary-red);
            margin-bottom: 15px;
            font-size: 20px;
            border-bottom: 2px dashed #eee;
            padding-bottom: 5px;
        }

        .clues-box ul {
            list-style: none;
            padding: 0;
            margin-bottom: 30px;
        }

        .clues-box li {
            margin-bottom: 15px;
            font-size: 15px;
            color: var(--text-dark);
            line-height: 1.4;
        }

        .clues-box li strong {
            color: var(--gold);
            font-size: 18px;
            margin-right: 5px;
        }

        .btn-resolver {
            background: var(--primary-red);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            font-weight: 900;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 5px 0 var(--dark-red);
            width: 100%;
            transition: 0.2s;
        }

        .btn-resolver:active {
            transform: translateY(5px);
            box-shadow: 0 0 0 transparent;
        }
       /* =========================================
           ADAPTACIÓN PARA CELULARES (RESPONSIVE) - VERTICAL TOTAL
           ========================================= */
        @media (max-width: 600px) {
            /* --- 1. Forzar diseño vertical de todo el contenedor principal --- */
            .main-container {
                display: flex;
                flex-direction: column; /* 🔥 Apila todo: texto -> crucigrama -> pistas */
                padding: 20px 10px; /* Un poco menos de espacio lateral */
                align-items: center; /* Centrar todo el contenido */
            }

            /* --- 2. Ajustes del Texto Encabezado (Como subtítulo arriba) --- */
            .cw-header {
                text-align: center;
                margin-bottom: 20px; /* 🔥 ESPACIO PARA BAJAR EL CRUCIGRAMA */
                padding: 0;
            }

            .cw-header .board-title {
                font-size: 20px; /* Mucho más pequeño */
                color: var(--primary-red);
                margin-bottom: 2px;
                letter-spacing: 1px;
            }

            .cw-subtitle {
                font-size: 13px;
                line-height: 1.2;
                max-width: 100%; /* Todo el ancho para el subtítulo */
            }

            /* --- 3. Forzar que el contenedor del crucigrama también sea columna --- */
            .crossword-container {
                display: flex;
                flex-direction: column; /* 🔥 Apila tablero -> pistas */
                align-items: center; /* Centra el tablero en el móvil */
                gap: 20px; /* Espacio entre tablero y pistas */
                width: 100%;
            }

            /* --- 4. Ajustes del Tablero (Lo que ya teníamos de pequeño) --- */
            .crossword-board {
                grid-template-columns: repeat(9, 35px); /* Reduce de 45px a 35px */
                grid-template-rows: repeat(10, 35px);
                margin: 0 auto; /* Centrar el tablero */
            }
            
            .cw-cell {
                width: 35px;
                height: 35px;
            }
            
            .cw-cell input {
                font-size: 18px; 
            }
            
            .cw-number {
                font-size: 9px;
                top: 1px;
                left: 2px;
            }
            
            /* --- 5. Ajustes de las Pistas --- */
            .clues-box {
                width: 100%;
                max-width: 100%;
                padding: 20px;
                box-shadow: none; /* Quitamos sombra para que se vea más plano en móvil */
            }
        }
    </style>
</head>
<body>

    <header class="navbar">
        <a href="index.html" class="brand" style="text-decoration: none; color: inherit;">
            <i class="fa-solid fa-calculator logo-icon"></i>
            <span class="brand-name">Numera</span>
        </a>
       <nav class="nav-links">
            <a href="mapa.html">APRENDER</a>
            <a href="crusigrama.html">CRUCIGRAMA</a>
            <a href="minijuegos.html">MINIJUEGOS</a>
            <a onclick="resetProgress()" class="btn-reset-nav"><i class="fa-solid fa-rotate-right"></i> REINICIAR</a>
        </nav>
    </header>

    <main class="main-container">
        <div class="cw-header">
            <h1 class="board-title">GIMNASIO MENTAL</h1>
            <p class="cw-subtitle">Demuestra tu vocabulario numérico para ganar una medalla de oro.</p>
        </div>

        <div class="crossword-container">
            <div id="cw-grid" class="crossword-board animate-pop"></div>

            <div class="clues-box animate-slide-down">
                <h3><i class="fa-solid fa-arrows-left-right"></i> HORIZONTALES</h3>
                <ul>
                    <li><strong>2.</strong> Método abierto muy veloz que utiliza la derivada de la función.</li>
                    <li><strong>3.</strong> Diferencia numérica entre el valor exacto y nuestra aproximación.</li>
                    <li><strong>5.</strong> Método que aproxima una tangente trazando una línea entre dos puntos (sin derivar).</li>
                </ul>

                <h3><i class="fa-solid fa-arrows-up-down"></i> VERTICALES</h3>
                <ul>
                    <li><strong>1.</strong> Cada vuelta o repetición de un bucle "while" para acercarse a la solución.</li>
                    <li><strong>4.</strong> Arreglo bidimensional de números indispensable para la Eliminación Gaussiana.</li>
                </ul>

                <button class="btn-resolver" onclick="checkCrossword()"><i class="fa-solid fa-check-double"></i> COMPROBAR TABLERO</button>
                <div id="cw-feedback" style="text-align: center; margin-top: 15px; font-weight: 700; font-size: 16px;"></div>
            </div>
        </div>
    </main>

    <div id="interstitial-overlay" class="interstitial-overlay interstitial-hidden">
        <div class="interstitial-content animate-pop">
            <div class="mascot-large animate-float">🧠</div>
            <div class="speech-bubble-large" style="margin-top: 20px;">
                <h1 id="interstitial-title" style="color: var(--gold);">¡CEREBRO NUMÉRICO!</h1>
                <p id="interstitial-text">Resolviste el crucigrama a la perfección. Tu vocabulario técnico es impecable.</p>
            </div>
            <button class="btn-start animate-pop-in" onclick="document.getElementById('interstitial-overlay').classList.add('interstitial-hidden');" style="margin-top: 40px; border: none; cursor: pointer; background: var(--gold); box-shadow: 0 4px 0 #cc9e00; color: #333;">SEGUIR APRENDIENDO</button>
        </div>
    </div>

    <script src="audio.js"></script>
    <script src="crusigrama.js"></script>
</body>
</html>
