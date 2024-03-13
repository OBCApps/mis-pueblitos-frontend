import { Component } from '@angular/core';
import { EventoService } from '../../../../../services/subeventodetail.service';
import { DtoSubEvento, ListSubEventos } from './entities/DtoSubEvento';
import moment from 'moment';
import 'moment/locale/es';
import { ActivatedRoute } from '@angular/router';
import { ModalProveedorComponent } from '../../../../../functions/modal-proveedor/modal-proveedor.component';
import { ModalProveedorService } from '../../../../../functions/modal-proveedor/modal-proveedor.service';

@Component({
  selector: 'app-sub-evento-detail',
  standalone: true,
  imports: [ModalProveedorComponent],
  templateUrl: './sub-evento-detail.component.html',
  styleUrl: './sub-evento-detail.component.scss',
})
export class SubEventoDetailComponent {
  constructor(
    private readonly subEventoService: EventoService,
    private route: ActivatedRoute,
    private modalProveedorFotos: ModalProveedorService,
  ) {}
  evento: DtoSubEvento = new DtoSubEvento();
  loading: Boolean = false;
  dias: any[] = [];

  ngOnInit() {
    this.loading = true;

    /* this.route.queryParams.subscribe((params) => {
      const id_father = params['id_father'];
      this.getSubEvento(id_father);
    }); */
    this.route.params.subscribe((params) => {
      const eventoDetalle = params['eventoDetalle'];
      this.getSubEvento(eventoDetalle);
    });
  }

  formatHora(hora: string) {
    const partes = hora.split(':');
    const horaParte = partes[0];
    const minutosParte = partes[1];
    const horaFormateada = `${horaParte}:${minutosParte}`;

    return horaFormateada;
  }

  formatFecha(fecha: string) {
    return moment(fecha).format('DD/MM');
  }

  getSubEvento(id: any) {
    this.subEventoService.getEventoByNameRoute(id).subscribe((response) => {
      this.evento = response;
      console.log('response', response);
      this.dias = Object.keys(this.evento.subEventosPorDia);
      console.log('dias', this.dias);
      this.loading = false;
    });
  }

    // ---------- VER LOS DATOS DEL PROVEEDOR ------------- \\4
    viewProveedorImage(item){
      var data = {
        option: 'open',
        valueInput: item
      }
      console.log("data: ", data);

      this.modalProveedorFotos.activateModal(data);
    }
}
