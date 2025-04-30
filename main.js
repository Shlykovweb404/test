 // Бургер-меню
 document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('nav ul');
    
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Блокировка скролла при открытом меню
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие меню при клике на пункт (для мобильных)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                burgerMenu.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

// Слайдер продуктов
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    
    // Дублируем слайды для бесшовной анимации
    const slidesHtml = track.innerHTML;
    track.innerHTML = slidesHtml + slidesHtml;
    
    // Пауза при наведении
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});

// Слайдер отзывов
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('reviewsContainer');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    const cardWidth = document.querySelector('.review-card').offsetWidth;
    
    // Функция обновления слайдера
    function updateSlider() {
        container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Клик по точкам навигации
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateSlider();
        });
    });
    
    // Автопрокрутка (опционально)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        updateSlider();
    }, 5000);
    
    // Обработка формы (можно заменить на реальную отправку)
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за ваш отзыв! После модерации он появится на сайте.');
        this.reset();
    });
});

// FAQ аккордеон
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все открытые элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий элемент
            item.classList.toggle('active');
        });
    });
});

// Добавьте этот скрипт для работы секции отзывов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера
    const slider = document.querySelector('.reviews-slider');
    const cards = document.querySelectorAll('.review-card');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    // Создаем точки навигации
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            scrollToCard(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Прокрутка к определенной карточке
    function scrollToCard(index) {
        const card = cards[index];
        slider.scrollTo({
            left: card.offsetLeft - slider.offsetLeft,
            behavior: 'smooth'
        });
        updateDots(index);
    }
    
    // Обновление активной точки
    function updateDots(activeIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Кнопки навигации
    prevBtn.addEventListener('click', () => {
        const currentIndex = [...dots].findIndex(dot => dot.classList.contains('active'));
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        scrollToCard(prevIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        const currentIndex = [...dots].findIndex(dot => dot.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % cards.length;
        scrollToCard(nextIndex);
    });
    
    // Рейтинг звездами
    const stars = document.querySelectorAll('.rating-stars .star');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingInput.value = value;
            
            stars.forEach((s, index) => {
                s.classList.toggle('active', index < value);
            });
        });
    });
    
    // Отображение выбранных файлов
    const fileInput = document.getElementById('reviewPhotos');
    const fileInfo = document.querySelector('.file-info');
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const filesCount = fileInput.files.length > 3 ? 3 : fileInput.files.length;
            fileInfo.textContent = `${filesCount} файл(ов) выбрано`;
        } else {
            fileInfo.textContent = 'Файлы не выбраны';
        }
    });
    
    // Обработка формы
    const reviewForm = document.getElementById('reviewForm');
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить AJAX отправку формы
        alert('Спасибо за ваш отзыв! После модерации он появится на сайте.');
        reviewForm.reset();
        stars.forEach(star => star.classList.remove('active'));
        ratingInput.value = 0;
        fileInfo.textContent = 'Файлы не выбраны';
    });
});











// Фильтрация галереи
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Слайдер отзывов
    const slider = document.querySelector('.testimonials-slider');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function updateSlider() {
        const cardWidth = testimonialCards[0].offsetWidth + 30; // + margin-right
        slider.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }
    
    prevArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextArrow.addEventListener('click', function() {
        if (currentIndex < testimonialCards.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Автоматическое прокручивание слайдера
    let autoSlide = setInterval(() => {
        if (currentIndex < testimonialCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);
    
    // Остановка авто-прокрутки при наведении
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            if (currentIndex < testimonialCards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
    });
});
