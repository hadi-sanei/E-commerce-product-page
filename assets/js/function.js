"use strict"
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