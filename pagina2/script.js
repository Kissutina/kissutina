document.addEventListener('DOMContentLoaded', () => {
    const favCards = document.querySelectorAll('.fav-card');
    let hoverCaption = document.getElementById('hover-caption');

    if (!hoverCaption) {
        hoverCaption = document.createElement('div');
        hoverCaption.id = 'hover-caption';
        document.body.appendChild(hoverCaption);
    }

    favCards.forEach(card => {
        const title = card.getAttribute('data-title');

        card.addEventListener('mouseenter', (e) => {
            // Exibir a legenda
            hoverCaption.textContent = title;
            hoverCaption.style.display = 'block';

            // Posicionar inicialmente no mouse
            updateCaptionPosition(e);
        });

        card.addEventListener('mousemove', (e) => {
            // Atualizar a posição da legenda conforme o mouse se move
            updateCaptionPosition(e);
        });

        card.addEventListener('mouseleave', () => {
            // Esconder a legenda
            hoverCaption.style.display = 'none';
        });
    });

    function updateCaptionPosition(e) {
        const xOffset = 15; // Distância do cursor em X
        const yOffset = 15; // Distância do cursor em Y

        let x = e.clientX + xOffset;
        let y = e.clientY + yOffset;

        // Ajuste para evitar que a legenda saia da tela na direita
        const captionWidth = hoverCaption.offsetWidth;
        if (x + captionWidth > window.innerWidth) {
            x = e.clientX - captionWidth - xOffset;
        }

        // Ajuste para evitar que a legenda saia da tela na parte inferior
        const captionHeight = hoverCaption.offsetHeight;
        if (y + captionHeight > window.innerHeight) {
            y = e.clientY - captionHeight - yOffset;
        }

        hoverCaption.style.left = `${x}px`;
        hoverCaption.style.top = `${y}px`;
    }
});