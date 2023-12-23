loadCartItem();
function loadCartItem() {
    let items = sessionStorage.getItem('items-cart');
    if (items !== null && items !== '') {
        items = JSON.parse(items);
        items.forEach(item => {
            createCartItem(item);
        });
    }
}

addToBasket.addEventListener('click', () => {
    if (!isValidCartItem()) {
        alert('Please determine the product quantity.');
        return;
    }
    let productImage = document.querySelector('#productImage');
    let productName = document.querySelector('#productTitle').textContent;
    let productID = productImage.getAttribute('data-product-id');
    let imageUrl = productImage.src.replace('-thumbnail', '');
    let productFinalPrice = document.querySelector('#productFinalPrice').textContent;
    let product = createCartItemObject(productID, productName, productFinalPrice, inputQuantity.value, imageUrl);
    let exist = checkExistCartItem(product);
    if (exist == true) {
        console.log('object');
        updateCartItem(product);
        return;
    }
    createSessionItem(product);
    createCartItem(product);
});
function createCartItemObject(productID, productName, finalPrice, quantity, imageUrl) {
    return {
        productID,
        productName,
        finalPrice,
        quantity,
        imageUrl,
    }
}


function isValidCartItem() {
    if (inputQuantity.value == 0 || inputQuantity.value < 0) {
        return false;
    }
    return true;
}


function checkExistCartItem(product) {
    let items = sessionStorage.getItem('items-cart');
    let exist = false;
    if (items !== null && items !== '') {

        items = JSON.parse(items);
        items.forEach(item => {
            if (item.productID == product.productID) {
                exist = true;
                return;
            }
        });
        return exist;
    }
    return exist;
}

function createSessionItem(product) {
    let products=JSON.parse(sessionStorage.getItem('items-cart')) ?? [];
    products.push(product);
    sessionStorage.setItem('items-cart', JSON.stringify(products));
}

function removeSessionItem(productID) {
    let items = sessionStorage.getItem('items-cart');
    let itemCounter = document.querySelector('#item-counter');
    if (items !== null && items !== '') {
        items = JSON.parse(items);
        items = items.filter(item => item.productID !== productID);
        console.log(items);
        if (items.length <= 0) {
        console.log(items);
            sessionStorage.removeItem('items-cart');
            manageCreateCartItem();
            return;
        }
        itemCounter.textContent--;
        sessionStorage.setItem('items-cart', JSON.stringify(items));
    }
}
function updateCartItem(product) {
    let items = sessionStorage.getItem('items-cart');
    items = JSON.parse(items);
    items.forEach(item => {
        if (item.productID == product.productID) {
            let element = document.querySelector(`#${item.productID}`);
            let totalPrice = parseInt(product.finalPrice.replace('$', '')) * product.quantity;
            element.querySelector('p').innerHTML = `${product.finalPrice} * ${product.quantity} <span class="font-bold text-black"> $${totalPrice.toFixed(2)}</span>`;
            item.quantity = product.quantity;
            items = sessionStorage.setItem('items-cart', JSON.stringify(items));
            return;
        }
    });
}
function createCartItem(product) {
    manageCreateCartItem();
    let basketItem = document.querySelector('.basketItem');
    let totalPrice = parseInt(product.finalPrice.replace('$', '')) * product.quantity;
    let section = document.createElement('section');
    let design = `
    <div id="${product.productID}" class="flex items-center gap-2 mb-3">
    <a href="#" class="rounded-md w-14 overflow-hidden">
      <img src="${product.imageUrl}" class="w-full" alt="">
    </a>
    <div class="font-normal">
      <h4>${product.productName}</h4>
      <p class="text-left">${product.finalPrice} * ${product.quantity} <span class="font-bold text-black"> $${totalPrice.toFixed(2)}</span></p>
    </div>
    <button data-product="#${product.productID}" class="icon-delete-item ml-auto pr-3">
      <img src="./assets/images/icon-delete.svg" alt="">
    </button>
  </div>
    `;
    section.innerHTML = design;
    basketItem.querySelector('div').appendChild(section);
}

function manageCreateCartItem() {
    let itemCounter = document.querySelector('#item-counter');
    let cartItem = document.querySelector('#cart-item');

    if (!sessionStorage.getItem('items-cart')) {
        itemCounter.textContent = '';
        itemCounter.classList.add('hidden');
        cartItem.classList.add('items-center', 'justify-center', 'h-36');
        cartItem.children[0].classList.remove('hidden');
        cartItem.nextElementSibling.classList.add('hidden');
        return;
    }
    itemCounter.textContent++;
    itemCounter.classList.remove('hidden');
    cartItem.classList.remove('items-center', 'justify-center', 'h-36');
    cartItem.children[0].classList.add('hidden');
    cartItem.nextElementSibling.classList.remove('hidden');
}

let basketItems = document.querySelector('.basketItem');
basketItems.addEventListener('click', (e) => {
    element = e.target;
    if (element.parentElement.getAttribute('data-product')) {

        let product = document.querySelector(element.parentElement.getAttribute('data-product'));
        product.remove();
        removeSessionItem(element.parentElement.getAttribute('data-product').replace('#', ''));
    }
});

