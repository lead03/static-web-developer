document.addEventListener("DOMContentLoaded", function () {
    const bubbles = document.querySelectorAll('.bubble, .second-bubble, .third-bubble, .fourth-bubble');
    const container = document.querySelector('.bubble-container');

    let containerHeight = container.clientHeight;
    let containerWidth = container.clientWidth;
    let bubbleDiameter = getBubbleDiameter();
    const speed = 1; // Velocidad constante para todas las burbujas

    // Actualizar el tamaño del contenedor cuando la ventana cambia de tamaño
    function updateDimensions() {
        containerHeight = container.clientHeight;
        containerWidth = container.clientWidth;
        bubbleDiameter = getBubbleDiameter(); // Actualizar el diámetro
    }

    // Generar direcciones aleatorias normalizadas
    function getRandomNormalizedDirection() {
        let xDirection = (Math.random() - 0.5) * 2;
        let yDirection = (Math.random() - 0.5) * 2;
        const magnitude = Math.sqrt(xDirection ** 2 + yDirection ** 2);
        return { x: xDirection / magnitude, y: yDirection / magnitude };
    }

    // Mover las burbujas
    bubbles.forEach(bubble => {
        let x = Math.random() * (containerWidth - bubbleDiameter);
        let y = Math.random() * (containerHeight - bubbleDiameter);

        const { x: xDirection, y: yDirection } = getRandomNormalizedDirection();
        let xSpeed = speed * xDirection;
        let ySpeed = speed * yDirection;
        let isMoving = true; // Controla si la burbuja está en movimiento

        function moveBubble() {
            if (isMoving) {
                x += xSpeed;
                y += ySpeed;

                // Rebotar en los bordes
                if (x <= 0 || x + bubbleDiameter >= containerWidth) {
                    xSpeed *= -1; // Cambia de dirección en el eje X
                    x = Math.max(0, Math.min(x, containerWidth - bubbleDiameter)); // Asegura que esté dentro de los límites
                }
                if (y <= 0 || y + bubbleDiameter >= containerHeight) {
                    ySpeed *= -1; // Cambia de dirección en el eje Y
                    y = Math.max(0, Math.min(y, containerHeight - bubbleDiameter)); // Asegura que esté dentro de los límites
                }

                // Aplicar el movimiento a la burbuja (solo translate para el movimiento)
                bubble.style.transform = `translate(${x}px, ${y}px) scale(${isMoving ? 1 : 1.2})`;
            }

            requestAnimationFrame(moveBubble);
        }

        moveBubble(); // Iniciar el movimiento

        // Detener el movimiento y agrandar al hacer hover
        bubble.addEventListener('mouseenter', () => {
            isMoving = false; // Detener el movimiento
            bubble.style.transition = 'transform 0.3s ease-in-out'; // Transición suave solo en hover
            bubble.style.transform += ' scale(1.2)'; // Agrandar la burbuja sin afectar el translate
            bubble.style.zIndex = '1000'; // Aumentar el z-index para estar sobre las otras burbujas
        });

        // Reanudar el movimiento cuando se quita el hover y quitar la transición
        bubble.addEventListener('mouseleave', () => {
            bubble.style.zIndex = ''; // Restablece el z-index al valor original
            bubble.style.transition = 'transform 0.3s ease-in-out'; // Transición para restaurar el tamaño
            bubble.style.transform = bubble.style.transform.replace('scale(1.2)', 'scale(1)'); // Restaurar el tamaño
            setTimeout(() => {
                isMoving = true; // Reanudar el movimiento
                bubble.style.transition = ''; // Eliminar la transición para evitar afectar el movimiento
            }, 300); // Espera a que termine la animación de reducir antes de reanudar el movimiento
        });
    });

    // Ajustar las dimensiones del contenedor al redimensionar la ventana
    window.addEventListener('resize', updateDimensions);

    // Función para obtener el diámetro de la burbuja desde el CSS
function getBubbleDiameter() {
    // Suponiendo que todas las burbujas tienen el mismo tamaño
    const bubbleStyle = getComputedStyle(bubbles[0]);
    const width = parseFloat(bubbleStyle.width);
    return width;
}

});
