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

    // Dividir la cadena en partes: hora, minutos y zona horaria
    // 21:18:11-05
    const partes = hora.split(':');
    const horaParte = partes[0];
    const minutosParte = partes[1];

    // Formatear la hora y los minutos en formato de 24 horas
    const horaFormateada = `${horaParte}:${minutosParte}`;

    return horaFormateada;

  }

  formatFecha(fecha: string){
    return moment(fecha).format('DD/MM');
  }

  

  getSubEvento(id: any) {
    this.subEventoService.getEvento(id).subscribe((response) => {
      this.evento = response;
      console.log('response', response);
      this.dias = Object.keys(this.evento.subEventosPorDia);
      console.log('dias', this.dias);
      this.loading = false;
    });
  }
}
