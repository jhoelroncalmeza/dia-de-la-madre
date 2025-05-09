document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const photos = document.querySelectorAll('.photo');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const music = document.getElementById('background-music');
    const celebrationSound = document.getElementById('celebration-sound');
    const musicControl = document.querySelector('.music-control');
    const playGameBtn = document.getElementById('play-game-btn');
    const gameResult = document.getElementById('game-result');
    const transitionOverlay = document.querySelector('.transition-overlay');
    
    // Mensajes motivadores
    const motivationalMessages = [
        "Tu dedicación inspira a todos a tu alrededor",
        "Eres el corazón que mantiene unido a nuestro equipo",
        "Tu sonrisa ilumina nuestros días de trabajo",
        "Gracias por ser ejemplo de fortaleza y amor",
        "Cada logro del equipo lleva tu huella",
        "Tu compromiso hace la diferencia cada día",
        "Eres parte fundamental de nuestra historia",
        "Tu actitud positiva contagia a todo el equipo"
    ];
    
    // Estado de la aplicación
    let currentIndex = 0;
    let isPlaying = false;
    let autoSlideInterval;
    
    // Inicialización
    init();
    
    function init() {
        showPhoto(currentIndex);
        startAutoSlide();
        setupEventListeners();
        createFloatingElements();
        tryAutoPlay();
        
        // Mostrar iconos según años de servicio
        document.querySelectorAll('.employee-years').forEach(el => {
            const years = parseInt(el.getAttribute('data-years'));
            if (years >= 5) {
                el.classList.add('golden-heart');
            } else {
                el.classList.add('warm-hug');
            }
        });
    }
    
    // Funciones del carrusel
    function showPhoto(index) {
        // Activar efecto de transición
        transitionOverlay.style.opacity = '1';
        setTimeout(() => {
            photos.forEach(photo => photo.classList.remove('active'));
            photos[index].classList.add('active');
            transitionOverlay.style.opacity = '0';
            
            // Reproducir sonido de celebración
            celebrationSound.currentTime = 0;
            celebrationSound.play().catch(e => console.log("Sonido automático bloqueado"));
        }, 300);
        
        currentIndex = index;
    }
    
    function showPrevPhoto() {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        showPhoto(newIndex);
        resetAutoSlide();
    }
    
    function showNextPhoto() {
        const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        showPhoto(newIndex);
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(showNextPhoto, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Configuración de eventos
    function setupEventListeners() {
        prevBtn.addEventListener('click', showPrevPhoto);
        nextBtn.addEventListener('click', showNextPhoto);
        musicControl.addEventListener('click', toggleMusic);
        playGameBtn.addEventListener('click', playGame);
        
        // Efecto hover en fotos
        photos.forEach(photo => {
            photo.addEventListener('mouseenter', () => {
                if (photo.classList.contains('active')) {
                    photo.querySelector('img').style.transform = 'scale(1.05)';
                }
            });
            
            photo.addEventListener('mouseleave', () => {
                photo.querySelector('img').style.transform = 'scale(1.03)';
            });
        });
    }
    
    // Control de música
    function toggleMusic() {
        if (isPlaying) {
            music.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            music.play().catch(e => console.error("Error al reproducir:", e));
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    function tryAutoPlay() {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                musicControl.innerHTML = '<i class="fas fa-music"></i>';
                isPlaying = false;
            });
        }
    }
    
    // Juego interactivo
    function playGame() {
        playGameBtn.disabled = true;
        playGameBtn.style.transform = 'scale(0.95)';
        playGameBtn.style.opacity = '0.7';
        
        // Animación de carga
        let dots = '';
        const loadingInterval = setInterval(() => {
            dots = dots.length < 3 ? dots + '.' : '';
            gameResult.textContent = 'Buscando tu mensaje' + dots;
            gameResult.classList.add('show');
        }, 300);
        
        // Resultado después de un delay
        setTimeout(() => {
            clearInterval(loadingInterval);
            const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
            gameResult.textContent = `"${randomMessage}"`;
            
            // Resetear botón después de 3 segundos
            setTimeout(() => {
                playGameBtn.disabled = false;
                playGameBtn.style.transform = '';
                playGameBtn.style.opacity = '';
            }, 3000);
        }, 1500);
    }
    
    // Crear elementos flotantes decorativos
    function createFloatingElements() {
        const container = document.querySelector('.container');
        const symbols = ['🌸', '✨', '💖', '🌺', '🌼', '💝', '🌷', '💗'];
        
        for (let i = 0; i < 12; i++) {
            const element = document.createElement('div');
            element.className = 'floating-heart';
            element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            // Posición aleatoria
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = Math.random() * 100 + 'vh';
            
            // Animación personalizada
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            const size = Math.random() * 20 + 15;
            
            element.style.animation = `float-up ${duration}s linear ${delay}s infinite`;
            element.style.fontSize = `${size}px`;
            element.style.opacity = Math.random() * 0.5 + 0.3;
            
            container.appendChild(element);
        }
    }
});