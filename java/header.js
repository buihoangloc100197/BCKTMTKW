/**
 * ZORENB Global Header Component
 * Synchronizes the header across all pages.
 */

const globalHeaderHTML = `
    <header class="main-header dynamic-header">
        <!-- Bên trái: Logo và Tên -->
        <div class="header-left">
            <a href="index.html" class="brand-logo">
                <div class="logo-icon">Z</div>
                <span class="brand-name">ZORENB</span>
            </a>
        </div>
        
        <!-- Ở giữa: Thanh Menu -->
        <nav class="header-center">
            <ul class="nav-links">
                <li><a href="index.html" class="nav-item" data-id="home" data-i18n="nav_home">TRANG CHỦ</a></li>
                <li class="nav-item-dropdown">
                    <a href="lamborghini.html" class="nav-item" data-id="collection" data-i18n="nav_collection">BỘ SƯU TẬP</a>
                    <ul class="dropdown-menu">
                        <li><a href="lamborghini.html" class="dropdown-item" data-i18n="coll_lamborghini">Lamborghini</a></li>
                        <li><a href="ferrari.html" class="dropdown-item" data-i18n="coll_ferrari">Ferrari</a></li>
                        <li><a href="mclaren.html" class="dropdown-item" data-i18n="coll_mclaren">McLaren</a></li>
                        <li><a href="bugatti.html" class="dropdown-item" data-i18n="coll_bugatti">Bugatti</a></li>
                        <li><a href="rolls-royce.html" class="dropdown-item" data-i18n="coll_rollsroyce">Rolls Royce</a></li>
                        <li><a href="bentley.html" class="dropdown-item" data-i18n="coll_bentley">Bentley</a></li>
                        <li><a href="porsche.html" class="dropdown-item" data-i18n="coll_porsche">Porsche</a></li>
                    </ul>
                </li>
                <li class="nav-item-dropdown">
                    <a href="DichVu/DichVu.html" class="nav-item" data-id="services" data-i18n="nav_services">DỊCH VỤ</a>
                    <ul class="dropdown-menu">
                        <li><a href="DichVu/rental.html" class="dropdown-item" data-i18n="service_rental">Cho Thuê Xe</a></li>
                        <li><a href="DichVu/maintenance.html" class="dropdown-item" data-i18n="service_maintenance">Bảo Dưỡng</a></li>
                        <li><a href="DichVu/upgrade.html" class="dropdown-item" data-i18n="service_upgrade">Nâng Cấp Ngoại Thất</a></li>
                        <li><a href="DichVu/concierge.html" class="dropdown-item" data-i18n="service_contact">Liên Hệ</a></li>
                    </ul>
                </li>
                <li><a href="TinTuc/tintuc.html" class="nav-item" data-id="news" data-i18n="nav_news">TIN TỨC</a></li>
            </ul>
        </nav>
        
        <!-- Bên phải: Ngôn ngữ / Đăng nhập / Đăng ký -->
        <div class="header-right">
            <!-- Global Language Selector -->
            <div class="language-selector">
                <span class="globe-icon">🌐</span>
                <span class="lang-current-flag"></span>
                <div class="lang-dropdown glass-panel">
                    <a href="javascript:void(0)" class="lang-option" onclick="handleLanguageChange('vi')"><span>🇻🇳</span> Tiếng Việt</a>
                    <a href="javascript:void(0)" class="lang-option" onclick="handleLanguageChange('en')"><span>🇺🇸</span> English</a>
                    <a href="javascript:void(0)" class="lang-option" onclick="handleLanguageChange('fr')"><span>🇫🇷</span> Français</a>
                    <a href="javascript:void(0)" class="lang-option" onclick="handleLanguageChange('ko')"><span>🇰🇷</span> 한국어</a>
                    <a href="javascript:void(0)" class="lang-option" onclick="handleLanguageChange('ja')"><span>🇯🇵</span> 日本語</a>
                    <a href="javascript:void(0)" class="lang-option" onclick="handleLanguageChange('zh')"><span>🇨🇳</span> 简体中文</a>
                </div>
            </div>
            
            <button class="btn btn-login" data-i18n="btn_login" onclick="window.location.href='login.html'">Đăng nhập</button>
            <button class="btn btn-register" data-i18n="btn_register" onclick="window.location.href='register.html'">Đăng ký</button>
        </div>
    </header>
`;

const globalCSKH_HTML = `
    <!-- NÚT CSKH (Jumping Support Button) -->
    <a href="tel:18001909" class="cskh-wrapper bounce-luxury">
        <div class="cskh-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                </path>
            </svg>
        </div>
        <div class="cskh-text">
            <span data-i18n="cskh_label">CSKH:</span>
            <strong>18001909</strong>
        </div>
    </a>
`;

function handleLanguageChange(lang) {
    if (typeof setLanguage === 'function') {
        setLanguage(lang);
    } else {
        console.error('i18n.js not loaded');
    }
}

function initGlobalHeader() {
    const placeholder = document.getElementById('global-header');
    if (placeholder) {
        placeholder.innerHTML = globalHeaderHTML;

        // Highlight active nav item
        syncActiveNav();

        // Inject global CSKH button if missing
        initGlobalCSKH();

        // Final i18n Sync
        if (typeof i18nData !== 'undefined') {
            const savedLang = localStorage.getItem('zorenb_lang') || 'vi';
            // Use setLanguage directly
            if (typeof setLanguage === 'function') {
                setLanguage(savedLang);
            }
        }

        // --- SMART HEADER LOGIC ---
        let lastScrollTop = 0;
        const headerElement = document.querySelector('.main-header');

        const handleScroll = (e) => {
            // Xác định vị trí cuộn: Lấy từ window hoặc từ phần tử đang cuộn (nếu là container nội bộ)
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Nếu sự kiện đến từ một container nội bộ (như Marketplace), lấy scrollTop của nó
            if (e.target !== document && e.target.scrollTop !== undefined) {
                scrollTop = e.target.scrollTop;
            }

            // Đổ nền đậm khi cuộn
            if (scrollTop > 50) {
                if (headerElement) headerElement.classList.add('scrolled');
            } else {
                if (headerElement) headerElement.classList.remove('scrolled');
            }

            // Ẩn hiện thông minh (Hide on scroll down, Show on up)
            // Tăng độ nhạy: Chỉ ẩn khi đã cuộn qua 100px
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                if (headerElement) headerElement.classList.add('header-hidden');
            } else if (scrollTop < lastScrollTop) {
                if (headerElement) headerElement.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop;
        };

        // Lắng nghe ở mức TOÀN CỤC (Capture phase) để "bắt" được cả các sự kiện scroll bên trong Dashboard
        window.addEventListener('scroll', handleScroll, true);

        // Quan trọng: Đăng ký trực tiếp cho các vùng scroll chính của Dashboard/News để đảm bảo nó luôn chạy
        const mainSelectors = ['.marketplace-grid-content', '.marketplace-sidebar', 'main', '.news-track'];
        mainSelectors.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.addEventListener('scroll', handleScroll);
        });
    }
}

function initGlobalCSKH() {
    // Avoid duplication if the button is already in the HTML
    if (document.querySelector('.cskh-wrapper')) return;

    document.body.insertAdjacentHTML('beforeend', globalCSKH_HTML);
}

function syncActiveNav() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');

        if (page === 'index.html' || page === '') {
            if (item.getAttribute('data-id') === 'home') item.classList.add('active');
        } else if (['lamborghini.html', 'ferrari.html', 'bugatti.html', 'mclaren.html', 'porsche.html', 'rolls-royce.html', 'bentley.html'].includes(page)) {
            if (item.getAttribute('data-id') === 'collection') item.classList.add('active');
        }
    });
}

// Run immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalHeader);
} else {
    initGlobalHeader();
}
