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

        // Gallery Population
        const interiorImg = document.getElementById('interior-img');
        if (car.gallery && car.gallery.length >= 4) {
            if (interiorImg) interiorImg.src = car.gallery[1]; // Default to interior
            for (let i = 1; i <= 4; i++) {
                const thumb = document.getElementById(`thumb-${i}`);
                if (thumb) {
                    thumb.src = car.gallery[i - 1];
                    thumb.style.display = 'block'; // Ensure visible
                }
            }
        } else if (car.interior) {
            if (interiorImg) interiorImg.src = car.interior;
            const t1 = document.getElementById('thumb-1');
            const t2 = document.getElementById('thumb-2');
            const t3 = document.getElementById('thumb-3');
            const t4 = document.getElementById('thumb-4');
            
            if (t1) { t1.src = car.image; t1.style.display = 'block'; }
            if (t2) { t2.src = car.interior; t2.style.display = 'block'; }
            if (t3) t3.style.display = 'none';
            if (t4) t4.style.display = 'none';
        }

        // Dynamic Booking & Purchase Links
        const bookingLink = document.getElementById('btn-booking-link');
        const purchaseLink = document.getElementById('btn-purchase-link');
        if (bookingLink) bookingLink.href = `booking.html?id=${carId}`;
        if (purchaseLink) purchaseLink.href = `purchase.html?id=${carId}`;

        // Dynamic Navigation Link
        const navCollectionLink = document.getElementById('nav-collection-link');
        if (navCollectionLink) {
            navCollectionLink.href = `${car.brand.toLowerCase()}.html`;
        }

        // Related Cars
        renderRelated();
    }

    // --- INITIALIZE & LISTENERS ---
    populateUI();
    window.addEventListener('languageChanged', populateUI);

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
    // 5. CIRCULAR NAVIGATION LOGIC
    const featuredCars = [1, 19, 10]; // IDs from index.html grid (Lamborghini, Bugatti, Ferrari)
    const currentIndex = featuredCars.indexOf(carId);

    const prevBtn = document.getElementById('nav-prev');
    const nextBtn = document.getElementById('nav-next');

    if (currentIndex !== -1 && prevBtn && nextBtn) {
        // Calculate Prev Index (Circular)
        const prevIndex = (currentIndex - 1 + featuredCars.length) % featuredCars.length;
        const prevId = featuredCars[prevIndex];
        prevBtn.href = `car-detail.html?id=${prevId}`;

        // Calculate Next Index (Circular)
        const nextIndex = (currentIndex + 1) % featuredCars.length;
        const nextId = featuredCars[nextIndex];
        nextBtn.href = `car-detail.html?id=${nextId}`;
    } else {
        // If car is not in the featured list, hide navigation or link to first/last
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
});
