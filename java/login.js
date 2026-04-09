/**
 * ZORENB Luxury Showroom - Authentication Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Google OAuth Initialization

    function initializeGoogleAuth() {
        const googleBtn = document.querySelector('.btn-google');
        if (googleBtn) {
            googleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Google OAuth 2.0 Configuration
                const client_id = "458136981491-aq651vokmf0ecqcs1aaar86nc31o8nii.apps.googleusercontent.com";
                const redirect_uri = "http://127.0.0.1:5500/baitap3.4.html";
                const scope = "openid profile email";
                const response_type = "token id_token";
                
                // Constructing the full Redirect URL
                const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
                                `client_id=${encodeURIComponent(client_id)}&` +
                                `redirect_uri=${encodeURIComponent(redirect_uri)}&` +
                                `response_type=${encodeURIComponent(response_type)}&` +
                                `scope=${encodeURIComponent(scope)}&` +
                                `nonce=12345`; // Simple nonce for demo
                
                // UI Feedback before redirect
                googleBtn.innerHTML = '<span>Chuyển đến Google...</span>';
                googleBtn.style.opacity = '0.7';
                
                // REDIRECT TO GOOGLE
                setTimeout(() => {
                    window.location.href = authUrl;
                }, 500);
            });
        }
    }

    // Initialize when window is loaded or immediately if already ready
    if (document.readyState === 'complete') {
        initializeGoogleAuth();
    } else {
        window.addEventListener('load', initializeGoogleAuth);
    }

    // Select all potential auth forms
    const authForms = [
        { id: 'loginForm', successMsg: 'Đăng nhập thành công!', redirect: 'index.html' },
        { id: 'registerForm', successMsg: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.', redirect: 'login.html' },
        { id: 'forgotPasswordForm', successMsg: 'Liên kết khôi phục đã được gửi tới Email của bạn.', redirect: 'login.html' }
    ];

    authForms.forEach(formData => {
        const form = document.getElementById(formData.id);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const btn = form.querySelector('.btn-login-submit');
                const originalContent = btn.innerHTML;
                
                // Show loading state
                btn.innerHTML = '<span>Đang xử lý...</span>';
                btn.style.opacity = '0.7';
                btn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert(formData.successMsg);
                    window.location.href = formData.redirect;
                }, 2000);
            });
        }
    });

    // Social Login Handlers
    const socialBtns = document.querySelectorAll('.btn-social');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.classList.contains('btn-google') ? 'Google' : 'Facebook';
            btn.innerHTML = `<span>Đang kết nối ${platform}...</span>`;
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Kết nối với ${platform} thành công!`);
                window.location.href = 'index.html';
            }, 1500);
        });
    });

    // Ripple/Magnetic effect for the submit button
    const submitBtns = document.querySelectorAll('.btn-login-submit');
    submitBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            btn.style.setProperty('--x', `${x}px`);
            btn.style.setProperty('--y', `${y}px`);
        });
    });
});
