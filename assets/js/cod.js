let icon_menu = document.querySelector('#icon-menu');
let icon_close_menu_mobile = document.querySelector('#icon-close-menu-mobile');
let menu = document.querySelector('#menu');
let full_page = document.querySelector('#full-page');

function openMenuMobile() {
    menu.classList.remove('-left-full');
    menu.classList.add('left-0');
    full_page.classList.add('block');
    full_page.classList.remove('hidden');
}

function closeMenuMobile() {
    menu.classList.remove('left-0');
    menu.classList.add('-left-full');
    full_page.classList.add('hidden');
    full_page.classList.remove('block');
}

icon_menu.addEventListener('click', () => {
    openMenuMobile();
});

icon_close_menu_mobile.addEventListener('click', () => {
    closeMenuMobile();
});
full_page.addEventListener('click', () => {
    closeMenuMobile();
});
