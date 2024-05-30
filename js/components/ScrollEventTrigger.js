export class ScrollEventTrigger {

    constructor(element) {
        this.element = element;
    }

    backToTop() {
        document.documentElement.scrollTop = 0;
    }
    
}