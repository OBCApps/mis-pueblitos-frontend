import { Component } from '@angular/core';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { Router } from '@angular/router';
import { Habitacion } from './entities/DtoHabitacion';

@Component({
  selector: 'app-habitacion-view',
  standalone: true,
  imports: [],
  templateUrl: './habitacion-view.component.html',
  styleUrl: './habitacion-view.component.scss',
})
export class HabitacionViewComponent {
  constructor(
    private router: Router,
    private habitacionService: HabitacionService,
  ) {}

  name_route = '';
  habitacion: Habitacion;
  loading = false;

  ngOnInit() {
    this.name_route = this.router.url.split('/').pop();
    console.log('this.router.url', this.router.url);
    this.loading = true;
    this.getHabitacion();
  }

  getHabitacion() {
    this.habitacionService.get_habitacion_by_name_route(this.name_route).subscribe(
      (response) => {
        this.habitacion = response;
        console.log('response', response);
        this.loading = false;
      },
      (error) => {
        console.log('error', error);
        this.loading = false;
      }
    );
  }

}
