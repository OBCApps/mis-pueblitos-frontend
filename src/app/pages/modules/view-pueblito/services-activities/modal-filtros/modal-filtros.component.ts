import { map } from 'rxjs';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';

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
  styleUrl: './modal-filtros.component.scss',
})
export class ModalFiltrosComponent implements OnInit {
  @Output() responseModal = new EventEmitter<any>();

  Modal: any;
  show: any;

  // filter Hospeadaje
  list_tipos_hospedaje: any[] = [
    { value: 'Hotel', checked: false },
    { value: 'Cabaña', checked: false },
    { value: 'Casa', checked: false },
    { value: 'Departamento', checked: false },
  ];

  list_tipos_habitaciones: any[] = [
    { value: 'Individual', checked: false },
    { value: 'Doble', checked: false },
    { value: 'Suite', checked: false },
    { value: 'Triple', checked: false },
    { value: 'Familiar', checked: false },
    { value: 'Ejecutiva', checked: false },
    { value: 'Estandar', checked: false },
    { value: 'twin', checked: false },
  ];
  list_tipos_servicios: any[] = [
    { value: 'Muebles para ropa', checked: false },
    { value: 'Wifi', checked: false },
    { value: 'Televisor de Pantalla Plana', checked: false },
    { value: 'Aire Acondicionado/calefacción', checked: false },
    { value: 'Cama 2 plazas', checked: false },
    { value: 'Zonas de Trabajo', checked: false },
    { value: 'Baño Privado', checked: false },
    { value: 'Servicio de Limpieza', checked: false },
  ];

  // filter Tours
  list_tipos_tours: any[] = [
    { value: 'Tours culturales', checked: false },
    { value: 'Tour experiencia', checked: false },
    { value: 'Excursiones naturales', checked: false },
    { value: 'Deportes de aventura', checked: false },
  ];

  list_group_size: any[] = [
    { value: 'Pequeño (1-5 personas)', checked: false },
    { value: 'Mediano (6-10 personas)', checked: false },
    { value: 'Grande (mas de 10 personas)', checked: false },
  ];

  list_idiomas: any[] = [
    { value: 'español', checked: false },
    { value: 'inglés', checked: false },
  ];

  // filter Restaurantes
  list_tipo_establecimiento: any[] = [
    { value: 'Restaurante', checked: false },
    { value: 'Campestre', checked: false },
    { value: 'Picanteria', checked: false },
    { value: 'Cafeterias', checked: false },
    { value: 'Bar', checked: false },
  ];

  list_tipo_cocina: any[] = [
    { value: 'Tradicional', checked: false },
    { value: 'Marina', checked: false },
    { value: 'Fusión Peruana-Internacional', checked: false },
    { value: 'Peruana', checked: false },
  ];

  list_hora_atencion: any[] = [
    { value: 'Mañana', checked: false },
    { value: 'Tarde', checked: false },
    { value: 'Noche', checked: false },
    { value: '24 horas', checked: false },
  ];

  list_servicios: any[] = [
    { value: 'Estacionamiento', checked: false },
    { value: 'Reservas en Línea', checked: false },
    { value: 'Wifi', checked: false },
    { value: 'Área de juegos para niños', checked: false },
    { value: 'Servicio a Domicilio', checked: false },
    { value: 'Permite mascotas', checked: false },
  ];

  list_ambientes: any[] = [
    { value: 'Casual', checked: false },
    { value: 'Elegante', checked: false },
    { value: 'Rustico', checked: false },
  ];

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
    let temp = [];
    if (this.valueOutput.typeServicio == 'HOSP') {
      this.list_tipos_hospedaje.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroHabitaciones.tipoHospedaje = temp;

      temp = [];
      this.list_tipos_habitaciones.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroHabitaciones.tipoHabitacion = temp;
      temp = [];
      this.list_tipos_servicios.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroHabitaciones.servicios = temp;
      temp = [];

      this.list_idiomas.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroHabitaciones.idioma = temp;
      temp = [];
    } else if (this.valueOutput.typeServicio == 'TOUR') {
      this.list_tipos_tours.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroTurs.tipo = temp;
      temp = [];

      this.list_group_size.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroTurs.tamanioGrupo = temp;
      temp = [];

      this.list_idiomas.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroTurs.idioma = temp;
      temp = [];
    } else {
      this.list_tipo_establecimiento.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroRestaurantes.tipo = temp;
      temp = [];

      this.list_tipo_cocina.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroRestaurantes.tipoCocina = temp;
      temp = [];

      this.list_hora_atencion.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroRestaurantes.horarioAtencion = temp;
      temp = [];

      this.list_servicios.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroRestaurantes.servicios = temp;
      temp = [];

      this.list_ambientes.map((item) => {
        if (item.checked) {
          temp.push(item.value);
        }
      });
      this.valueOutput.filtroRestaurantes.ambiente = temp;
      temp = [];
    }

    const data = {
      selected: item,
      valueInput: this.valueInput,
    };
    console.log(this.valueOutput);

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
        override: true,
      };

      this.Modal = new Modal($targetEl, options, instanceOptions);
    }
  }

  showData(item: any) {
    console.log(item);
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
