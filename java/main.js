document.addEventListener('DOMContentLoaded', () => {
    // 1. CHUỘT TÙY CHỈNH (Luxury Magnetic Cursor)
    // Đã ẩn chuột tùy chỉnh để khôi phục chuột mặc định

    // 2. HIỆU ỨNG KÍCH HOẠT KHI CHUỘT CHỈ VÀO CÁC NÚT BẤM
    // Đã gỡ bỏ hiệu ứng hover để tránh lỗi con trỏ


    // 3. NÚT CHÍNH CÓ TÍNH CHẤT TỪ TÍNH (Magnetic Call-to-action)
    const magneticBtn = document.querySelector('.magnetic-btn');
    if (magneticBtn) {
        magneticBtn.onmousemove = function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        };
        magneticBtn.onmouseleave = function () {
            this.style.transform = `translate(0px, 0px)`;
        };
    }

    // 4. BỘ SƯU TẬP SIÊU XE (ZORENB Vehicle Slider - Multi-language aware)
    function getTranslatedVehicles() {
        const lang = localStorage.getItem('zorenb_lang') || 'vi';
        const d = i18nData[lang];
        return [
            {
                title: d.hero_title_1,
                subtitle: d.hero_subtitle_1,
                image: "image/1.jpg",
                accel: "2.8s",
                speed: "350",
                engine: "V12 Twin-Turbo"
            },
            {
                title: d.hero_title_2,
                subtitle: d.hero_subtitle_2,
                image: "image/2.jpg",
                accel: "2.1s",
                speed: "410",
                engine: "W16 Quad-Turbo"
            },
            {
                title: d.hero_title_3,
                subtitle: d.hero_subtitle_3,
                image: "image/3.jpg",
                accel: "2.5s",
                speed: "380",
                engine: "Hybrid V10 System"
            },
            {
                title: d.hero_title_4,
                subtitle: d.hero_subtitle_4,
                image: "image/1.jpg",
                accel: "3.2s",
                speed: "330",
                engine: d.spec_engine === "Moteur" ? "V8 Biturbo" : d.spec_engine === "엔진" ? "V8 비터보" : "V8 Biturbo"
            }
        ];
    }

    let vehicles = getTranslatedVehicles();

    // Listen for language changes to refresh the slider
    window.addEventListener('languageChanged', (e) => {
        vehicles = getTranslatedVehicles();
        updateVehicle(currentVehicle);
    });

    let currentVehicle = 0;
    const heroSection = document.getElementById('hero-slider');
    const carTitle = document.getElementById('car-title');
    const carSubtitle = document.getElementById('car-subtitle');
    const specAccel = document.getElementById('spec-accel');
    const specSpeed = document.getElementById('spec-speed');
    const specEngine = document.getElementById('spec-engine');

    // --- HIỆU ỨNG GÕ CHỮ (Typewriter Effect) ---
    function typeWriter(element, htmlContent, speed = 30) {
        if (element.typeWriterTimeout) {
            clearTimeout(element.typeWriterTimeout);
            element.typeWriterTimeout = null;
        }
        
        element.innerHTML = ""; // Xóa nội dung cũ
        let i = 0;
        let isTag = false;

        function type() {
            if (i < htmlContent.length) {
                let char = htmlContent.charAt(i);

                if (char === "<") isTag = true;
                if (char === ">") isTag = false;

                element.innerHTML = htmlContent.substring(0, i + 1);
                i++;

                if (isTag) {
                    type(); 
                } else {
                    element.typeWriterTimeout = setTimeout(type, speed);
                }
            }
        }
        type();
    }

    function updateVehicle(index) {
        if (!heroSection) return; // Tránh lỗi crash nếu phần tử không tồn tại
        
        // Thêm class chuyển cảnh
        heroSection.classList.add('hero-switching');

        setTimeout(() => {
            const car = vehicles[index];

            // Cập nhật Background & Featured Image (Dựa trên File Cục Bộ)
            heroSection.style.backgroundImage = `url('${car.image}')`;

            // Cập nhật Content với hiệu ứng gõ chữ
            if (carTitle) typeWriter(carTitle, car.title, 40);
            if (carSubtitle) carSubtitle.innerText = car.subtitle; 

            if (specAccel) specAccel.innerText = car.accel;
            if (specSpeed) specSpeed.innerText = car.speed;
            if (specEngine) specEngine.innerText = car.engine;

            // Xóa class để hiện nội dung mới
            heroSection.classList.remove('hero-switching');
        }, 500);
    }

    function nextCar() {
        if (!heroSection) return;
        currentVehicle = (currentVehicle + 1) % vehicles.length;
        updateVehicle(currentVehicle);
        resetTimer();
    }

    function prevCar() {
        if (!heroSection) return;
        currentVehicle = (currentVehicle - 1 + vehicles.length) % vehicles.length;
        updateVehicle(currentVehicle);
        resetTimer();
    }

    // Lắng nghe sự kiện Nút bấm
    const nextBtn = document.getElementById('next-car');
    const prevBtn = document.getElementById('prev-car');
    if (nextBtn) nextBtn.addEventListener('click', nextCar);
    if (prevBtn) prevBtn.addEventListener('click', prevCar);

    // Gỡ bỏ tính năng đổi xe tự động khi lướt chuột (Scroll) để người dùng có thể kéo màn hình xuống đọc các section dưới.
    
    // =========================================
    // 4.1 SCROLL REVEAL (Hiệu ứng cuộn màn hình)
    // =========================================
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
    // --- LẮNG NGHE BÀN PHÍM VẬT LÝ (< và >) ---
    window.addEventListener('keydown', (e) => {
        // Kiểm tra phím < (comma ,) hoặc ArrowLeft
        if (e.key === "<" || e.key === "," || e.key === "ArrowLeft") {
            prevCar();
        }
        // Kiểm tra phím > (period .) hoặc ArrowRight
        if (e.key === ">" || e.key === "." || e.key === "ArrowRight") {
            nextCar();
        }
    });

    // Tự động chuyển xe sau 10 giây
    let autoPlayTimer = setInterval(nextCar, 10000);

    function resetTimer() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(nextCar, 10000);
    }

    // Khởi tạo xe đầu tiên ngay khi tải trang
    updateVehicle(0);

    // =========================================
    // 5. LOGIC ĐẶT LỊCH LÁI THỬ (Test Drive Booking)
    // =========================================
    const bookingModal = document.getElementById('booking-modal');
    const bookingTriggers = document.querySelectorAll('.btn-booking-trigger');
    const bookingClose = document.getElementById('booking-close');
    const bookingForm = document.getElementById('form-test-drive');
    const bookingFormArea = document.getElementById('booking-form-area');
    const successMsg = document.getElementById('success-msg');
    const carNameInput = document.getElementById('booking-car-name');
    const detailName = document.getElementById('detail-name');

    // Mở Modal
    if (bookingTriggers.length > 0 && bookingModal) {
        bookingTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                bookingModal.classList.add('active');
                
                // Tự động điền tên xe nếu có
                if (detailName && carNameInput) {
                    carNameInput.value = detailName.innerText.trim();
                } else if (!carNameInput.value) {
                    carNameInput.value = "Siêu xe ZORENB";
                }
                
                // Reset form area
                if (bookingFormArea) bookingFormArea.style.display = 'block';
                if (successMsg) successMsg.classList.remove('active');
            });
        });
    }

    // Đóng Modal
    if (bookingClose && bookingModal) {
        bookingClose.addEventListener('click', () => {
            bookingModal.classList.remove('active');
        });

        // Đóng khi click ra ngoài
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
            }
        });
    }

    // Xử lý gửi Form
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hiệu ứng giả lập gửi dữ liệu
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            submitBtn.innerText = "ĐANG GỬI...";
            submitBtn.disabled = true;

            setTimeout(() => {
                if (bookingFormArea) bookingFormArea.style.display = 'none';
                if (successMsg) successMsg.classList.add('active');
                submitBtn.innerText = "GỬI YÊU CẦU LÁI THỬ";
                submitBtn.disabled = false;
                bookingForm.reset();
            }, 1500);
        });
    }
});
