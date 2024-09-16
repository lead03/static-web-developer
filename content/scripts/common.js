document.addEventListener("DOMContentLoaded", function () {
    const line1TypingElement = document.querySelector('.typing1');
    const line1TextToType = "> developing <span class='highlight-word'>dreams</span>";
    const line2TypingElement = document.querySelector('.typing2');
    const line2TextToType = "into digital <span class='highlight-word'>realities</span>";
    const presentationDiv = document.getElementById('presentation');
    const navbarDiv = document.getElementById('navbar');

    // Inicialmente oculta el div de presentación
    presentationDiv.style.opacity = 0;
    navbarDiv.style.opacity = 0;
    disableScroll();

    function typeText(typingElement, textToType, callback, index = 0) {
        if (index < textToType.length) {
            let nextChar = textToType[index] === "<" ? textToType.slice(index).split(">")[0] + ">" : textToType[index];
            typingElement.innerHTML = textToType.slice(0, index + nextChar.length) + '_';
            setTimeout(() => typeText(typingElement, textToType, callback, index + nextChar.length), 100);
        } else {
            typingElement.innerHTML = typingElement.innerHTML.slice(0, -1); // Remove cursor
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
        typeText(line2TypingElement, line2TextToType, applyGradientToHighlights);
    }

    // Inicia la animación de la primera línea
    typeText(line1TypingElement, line1TextToType, startSecondLineAnimation);

    // Asegúrate de que el contenido inicial de la segunda línea esté vacío
    line2TypingElement.textContent = '';

    function disableScroll() {
        document.body.style.overflow = 'hidden'; // Deshabilita el scroll
    }
    
    function enableScroll() {
        document.body.style.overflow = 'auto'; // Habilita el scroll
    }
    
});
