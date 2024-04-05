import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { DtoHoteles } from '../entities/DtoHoteles';
import { Router } from '@angular/router';
import { HotelesService } from '../../../../../../services/hoteles.service';


@Component({
  selector: 'app-hotel-view',
  standalone: true,
  imports: [ ],
  templateUrl: './hotel-view.component.html',
  styleUrl: './hotel-view.component.scss',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelViewComponent {
  constructor(
    private readonly hotelesService: HotelesService,
    private router: Router
  ) {}

  dtoHotelInfo: DtoHoteles = new DtoHoteles();
  name_route: string;
  loading = false;
  ngOnInit() {
    this.name_route = this.router.url.split('/').pop();
    console.log('this.name_route', this.name_route);
    this.getHotel(this.name_route);
  }

  getHotel(name_route: string) {
    this.loading = true;
    console.log('name_route', name_route);
    this.hotelesService
      .get_hotel_by_name_route(name_route)
      .subscribe((response) => {
        this.dtoHotelInfo = response;
        console.log('response', response);
        this.loading = false;
      });
  }

  gotoHabitacion(hotel_name, habitacion_name) {
    this.router.navigate([this.router.url, habitacion_name]);
  }

  get_Keys(obj: any) {
    if (obj === undefined || obj === null) {
      return [];
    } else {
      return Object.keys(obj);
    }
  }
}
