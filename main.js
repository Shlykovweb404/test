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