import { Component } from '@angular/core';
import { EventoService } from '../../../../../services/subeventodetail.service';
import { DtoSubEvento, ListSubEventos } from './entities/DtoSubEvento';
import moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-sub-evento-detail',
  standalone: true,
  imports: [],
  templateUrl: './sub-evento-detail.component.html',
  styleUrl: './sub-evento-detail.component.scss',
})
export class SubEventoDetailComponent {
  constructor(private readonly subEventoService: EventoService) {}
  dia: any = 'Sábado';
  evento: DtoSubEvento = new DtoSubEvento();
  loading: Boolean = false;
  list_sub_eventos: ListSubEventos[] = [];

  ngOnInit() {
    this.loading = true;
    this.getSubEvento('7c5cb606-d304-4197-a8fc-fc204b404366');
  }

  getSubEvento(id: any) {
    this.subEventoService.getEvento(id).subscribe((response) => {
      this.evento = response;
      this.evento.subEventos.forEach((subEvento) => {
        const date = moment(subEvento.dia).toDate();
        const diaSemana = moment(date).locale('es').format('dddd');
        const diaMes = moment(date).locale('es').format('D [de] MMMM');
        const formattedDate = `${diaSemana} ${diaMes}`;
        const existingEventIndex = this.list_sub_eventos.findIndex(
          (evento) => evento.fecha === formattedDate
        );
        if (existingEventIndex !== -1) {
          this.subEventoService
            .getSubEvento(subEvento.id)
            .subscribe((response) => {
              for (let i = 0; i < response.subEventoDetalles.length; i++) {
                response.subEventoDetalles[i].horaInicio = `${
                  response.subEventoDetalles[i].horaInicio.split(':')[0]
                }:${response.subEventoDetalles[i].horaInicio.split(':')[1]}`;
              }
              this.list_sub_eventos[existingEventIndex].subEventoDetalles.push(
                ...response.subEventoDetalles
              );
            });
        } else {
          this.subEventoService
            .getSubEvento(subEvento.id)
            .subscribe((response) => {
              for (let i = 0; i < response.subEventoDetalles.length; i++) {
                response.subEventoDetalles[i].horaInicio = `${
                  response.subEventoDetalles[i].horaInicio.split(':')[0]
                }:${response.subEventoDetalles[i].horaInicio.split(':')[1]}`;
              }
              this.list_sub_eventos.push({
                fecha: formattedDate,
                subEventoDetalles: response.subEventoDetalles,
              });
            });
        }
      });
      console.log(this.list_sub_eventos);
      this.loading = false;
    });
  }
}
