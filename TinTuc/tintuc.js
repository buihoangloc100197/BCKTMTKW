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

        // Calculate how many cards are visible
        const getVisibleCards = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1100) return 2;
            return 3;
        };

        let isAnimating = false;

        nextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            
            const gap = 30; // Matches CSS gap
            const moveDistance = track.querySelector('.news-card').offsetWidth + gap;
            
            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            track.style.transform = `translateX(-${moveDistance}px)`;
            
            setTimeout(() => {
                track.style.transition = 'none';
                track.appendChild(track.firstElementChild);
                track.style.transform = 'translateX(0)';
                
                // Đợi một chút để browser kịp render
                setTimeout(() => {
                    isAnimating = false;
                }, 50);
            }, 600); // 600ms match với transition
        });

        prevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            
            const gap = 30; // Matches CSS gap
            const moveDistance = track.querySelector('.news-card').offsetWidth + gap;
            
            // Đưa thẳng phần tử cuối lên đầu và dịch track sang trái mà không dùng effect
            track.style.transition = 'none';
            track.prepend(track.lastElementChild);
            track.style.transform = `translateX(-${moveDistance}px)`;
            
            // Sau một frame, kích hoạt hiệu ứng mượt mà để chạy về 0 (chạy về bên phải)
            setTimeout(() => {
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                track.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    isAnimating = false;
                }, 600);
            }, 50);
        });

        // Khi resize màn hình, căn lại vị trí gốc
        window.addEventListener('resize', () => {
            if (!isAnimating) {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
            }
        });
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
