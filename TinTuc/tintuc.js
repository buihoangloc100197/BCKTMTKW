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
        let clickQueue = 0;

        const processQueue = () => {
            if (clickQueue === 0) {
                isAnimating = false;
                return;
            }
            
            isAnimating = true;
            const isNext = clickQueue > 0;
            
            const gap = 30; // Matches CSS gap
            const moveDistance = track.querySelector('.news-card').offsetWidth + gap;

            if (isNext) {
                clickQueue--;
                track.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
                track.style.transform = `translateX(-${moveDistance}px)`;

                setTimeout(() => {
                    track.style.transition = 'none';
                    track.appendChild(track.firstElementChild);
                    track.style.transform = 'translateX(0)';

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            processQueue();
                        });
                    });
                }, 200);
            } else {
                clickQueue++;
                track.style.transition = 'none';
                track.prepend(track.lastElementChild);
                track.style.transform = `translateX(-${moveDistance}px)`;

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        track.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)';
                        track.style.transform = 'translateX(0)';

                        setTimeout(() => {
                            processQueue();
                        }, 200);
                    });
                });
            }
        };

        nextBtn.addEventListener('click', () => {
            clickQueue++;
            if (!isAnimating) processQueue();
        });

        prevBtn.addEventListener('click', () => {
            clickQueue--;
            if (!isAnimating) processQueue();
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
        const interactiveElements = document.querySelectorAll('a, button, .news-card, .nav-item, .lang-option, .slider-nav, #closeNewsModal');
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

    // ==========================================
    // MODAL LOGIC
    // ==========================================
    const modal = document.getElementById('newsModal');
    const closeBtn = document.getElementById('closeNewsModal');
    const modalOverlay = document.querySelector('.news-modal-overlay');

    const modalBadge = document.getElementById('modalBadge');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalBody = document.getElementById('modalBody');

    if (modal && closeBtn && modalOverlay) {
        const openModal = (newsId) => {
            if (!window.newsData || !window.newsData[newsId]) return;

            const data = window.newsData[newsId];

            // Populate data
            modalBadge.textContent = data.badge;
            modalDate.textContent = data.date;
            modalTitle.textContent = data.title;
            modalImage.src = data.image;
            modalBody.innerHTML = data.content;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Make cards clickable
        document.querySelectorAll('.news-card').forEach(card => {
            card.style.cursor = 'none'; // Vì đang dùng custom cursor
            card.addEventListener('click', function () {
                const newsId = this.getAttribute('data-news-id');
                if (newsId) {
                    openModal(newsId);
                }
            });
        });
    }
});

