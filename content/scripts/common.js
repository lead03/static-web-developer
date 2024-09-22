document.addEventListener("DOMContentLoaded", function () {
    const line1TypingElement = document.querySelector('.typing1');
    const line1TextToType = "> developing <span class='highlight-word'>dreams</span>";
    const line2TypingElement = document.querySelector('.typing2');
    const line2TextToType = "into digital <span class='highlight-word'>realities</span>";
    const presentationDiv = document.getElementById('presentation');
    const navbarDiv = document.getElementById('navbar');

    // Primero mover la página al tope antes de deshabilitar el scroll
    window.scrollTo(0, 0);
    disableScroll(); // Luego deshabilitar el scroll

    presentationDiv.style.opacity = 0;
    navbarDiv.style.opacity = 0;
    typeText(true, line1TypingElement, line1TextToType, startSecondLineAnimation);
    line2TypingElement.textContent = '';

    function typeText(removeCursor, typingElement, textToType, callback, index = 0) {
        if (index < textToType.length) {
            let nextChar = textToType[index] === "<" ? textToType.slice(index).split(">")[0] + ">" : textToType[index];
            typingElement.innerHTML = textToType.slice(0, index + nextChar.length) + '_';
            setTimeout(() => typeText(removeCursor, typingElement, textToType, callback, index + nextChar.length), 100);
        } else {
            if (removeCursor) {
                typingElement.innerHTML = typingElement.innerHTML.slice(0, -1); // Remove cursor
            }
            if (callback) {
                callback();
            }
        }
    }

    function applyGradientToHighlights() {
        const highlightWords = document.querySelectorAll('.highlight-word');
        highlightWords.forEach(word => {
            word.style.backgroundImage = "linear-gradient(130deg, rgb(217, 150, 237) 50%, rgb(48, 98, 236) 100%)";
            word.style.WebkitBackgroundClip = "text";
            word.style.color = "transparent";
        });
        // Una vez aplicados los estilos, muestra el div de presentación
        showPresentationDiv();
    }

    function showPresentationDiv() {
        // Cambia la opacidad a 1 para mostrar el div con una transición suave
        presentationDiv.style.opacity = 1;
        navbarDiv.style.opacity = 1;
        enableScroll();
    }

    function startSecondLineAnimation() {
        typeText(false, line2TypingElement, line2TextToType, applyGradientToHighlights);
    }



    function disableScroll() {
        document.body.style.overflow = 'hidden'; // Deshabilita el scroll
    }

    function enableScroll() {
        document.body.style.overflow = 'auto'; // Habilita el scroll
    }

    document.addEventListener('scroll', function () {
        var aboutMeContent = document.querySelector('.about-me-content'); // Selecciona solo el contenido
        var rect = aboutMeContent.getBoundingClientRect();

        // Comprueba si el contenido está en el viewport
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            aboutMeContent.classList.add('visible');
        }
    });

    window.onbeforeunload = function () {
        // Mueve la página al principio antes de que se recargue
        window.scrollTo(0, 0);
    };




});








document.addEventListener("DOMContentLoaded", function () {
    const bubbles = document.querySelectorAll('.bubble, .second-bubble');
    const container = document.querySelector('.bubble-container');

    let containerHeight = container.clientHeight;
    let containerWidth = container.clientWidth;
    const bubbleDiameter = 150; // Diámetro de la burbuja

    // Variable de velocidad constante para todas las burbujas (rapidez)
    const speed = 3; // Rapidez constante para todas las burbujas

    // Función para actualizar las dimensiones del contenedor
    function updateContainerDimensions() {
        containerHeight = container.clientHeight;
        containerWidth = container.clientWidth;
    }

    // Función para generar una dirección aleatoria (valor entre -1 y 1 con decimales)
    function getRandomDirection() {
        return (Math.random() - 0.5) * 2; // Genera un número entre -1 y 1 con decimales
    }

    bubbles.forEach(bubble => {
        // Posición inicial aleatoria
        let x = Math.random() * (containerWidth - bubbleDiameter);
        let y = Math.random() * (containerHeight - bubbleDiameter);

        // Generar direcciones aleatorias
        let xDirection = getRandomDirection(); 
        let yDirection = getRandomDirection();

        // Normalizar las direcciones para que la rapidez sea constante
        const magnitude = Math.sqrt(xDirection ** 2 + yDirection ** 2);
        let xSpeed = (xDirection / magnitude) * speed; // Velocidad en X con rapidez constante
        let ySpeed = (yDirection / magnitude) * speed; // Velocidad en Y con rapidez constante

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
