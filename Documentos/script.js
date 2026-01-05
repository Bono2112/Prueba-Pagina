let currentZoom = 1;
  let isDragging = false;
  let startX, startY, translateX = 0, translateY = 0;
  let currentImageIndex = 0;
  let images = [];

  function mostrarImagen() {
      let contenedores = document.getElementsByClassName('imagen-container');
      for(let contenedor of contenedores) {
          contenedor.style.display = 'none';
      }

      let seleccion = document.getElementById('selector-imagen').value;
      
      if(seleccion) {
          document.getElementById(seleccion).style.display = 'block';
      }
  }

  function updateImageTransform() {
      const img = document.getElementById('imgZoom');
      img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }

  function resetZoom() {
      currentZoom = 1;
      translateX = 0;
      translateY = 0;
      updateImageTransform();
  }

  function showImage(index) {
      if (index >= 0 && index < images.length) {
          currentImageIndex = index;
          const modalImg = document.getElementById('imgZoom');
          modalImg.src = images[currentImageIndex].src;
          resetZoom();
      }
  }

  document.addEventListener('DOMContentLoaded', function() {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('imgZoom');
      const span = document.getElementsByClassName('close')[0];
      images = Array.from(document.getElementsByClassName('zoomable'));

      // Configurar zoom con botones
      document.getElementById('zoomIn').onclick = () => {
          currentZoom = Math.min(currentZoom * 1.2, 5);
          updateImageTransform();
      };

      document.getElementById('zoomOut').onclick = () => {
          currentZoom = Math.max(currentZoom / 1.2, 0.5);
          updateImageTransform();
      };

      document.getElementById('resetZoom').onclick = resetZoom;

      // Configurar navegación
      document.querySelector('.prev').onclick = () => {
          showImage((currentImageIndex - 1 + images.length) % images.length);
      };

      document.querySelector('.next').onclick = () => {
          showImage((currentImageIndex + 1) % images.length);
      };

      // Configurar arrastre de imagen
      modalImg.onmousedown = (e) => {
          isDragging = true;
          startX = e.clientX - translateX;
          startY = e.clientY - translateY;
      };

      document.onmousemove = (e) => {
          if (isDragging) {
              translateX = e.clientX - startX;
              translateY = e.clientY - startY;
              updateImageTransform();
          }
      };

      document.onmouseup = () => {
          isDragging = false;
      };

      // Zoom con rueda del mouse
      modal.onwheel = (e) => {
          e.preventDefault();
          const delta = Math.sign(e.deltaY);
          if (delta < 0) {
              currentZoom = Math.min(currentZoom * 1.1, 5);
          } else {
              currentZoom = Math.max(currentZoom / 1.1, 0.5);
          }
          updateImageTransform();
      };

      // Configurar apertura de modal
      for(let i = 0; i < images.length; i++) {
          images[i].onclick = function() {
              modal.style.display = 'block';
              currentImageIndex = i;
              showImage(i);
          }
      }

      // Configurar cierre de modal
      span.onclick = function() {
          modal.style.display = 'none';
          resetZoom();
      }

      modal.onclick = function(event) {
          if(event.target === modal) {
              modal.style.display = 'none';
              resetZoom();
          }
      }

      document.addEventListener('keydown', function(event) {
          if(modal.style.display === 'block') {
              switch(event.key) {
                  case 'Escape':
                      modal.style.display = 'none';
                      resetZoom();
                      break;
                  case 'ArrowLeft':
                      showImage((currentImageIndex - 1 + images.length) % images.length);
                      break;
                  case 'ArrowRight':
                      showImage((currentImageIndex + 1) % images.length);
                      break;
                  case '+':
                      document.getElementById('zoomIn').click();
                      break;
                  case '-':
                      document.getElementById('zoomOut').click();
                      break;
              }
          }
      });
  });