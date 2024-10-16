document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const megaDropdowns = document.querySelectorAll('.mega-dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownLink = dropdown.querySelector('a');

        dropdown.addEventListener('mouseenter', function() {
            this.classList.add('active');
            dropdownContent.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            dropdownContent.classList.remove('show');
        });

        // Añadimos este evento para cambiar el texto de la moneda
        if (dropdown.id === 'currency-dropdown') {
            const currencyOptions = dropdownContent.querySelectorAll('a');
            currencyOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const selectedCurrency = this.textContent;
                    dropdownLink.innerHTML = selectedCurrency + '<svg class="arrow-icon"><use xlink:href="#arrow-icon"/></svg>';
                    dropdownContent.classList.remove('show');
                });
            });
        }
    });

    megaDropdowns.forEach(megaDropdown => {
        const megaDropdownContent = megaDropdown.querySelector('.mega-dropdown-content');

        megaDropdown.addEventListener('mouseenter', function() {
            megaDropdownContent.classList.add('show');
        });

        megaDropdown.addEventListener('mouseleave', function() {
            megaDropdownContent.classList.remove('show');
        });
    });

    const prensaItems = document.querySelectorAll('.prensa-item');
    const prensaQuotePrincipal = document.querySelector('.prensa-quote-principal');
    let currentIndex = 0;

    function updatePrensa(newIndex) {
        const oldItem = prensaItems[currentIndex];
        const newItem = prensaItems[newIndex];
        
        oldItem.classList.remove('active');
        newItem.classList.add('active');
        
        prensaItems.forEach((item, index) => {
            let position = (index - newIndex + prensaItems.length) % prensaItems.length;
            if (position > 2) position -= prensaItems.length;
            item.style.transition = 'all 0.5s ease';
            item.style.left = `calc(50% + ${position * 125}px)`;
            item.style.transform = position === 0 ? 'translateX(-50%) scale(1.2)' : 'translateX(-50%) scale(1)';
            item.style.opacity = Math.abs(position) <= 2 ? 1 : 0;
            item.style.zIndex = 2 - Math.abs(position);
        });
        
        // Actualizar la cita principal con una transición suave
        prensaQuotePrincipal.style.opacity = 0;
        setTimeout(() => {
            prensaQuotePrincipal.textContent = newItem.getAttribute('data-quote');
            prensaQuotePrincipal.style.opacity = 1;
        }, 300);
        
        currentIndex = newIndex;
    }

    // Inicializar con el primer item
    updatePrensa(0);

    // Permitir clic en los items para cambiar manualmente
    prensaItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (index !== currentIndex) {
                updatePrensa(index);
            }
        });
    });

    const articulosContainer = document.querySelector('.articulos-container');
    const articulos = articulosContainer.querySelectorAll('.articulo-link');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let carouselIndex = 0;

    function updateCarousel() {
        const offset = -carouselIndex * 25; // Cambiado a 25% para coincidir con el nuevo tamaño
        articulosContainer.style.transform = `translateX(${offset}%)`;
        
        prevButton.classList.toggle('disabled', carouselIndex === 0);
        nextButton.classList.toggle('disabled', carouselIndex >= articulos.length - 4);
    }

    prevButton.addEventListener('click', () => {
        if (carouselIndex > 0) {
            carouselIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (carouselIndex < articulos.length - 4) {
            carouselIndex++;
            updateCarousel();
        }
    });

    // Inicializar el carrusel
    updateCarousel();

    // Mostrar todos los artículos inicialmente
    articulos.forEach((articulo) => {
        articulo.style.display = 'block';
    });

    // Eliminar la función mostrarMasArticulos y el evento del botón, ya que ahora todos los artículos se muestran desde el principio
    const botonVerTodos = document.querySelector('.mas-info-btn');
    if (botonVerTodos) {
        botonVerTodos.style.display = 'none';
    }

    // Inspirate section
    const espaciosTitulos = document.querySelectorAll('.espacios-titulos h2');
    const espaciosImagenes = document.querySelectorAll('.espacios-imagenes img');
    let currentEspacioIndex = 0;
    let espacioInterval;

    function activateEspacio(index) {
        espaciosTitulos.forEach((titulo, i) => {
            if (i === index) {
                titulo.classList.add('active');
            } else {
                titulo.classList.remove('active');
            }
        });

        espaciosImagenes.forEach((imagen, i) => {
            if (i === index) {
                imagen.classList.add('active');
            } else {
                imagen.classList.remove('active');
            }
        });

        currentEspacioIndex = index;
    }

    function rotateEspacios() {
        currentEspacioIndex = (currentEspacioIndex + 1) % espaciosTitulos.length;
        activateEspacio(currentEspacioIndex);
    }

    espaciosTitulos.forEach((titulo, index) => {
        titulo.addEventListener('click', (e) => {
            e.preventDefault();
            activateEspacio(index);
            clearInterval(espacioInterval);
            espacioInterval = setInterval(rotateEspacios, 5000);
        });
    });

    // Activar el primer espacio por defecto y comenzar la rotación automática
    activateEspacio(0);
    espacioInterval = setInterval(rotateEspacios, 5000);
});
