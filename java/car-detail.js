document.addEventListener('DOMContentLoaded', () => {
    // 1. GET VEHICLE ID FROM URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));

    // 2. FIND CAR DATA
    // 'vehicles' is available globally from data.js
    const car = vehicles.find(v => v.id === carId);

    if (!car) {
        alert("Không tìm thấy siêu xe yêu cầu. Quay lại trang chủ.");
        window.location.href = "index.html";
        return;
    }

    // 3. POPULATE UI
    function populateUI() {
        const lang = localStorage.getItem('zorenb_lang') || 'vi';
        const d = i18nData[lang];

        document.title = `${car.brand} ${car.name} - ZORENB Collection`;

        // Hero Section
        const heroBg = document.getElementById('hero-bg');
        if (heroBg) {
            heroBg.style.backgroundImage = `url('${car.image}')`;
        }

        document.getElementById('detail-brand').innerText = car.brand;
        document.getElementById('detail-name').innerText = car.name;
        
        // Handle description translation
        let description = car.description;
        if (lang !== 'vi') {
            description = `${car.brand} ${car.name} is a high-performance luxury automobile, engineered for excellence and crafted for the most discerning enthusiasts. (Full description in Vietnamese available).`;
        }
        document.getElementById('detail-desc').innerText = description;

        // Specs Grid
        document.getElementById('spec-engine').innerText = car.specs.engine;
        document.getElementById('spec-accel').innerText = car.specs.accel;
        document.getElementById('spec-max').innerText = car.specs.maxSpeed;
        document.getElementById('spec-power').innerText = car.specs.power;
        document.getElementById('spec-weight').innerText = car.specs.weight;
        
        document.getElementById('spec-price').innerText = new Intl.NumberFormat('vi-VN', {
            style: 'currency', currency: 'VND'
        }).format(car.price);

        // Related Cars
        renderRelated();
    }

    populateUI();

    // Listen for language changes
    window.addEventListener('languageChanged', populateUI);

    // Gallery
    const interiorImg = document.getElementById('interior-img');
    if (car.interior) {
        interiorImg.src = car.interior;
        document.getElementById('thumb-1').src = car.image; // Use exterior as thumb
        document.getElementById('thumb-2').src = car.interior;
    }

    // Dynamic Navigation Link
    const navCollectionLink = document.getElementById('nav-collection-link');
    if (navCollectionLink) {
        navCollectionLink.href = `${car.brand.toLowerCase()}.html`;
    }

    // 4. RENDER RELATED CARS
    const relatedContainer = document.getElementById('related-cars');
    if (relatedContainer) {
        const related = vehicles
            .filter(v => (v.brand === car.brand || v.type === car.type) && v.id !== car.id)
            .slice(0, 3);

        if (related.length > 0) {
            relatedContainer.innerHTML = related.map(v => createRelatedCard(v)).join('');
        }
    }

    function createRelatedCard(v) {
        const lang = localStorage.getItem('zorenb_lang') || 'vi';
        const d = i18nData[lang];
        const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v.price);
        return `
            <div class="car-card glass-panel fade-in">
                <div class="card-image-wrap">
                    <img src="${v.image}" class="card-img">
                </div>
                <div class="card-name">${v.name}</div>
                <div class="card-footer">
                    <div style="font-family: inherit; font-size: 0.9rem; color: var(--color-accent-gold);">${price}</div>
                    <a href="car-detail.html?id=${v.id}" class="btn-card" style="padding: 0.4rem 0.8rem; font-size: 0.7rem;" data-i18n="btn_detail">${d.btn_detail}</a>
                </div>
            </div>
        `;
    }
});
