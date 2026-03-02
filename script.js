// Переключение секций
function showSection(sectionId) {
    // Скрыть все секции
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Показать выбранную секцию
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Обновить активный пункт меню
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });

    // Закрыть мобильное меню
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth <= 1024) {
        sidebar.classList.remove('active');
    }

    // Скролл к верхней части страницы
    window.scrollTo(0, 0);
}

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        // Закрыть меню при клике на ссылку
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                }
            });
        });
    }

    // Закрыть меню при клике вне его
    document.addEventListener('click', function(event) {
        if (sidebar && mobileMenuBtn && !sidebar.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Активная ссылка в меню при скролле
    window.addEventListener('scroll', updateActiveLink);
});

// Обновление активной ссылки
function updateActiveLink() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        const section = item.getAttribute('data-section');
        if (section === current) {
            item.classList.add('active');
        }
    });
}

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const targetId = href.substring(1);
            showSection(targetId);
        }
    });
});

// Показать главную страницу при загрузке
window.addEventListener('load', function() {
    showSection('home');
});

// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.content-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Закрыть мобильное меню при изменении размера окна
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 1024 && sidebar) {
        sidebar.classList.remove('active');
    }
});
