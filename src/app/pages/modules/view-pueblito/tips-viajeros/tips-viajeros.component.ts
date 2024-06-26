import { Component } from '@angular/core';
import { TipsViajerosService } from '../../../../services/tips-viajeros.service';
import { DtoLugar } from './entities/DtoLugar';
import { DtoTipsViajeros } from './entities/DtoTipsViajeros';
import { GoogleMapsModule } from '@angular/google-maps';
import { TitleService } from '../view-pueblito.service';

@Component({
  selector: 'app-tips-viajeros',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './tips-viajeros.component.html',
  styleUrl: './tips-viajeros.component.scss',
})
export class TipsViajerosComponent {
  Object: object;
  constructor(
    private tipsViajeroService: TipsViajerosService,
    private titleService: TitleService
  ) { }

  display: any;
  latitud: number = 0;
  longitud: number = 0;
  center: google.maps.LatLngLiteral = {
    lat: this.latitud,
    lng: this.longitud,
  };
  zoom = 18;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  tips: DtoTipsViajeros = new DtoTipsViajeros();
  lugar: DtoLugar = new DtoLugar();
  keys: string[] = [];
  keys_comollegar: string[] = [];
  loading: boolean = false;
  ngOnInit() {
    this.loading = true;
    if (typeof localStorage !== 'undefined') {
      this.lugar = JSON.parse(localStorage.getItem('lugar'));
      this.tipsViajeroService.getTipsByLugarId(this.lugar.id).subscribe((data: any) => {
        this.tips = data;
        console.log('tips', this.tips);
        this.latitud = this.tips.latitud;
        this.longitud = this.tips.longitud;
        this.center = {
          lat: this.latitud,
          lng: this.longitud,
        };
        /* this.keys = Object.keys(this.tips.llevarTemporada);
        this.keys_comollegar = Object.keys(this.tips.llegarsecondDesc); */
        this.loading = false;
      });
    }


    const dataNavar = {
      sidebar: 'tips-viajero'
    }
    this.transferedDataToNavar(dataNavar)
  }
  transferedDataToNavar(value: any): void {
    console.log("CAMBIO");

    this.titleService.setTitle(value);
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

}
