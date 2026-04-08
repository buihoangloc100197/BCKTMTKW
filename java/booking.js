document.addEventListener('DOMContentLoaded', () => {
    // 1. GET VEHICLE ID FROM URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));

    // 2. FIND CAR DATA
    // 'vehicles' is available globally from data.js
    const car = vehicles.find(v => v.id === carId);

    if (!car) {
        alert("Thông tin siêu xe không hợp lệ. Quay lại trang chủ.");
        window.location.href = "index.html";
        return;
    }

    // 3. POPULATE PAGE CONTENT
    const pageBg = document.getElementById('page-bg');
    const carNameTitle = document.getElementById('car-display-name');
    
    if (pageBg) {
        // Use interior for background if available for a more immersive feel
        pageBg.style.backgroundImage = `url('${car.interior || car.image}')`;
    }
    
    if (carNameTitle) {
        carNameTitle.innerText = `${car.brand} ${car.name}`;
    }

    // 4. FORM SUBMISSION LOGIC
    const bookingForm = document.getElementById('booking-form');
    const successState = document.getElementById('success-state');
    const btnSubmit = document.getElementById('btn-submit');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Premium submit animation
            const originalText = btnSubmit.innerText;
            btnSubmit.innerHTML = `<span class="spinner" style="display:inline-block; animation: spin 1s linear infinite;">↻</span> ĐANG XỬ LÝ...`;
            btnSubmit.disabled = true;

            // Simulate server request
            setTimeout(() => {
                // Smooth state transition
                bookingForm.style.opacity = '0';
                setTimeout(() => {
                    bookingForm.style.display = 'none';
                    if (successState) {
                        successState.style.display = 'block';
                        successState.style.opacity = '0';
                        setTimeout(() => {
                            successState.style.opacity = '1';
                            successState.style.transition = 'opacity 0.8s ease';
                        }, 50);
                    }
                    
                    // Cleanup page elements for focus
                    const header = document.querySelector('.booking-header');
                    if (header) header.style.display = 'none';
                    
                    // Trigger confetti-like effect or similar if needed (optional)
                    console.log(`ZORENB: Lead captured for ${car.brand} ${car.name}`);
                }, 400);
            }, 1800);
        });
    }
});

// Simple spin animation for the loader
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
