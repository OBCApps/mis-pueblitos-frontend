import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';

import { ModalFiltrosService } from './modal-filtros.service';
import { isPlatformBrowser } from '@angular/common';
import { Accordion, AccordionItem, Modal, ModalOptions } from 'flowbite';

import { FormsModule } from '@angular/forms';
import { FiltroGeneralServicios } from '../entities/filtroGeneralServicios';

@Component({
  selector: 'app-modal-filtros',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-filtros.component.html',
  styleUrl: './modal-filtros.component.scss'
})
export class ModalFiltrosComponent implements OnInit {



  @Output() responseModal = new EventEmitter<any>();

  Modal: any;
  show: any;

  valueInput: any;
  valueOutput: FiltroGeneralServicios = new FiltroGeneralServicios();
  constructor(
    private modalService: ModalFiltrosService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    this.modalService.modalState$.subscribe((option) => {
      this.valueInput = option.valueInput;
      this.valueOutput.typeServicio = option.valueInput;
      this.activate_modal(option.option);
    });

  }

  ngOnInit(): void {
    this.create_modal();

    this.general_loads();
  }
  // ------------ SEARCH LOCATIONS ------------- \\  
  general_loads() {
    /* this.load_tipos_hospedaje();
    this.load_tipos_habitaciones();
    this.load_tipos_servicios();
     */
  }

  // ---------------- SEND LOCATION SELECTED -------------- \\
  selectFilters(item: any) {
    const data = {
      selected: item,
      valueInput: this.valueInput
    }
    this.responseModal.emit(data);
    this.Modal.hide();
  }

  // -------------- CREACION DEL MODAL -------------- \\
  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('modal-filter-services');

      const options: ModalOptions = {
        placement: 'center',
        backdrop: 'dynamic',

        closable: true,
        onHide: () => {
          console.log('modal is hidden');
        },
        onShow: () => {
          console.log('modal is shown');
        },
        onToggle: () => {
          console.log('modal has been toggled');
        },
      };

      const instanceOptions = {
        id: 'modal-filter-services',
        override: true
      };

      this.Modal = new Modal($targetEl, options, instanceOptions);

    }
  }

  
  activate_modal(option: any) {
    if (option == 'close') {
      this.Modal.hide();
      this.valueInput = null;
    } else if (option == 'open') {
      this.Modal.show();

      

    }
  }

}
