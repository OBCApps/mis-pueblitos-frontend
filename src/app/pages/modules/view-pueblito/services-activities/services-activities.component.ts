import { Component, OnInit } from '@angular/core';
import { TitleService } from '../view-pueblito.service';
import { ModalFiltrosService } from './modal-filtros/modal-filtros.service';
import { ModalFiltrosComponent } from './modal-filtros/modal-filtros.component';
import { FormsModule } from '@angular/forms';

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
    private modalService: ModalFiltrosService
  ) { }

  ngOnInit() {
    const dataNavar = {
      sidebar: 'servicios',
    };
    this.transferedDataToNavar(dataNavar);
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
}
