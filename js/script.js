---
---

/* CLASSES */
class Gallery {
    constructor () {}

    static close () {
        $('.fullscreen, .fullscreen img').removeClass('show');
    }

    static showBefore () {
        let newImage = $('.fullscreen img.show').prev('img');
        if (newImage.length !== 1) {
            newImage = $('.fullscreen img').last();
        }
        $('.fullscreen img').removeClass('show');
        $(newImage).addClass('show');
    }

    static showNext () {
        let newImage = $('.fullscreen img.show').next('img');
        if (newImage.length !== 1) {
            newImage = $('.fullscreen img').first();
        }
        $('.fullscreen img').removeClass('show');
        $(newImage).addClass('show');
    }

    static showThis(target) {
        let index = $(target).index();
        $('.fullscreen, .fullscreen img:eq(' + index + ')').addClass('show');
    }
}

/* EVENTS */
/* Fullcreen trigger */
$('.gallery img').on('click', (event) => {
    Gallery.showThis(event.target);
});
/* Fullscreen navigation */
$('.fullscreen .close').on('click', Gallery.close);
$('.fullscreen .before').on('click', Gallery.showBefore);
$('.fullscreen .next').on('click', Gallery.showNext);
$('.fullscreen').on('click', (event) => {
    if ($(event.target).has('img').length) {
        Gallery.close();
    }
});
$(document).on('keyup', (event) => {
    switch (event.keyCode) {
    case 27:
        /* ESC key */
        Gallery.close();
        break;
    case 37:
        /* Left arrow key */
        Gallery.showBefore();
        break;
    case 39:
        /* Right arrow key */
        Gallery.showNext();
        break;
    }
});
