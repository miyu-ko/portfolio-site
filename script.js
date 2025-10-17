document.addEventListener('DOMContentLoaded', function () {

    // --- 1. ヘッダー画像のクロスフェード処理 ---
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    // 最初に1枚目の画像を表示
    if (heroImages.length > 0) {
        heroImages[currentImageIndex].classList.add('active');
    }

    // 5秒ごとに画像を切り替え
    setInterval(() => {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }, 5000); // 5000ミリ秒 = 5秒


    // --- 2. スクロールに応じたナビゲーションとトップへ戻るボタンの表示切替 ---
    const heroSection = document.getElementById('hero');
    const fixedNav = document.getElementById('fixed-nav');
    const backToTopButton = document.getElementById('back-to-top');

    const observer = new IntersectionObserver((entries) => {
        // entries[0]は監視対象のheroSection
        const entry = entries[0];

        // isIntersectingがfalse = 画面から見えなくなった
        if (!entry.isIntersecting) {
            fixedNav.classList.add('is-visible');
            backToTopButton.classList.add('is-visible');
        } else {
            fixedNav.classList.remove('is-visible');
            backToTopButton.classList.remove('is-visible');
        }
    });

    // heroセクションの監視を開始
    if (heroSection) {
        observer.observe(heroSection);
    }
});

// --- 3. Custom Cursor Movement & Hover Effect ---
const cursorOutline = document.querySelector(".cursor-outline");
// リンクやボタンなど、ホバー対象の要素をすべて取得
const interactiveElements = document.querySelectorAll('a, .see-more');

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // 円のアニメーション（少し遅れて追従）
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    // カーソルが表示されるようにopacityを1にする
    cursorOutline.style.opacity = 1;
});

// 各リンク要素にマウスが乗った/離れた時のイベントを追加
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('is-hovering');
    });
});