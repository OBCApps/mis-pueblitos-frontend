import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ModalRedesSocialesService } from './modal-redes-sociales.service';
import { isPlatformBrowser } from '@angular/common';
import { Modal, ModalOptions } from 'flowbite';

@Component({
  selector: 'app-modal-redes-sociales',
  standalone: true,
  imports: [],
  templateUrl: './modal-redes-sociales.component.html',
  styleUrl: './modal-redes-sociales.component.scss'
})
export class ModalRedesSocialesComponent {



  //@Output() ubigeoSelected = new EventEmitter<any>();

  Modal: any;
  show: any;

  valueInput: any;
  constructor(
    private modalService: ModalRedesSocialesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.modalState$.subscribe((option) => {
      //this.valueInput = option.valueInput;
      this.activate_modal(option.option);


    });

  }

  // -------------- CREACION DEL MODAL -------------- \\
  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('modal-redes-sociales');

      const options: ModalOptions = {
        placement: 'center',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
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
        id: 'modal-redes-sociales',
        override: true
      };

      this.Modal = new Modal($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }


  activate_modal(option: any) {
    if (option == 'close') {
      this.Modal.hide()

    } else if (option == 'open') {
      
      this.create_modal();
    }
  }
  

}
