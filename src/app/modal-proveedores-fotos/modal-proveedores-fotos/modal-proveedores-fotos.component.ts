import { Component, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { ModalProveedoresFotosService } from './modal-proveedores-fotos.service';

@Component({
  selector: 'app-modal-proveedores-fotos',
  standalone: true,
  imports: [],
  templateUrl: './modal-proveedores-fotos.component.html',
  styleUrl: './modal-proveedores-fotos.component.scss'
})

export class ModalProveedoresFotosComponent implements OnInit {
  modal: ModalInterface;
  proveedores: any[] = []; 
  constructor(private modalService: ModalProveedoresFotosService) { }

  ngOnInit(): void {

    const $modalElement: HTMLElement = document.querySelector('modalproveedor');


    const modalOptions: ModalOptions = {
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

    // Opciones de la instancia del modal
    const instanceOptions: InstanceOptions = {
      id: 'modalproveedor',
      override: true
    };

    this.modal = new Modal($modalElement, modalOptions, instanceOptions);

    this.modal.show();

    this.obtenerProveedores();

  }

  openModal() {
    this.modal.show();
  }
  obtenerProveedores() {
    this.modalService.get_list_proveedor().subscribe(
      (data) => {
        this.proveedores = data;
      },
      (error) => {
        
      }
    );
  }
}