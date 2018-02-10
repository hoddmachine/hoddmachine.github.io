---
---
class Gallery {
    constructor () {
        this.initializeEvents();
    }

    initializeEvents () {
        /* Fullcreen trigger */
        $('.gallery img').on('click', (event) => {
            let img = $('.fullscreen img:eq(' + $(event.target).index() + ')')[0];
            this.show(img);
        });
        /* Fullscreen navigation */
        $('.fullscreen .close').on('click', () => {
            this.close();
        });
        $('.fullscreen .before').on('click', () => {
            this.showBefore();
        });
        $('.fullscreen .next').on('click', () => {
            this.showNext();
        });
        $('.fullscreen').on('click', (event) => {
            if ($(event.target).has('img').length) {
                this.close();
            }
        });
        $(document).on('keyup', (event) => {
            switch (event.keyCode) {
            case 27:
                /* ESC key */
                this.close();
                break;
            case 37:
                /* Left arrow key */
                this.showBefore();
                break;
            case 39:
                /* Right arrow key */
                this.showNext();
                break;
            }
        });
    }

    close () {
        $('.fullscreen, .fullscreen img').removeClass('show');
    }

    showBefore () {
        let newImage = $('.fullscreen img.show').prev('img');
        if (newImage.length !== 1) {
            newImage = $('.fullscreen img').last();
        }
        this.show(newImage[0]);
    }

    showNext () {
        let newImage = $('.fullscreen img.show').next('img');
        if (newImage.length !== 1) {
            newImage = $('.fullscreen img').first();
        }
        this.show(newImage[0]);
    }

    show (img) {
        $('.fullscreen').addClass('show');
        $('.fullscreen img').removeClass('show');
        $(img).addClass('show');
        this.setControlColor(img);
    }

    /* Choose white or black for overlaying controls on image */
    setControlColor (img) {
        /* Draw the image on a canvas to get a color sample */
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        let rgbSample = canvas.getContext('2d').getImageData(img.width - 42, 42, 1, 1).data;
        /* Compute alpha value and use as refrence for color selection */
        let alphaValue = (rgbSample[0] * 0.299) + (rgbSample[1] * 0.587) + (rgbSample[2] * 0.114);
        if (alphaValue > 186) {
            $('.fullscreen').addClass('dark-controls');
        } else {
            $('.fullscreen').removeClass('dark-controls');
        }
    }
}

class Navigation {
    constructor () {
        this.initializeEvents();
    }

    initializeEvents () {
        $(window).on('hashchange', (event) => {
            console.log('hashchange');
            this.processHash(event.target.location.hash);
        });
    }

    processHash (hash) {
        console.log(hash);
        switch (hash) {
        case '':
            $('.navbar, .navbar-container, .navbar-background, body').removeClass('small');
            $('.navbar-lead, .collection').removeClass('hidden');
            $('section.photography').addClass('hide');
            break;
        case '#photography':
        case '#video':
        case '#software':
            $('.navbar, .navbar-container, .navbar-background, body').addClass('small');
            $('.navbar-lead, .collection').addClass('hidden');
            $('section.photography').removeClass('hide');
            break;
        }
    }
}

$(document).ready(() => {
    let gallery = new Gallery();
    let navigation = new Navigation();
});
