/* TinTuc/tintuc.js */
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // INFINITE SLIDER LOGIC
    // ==========================================
    const sections = document.querySelectorAll('.news-section');
    
    sections.forEach(section => {
        const track = section.querySelector('.news-track');
        const prevBtn = section.querySelector('.prev-btn');
        const nextBtn = section.querySelector('.next-btn');
        if (!track || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        const cards = Array.from(track.querySelectorAll('.news-card'));
        const totalCards = cards.length;
        
        // Calculate how many cards are visible
        const getVisibleCards = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1100) return 2;
            return 3;
        };

        const updateSlider = () => {
            const visibleCards = getVisibleCards();
            const cardWidth = track.offsetWidth / visibleCards;
            const gap = 30; // Matches CSS gap
            
            // Calculate move distance including gap
            const moveDistance = (track.querySelector('.news-card').offsetWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const maxIndex = totalCards - visibleCards;
            
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                // Loop back to start
                currentIndex = 0;
            }
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const maxIndex = totalCards - visibleCards;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                // Loop to end
                currentIndex = maxIndex;
            }
            updateSlider();
        });

        // Handle resize to fix position
        window.addEventListener('resize', updateSlider);
        
        // Initial call
        setTimeout(updateSlider, 100);
    });

    // Reveal animation for news cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.news-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(card);
    });

    // Custom class for reveal
    const style = document.createElement('style');
    style.innerHTML = `
        .news-card.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Make "TIN TỨC" active in the header
    setTimeout(() => {
        const newsNav = document.querySelector('[data-id="news"]');
        if (newsNav) {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(el => el.classList.remove('active'));
            newsNav.classList.add('active');
        }
    }, 150);

    // ==========================================
    // CUSTOM CURSOR LOGIC (Chuyển gốc từ main.js)
    // ==========================================
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let posX = 0, posY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Cập nhật vị trí con trỏ chính ngay lập tức
            if (cursor) {
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            }
            if (follower) {
                // Cập nhật vòng tròn lập tức cùng vị trí với chuột
                follower.style.left = mouseX + 'px';
                follower.style.top = mouseY + 'px';
            }
        });

        // Xử lý hiệu ứng hover phóng to khi lướt lên các nút, link, card tin tức hoặc nút chuyển slide
        const interactiveElements = document.querySelectorAll('a, button, .news-card, .nav-item, .lang-option, .slider-nav');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-active');
                follower.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-active');
                follower.classList.remove('hover-active');
            });
        });
    }
});
