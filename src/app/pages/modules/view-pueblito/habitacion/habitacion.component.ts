import { HabitacionService } from './../../../../services/habitacion.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habitacion',
  standalone: true,
  imports: [],
  templateUrl: './habitacion.component.html',
  styleUrl: './habitacion.component.scss',
})
export class HabitacionComponent {
  constructor(
    private router: Router,
    private habitacionService: HabitacionService
  ) {}

  name_route = '';
  habitacion: any;
  ngOnInit() {
    this.name_route = this.router.url.split('/').pop();
    console.log('this.router.url', this.router.url);
  }

  getHabitacion() {
    this.habitacionService.get_habitacion_by_name_route(this.name_route).subscribe(
      (response) => {
        this.habitacion = response;
        console.log('response', response);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
