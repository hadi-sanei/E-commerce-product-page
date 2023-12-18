
"use strict"
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
product_image.addEventListener('click', function () {
    if (window.matchMedia(`(min-width: 768px)`).matches) {
        lightbox.classList.remove('hidden');
    }
});
icon_close_lightbox.addEventListener('click', function () {
    lightbox.classList.add('hidden');
});



let index;
btns_nexImage.forEach((btn_nexImage) => {
    btn_nexImage.addEventListener('click', buttonNexSlider);
});
btns_previousImage.forEach((btn_previousImage) => {
    btn_previousImage.addEventListener('click',buttonPreviousSlider);
});
function buttonNexSlider() {
    index = Array.from(products_thumbnail).findIndex((product_thumbnail) => product_thumbnail.classList.contains('active'));
    index++;
    if (index > products_thumbnail.length - 1) {
        index = 0;
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


function buttonPreviousSlider() {
    index = Array.from(products_thumbnail).findIndex((product_thumbnail) => product_thumbnail.classList.contains('active'));
    index--;
    if (index < 0) {
        index = products_thumbnail.length - 1;
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