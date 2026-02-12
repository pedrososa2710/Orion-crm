import { inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private location = inject(Location);

  success(message: string) {
    Swal.fire('Éxito', message, 'success');
  }
  successBack(message: string) {
    Swal.fire('Éxito', message, 'success').then(() => {
      this.location.back();
    });
  }

  error(message: string) {
    Swal.fire('Error', message, 'error');
  }

  info(message: string) {
    Swal.fire('Información', message, 'info');
  }
}
