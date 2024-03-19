import { HotelesService } from '../../../../services/hoteles.service';
import { Component } from '@angular/core';
import { DtoHoteles } from './entities/DtoHoteles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hoteles',
  standalone: true,
  imports: [],
  templateUrl: './hoteles.component.html',
  styleUrl: './hoteles.component.scss',
})
export class HotelesComponent {
  constructor(
    private readonly hotelesService: HotelesService,
    private router: Router
  ) {}

  hotel: DtoHoteles;
  name_route: string;
  loading = false;
  ngOnInit() {
    this.name_route=this.router.url.split('/').pop();
    console.log('this.name_route', this.name_route);
    this.getHotel(this.name_route);
  }

  getHotel(name_route:string){
    this.loading = true;
    console.log('name_route', name_route);
    this.hotelesService.get_hotel_by_name_route(name_route).subscribe((response) => {
      this.hotel = response;
      console.log('response', response);
      this.loading = false;
    });
  }
}

