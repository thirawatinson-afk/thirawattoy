// ======================= //
// HERO IMAGE SLIDESHOW
// ======================= //
document.addEventListener('DOMContentLoaded', () => {

    // รองรับกรณีมีหลายสไลด์โชว์ในหน้าเดียว (querySelectorAll ทุก wrapper)
    const wrappers = document.querySelectorAll('.hero-image-wrapper');

    wrappers.forEach((wrapper) => {
        const slides = wrapper.querySelectorAll('.hero-image-slide');
        const prevBtn = wrapper.querySelector('.hero-arrow-left');
        const nextBtn = wrapper.querySelector('.hero-arrow-right');

        if (slides.length === 0) return;

        let current = 0;
        let autoplayTimer = null;
        const AUTOPLAY_DELAY = 4000; // 4 วินาทีต่อรูป

        // ===== โชว์สไลด์ตาม index ที่ระบุ =====
        function showSlide(index) {
            // ลบ active ออกจากทุกสไลด์ก่อน
            slides.forEach((slide) => slide.classList.remove('active'));

            // ใช้ modulo วนกลับไปรูปแรกเมื่อเกินรูปสุดท้าย (หรือติดลบ)
            current = (index + slides.length) % slides.length;

            slides[current].classList.add('active');
        }

        function nextSlide() {
            showSlide(current + 1);
        }

        function prevSlide() {
            showSlide(current - 1);
        }

        // ===== ระบบเลื่อนอัตโนมัติ =====
        function startAutoplay() { 
            autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }

        // เริ่มต้นที่รูปแรก แล้วเปิด autoplay
        showSlide(0);
        startAutoplay();

        // ===== ปุ่มเลื่อนซ้าย/ขวา =====
        // เมื่อกดปุ่ม ให้รีเซ็ตตัวจับเวลาใหม่ (ไม่ให้สไลด์กระโดดซ้อนกัน)
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
                startAutoplay();
            });
        }

        // ===== หยุดเลื่อนอัตโนมัติตอนเอาเมาส์ไปวางบนสไลด์ =====
        wrapper.addEventListener('mouseenter', stopAutoplay);
        wrapper.addEventListener('mouseleave', startAutoplay);
    });

});
