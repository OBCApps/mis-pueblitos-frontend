import { Component } from '@angular/core';
import { TitleService } from '../view-pueblito.service';
import { AtractivoTuristicoService } from '../../../../services/atractivos-turisticos.service';
import { LoadingService } from '../../../../functions/loadings/loading-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lugares-turisticos',
  standalone: true,
  imports: [],
  templateUrl: './lugares-turisticos.component.html',
  styleUrl: './lugares-turisticos.component.scss'
})
export class LugaresTuristicosComponent {
  constructor(
    private titleService: TitleService,  
    private atractivoTuristicoService : AtractivoTuristicoService, 
    private loading : LoadingService,
    private router : Router
  ) { }

  ngOnInit() {

    this.load_turis()
   

    const dataNavar = {
      sidebar: 'lugares-turisticos',
    };
    this.transferedDataToNavar(dataNavar);
  }

  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }
  list_resultadoBusqueda : any [] = []

  load_turis() {
    this.loading.show();
    this.atractivoTuristicoService.get_atractivos_turisticos().subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = data;
        console.log('turisticos:', data);
        this.loading.hide();
      },
      (err) => {
        console.log('NO ENCONTRO');
        this.loading.hide();
      }
    );
  }
  gotoAtractivoTuristico(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
      'servicios',
      'atractivo-turistico',
      item.name_route,
    ]);
  }
}
