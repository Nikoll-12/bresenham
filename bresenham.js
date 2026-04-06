/**
 * Dibuja un "pixel" como un cuadrado escalado
 * @param {number} x 
 * @param {number} y 
 */
function plot(x, y) {
	ctx.fillStyle = "black";
	ctx.fillRect(x * escala, y * escala, escala, escala);
}
/**
 * Algoritmo de Bresenham con almacenamiento de pasos
 */
function bresenham(x0, y0, x1, y1, plot) {

	let dx = Math.abs(x1 - x0);
	let dy = Math.abs(y1 - y0);

	let sx = (x0 < x1) ? 1 : -1;
	let sy = (y0 < y1) ? 1 : -1;

	let err = dx - dy;

	let pasos = [];
	let paso = 0;

	while (true) {

		plot(x0, y0);

		let e2 = 2 * err;

		pasos.push({
			paso: paso++,
			x: x0,
			y: y0,
			err: err,
			e2: e2
		});

		if (x0 === x1 && y0 === y1) break;

		if (e2 > -dy) {
			err -= dy;
			x0 += sx;
		}

		if (e2 < dx) {
			err += dx;
			y0 += sy;
		}
	}

	return pasos;
}
function llenarTabla(pasos) {
	const tabla = document.getElementById("tabla");

	// Limpiar tabla excepto encabezado
	tabla.innerHTML = `
        <tr>
            <th>Paso</th>
            <th>x</th>
            <th>y</th>
            <th>err</th>
            <th>e2</th>
        </tr>
    `;

	pasos.forEach(p => {
		let fila = tabla.insertRow();

		fila.insertCell().innerText = p.paso;
		fila.insertCell().innerText = p.x;
		fila.insertCell().innerText = p.y;
		fila.insertCell().innerText = p.err;
		fila.insertCell().innerText = p.e2;
	});
}
function dibujar() {

    let x0 = parseInt(document.getElementById("x0").value);
    let y0 = parseInt(document.getElementById("y0").value);
    let x1 = parseInt(document.getElementById("x1").value);
    let y1 = parseInt(document.getElementById("y1").value);

    dibujarEjes();

    let pasos = bresenham(x0, y0, x1, y1, plot);

    llenarTabla(pasos);
}