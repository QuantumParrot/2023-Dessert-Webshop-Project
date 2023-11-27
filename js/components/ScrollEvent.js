export class ScrollTop {
    constructor(element) {
        this.element = element;
    }
    backToTop() {
        document.documentElement.scrollTop = 0;
    }
}