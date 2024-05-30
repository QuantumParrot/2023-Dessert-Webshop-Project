export class ImageGallery {

    constructor(element) {
        this.element = document.querySelector(element);
        this.element.addEventListener('click', ({target}) => {
            if (target.nodeName === 'IMG') { this.show(target.src) }
        });
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

    show(src) {
        const current = document.querySelector('#current-image');
        current.setAttribute('src', src);
    }

}