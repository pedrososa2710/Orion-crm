import { inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private location = inject(Location);

  success(message: string): Promise<any> {
    return Swal.fire('Éxito', message, 'success');
  }

  successBack(message: string): Promise<any> {
    return Swal.fire('Éxito', message, 'success').then(() => {
      this.location.back();
    });
  }

  error(message: string): Promise<any> {
    return Swal.fire('Error', message, 'error');
  }

  info(message: string): Promise<any> {
    return Swal.fire('Información', message, 'info');
  }

  confirm(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => result.isConfirmed);
  }
}
