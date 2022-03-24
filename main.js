const header = document.querySelector('#header');
document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 120) {
        header.style.backgroundColor = 'var(--color)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});