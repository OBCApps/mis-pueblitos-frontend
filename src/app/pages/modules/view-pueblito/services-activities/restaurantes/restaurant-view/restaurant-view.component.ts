import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturanteService } from '../../../../../../services/restaurante.service';
import { DtoRestaurante } from '../entities/DtoRestaurante';

@Component({
  selector: 'app-restaurant-view',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-view.component.html',
  styleUrl: './restaurant-view.component.scss',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantViewComponent {
  constructor(
    private restauranteService: ResturanteService,
    private router: Router,
    private readonly route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.load_restaurante(params['restaurante_name']);
    });
  }
  restaurante: DtoRestaurante;
  load_restaurante(name_route){
    this.restauranteService.get_restaurante_by_name_route(name_route).subscribe(
      (data:any) => {
        this.restaurante = data;
        console.log("restaurante",this.restaurante);
      }, err => {
        console.error(err);
      }
    );
  }

  get_Keys(data:any){
    console.log(Object.keys(data));
    return Object.keys(data);
  }
}
