document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA SOURCE (Loaded from data.js)
    // vehicles array is now global from data.js

    // 2. DOM ELEMENTS
    const carGrid = document.getElementById('car-grid');
    const searchInput = document.getElementById('search-input');
    const carCountTxt = document.getElementById('car-count');
    const priceSlider = document.getElementById('price-slider');

    const compareBar = document.getElementById('compare-bar');
    const compareCountTxt = document.getElementById('compare-count');
    const selectedThumbs = document.getElementById('selected-thumbs');
    const btnCompareNow = document.getElementById('btn-compare-now');
    const btnClearCompare = document.getElementById('btn-clear-compare');

    const compareModal = document.getElementById('compare-modal');
    const modalClose = document.getElementById('modal-close');
    const comparisonTable = document.getElementById('comparison-table');

    let selectedCars = [];

    // 3. HÀM TẠO THẺ SIÊU XE (Updated with Buy Now button)
    function createCarCard(car) {
        const lang = localStorage.getItem('zorenb_lang') || 'vi';
        const d = i18nData[lang];
        
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency', currency: 'VND'
        }).format(car.price);

        const isChecked = selectedCars.some(c => c.id === car.id) ? 'checked' : '';

        return `
            <div class="car-card glass-panel fade-in">
                <div class="card-image-wrap">
                    <img src="${car.image}" alt="${car.name}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80'">
                    <div class="card-hover-specs">
                        <div class="spec-item">
                            <span class="spec-label" data-i18n="spec_engine">${d.spec_engine || "Động Cơ"}</span>
                            <span class="spec-val">${car.specs.engine}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label" data-i18n="spec_power">${d.spec_power || "Công Suất"}</span>
                            <span class="spec-val">${car.specs.power}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label" data-i18n="spec_accel">${d.spec_accel || "0-100 km/h"}</span>
                            <span class="spec-val">${car.specs.accel}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label" data-i18n="spec_speed">${d.spec_speed || "Max Speed"}</span>
                            <span class="spec-val">${car.specs.maxSpeed}</span>
                        </div>
                    </div>
                </div>
                <div class="card-header">
                    <div class="header-info">
                        <span class="card-brand">${car.brand}</span>
                        <div class="card-type">${car.type}</div>
                    </div>
                    <div class="bookmark">🔖</div>
                </div>
                <div class="card-name">${car.name}</div>
                <div class="card-badges">
                    ${car.badges.map(b => `<span class="badge-tag">${b}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <div class="card-price">${formattedPrice}</div>
                    <div class="card-actions">
                        <a href="car-detail.html?id=${car.id}" class="btn-card" data-i18n="btn_detail">${d.btn_detail}</a>
                        <button class="btn-buy" data-i18n="btn_buy" onclick="alert('Order request for ${car.name} sent to ZORENB VIP consultant.')">${d.btn_buy}</button>
                    </div>
                </div>
                <div class="card-footer-booking" style="padding: 0 1.5rem 1.5rem;">
                    <button class="btn-booking-trigger btn-submit-booking" style="font-size: 0.7rem; padding: 0.5rem; letter-spacing: 2px;" onclick="document.getElementById('booking-car-name').value='${car.name}';" data-i18n="btn_test_drive">${d.btn_test_drive}</button>
                </div>
                <label class="compare-toggle">
                    <input type="checkbox" class="compare-checkbox" data-id="${car.id}" ${isChecked}>
                    <span data-i18n="btn_compare">${d.btn_compare}</span>
                </label>
            </div>
        `;
    }

    // 4. LOGIC SO SÁNH (Comparison Logic)
    function handleCompareChange(e) {
        const carId = parseInt(e.target.getAttribute('data-id'));
        const car = vehicles.find(v => v.id === carId);

        if (e.target.checked) {
            if (selectedCars.length >= 2) {
                e.target.checked = false;
                alert("Bạn chỉ có thể chọn tối đa 2 xe để so sánh.");
                return;
            }
            selectedCars.push(car);
        } else {
            selectedCars = selectedCars.filter(v => v.id !== carId);
        }

        updateCompareBar();
    }

    function updateCompareBar() {
        if (selectedCars.length > 0) {
            compareBar.classList.add('active');
            compareCountTxt.innerText = selectedCars.length;
            
            // Update thumbs
            selectedThumbs.innerHTML = selectedCars.map(car => 
                `<img src="${car.image}" class="thumb-item" alt="thumb">`
            ).join('');

            btnCompareNow.disabled = selectedCars.length !== 2;
        } else {
            compareBar.classList.remove('active');
        }
    }

    function renderComparison() {
        if (selectedCars.length !== 2) return;
        const carA = selectedCars[0];
        const carB = selectedCars[1];
        
        const lang = localStorage.getItem('zorenb_lang') || 'vi';
        const d = i18nData[lang];

        const formattedPriceA = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(carA.price);
        const formattedPriceB = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(carB.price);

        comparisonTable.innerHTML = `
            <div class="comparison-grid">
                <div class="comp-header-car">
                    <div class="brand-badge">${carA.brand}</div>
                    <div class="comp-car-name">${carA.name}</div>
                    <div class="comp-img-wrap"><img src="${carA.image}" class="comp-img"></div>
                </div>
                <div></div>
                <div class="comp-header-car">
                    <div class="brand-badge">${carB.brand}</div>
                    <div class="comp-car-name">${carB.name}</div>
                    <div class="comp-img-wrap"><img src="${carB.image}" class="comp-img"></div>
                </div>

                ${renderSpecRow(d.spec_engine, carA.specs.engine, carB.specs.engine)}
                ${renderSpecRow(d.spec_accel, carA.specs.accel, carB.specs.accel)}
                ${renderSpecRow(d.spec_speed, carA.specs.maxSpeed, carB.specs.maxSpeed)}
                ${renderSpecRow(d.spec_power, carA.specs.power, carB.specs.power)}
                ${renderSpecRow(d.filter_type, carA.type, carB.type)}
                ${renderSpecRow(d.spec_price, formattedPriceA, formattedPriceB)}
            </div>
        `;

        compareModal.classList.add('active');
    }

    function renderSpecRow(label, valueA, valueB) {
        return `
            <div class="comp-row">
                <div class="comp-value left">${valueA}</div>
                <div class="comp-label">${label}</div>
                <div class="comp-value right">${valueB}</div>
            </div>
        `;
    }

    // 5. HÀM RENDER GRID
    function renderGrid(cars) {
        carGrid.innerHTML = cars.map(car => createCarCard(car)).join('');
        carCountTxt.innerText = cars.length;

        const checkboxes = document.querySelectorAll('.compare-checkbox');
        checkboxes.forEach(cb => cb.addEventListener('change', handleCompareChange));
    }

    // 6. EVENT LISTENERS
    if (searchInput) searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        let filtered = vehicles.filter(v => v.name.toLowerCase().includes(query) || v.brand.toLowerCase().includes(query));
        
        const currentBrand = document.body.dataset.brand;
        if (currentBrand) {
            filtered = filtered.filter(v => v.brand.toLowerCase() === currentBrand.toLowerCase());
        }
        renderGrid(filtered);
    });

    if (priceSlider) priceSlider.addEventListener('input', () => {
        const maxPrice = parseInt(priceSlider.value);
        let filtered = vehicles.filter(v => v.price <= maxPrice);
        
        const currentBrand = document.body.dataset.brand;
        if (currentBrand) {
            filtered = filtered.filter(v => v.brand.toLowerCase() === currentBrand.toLowerCase());
        }
        renderGrid(filtered);
    });

    btnCompareNow.addEventListener('click', renderComparison);
    modalClose.addEventListener('click', () => compareModal.classList.remove('active'));
    btnClearCompare.addEventListener('click', () => {
        selectedCars = [];
        updateCompareBar();
        const currentBrand = document.body.dataset.brand;
        if (currentBrand) {
            renderGrid(vehicles.filter(v => v.brand.toLowerCase() === currentBrand.toLowerCase()));
        } else {
            renderGrid(vehicles);
        }
    });

    // 7. KHỞI TẠO (Multi-Page Logic)
    const currentBrand = document.body.dataset.brand;
    
    // Listen for language changes to re-render grid
    window.addEventListener('languageChanged', (e) => {
        const brand = document.body.dataset.brand;
        if (brand) {
            renderGrid(vehicles.filter(v => v.brand.toLowerCase() === brand.toLowerCase()));
        } else {
            renderGrid(vehicles);
        }
    });

    if (currentBrand) {
        const filteredVehicles = vehicles.filter(v => v.brand.toLowerCase() === currentBrand.toLowerCase());
        renderGrid(filteredVehicles);
    } else {
        renderGrid(vehicles);
    }
});
