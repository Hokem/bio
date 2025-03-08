// Глобальная переменная для отслеживания состояния воспроизведения
let isPlaying = false;

// Функция для управления загрузочным экраном
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const dots = document.querySelector('.dots');
    const particles = document.querySelectorAll('.loader-particles span');
    
    // Анимация точек
    let dotsCount = 0;
    const dotsInterval = setInterval(() => {
        dotsCount = (dotsCount + 1) % 4;
        dots.textContent = '.'.repeat(dotsCount);
    }, 300);
    
    // Анимация частиц
    particles.forEach((particle, index) => {
        const delay = index * 0.4;
        particle.style.animationDelay = `${delay}s`;
    });
    
    // Проверяем, первое ли это посещение
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (hasVisited) {
        // Если пользователь уже был на сайте, сразу скрываем загрузочный экран
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            clearInterval(dotsInterval);
        }, 500);
    } else {
        // Если это первое посещение, показываем загрузочный экран на 3 секунды
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Сохраняем информацию о посещении в localStorage
            localStorage.setItem('hasVisitedBefore', 'true');
            
            // Полностью удаляем загрузочный экран после завершения анимации
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                clearInterval(dotsInterval);
            }, 500);
        }, 3000);
    }
    
    // Прокручиваем страницу вверх при загрузке
    window.scrollTo(0, 0);
}

// Инициализация Particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Прокручиваем страницу вверх при загрузке
    window.scrollTo(0, 0);
    
    // Инициализируем загрузочный экран
    initLoadingScreen();
    
    // Обработчик для кнопки сброса состояния "уже посещал"
    const resetButton = document.getElementById('reset-visited');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            localStorage.removeItem('hasVisitedBefore');
            alert('Состояние "уже посещал" сброшено. Перезагрузите страницу для проверки.');
        });
    }
    
    // Регистрируем плагин ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Конфигурация для particles.js
    particlesJS('particles', {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ffffff", "#ff5e3a", "#5e72ff"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 5,
                    "duration": 2,
                    "opacity": 0.8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Инициализация аудиоплеера
    initAudioPlayer();
    
    // Добавляем возможность перемещения аудиоплеера
    initDraggablePlayer();

    // GSAP анимации
    initGSAPAnimations();
    
    // Эффект печатающегося текста для цитаты с повторением
    initRepeatingTypewriterEffect();
    
    // Эффект параллакса для фона
    initParallaxEffect();
    
    // Анимация для социальных кнопок при наведении
    initSocialButtonsAnimation();
    
    // Анимация для изображения профиля
    initProfileImageAnimation();
    
    // Инициализация панели прогресса просмотра
    initViewProgressBar();
    
    // Анимация для текстурированного текста
    initTexturedText();
    
    // Инициализация мобильного плеера
    initMobilePlayer();
    
    // Автоматическое воспроизведение музыки при загрузке
    // Запускаем сразу и повторно через небольшую задержку для надежности
    autoPlayMusic();
    
    // Прокручиваем страницу вверх при загрузке
    window.scrollTo(0, 0);
    
    // Повторная попытка воспроизведения через 1 секунду
    setTimeout(() => {
        autoPlayMusic();
    }, 1000);
    
    // И еще одна попытка через 3 секунды
    setTimeout(() => {
        autoPlayMusic();
    }, 3000);
});

// Функция инициализации панели прогресса просмотра
function initViewProgressBar() {
    const progressBar = document.querySelector('.view-progress-bar');
    
    // Функция для обновления прогресса просмотра
    function updateViewProgress() {
        // Вычисляем, сколько процентов страницы просмотрено
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    }
    
    // Обновляем прогресс при скролле
    window.addEventListener('scroll', updateViewProgress);
    
    // Обновляем прогресс при изменении размера окна
    window.addEventListener('resize', updateViewProgress);
    
    // Инициализируем прогресс при загрузке
    updateViewProgress();
}

// Функция для инициализации перемещения аудиоплеера
function initDraggablePlayer() {
    const audioPlayer = document.querySelector('.audio-player');
    const dragHandle = document.querySelector('.drag-handle');
    let isDragging = false;
    let offsetX, offsetY;
    
    // Начало перемещения при клике на индикатор или на сам плеер
    const startDrag = function(e) {
        // Проверяем, что клик не на элементах управления
        if (e.target.closest('.play-pause-btn') || 
            e.target.closest('#volume-slider') || 
            e.target.closest('.progress-container')) {
            return;
        }
        
        isDragging = true;
        audioPlayer.classList.add('dragging');
        
        // Вычисляем смещение от точки клика до верхнего левого угла элемента
        const rect = audioPlayer.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // Предотвращаем выделение текста при перетаскивании
        e.preventDefault();
    };
    
    // Добавляем обработчики для индикатора и плеера
    dragHandle.addEventListener('mousedown', startDrag);
    audioPlayer.addEventListener('mousedown', function(e) {
        // Если клик был на индикаторе, не дублируем обработку
        if (!e.target.closest('.drag-handle')) {
            startDrag(e);
        }
    });
    
    // Перемещение
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // Вычисляем новые координаты с учетом смещения
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        
        // Ограничиваем перемещение в пределах окна
        const maxX = window.innerWidth - audioPlayer.offsetWidth;
        const maxY = window.innerHeight - audioPlayer.offsetHeight;
        
        const boundedX = Math.max(0, Math.min(x, maxX));
        const boundedY = Math.max(0, Math.min(y, maxY));
        
        // Применяем новые координаты
        audioPlayer.style.left = boundedX + 'px';
        audioPlayer.style.top = boundedY + 'px';
        audioPlayer.style.right = 'auto';
        audioPlayer.style.bottom = 'auto';
    });
    
    // Окончание перемещения
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            audioPlayer.classList.remove('dragging');
            
            // Сохраняем позицию в localStorage
            const rect = audioPlayer.getBoundingClientRect();
            localStorage.setItem('audioPlayerPosition', JSON.stringify({
                left: rect.left,
                top: rect.top
            }));
        }
    });
    
    // Поддержка для мобильных устройств
    const startTouchDrag = function(e) {
        // Проверяем, что касание не на элементах управления
        if (e.target.closest('.play-pause-btn') || 
            e.target.closest('#volume-slider') || 
            e.target.closest('.progress-container')) {
            return;
        }
        
        isDragging = true;
        audioPlayer.classList.add('dragging');
        
        const touch = e.touches[0];
        const rect = audioPlayer.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        
        e.preventDefault();
    };
    
    dragHandle.addEventListener('touchstart', startTouchDrag);
    audioPlayer.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.drag-handle')) {
            startTouchDrag(e);
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const x = touch.clientX - offsetX;
        const y = touch.clientY - offsetY;
        
        const maxX = window.innerWidth - audioPlayer.offsetWidth;
        const maxY = window.innerHeight - audioPlayer.offsetHeight;
        
        const boundedX = Math.max(0, Math.min(x, maxX));
        const boundedY = Math.max(0, Math.min(y, maxY));
        
        audioPlayer.style.left = boundedX + 'px';
        audioPlayer.style.top = boundedY + 'px';
        audioPlayer.style.right = 'auto';
        audioPlayer.style.bottom = 'auto';
        
        e.preventDefault();
    });
    
    document.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            audioPlayer.classList.remove('dragging');
            
            // Сохраняем позицию в localStorage
            const rect = audioPlayer.getBoundingClientRect();
            localStorage.setItem('audioPlayerPosition', JSON.stringify({
                left: rect.left,
                top: rect.top
            }));
        }
    });
    
    // Восстанавливаем позицию из localStorage при загрузке страницы
    window.addEventListener('load', function() {
        const savedPosition = localStorage.getItem('audioPlayerPosition');
        if (savedPosition) {
            try {
                const position = JSON.parse(savedPosition);
                
                // Проверяем, что позиция в пределах экрана
                if (position.left >= 0 && position.left <= window.innerWidth - audioPlayer.offsetWidth &&
                    position.top >= 0 && position.top <= window.innerHeight - audioPlayer.offsetHeight) {
                    
                    audioPlayer.style.left = position.left + 'px';
                    audioPlayer.style.top = position.top + 'px';
                    audioPlayer.style.right = 'auto';
                    audioPlayer.style.bottom = 'auto';
                }
            } catch (e) {
                console.error('Ошибка при восстановлении позиции аудиоплеера:', e);
            }
        }
    });
}

// Функция инициализации аудиоплеера
function initAudioPlayer() {
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const trackItems = document.querySelectorAll('.track-item');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const prevTrackBtn = document.getElementById('prev-track-btn');
    const nextTrackBtn = document.getElementById('next-track-btn');
    const trackListBtn = document.getElementById('track-list-btn');
    const trackListContainer = document.querySelector('.track-list-container');
    
    // Проверяем наличие всех необходимых элементов
    if (!audio || !playPauseBtn) {
        console.warn('Не удалось инициализировать аудиоплеер: отсутствуют необходимые элементы');
        return;
    }
    
    // Используем глобальную переменную isPlaying
    let currentTrackIndex = 0;
    
    // Функция для воспроизведения трека
    function playTrack() {
        // Добавляем флаг для отслеживания состояния
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                
                // Обновляем состояние мобильного плеера
                const mobilePlayBtn = document.getElementById('mobile-play-btn');
                if (mobilePlayBtn) {
                    mobilePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
                
                const mobileToggle = document.querySelector('.mobile-player-toggle');
                if (mobileToggle) {
                    mobileToggle.classList.add('active');
                }
            }).catch(error => {
                console.error('Ошибка воспроизведения аудио:', error);
            });
        }
    }
    
    // Функция для паузы трека
    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Обновляем состояние мобильного плеера
        const mobilePlayBtn = document.getElementById('mobile-play-btn');
        if (mobilePlayBtn) {
            mobilePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        
        const mobileToggle = document.querySelector('.mobile-player-toggle');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
        }
    }
    
    // Функция для загрузки трека
    function loadTrack(trackIndex) {
        // Обновляем активный класс в списке треков
        trackItems.forEach(item => item.classList.remove('active'));
        trackItems[trackIndex].classList.add('active');
        
        // Получаем данные трека
        const trackSrc = trackItems[trackIndex].getAttribute('data-src');
        const title = trackItems[trackIndex].getAttribute('data-title');
        const artist = trackItems[trackIndex].getAttribute('data-artist');
        
        // Обновляем источник аудио
        audio.src = trackSrc;
        
        // Обновляем информацию о треке
        trackTitle.textContent = title;
        trackArtist.textContent = artist;
        
        // Сбрасываем прогресс
        progressBar.style.width = '0%';
        
        // Сохраняем текущий индекс
        currentTrackIndex = trackIndex;
        
        // Если было воспроизведение, запускаем новый трек
        if (isPlaying) {
            playTrack();
        }
    }
    
    // Функция для переключения на предыдущий трек
    function prevTrack() {
        let newIndex = currentTrackIndex - 1;
        if (newIndex < 0) {
            newIndex = trackItems.length - 1;
        }
        loadTrack(newIndex);
    }
    
    // Функция для переключения на следующий трек
    function nextTrack() {
        let newIndex = currentTrackIndex + 1;
        if (newIndex >= trackItems.length) {
            newIndex = 0;
        }
        loadTrack(newIndex);
    }
    
    // Обработчик клика на кнопку воспроизведения/паузы
    playPauseBtn.addEventListener('click', function(event) {
        // Предотвращаем всплытие события
        event.stopPropagation();
        
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });
    
    // Обработчик изменения громкости
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value / 100;
        
        // Изменение иконки громкости в зависимости от уровня
        const volumeIcon = document.querySelector('.volume-control i');
        if (this.value == 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (this.value < 50) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    });
    
    // Обновление прогресс-бара
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    });
    
    // Клик по прогресс-бару для перемотки
    progressContainer.addEventListener('click', function(e) {
        const clickPosition = (e.offsetX / this.offsetWidth);
        audio.currentTime = clickPosition * audio.duration;
    });
    
    // Обработчики для кнопок управления треками
    prevTrackBtn.addEventListener('click', prevTrack);
    nextTrackBtn.addEventListener('click', nextTrack);
    
    // Скрываем кнопку списка треков
    if (trackListBtn) {
        trackListBtn.style.display = 'none';
    }
    
    // Автоматическое воспроизведение при загрузке страницы
    document.addEventListener('click', function autoPlayHandler() {
        playTrack();
        document.removeEventListener('click', autoPlayHandler);
    }, { once: true });
    
    // Обработка ошибок загрузки аудио
    audio.addEventListener('error', function(e) {
        console.error('Ошибка загрузки аудио:', e);
        // Пробуем следующий трек при ошибке
        nextTrack();
    });
}

// Функция инициализации GSAP анимаций
function initGSAPAnimations() {
    // Проверяем наличие необходимых элементов перед созданием анимаций
    if (!document.querySelector('.profile-img') || !document.querySelector('.profile-info')) {
        console.warn('GSAP: Элементы для анимации профиля не найдены');
        return;
    }
    
    // Проверяем, загружен ли GSAP
    if (typeof gsap === 'undefined' || !gsap.registerPlugin) {
        console.error('GSAP не загружен или не инициализирован');
        return;
    }
    
    try {
        // Регистрируем плагин ScrollTrigger, если он доступен
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        const timeline = gsap.timeline();
        
        // Анимация для профиля
        timeline.from('.profile-img', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        });
        
        timeline.from('.profile-info', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.7');
        
        // Проверяем наличие элемента about-me-card перед созданием анимации
        const aboutMeCard = document.querySelector('.about-me-card');
        if (aboutMeCard && typeof ScrollTrigger !== 'undefined') {
            // Анимация для блока "Обо мне"
            const aboutMeTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-me-card',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
            
            // Проверяем наличие элементов перед анимацией
            if (document.querySelector('.about-me-header')) {
                aboutMeTimeline.from('.about-me-header', {
                    duration: 0.8,
                    y: 20,
                    opacity: 0,
                    ease: 'power3.out'
                });
            }
            
            if (document.querySelector('.about-me-text')) {
                aboutMeTimeline.from('.about-me-text', {
                    duration: 0.8,
                    y: 20,
                    opacity: 0,
                    ease: 'power3.out'
                }, '-=0.4');
            }
            
            if (document.querySelector('.skills-container')) {
                aboutMeTimeline.from('.skills-container', {
                    duration: 0.8,
                    y: 20,
                    opacity: 0,
                    ease: 'power3.out'
                }, '-=0.4');
            }
        }
        
        // Анимация для плавающих иконок
        const floatingIcons = document.querySelectorAll('.floating-icon');
        if (floatingIcons.length > 0) {
            gsap.to('.floating-icon', {
                y: -15,
                duration: 2,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.3
            });
        }
        
        // Анимация для кругов свечения
        const glowCircles = document.querySelectorAll('.glow-circle');
        if (glowCircles.length > 0) {
            gsap.to('.glow-circle', {
                scale: 1.2,
                opacity: 0.3,
                duration: 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.5
            });
        }
    } catch (error) {
        console.error('Ошибка при инициализации GSAP анимаций:', error);
    }
}

// Функция для инициализации мобильного плеера
function initMobilePlayer() {
    const mobilePlayer = document.querySelector('.mobile-player');
    const mobileToggle = document.querySelector('.mobile-player-toggle');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobilePlayBtn = document.getElementById('mobile-play-btn');
    const mobilePrevBtn = document.getElementById('mobile-prev-btn');
    const mobileNextBtn = document.getElementById('mobile-next-btn');
    const mobileVolumeSlider = document.getElementById('mobile-volume-slider');
    const mobileTrackListBtn = document.getElementById('mobile-track-list-btn');
    const mobileProgressContainer = document.querySelector('.mobile-progress-container');
    const mobileProgressBar = document.querySelector('.mobile-progress-bar');
    const mobileTrackTitle = document.querySelector('.mobile-track-title');
    const mobileTrackArtist = document.querySelector('.mobile-track-artist');
    const trackListContainer = document.querySelector('.track-list-container');
    const audio = document.getElementById('background-music');
    
    // Проверяем наличие всех необходимых элементов
    if (!mobilePlayer || !mobileToggle || !mobileCloseBtn || !mobilePlayBtn || !audio) {
        console.warn('Не удалось инициализировать мобильный плеер: отсутствуют необходимые элементы');
        return;
    }
    
    // Проверяем размер экрана при загрузке
    checkScreenSize();
    
    // Проверяем размер экрана при изменении размера окна
    window.addEventListener('resize', checkScreenSize);
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            // Показываем мобильный плеер на мобильных устройствах
            mobileToggle.style.opacity = '1';
            mobileToggle.style.transform = 'scale(1)';
            mobileToggle.style.display = 'flex';
            mobilePlayer.style.display = 'block';
            
            // Перемещаем список треков в мобильный плеер для лучшего отображения
            if (trackListContainer) {
                trackListContainer.classList.add('mobile-track-list');
            }
        } else {
            // Скрываем мобильный плеер на десктопах
            mobileToggle.style.opacity = '0';
            mobileToggle.style.transform = 'scale(0)';
            mobileToggle.style.display = 'none';
            mobilePlayer.style.display = 'none';
            mobilePlayer.classList.remove('show');
            
            // Возвращаем список треков в десктопный плеер
            if (trackListContainer) {
                trackListContainer.classList.remove('mobile-track-list');
            }
        }
    }
    
    // Открытие/закрытие мобильного плеера
    mobileToggle.addEventListener('click', function(event) {
        // Предотвращаем всплытие события
        event.stopPropagation();
        mobilePlayer.classList.add('show');
        mobileToggle.classList.remove('active');
    });
    
    mobileCloseBtn.addEventListener('click', function(event) {
        // Предотвращаем всплытие события
        event.stopPropagation();
        mobilePlayer.classList.remove('show');
    });
    
    // Управление воспроизведением
    mobilePlayBtn.addEventListener('click', function(event) {
        // Предотвращаем всплытие события
        event.stopPropagation();
        
        if (audio.paused) {
            audio.play().then(() => {
                mobilePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                document.getElementById('play-pause-btn').innerHTML = '<i class="fas fa-pause"></i>';
                // Обновляем глобальное состояние
                isPlaying = true;
            }).catch(error => {
                console.error('Ошибка воспроизведения аудио:', error);
            });
        } else {
            audio.pause();
            mobilePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            document.getElementById('play-pause-btn').innerHTML = '<i class="fas fa-play"></i>';
            // Обновляем глобальное состояние
            isPlaying = false;
        }
    });
    
    // Синхронизация состояния воспроизведения с десктопным плеером
    audio.addEventListener('play', function() {
        isPlaying = true;
        mobilePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        mobileToggle.classList.add('active');
    });
    
    audio.addEventListener('pause', function() {
        isPlaying = false;
        mobilePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        mobileToggle.classList.remove('active');
    });
    
    // Обновление прогресс-бара
    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        mobileProgressBar.style.width = progress + '%';
    });
    
    // Управление громкостью
    mobileVolumeSlider.addEventListener('input', function() {
        audio.volume = this.value / 100;
        document.getElementById('volume-slider').value = this.value;
        
        // Изменение иконки громкости
        const volumeIcon = document.querySelector('.mobile-volume i');
        if (this.value == 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (this.value < 50) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    });
    
    // Переключение треков
    mobilePrevBtn.addEventListener('click', function() {
        document.getElementById('prev-track-btn').click();
    });
    
    mobileNextBtn.addEventListener('click', function() {
        document.getElementById('next-track-btn').click();
    });
    
    // Скрываем кнопку списка треков в мобильном плеере
    if (mobileTrackListBtn) {
        mobileTrackListBtn.style.display = 'none';
    }
    
    // Обновление информации о треке
    function updateMobileTrackInfo(title, artist) {
        if (mobileTrackTitle) mobileTrackTitle.textContent = title;
        if (mobileTrackArtist) mobileTrackArtist.textContent = artist;
    }
    
    // Наблюдаем за изменениями в десктопном плеере
    const desktopTrackTitle = document.querySelector('.track-title');
    const desktopTrackArtist = document.querySelector('.track-artist');
    
    if (desktopTrackTitle && desktopTrackArtist && mobileTrackTitle && mobileTrackArtist) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    updateMobileTrackInfo(desktopTrackTitle.textContent, desktopTrackArtist.textContent);
                }
            });
        });
        
        observer.observe(desktopTrackTitle, { characterData: true, childList: true, subtree: true });
        observer.observe(desktopTrackArtist, { characterData: true, childList: true, subtree: true });
        
        // Инициализация с текущими значениями
        updateMobileTrackInfo(desktopTrackTitle.textContent, desktopTrackArtist.textContent);
    }
    
    if (mobileVolumeSlider) {
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            mobileVolumeSlider.value = volumeSlider.value;
        }
    }
}

// Функция для автоматического воспроизведения музыки
function autoPlayMusic() {
    const audio = document.getElementById('background-music');
    if (!audio) return;
    
    // Проверяем, поддерживается ли автоматическое воспроизведение
    let autoplayAllowed = false;
    
    // Функция для воспроизведения с пользовательским взаимодействием
    const playWithUserInteraction = function(event) {
        // Предотвращаем всплытие события для кнопок паузы
        if (event && (event.target.closest('#play-pause-btn') || event.target.closest('#mobile-play-btn'))) {
            return;
        }
        
        if (audio.paused) {
            // Сначала пробуем воспроизвести с отключенным звуком (обход ограничений браузера)
            audio.muted = true;
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Если успешно, включаем звук через небольшую задержку
                    setTimeout(() => {
                        audio.muted = false;
                    }, 100);
                    
                    // Обновляем интерфейс
                    const playPauseBtn = document.getElementById('play-pause-btn');
                    if (playPauseBtn) {
                        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                    
                    const mobilePlayBtn = document.getElementById('mobile-play-btn');
                    if (mobilePlayBtn) {
                        mobilePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                    
                    // Добавляем класс active для мобильной иконки
                    const mobileToggle = document.querySelector('.mobile-player-toggle');
                    if (mobileToggle) {
                        mobileToggle.classList.add('active');
                    }
                    
                    // Обновляем глобальное состояние
                    isPlaying = true;
                    
                    // Удаляем обработчики, так как они больше не нужны
                    document.removeEventListener('click', playWithUserInteraction);
                    document.removeEventListener('touchstart', playWithUserInteraction);
                    document.removeEventListener('keydown', playWithUserInteraction);
                    document.removeEventListener('scroll', playWithUserInteraction);
                    document.removeEventListener('visibilitychange', visibilityChangeHandler);
                    
                    autoplayAllowed = true;
                }).catch(error => {
                    console.error('Ошибка воспроизведения аудио:', error);
                    audio.muted = false; // Возвращаем звук в случае ошибки
                });
            }
        }
    };
    
    // Обработчик изменения видимости страницы
    const visibilityChangeHandler = function() {
        if (!document.hidden && !autoplayAllowed) {
            playWithUserInteraction();
        }
    };
    
    // Добавляем обработчики для различных типов взаимодействия
    document.addEventListener('click', playWithUserInteraction);
    document.addEventListener('touchstart', playWithUserInteraction);
    document.addEventListener('keydown', playWithUserInteraction);
    document.addEventListener('scroll', playWithUserInteraction);
    document.addEventListener('visibilitychange', visibilityChangeHandler);
    
    // Пробуем воспроизвести сразу (для браузеров, которые это разрешают)
    const initialPlayPromise = audio.play();
    
    if (initialPlayPromise !== undefined) {
        initialPlayPromise.then(() => {
            // Если успешно, обновляем интерфейс
            const playPauseBtn = document.getElementById('play-pause-btn');
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            
            const mobilePlayBtn = document.getElementById('mobile-play-btn');
            if (mobilePlayBtn) {
                mobilePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            
            // Добавляем класс active для мобильной иконки
            const mobileToggle = document.querySelector('.mobile-player-toggle');
            if (mobileToggle) {
                mobileToggle.classList.add('active');
            }
            
            autoplayAllowed = true;
            
            // Удаляем обработчики, так как они больше не нужны
            document.removeEventListener('click', playWithUserInteraction);
            document.removeEventListener('touchstart', playWithUserInteraction);
            document.removeEventListener('keydown', playWithUserInteraction);
            document.removeEventListener('scroll', playWithUserInteraction);
            document.removeEventListener('visibilitychange', visibilityChangeHandler);
            
            console.log('Автоматическое воспроизведение успешно');
        }).catch(error => {
            console.log('Автоматическое воспроизведение не удалось, требуется взаимодействие пользователя:', error);
            // Ничего не делаем, так как обработчики уже установлены
        });
    }
}

// Функция для эффекта печатающегося текста с повторением
function initRepeatingTypewriterEffect() {
    const quoteText = document.getElementById('typing-text');
    if (!quoteText) return;
    
    // Массив цитат для ротации
    const quotes = [
        "beyond the stars, I found myself.",
        "in silence, my power grows stronger.",
        "not even time can hold me back."
    ];
    
    let currentQuoteIndex = 0;
    const textContainer = quoteText.parentElement;
    let isErasing = false;
    let charIndex = 0;
    let typingInterval;
    
    // Устанавливаем фиксированную высоту для контейнера текста
    // чтобы избежать "прыжков" страницы при изменении текста
    textContainer.style.height = textContainer.offsetHeight + 'px';
    
    function typeText() {
        clearInterval(typingInterval);
        
        const currentQuote = quotes[currentQuoteIndex];
        
        typingInterval = setInterval(() => {
            if (!isErasing) {
                // Печатаем текст
                charIndex++;
                quoteText.textContent = currentQuote.substring(0, charIndex);
                
                // Если текст напечатан полностью, ждем и начинаем стирать
                if (charIndex >= currentQuote.length) {
                    isErasing = true;
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        typingInterval = setInterval(typeText, 50);
                    }, 3000); // Ждем 3 секунды перед стиранием
                }
            } else {
                // Стираем текст
                charIndex--;
                quoteText.textContent = currentQuote.substring(0, charIndex);
                
                // Если текст полностью стерт, переходим к следующей цитате и начинаем печатать снова
                if (charIndex <= 0) {
                    isErasing = false;
                    // Переключаемся на следующую цитату
                    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        typingInterval = setInterval(typeText, 70);
                    }, 500); // Небольшая пауза перед новым печатанием
                }
            }
        }, isErasing ? 30 : 70); // Стираем быстрее, чем печатаем
    }
    
    // Запускаем эффект печатающегося текста через 1.5 секунды после загрузки
    setTimeout(() => {
        quoteText.textContent = '';
        typeText();
    }, 1500);
}

// Функция инициализации эффекта параллакса
function initParallaxEffect() {
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Параллакс для фона
        const backgroundOverlay = document.querySelector('.background-overlay');
        backgroundOverlay.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(1.1)`;
        
        // Параллакс для элементов карточки
        const profileImg = document.querySelector('.profile-img');
        profileImg.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
        
        // Параллакс для кругов свечения
        const glowCircles = document.querySelectorAll('.glow-circle');
        glowCircles.forEach((circle, index) => {
            const factor = (index + 1) * 5;
            circle.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
        
        // Параллакс для плавающих иконок
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            const factor = (index + 1) * 8;
            icon.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });
}

// Функция инициализации анимации для социальных кнопок
function initSocialButtonsAnimation() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.4,
                y: -8,
                scale: 1.1,
                ease: 'back.out(1.7)'
            });
            
            // Анимация для фона кнопки
            const btnBg = this.querySelector('.btn-bg-hover');
            gsap.to(btnBg, {
                duration: 0.4,
                scale: 1,
                ease: 'power2.out'
            });
            
            // Анимация для иконки
            const icon = this.querySelector('i');
            gsap.to(icon, {
                duration: 0.2,
                scale: 1.2,
                ease: 'back.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.4,
                y: 0,
                scale: 1,
                ease: 'power2.out'
            });
            
            // Анимация для фона кнопки
            const btnBg = this.querySelector('.btn-bg-hover');
            gsap.to(btnBg, {
                duration: 0.4,
                scale: 0,
                ease: 'power2.out'
            });
            
            // Анимация для иконки
            const icon = this.querySelector('i');
            gsap.to(icon, {
                duration: 0.2,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Функция инициализации анимации для изображения профиля
function initProfileImageAnimation() {
    const profileImg = document.getElementById('profile-image');
    
    profileImg.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.5,
            rotation: 5,
            scale: 1.1,
            ease: 'elastic.out(1, 0.3)',
            boxShadow: '0 0 20px rgba(255, 94, 58, 0.7)'
        });
    });
    
    profileImg.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.5,
            rotation: 0,
            scale: 1,
            ease: 'elastic.out(1, 0.3)',
            boxShadow: 'none'
        });
    });
}

// Функция для анимации текстурированного текста
function initTexturedText() {
    const texturedText = document.getElementById('textured-username');
    
    if (!texturedText) return;
    
    // Добавляем анимацию пульсации для текста
    gsap.to(texturedText, {
        textShadow: '0 0 15px rgba(255, 94, 58, 0.8), 0 0 20px rgba(255, 143, 58, 0.5)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
} 