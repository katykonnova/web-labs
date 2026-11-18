/* =========================================================
   Живые анимации и интерактив
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    /* ---------------------------------------------------------
       1. Ripple-эффект при клике на кнопки
       --------------------------------------------------------- */
    const rippleButtons = document.querySelectorAll('.cta-button, .card-btn');

    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    /* ---------------------------------------------------------
       2. Магнитная главная CTA (только на десктопе)
       --------------------------------------------------------- */
    if (!isTouchDevice && !prefersReducedMotion) {
        const magneticBtn = document.querySelector('.cta-button');

        if (magneticBtn) {
            magneticBtn.addEventListener('mousemove', (e) => {
                const rect = magneticBtn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                magneticBtn.style.transform =
                    `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.05)`;
            });

            magneticBtn.addEventListener('mouseleave', () => {
                magneticBtn.style.transform = '';
            });
        }
    }

    /* ---------------------------------------------------------
       3. Staggered pop-in для карточек (если ещё не в CSS)
          + подстраховка для браузеров без анимации
       --------------------------------------------------------- */
    const animatedCards = document.querySelectorAll('.tech-card, .preview-card');
    animatedCards.forEach((card, i) => {
        card.style.animationDelay = (0.05 * i) + 's';
    });

});