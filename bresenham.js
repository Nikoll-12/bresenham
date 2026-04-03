/**
 * Dibuja un "pixel" como un cuadrado escalado
 * @param {number} x 
 * @param {number} y 
 */
function plot(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x * escala, y * escala, escala, escala);
}