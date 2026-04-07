/* TinTuc/tintuc.js */
document.addEventListener("DOMContentLoaded", () => {
    // Reveal animation for news cards on scroll
    const cards = document.querySelectorAll('.news-card');
    
    // Intersection Observer to trigger animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });

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
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        function loop() {
            // follower chạy theo từ từ (easing)
            posX += (mouseX - posX) * 0.15;
            posY += (mouseY - posY) * 0.15;
            
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
            
            requestAnimationFrame(loop);
        }
        loop();

        // Xử lý hiệu ứng hover phóng to khi lướt lên các nút, link hoặc card tin tức
        const interactiveElements = document.querySelectorAll('a, button, .news-card, .nav-item, .lang-option');
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
