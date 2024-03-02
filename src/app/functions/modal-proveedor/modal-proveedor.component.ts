import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ModalProveedorService } from './modal-proveedor.service';
import { isPlatformBrowser } from '@angular/common';
import { Modal, ModalOptions } from 'flowbite';

@Component({
  selector: 'app-modal-proveedor',
  standalone: true,
  imports: [],
  templateUrl: './modal-proveedor.component.html',
  styleUrl: './modal-proveedor.component.scss'
})
export class ModalProveedorComponent {


  //@Output() ubigeoSelected = new EventEmitter<any>();

  Modal: any;
  show: any;

  valueInput: any;
  constructor(
    private modalService: ModalProveedorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.modalState$.subscribe((option) => {
      this.activate_modal(option.option);
      this.valueInput = option.valueInput;
      console.log("input", this.valueInput);
      
    });

  }

  // -------------- CREACION DEL MODAL -------------- \\
  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('modal-proveedor-fotos');

      const options: ModalOptions = {
        placement: 'center',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900/50  fixed inset-0 z-40 pointer-events-none',
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
        id: 'modal-proveedor-fotos',
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
