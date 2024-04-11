import Swal from "sweetalert2";

    export class Utils {
        static showSweetAlert(title: string, message: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info'): void {
            Swal.fire({
                title: title,
                text: message,
                icon: icon,
                confirmButtonText: 'OK'
            });
        }
    }
