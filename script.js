document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const photos = document.querySelectorAll('.photo');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const music = document.getElementById('background-music');
    const celebrationSound = document.getElementById('celebration-sound');
    const correctSound = document.getElementById('correct-sound');
    const levelUpSound = document.getElementById('level-up-sound');
    const musicControl = document.querySelector('.music-control');
    const startGameBtn = document.getElementById('start-game-btn');
    const gameContainer = document.getElementById('game-container');
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const gameFeedback = document.getElementById('game-feedback');
    const rewardContainer = document.getElementById('reward-container');
    const rewardMessage = document.getElementById('reward-message');
    const rewardBadge = document.getElementById('reward-badge');
    const progressLevels = document.querySelectorAll('.progress-level');
    const transitionEffect = document.querySelector('.transition-effect');
    
    // Preguntas y respuestas
    const questions = [
        {
            question: "¿Qué es lo que más disfrutas de tu trabajo?",
            options: [
                { text: "La relación con mis compañeros", correct: true, points: 1 },
                { text: "Los desafíos profesionales", correct: true, points: 1 },
                { text: "El equilibrio con mi vida familiar", correct: true, points: 1 },
                { text: "Todas las anteriores", correct: true, points: 2 }
            ],
            motivational: "¡Excelente! Cada aspecto de tu trabajo contribuye a tu crecimiento"
        },
        {
            question: "Como mamá trabajadora, ¿qué superpoder dirías que tienes?",
            options: [
                { text: "Multitasking avanzado", correct: true, points: 1 },
                { text: "Paciencia infinita", correct: true, points: 1 },
                { text: "Amor incondicional", correct: true, points: 1 },
                { text: "¡Todos los anteriores!", correct: true, points: 2 }
            ],
            motivational: "¡Correcto! Eres una verdadera superheroína en el trabajo y en casa"
        },
        {
            question: "¿Qué consejo le darías a otras mamás trabajadoras?",
            options: [
                { text: "No te olvides de cuidarte a ti misma", correct: true, points: 1 },
                { text: "Celebra tus pequeños logros", correct: true, points: 1 },
                { text: "Pide ayuda cuando la necesites", correct: true, points: 1 },
                { text: "Todos son consejos valiosos", correct: true, points: 2 }
            ],
            motivational: "¡Maravilloso! Tu sabiduría es inspiradora para todas nosotras"
        },
        {
            question: "¿Qué te motiva a seguir creciendo profesionalmente?",
            options: [
                { text: "Ser un ejemplo para mis hijos", correct: true, points: 1 },
                { text: "Mi propia satisfacción personal", correct: true, points: 1 },
                { text: "Contribuir al éxito del equipo", correct: true, points: 1 },
                { text: "Una combinación de todas", correct: true, points: 2 }
            ],
            motivational: "¡Fantástico! Tu motivación es el motor de tus éxitos"
        },
        {
            question: "¿Cómo logras el equilibrio entre trabajo y familia?",
            options: [
                { text: "Con organización y planificación", correct: true, points: 1 },
                { text: "Dándome permiso para no ser perfecta", correct: true, points: 1 },
                { text: "Priorizando lo realmente importante", correct: true, points: 1 },
                { text: "Con mucho amor y algo de magia", correct: true, points: 2 }
            ],
            motivational: "¡Increíble! Has encontrado la fórmula que funciona para ti"
        }
    ];
    
    // Estado del juego
    let currentIndex = 0;
    let isPlaying = false;
    let autoSlideInterval;
    let currentQuestion = 0;
    let totalPoints = 0;
    let gameStarted = false;
    
    // Inicialización
    init();
    
    function init() {
        showPhoto(currentIndex);
        startAutoSlide();
        setupEventListeners();
        createParticles();
        
        // Configurar juego
        startGameBtn.addEventListener('click', startGame);
    }
    
    // Carrusel de fotos
    function showPhoto(index) {
        // Activar efecto de transición
        transitionEffect.style.opacity = '1';
        
        setTimeout(() => {
            photos.forEach(photo => photo.classList.remove('active'));
            photos[index].classList.add('active');
            
            // Efecto de celebración
            celebrationSound.currentTime = 0;
            celebrationSound.play().catch(e => console.log("Sonido bloqueado"));
            
            // Crear confeti
            createConfetti();
            
            // Finalizar transición
            setTimeout(() => {
                transitionEffect.style.opacity = '0';
            }, 300);
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
    
    // Partículas de fondo
    function createParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            // Posición aleatoria
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            // Tamaño aleatorio
            const size = Math.random() * 10 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Opacidad aleatoria
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            // Duración de animación aleatoria
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = duration + 's';
            
            // Retraso aleatorio
            particle.style.animationDelay = Math.random() * 5 + 's';
        });
    }
    
    // Confeti
    function createConfetti() {
        const colors = ['#9d4edd', '#ff9e00', '#3a86ff', '#e8c07d', '#ff5e5b'];
        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-particle';
            
            // Posición aleatoria en la tarjeta
            confetti.style.left = Math.random() * cardRect.width + cardRect.left + 'px';
            confetti.style.top = cardRect.top - 10 + 'px';
            
            // Color aleatorio
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Forma aleatoria
            const shape = Math.random() > 0.5 ? 'circle' : 'square';
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
            
            // Tamaño aleatorio
            const size = Math.random() * 10 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Rotación aleatoria
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);
            
            // Animación
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            
            confetti.animate([
                { top: cardRect.top - 10 + 'px', opacity: 1, transform: `rotate(0deg) scale(1)` },
                { top: window.innerHeight + 'px', opacity: 0, transform: `rotate(${Math.random() * 360}deg) scale(0.5)` }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
            });
            
            // Eliminar después de la animación
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }
    
    // Juego interactivo
    function startGame() {
        gameStarted = true;
        startGameBtn.style.display = 'none';
        gameContainer.style.display = 'block';
        currentQuestion = 0;
        totalPoints = 0;
        resetProgress();
        showQuestion();
    }
    
    function showQuestion() {
        if (currentQuestion >= questions.length) {
            endGame();
            return;
        }
        
        const question = questions[currentQuestion];
        questionContainer.textContent = question.question;
        optionsContainer.innerHTML = '';
        
        // Mezclar opciones
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        
        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.dataset.points = option.points;
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
        
        gameFeedback.textContent = '';
    }
    
    function checkAnswer(selectedOption) {
        correctSound.play().catch(e => console.log("Sonido bloqueado"));
        
        // Todas las respuestas son correctas en este juego motivacional
        totalPoints += parseInt(selectedOption.points);
        gameFeedback.textContent = questions[currentQuestion].motivational;
        
        // Actualizar progreso
        updateProgress();
        
        // Siguiente pregunta después de un breve retraso
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1500);
    }
    
    function updateProgress() {
        const progressPercentage = (totalPoints / (questions.length * 2)) * 100;
        
        if (progressPercentage <= 33) {
            progressLevels[0].style.width = `${progressPercentage * 0.33}%`;
        } else if (progressPercentage <= 66) {
            progressLevels[0].style.width = '100%';
            progressLevels[1].style.width = `${(progressPercentage - 33) * 0.33}%`;
            if (progressLevels[1].style.width === '0%') {
                levelUpSound.play().catch(e => console.log("Sonido bloqueado"));
            }
        } else {
            progressLevels[0].style.width = '100%';
            progressLevels[1].style.width = '100%';
            progressLevels[2].style.width = `${(progressPercentage - 66) * 0.33}%`;
            if (progressLevels[2].style.width === '0%') {
                levelUpSound.play().catch(e => console.log("Sonido bloqueado"));
            }
        }
    }
    
    function resetProgress() {
        progressLevels.forEach(level => {
            level.style.width = '0%';
        });
    }
    
    function endGame() {
        gameContainer.style.display = 'none';
        rewardContainer.style.display = 'block';
        
        // Determinar recompensa según puntos
        let badge, message;
        
        if (totalPoints >= questions.length * 1.8) {
            // Platinum
            badge = '🎖️';
            message = "¡Nivel PLATINUM alcanzado! Eres una inspiración para todo el equipo. Tu dedicación y amor por lo que haces brillan más que el metal más preciado.";
        } else if (totalPoints >= questions.length * 1.4) {
            // Oro
            badge = '🏆';
            message = "¡Nivel ORO alcanzado! Tu valioso aporte y experiencia son el tesoro de nuestra empresa. Sigue brillando con tu luz única.";
        } else {
            // Esmeralda
            badge = '💎';
            message = "¡Nivel ESMERALDA alcanzado! Tu crecimiento y frescura son evidentes. Como esta piedra preciosa, tu potencial es infinito.";
        }
        
        rewardBadge.textContent = badge;
        rewardMessage.textContent = message;
        
        // Animación de celebración
        celebrationSound.play().catch(e => console.log("Sonido bloqueado"));
        createConfetti();
    }
    
    // Configuración de eventos
    function setupEventListeners() {
        prevBtn.addEventListener('click', showPrevPhoto);
        nextBtn.addEventListener('click', showNextPhoto);
        musicControl.addEventListener('click', toggleMusic);
        
        // Intenta reproducir música automáticamente
        try {
            music.play();
            isPlaying = true;
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        } catch (e) {
            console.log("Reproducción automática bloqueada");
        }
        
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
    
    // Estilos dinámicos para partículas de confeti
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
    .confetti-particle {
        position: fixed;
        z-index: 1000;
        pointer-events: none;
    }
    `;
    document.head.appendChild(confettiStyle);
});
