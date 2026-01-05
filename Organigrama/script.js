const image = document.getElementById('zoomImage');
    const container = document.getElementById('imageContainer');
    let scale = 1;
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let currentPos = { x: 0, y: 0 };

    // Funciones de zoom
    function setImageTransform() {
        image.style.transform = `scale(${scale}) translate(${currentPos.x}px, ${currentPos.y}px)`;
    }

    function zoomIn() {
        scale = Math.min(scale + 0.5, 4);
        setImageTransform();
    }

    function zoomOut() {
        scale = Math.max(scale - 0.5, 0.5);
        setImageTransform();
    }

    function resetZoom() {
        scale = 1;
        currentPos = { x: 0, y: 0 };
        setImageTransform();
    }

    // Manejo del zoom con la rueda del mouse
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        scale = Math.min(Math.max(0.5, scale + delta), 4);
        setImageTransform();
    });

    // Manejo del arrastre
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = {
            x: e.clientX - currentPos.x,
            y: e.clientY - currentPos.y
        };
        container.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        currentPos = {
            x: (e.clientX - startPos.x),
            y: (e.clientY - startPos.y)
        };
        setImageTransform();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
    });

    // Prevenir el comportamiento predeterminado del arrastre de imágenes
    image.addEventListener('dragstart', (e) => e.preventDefault());