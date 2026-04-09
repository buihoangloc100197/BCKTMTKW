/**
 * ZORENB Luxury Showroom - Standalone Cursor Logic
 * Adapted from main.js for authentication pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if cursor elements exist, if not, create them
    let cursor = document.querySelector('.cursor');
    let cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
    }

    if (!cursorFollower) {
        cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);
    }

    // Coordinates
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Mouse move listener
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        // Update dot immediately
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Ensure cursor is visible
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    // Animate follower (Lerp motion)
    function animateCursor() {
        followerX += (cursorX - followerX) * 0.15;
        followerY += (cursorY - followerY) * 0.15;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for all interactive elements
    function updateHoverElements() {
        const hoverElements = document.querySelectorAll('a, button, input[type="submit"], .remember-me, .lang-option');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-active');
                cursorFollower.classList.add('hover-active');
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-active');
                cursorFollower.classList.remove('hover-active');
            });
        });
    }

    // Run initially
    updateHoverElements();

    // Handle dynamic elements if any
    const observer = new MutationObserver(updateHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });
});
