/**
 * Se agrega el ctx para graficar el canvas
 */
const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
//Constantes de configuración del canvas//
const ESCALA     = 20; // Píxeles por celda de grilla
const MARGEN_IZQ = 20; // Espacio reservado a la izquierda para etiquetas Y
const MARGEN_INF = 20; // Espacio reservado abajo para etiquetas X
// Número de celdas que caben en el área útil
const NUM_COLS  = Math.floor((canvas.width  - MARGEN_IZQ) / ESCALA);
const NUM_FILAS = Math.floor((canvas.height - MARGEN_INF) / ESCALA);
/**
 * Dibuja la grilla de fondo y las marcas de escala numérica.
 * Las etiquetas del eje X aparecen en el margen inferior.
 * Las etiquetas del eje Y aparecen en el margen izquierdo.
 * El valor Y aumenta hacia arriba (convención matemática).
 * @param {number} NUM_COLS   - Número de columnas visibles en la grilla.
 * @param {number} NUM_FILAS  - Número de filas visibles en la grilla.
 * @param {number} MARGEN_IZQ - Espacio en píxeles reservado al lado izquierdo.
 * @param {number} MARGEN_INF - Espacio en píxeles reservado en la parte inferior.
 * @param {number} ESCALA     - Tamaño en píxeles de cada celda de la grilla.
 */ 
/**
 * Implemento función que dibuja los ejes y la cuadricula cada vez que se dibuja una nueva linea 
 */
function dibujarEjes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Tamaño del canvas// 
    ctx.strokeStyle = "#ccc";
	ctx.fillStyle   = "#333";
    ctx.font        = "10px Arial";
	// Líneas verticales + etiquetas del eje X
    ctx.textAlign    = "center";
    ctx.textBaseline = "top";
    for (let j = 0; j <= NUM_COLS; j++) {
        let xPx = MARGEN_IZQ + j * ESCALA;
        ctx.beginPath();
        ctx.moveTo(xPx, 0);
        ctx.lineTo(xPx, NUM_FILAS * ESCALA);
        ctx.stroke();
        ctx.fillText(j, xPx, NUM_FILAS * ESCALA + 4);
    }
// Líneas horizontales + etiquetas del eje Y
    ctx.textAlign    = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= NUM_FILAS; i++) {
        let yPx = i * ESCALA;
        ctx.beginPath();
        ctx.moveTo(MARGEN_IZQ, yPx);
        ctx.lineTo(MARGEN_IZQ + NUM_COLS * ESCALA, yPx);
        ctx.stroke();
        ctx.fillText(NUM_FILAS - i, MARGEN_IZQ - 3, yPx);
    }
 // Dibujar los ejes cartesianos encima de la grilla
    dibujarEjesCartesianos();
}
/**
 * Dibuja los ejes cartesianos X e Y sobre el canvas con flechas en sus extremos
 * y la etiqueta de cada eje. El origen (0,0) se ubica en la esquina
 * inferior izquierda del área de dibujo, respetando los márgenes definidos.
 * @param {number} MARGEN_IZQ - Coordenada X en píxeles donde nace el eje Y.
 * @param {number} NUM_FILAS  - Número de filas, define la base del eje X.
 * @param {number} NUM_COLS   - Número de columnas, define el largo del eje X.
 * @param {number} ESCALA     - Tamaño en píxeles de cada celda de la grilla.
 */
function dibujarEjesCartesianos() {
    // Coordenadas del origen en píxeles
    let origenX = MARGEN_IZQ;
    let origenY = NUM_FILAS * ESCALA;

    // Extremo derecho del eje X y extremo superior del eje Y
    let finEjeX = MARGEN_IZQ + NUM_COLS * ESCALA;
    let finEjeY = 0;

    ctx.strokeStyle = "black";
    ctx.fillStyle   = "black";
    ctx.lineWidth   = 2;
//Eje x// 
	ctx.beginPath();
    ctx.moveTo(origenX, origenY);
    ctx.lineTo(finEjeX, origenY);
    ctx.stroke();
	// Flecha del eje X (punta derecha)
    dibujarFlecha(finEjeX, origenY, "derecha");
	ctx.font         = "bold 12px Arial";
    ctx.textAlign    = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("X", finEjeX + 8, origenY);
	//Eje y//
ctx.beginPath();
    ctx.moveTo(origenX, origenY);
    ctx.lineTo(origenX, finEjeY);
    ctx.stroke();

    // Flecha del eje Y (punta arriba)
    dibujarFlecha(origenX, finEjeY, "arriba");
	 ctx.font         = "bold 12px Arial";
    ctx.textAlign    = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("Y", origenX, finEjeY - 4);

    // Restablecer grosor de línea
    ctx.lineWidth = 1;
}
/**
 * Dibuja una punta de flecha en la posición (x, y) apuntando
 * hacia la dirección indicada.
 * @param {number} x          - Coordenada X en píxeles donde se dibuja la flecha.
 * @param {number} y          - Coordenada Y en píxeles donde se dibuja la flecha.
 * @param {string} direccion  - Dirección de la flecha: "derecha" o "arriba".
 */

function dibujarFlecha(x, y, direccion) {
    // Tamaño de la cabeza de la flecha en píxeles
    const tam = 7;

    ctx.beginPath();

    if (direccion === "derecha") {
        // Punta mirando a la derecha
        ctx.moveTo(x, y);
        ctx.lineTo(x - tam, y - tam / 2);
        ctx.lineTo(x - tam, y + tam / 2);
    } else if (direccion === "arriba") {
        // Punta mirando hacia arriba
        ctx.moveTo(x, y);
        ctx.lineTo(x - tam / 2, y + tam);
        ctx.lineTo(x + tam / 2, y + tam);
    }

    ctx.closePath();
    ctx.fill();
}
/**
 * Dibuja un "píxel" como un cuadrado escalado sobre el canvas.
 * Convierte coordenadas de grilla (origen abajo-izquierda) a
 * coordenadas de canvas (origen arriba-izquierda).
 * @param {number} x - Coordenada X en unidades de grilla.
 * @param {number} y - Coordenada Y en unidades de grilla.
 */

function plot(x, y) {
 // Desplazar por margen izquierdo e invertir eje Y
    let xPx = MARGEN_IZQ + x * ESCALA;
    let yPx  = (NUM_FILAS - y) * ESCALA;

    ctx.fillStyle = "black";
    ctx.fillRect(xPx, yPx, ESCALA, ESCALA);
}
/**
 * Implementación del algoritmo de líneas de Bresenham con registro de pasos.
 * Traza la línea entre (x0, y0) y (x1, y1) dibujando cada punto y
 * almacenando el estado de las variables internas en cada iteración.
 * @param {number}   x0   - Coordenada X inicial.
 * @param {number}   y0   - Coordenada Y inicial.
 * @param {number}   x1   - Coordenada X final.
 * @param {number}   y1   - Coordenada Y final.
 * @param {Function} plot - Función para dibujar el píxel en (x, y).
 * @returns {Array}  pasos - Arreglo con el estado de cada iteración.
 */
function bresenham(x0, y0, x1, y1, plot) {
	//Calculo de diferencias y dirección del paso//
	let dx = Math.abs(x1 - x0);
	let dy = Math.abs(y1 - y0);
	let sx = (x0 < x1) ? 1 : -1;
	let sy = (y0 < y1) ? 1 : -1;
	let err = dx - dy;

	let pasos = [];
	let paso = 0;
	while (true) {
//Dibujar el punto actual// 
		plot(x0, y0); 
		      // Calcular e2 para decisión y registro//
		let e2 = 2 * err;
// Registrar estado de todas las variables en este paso
		pasos.push({
			paso: paso++,
			x: x0,
			y: y0,
			err: err,
			e2: e2
		});
   // Condición de finalización// 
		if (x0 === x1 && y0 === y1) break;
//Ajuste en el eje x//  
		if (e2 > -dy) {
			err -= dy;
			x0 += sx;
		}
//Ajuste en el eje y// 
		if (e2 < dx) {
			err += dx;
			y0 += sy;
		}
	}

	return pasos;
}
/**
 * Llena la tabla HTML con los datos paso a paso del algoritmo.
 * Limpia el contenido anterior antes de insertar las nuevas filas.
 * @param {Array}  pasos       - Arreglo de objetos con el estado de cada paso.
 * @param {number} pasos.paso  - Número de iteración actual.
 * @param {number} pasos.x     - Coordenada X en la iteración actual.
 * @param {number} pasos.y     - Coordenada Y en la iteración actual.
 * @param {number} pasos.err   - Valor del error acumulado en la iteración actual.
 * @param {number} pasos.e2    - Valor del doble del error (2 * err) en la iteración actual.
 */
function llenarTabla(pasos) {
	const tabla = document.getElementById("tabla");
	 // Restablecer encabezado y eliminar filas anteriores
    tabla.innerHTML = `
        <tr>
            <th>Paso</th>
            <th>x</th>
            <th>y</th>
            <th>err</th>
            <th>e2</th>
        </tr>`;
	// Insertar una fila por cada iteración registrada
    pasos.forEach(p => {
        let fila = tabla.insertRow();
        fila.insertCell().innerText = p.paso;
        fila.insertCell().innerText = p.x;
        fila.insertCell().innerText = p.y;
        fila.insertCell().innerText = p.err;
        fila.insertCell().innerText = p.e2;
    });
}
/**
 * Función principal: lee los inputs, valida, limpia el canvas,
 * ejecuta el algoritmo de Bresenham y actualiza la tabla.
 * @param {number} x0 - Coordenada X inicial leída desde el campo de texto.
 * @param {number} y0 - Coordenada Y inicial leída desde el campo de texto.
 * @param {number} x1 - Coordenada X final leída desde el campo de texto.
 * @param {number} y1 - Coordenada Y final leída desde el campo de texto.
 */
function dibujar() {
//Leer coordenadas desde los campos de texto// 
    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);
//Validar que las coordenadas esten
    dibujarEjes();

    let pasos = bresenham(x0, y0, x1, y1, plot);

    llenarTabla(pasos);
}
// Dibujar los ejes al cargar la página
dibujarEjes();
