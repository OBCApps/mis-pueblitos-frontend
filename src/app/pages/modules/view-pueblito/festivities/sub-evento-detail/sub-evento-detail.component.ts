import { Component } from '@angular/core';
import { EventoService } from '../../../../../services/subeventodetail.service';
import { DtoSubEvento, ListSubEventos } from './entities/DtoSubEvento';
import moment from 'moment';
import 'moment/locale/es';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-evento-detail',
  standalone: true,
  imports: [],
  templateUrl: './sub-evento-detail.component.html',
  styleUrl: './sub-evento-detail.component.scss',
})
export class SubEventoDetailComponent {
  constructor(
    private readonly subEventoService: EventoService,
    private route: ActivatedRoute
  ) {}
  evento: DtoSubEvento = new DtoSubEvento();
  loading: Boolean = false;
  dias: any[] = [];

  ngOnInit() {
    this.loading = true;

    this.route.queryParams.subscribe((params) => {
      const id_father = params['id_father'];
      this.getSubEvento(id_father);
    });
  }

  formatHora(hora: string){
    return moment(hora, 'HH:mm').format('h:mm');

  }

  formatFecha(fecha: string){
    return moment(fecha).format('DD/MM');
  }

  formatDia(dia: string){
    return `${dia[0].toUpperCase()}${dia.slice(1)}`
  }

  getSubEvento(id: any) {
    this.subEventoService.getEvento(id).subscribe((response) => {
      this.evento = response;
      this.evento.subEventosPorDia;

      console.log('response', response);
      this.dias = Object.keys(this.evento.subEventosPorDia);
      console.log('dias', this.dias);
      this.loading = false;
    });
  }
}
