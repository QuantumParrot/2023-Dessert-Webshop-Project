export function changeCartIcon() {

    if (window.innerWidth < 768) return;
    
    const icon = document.querySelector('#cart-icon');
    icon.innerHTML += /*html*/`
    <span class="marker position-absolute top-0 end-0 p-1 bg-danger border border-light rounded-circle">
        <span class="visually-hidden">New alerts</span>
    </span>`;

}

export function removeCartIcon() {

    if (window.innerWidth < 768) return;

    const marker = document.querySelector('#cart-icon .marker');
    if (marker) { marker.remove() };

}