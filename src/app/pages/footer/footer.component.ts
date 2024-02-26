import { Component } from '@angular/core';
import { FooterService } from './footer.service';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
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
        console.log('Usuario suscrito:', response);
      },
      error => {
        console.error('Error al suscribirse:', error);
      }
    );
  }
}
