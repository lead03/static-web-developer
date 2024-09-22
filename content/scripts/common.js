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