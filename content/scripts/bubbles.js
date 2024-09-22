document.addEventListener("DOMContentLoaded", function () {
    const bubbles = document.querySelectorAll('.bubble, .second-bubble, .third-bubble, .fourth-bubble');
    const container = document.querySelector('.bubble-container');

    let containerHeight = container.clientHeight;
    let containerWidth = container.clientWidth;
    const bubbleDiameter = 200; // Diámetro de la burbuja

    // Variable de velocidad constante para todas las burbujas
    const speed = 2; // Velocidad constante para todas las burbujas

    // Función para actualizar las dimensiones del contenedor
    function updateContainerDimensions() {
        containerHeight = container.clientHeight;
        containerWidth = container.clientWidth;
    }

    // Función para generar direcciones aleatorias normalizadas
    function getRandomNormalizedDirection() {
        let xDirection = (Math.random() - 0.5) * 2; // Genera un número entre -1 y 1
        let yDirection = (Math.random() - 0.5) * 2; // Genera un número entre -1 y 1
        const magnitude = Math.sqrt(xDirection ** 2 + yDirection ** 2); // Magnitud del vector
        return { x: xDirection / magnitude, y: yDirection / magnitude }; // Devuelve direcciones normalizadas
    }

    bubbles.forEach(bubble => {
        // Posición inicial aleatoria
        let x = Math.random() * (containerWidth - bubbleDiameter);
        let y = Math.random() * (containerHeight - bubbleDiameter);

        // Generar direcciones normalizadas
        const { x: xDirection, y: yDirection } = getRandomNormalizedDirection();

        // Asignar velocidades constantes con las direcciones normalizadas
        let xSpeed = speed * xDirection;
        let ySpeed = speed * yDirection;

        function moveBubble() {
            // Actualizar posición
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

            // Aplicar el movimiento a la burbuja
            bubble.style.transform = `translate(${x}px, ${y}px)`;

            // Continuar el movimiento
            requestAnimationFrame(moveBubble);
        }

        // Iniciar el movimiento para cada burbuja de forma independiente
        moveBubble();
    });

    // Ajustar el tamaño del contenedor y reposicionar las burbujas cuando se redimensiona la ventana
    window.addEventListener('resize', () => {
        updateContainerDimensions();

        bubbles.forEach(bubble => {
            // Ajustar la posición de las burbujas si salen fuera del nuevo tamaño del contenedor
            const xPos = parseFloat(bubble.style.transform.split('(')[1].split('px')[0]);
            const yPos = parseFloat(bubble.style.transform.split(', ')[1].split('px')[0].replace(')', ''));

            // Recalcular posiciones para que las burbujas no salgan de los bordes al redimensionar
            if (xPos + bubbleDiameter > containerWidth) {
                bubble.style.transform = `translate(${containerWidth - bubbleDiameter}px, ${yPos}px)`;
            }
            if (yPos + bubbleDiameter > containerHeight) {
                bubble.style.transform = `translate(${xPos}px, ${containerHeight - bubbleDiameter}px)`;
            }
        });
    });
});
