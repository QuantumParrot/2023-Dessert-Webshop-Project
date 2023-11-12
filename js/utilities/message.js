import Swal from "sweetalert2";

// messages

export function toastMessage(icon, title, url) {
    Swal.fire({
        icon,
        title,
        position: 'center',
        toast: true,
        showConfirmButton: false,
        timer: 1500,
    }).then(() => url ? location.href=url : null);
};

export function errorMessage(title, text, url) {
    Swal.fire({
        icon: 'error',
        title,
        text,
        position: 'center',
        showConfirmButton: true,
        confirmButtonColor: '#A37A64'
    }).then(() => url ? location.href=url : null);
};

export function warningMessage(title, text, url) {
    Swal.fire({
        icon: 'warning',
        title,
        text,
        position: 'center',
        showConfirmButton: true,
        confirmButtonColor: '#A37A64'
    }).then(() => url ? location.href=url : null);
};