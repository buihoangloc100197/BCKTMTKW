/**
 * ZORENB Services Page Logic
 * Handles interactive elements and link correction for the subdirectory.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. CHỈNH SỬA TRẠNG THÁI HEADER (Header State Correction)
    // Vì trang đã được đưa ra thư mục gốc, ta không cần thêm '../' vào link nữa.
    const fixHeaderLinks = () => {
        const header = document.querySelector('.main-header');
        if (!header) {
            setTimeout(fixHeaderLinks, 100);
            return;
        }

        // Logo Link stays at root
        const logoLink = header.querySelector('.brand-logo');
        if (logoLink) logoLink.setAttribute('href', 'index.html');

        // Nav Links stay at root
        const navLinks = header.querySelectorAll('.nav-item, .dropdown-item');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('http') && !href.startsWith('javascript')) {
                // Remove '../' if it was hardcoded or just keep as is
                link.setAttribute('href', href);
            }
        });

        // Fix Active State
        header.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-id') === 'services') {
                item.classList.add('active');
            }
        });
    };

    fixHeaderLinks();

    // 2. HIỆU ỨNG CUỘN (Scroll Reveal) CHO CÁC THẺ DỊCH VỤ
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Thêm delay dựa trên index để tạo hiệu ứng so le (staggered)
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        serviceObserver.observe(card);
    });

    // 3. HIỆU ỨNG NÚT TỪ TÍNH (Magnetic Button) - Re-implementation for local buttons
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 4. SMART HEADER & BACK BUTTON (Hide on Scroll Down, Show on Scroll Up)
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    const backBtn = document.querySelector('.back-link-btn');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling Down
            if (header) header.classList.add('header-hidden');
            if (backBtn) backBtn.classList.add('header-hidden');
        } else {
            // Scrolling Up
            if (header) header.classList.remove('header-hidden');
            if (backBtn) backBtn.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop;
    });

    // 5. MAINTENANCE PACKAGE SELECTION (Visual Cards)
    const packageCards = document.querySelectorAll('.package-card');
    const selectedInput = document.getElementById('selected-package-input');

    if (packageCards.length > 0 && selectedInput) {
        packageCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected class from all
                packageCards.forEach(c => c.classList.remove('selected'));
                
                // Add to clicked card
                card.classList.add('selected');
                
                // Update hidden input value
                const packageName = card.getAttribute('data-package');
                selectedInput.value = packageName;
                
                console.log(`Package selected: ${packageName}`);
            });
        });
    }
});
