import { Component } from '@angular/core';
import { TipsViajerosService } from '../../../../services/tips-viajeros.service';
import { DtoLugar } from './entities/DtoLugar';
import { DtoTipsViajeros } from './entities/DtoTipsViajeros';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-tips-viajeros',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './tips-viajeros.component.html',
  styleUrl: './tips-viajeros.component.scss',
})
export class TipsViajerosComponent {
  constructor(private tipsViajeroService: TipsViajerosService) {}

  display: any;
  latitud: number = 0;
  longitud: number = 0;
  center: google.maps.LatLngLiteral = {
    lat: this.latitud,
    lng: this.longitud,
  };
  zoom = 18;
  /*------------------------------------------
    --------------------------------------------
    moveMap()
    --------------------------------------------
    --------------------------------------------*/
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  /*------------------------------------------
  --------------------------------------------
  move()
  --------------------------------------------
  --------------------------------------------*/
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  tips: DtoTipsViajeros = new DtoTipsViajeros();
  lugar: DtoLugar = new DtoLugar();
  keys: string[] = [];
  loading: boolean = false;
  ngOnInit() {
    this.loading = true;
    if (typeof localStorage !== 'undefined') {
      this.lugar = JSON.parse(localStorage.getItem('lugar'));
      this.tipsViajeroService
        .getTipsByLugarId(this.lugar.id)
        .subscribe((data: any) => {
          this.tips = data;
          console.log('tips', this.tips);
          this.latitud = this.tips.latitud;
          this.longitud = this.tips.longitud;
          this.center = {
            lat: this.latitud,
            lng: this.longitud,
          };
          this.keys = Object.keys(this.tips.llevarTemporada);

          this.loading = false;
        });
    }
  }
}
