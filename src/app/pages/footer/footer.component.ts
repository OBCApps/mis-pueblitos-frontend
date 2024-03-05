import { Component } from '@angular/core';
import { FooterService } from './footer.service';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string;

  constructor(private suscripcionService: FooterService) { }

  suscribirse(): void {

    this.suscripcionService.suscribirse(this.email).subscribe(
      response => {
        Swal.fire({
          title: '¡Gracias por suscribirte!',
          html: 'Te estaremos enviando emocionantes actualizaciones pronto. &#128515;',
          customClass: {
            confirmButton: 'text-green-500 border-2 font-Battambang border-primary bg-white',
            popup: 'border-1 border-solid rounded-3xl font-Battambang border-green-500',
            title: 'font-Montserrat text-green-500',
          },
          background: 'white',
          confirmButtonColor: 'green',
        });
        this.email = ''
      },
      error => {
        Swal.fire({
          title: 'Algo salió mal',
          text: 'Hubo un problema al procesar tu solicitud. Inténtalo de nuevo o contáctanos en redes sociales si persiste. ¡Estamos aquí para ayudarte! 😊',
          customClass: {
            confirmButton: 'text-primary border-2 font-Battambang border-primary bg-white',
            popup: 'border-1 border-solid rounded-3xl font-Battambang border-primary',
            title: 'font-Montserrat text-primary',
          },
          background: 'white',
          confirmButtonColor: 'red',
        });
        
        
      }
    );
  }
}
