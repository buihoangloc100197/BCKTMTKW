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
                    <a href="#" class="nav-item" data-id="collection" data-i18n="nav_collection">BỘ SƯU TẬP</a>
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
                    <a href="#" class="nav-item" data-id="services" data-i18n="nav_services">DỊCH VỤ</a>
                    <ul class="dropdown-menu">
                        <li><a href="#" class="dropdown-item" data-i18n="service_rental">Cho Thuê Xe</a></li>
                        <li><a href="#" class="dropdown-item" data-i18n="service_maintenance">Bảo Dưỡng</a></li>
                        <li><a href="#" class="dropdown-item" data-i18n="service_upgrade">Nâng Cấp Ngoại Thất</a></li>
                    </ul>
                </li>
                <li><a href="#" class="nav-item" data-id="news" data-i18n="nav_news">TIN TỨC</a></li>
                <li><a href="#" class="nav-item" data-id="contact" data-i18n="nav_contact">LIÊN HỆ</a></li>
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
            
            <button class="btn btn-login" data-i18n="btn_login">Đăng nhập</button>
            <button class="btn btn-register" data-i18n="btn_register">Đăng ký</button>
        </div>
    </header>
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
        
        // Final i18n Sync
        if (typeof i18nData !== 'undefined') {
            const savedLang = localStorage.getItem('zorenb_lang') || 'vi';
            // Use setLanguage directly
            if (typeof setLanguage === 'function') {
                setLanguage(savedLang);
            }
        }
    }
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
