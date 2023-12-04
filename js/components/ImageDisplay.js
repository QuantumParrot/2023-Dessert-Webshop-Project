export class ImageDisplay {

    constructor(element) {
        this.element = document.querySelector(element);
        this.clickEventListener();
    }
    
    render(data) {
        let content = '';
        data.image.forEach((img) => {
            content += /*html*/`
            <div class="swiper-slide overflow-hidden rounded">
                <img class="image-slide" src="${img || `https://fakeimg.pl/451x451/?text=🍰&font=noto`}" alt="${data.name}">
            </div>`
        });
        this.element.innerHTML = content;
    }

    clickEventListener() {
        this.element.addEventListener('click', ({target}) => {
            if (target.nodeName === 'IMG') { this.show(target.src) }
        });
    }

    show(src) {
        const current = document.querySelector('#current-image');
        current.setAttribute('src', src);
    }

}