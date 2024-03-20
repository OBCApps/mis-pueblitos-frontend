import { Component, OnInit } from '@angular/core';
import { TitleService } from '../view-pueblito.service';
import { ModalFiltrosService } from './modal-filtros/modal-filtros.service';
import { ModalFiltrosComponent } from './modal-filtros/modal-filtros.component';
import { FormsModule } from '@angular/forms';
import { HotelesService } from '../../../../services/hoteles.service';
import { DtoHoteles } from '../hoteles/entities/DtoHoteles';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-activities',
  standalone: true,
  imports: [ModalFiltrosComponent, FormsModule],
  templateUrl: './services-activities.component.html',
  styleUrl: './services-activities.component.scss'
})
export class ServicesActivitiesComponent implements OnInit {
  service_to_show = 'HOSP'

  constructor(
    private titleService: TitleService,
    private modalService: ModalFiltrosService,
    private hotelesService:HotelesService,
    private router: Router,
  ) { }

  ngOnInit() {
    const dataNavar = {
      sidebar: 'servicios',
    };
    this.transferedDataToNavar(dataNavar);
    this.getHoteles();
  }

  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }



  // ------------- OPCION PARA LOS FILTROS  ------------- \\
  openModalFilters() {
    var data = {
      option: 'open',
      valueInput: this.service_to_show
    }
    console.log("operjn", data);

    this.modalService.activateModal(data);
  }
  selectFilterOptions(event: any) {
    console.log("BUSCAR EN APi", event);

  }

  list_hospedaje: DtoHoteles[] = [];
  getHoteles(){
    this.hotelesService.get_hoteles().subscribe((data)=>{
      this.list_hospedaje = data;
    })
  }

  gotoHospedaje(item:DtoHoteles){
    this.router.navigate([`${this.router.url}`, item.name_route]);
  }


}
