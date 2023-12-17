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
let product_image = document.querySelector('.product-image');
let products_thumbnail = document.querySelectorAll('.product-thumbnail');
let lightbox = document.querySelector('#lightbox');
let icon_close_lightbox = document.querySelector('#icon-close-lightbox');
let btns_previousImage = document.querySelectorAll('.btn-previousImage');
let btns_nexImage = document.querySelectorAll('.btn-nexImage');

products_thumbnail.forEach(product_thumbnail => {
    product_thumbnail.addEventListener('click', () => {
        let src = product_thumbnail.querySelector('img').src;
        src = src.replace('-thumbnail', '');
        removeClasses(products_thumbnail, 'active');
        product_thumbnail.classList.add('active');
        product_image.src = src;
        lightbox.querySelector('.product-image-lightbox').src = src;
        addAndRemoveClass(product_image, 'change');
    });
});
function changeSlider(){

}
product_image.addEventListener('click', function () {
    if(window.matchMedia(`(min-width: 768px)`).matches){
    lightbox.classList.remove('hidden');
    }
});
icon_close_lightbox.addEventListener('click', function () {
    lightbox.classList.add('hidden');
});
function removeClasses(elements, className) {
    elements.forEach((element) => {
        element.classList.remove(className);
    });
}
function addAndRemoveClass(element, className, duration = 200) {
    element.classList.add(className);
    setTimeout(function () {
        element.classList.remove(className);
    }, duration);
}
let index;
btns_nexImage.forEach((btn_nexImage)=>{
    btn_nexImage.addEventListener('click', function () {
        buttonNexSlider();
    });
})
btns_previousImage.forEach((btn_previousImage)=>{
    btn_previousImage.addEventListener('click', function () {
        buttonPreviousSlider();
    });
})
 function buttonNexSlider(){
    index = Array.from(products_thumbnail).findIndex((product_thumbnail) => product_thumbnail.classList.contains('active'));
    index++;
    if(index>products_thumbnail.length-1){
        index=0;
    }
    products_thumbnail[index];
    let src = products_thumbnail[index].querySelector('img').src;
    src = src.replace('-thumbnail', '');
    removeClasses(products_thumbnail, 'active');
    products_thumbnail[index].classList.add('active');
    product_image.src = src;
    lightbox.querySelector('.product-image-lightbox').src = src;
    addAndRemoveClass(product_image, 'change');
 }


 function buttonPreviousSlider(){
    index = Array.from(products_thumbnail).findIndex((product_thumbnail) => product_thumbnail.classList.contains('active'));
    index--;
    if(index<0){
        index=products_thumbnail.length-1;
    }
    products_thumbnail[index];
    let src = products_thumbnail[index].querySelector('img').src;
    src = src.replace('-thumbnail', '');
    removeClasses(products_thumbnail, 'active');
    products_thumbnail[index].classList.add('active');
    product_image.src = src;
    lightbox.querySelector('.product-image-lightbox').src = src;
    addAndRemoveClass(product_image, 'change');
 }