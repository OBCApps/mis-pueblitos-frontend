import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-list',
  standalone: true,
  imports: [DatePipe, NgFor],
  templateUrl: './calendar-list.component.html',
  styleUrl: './calendar-list.component.scss'
})
export class CalendarListComponent {
  days_month = [
    {
      fecha: '2024-08-01',
      events: [
        {
          day : '2024-08-14',
          name_subevent: 'Dia Central Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          day : '2024-08-16',
          name_subevent: 'Carrera de Cientas Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          day : '2024-08-17',
          name_subevent: '1ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          day : '2024-08-17',
          name_subevent: '2ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          day : '2024-08-17',
          name_subevent: '3ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]

    },
    {
      fecha: '2024-09-01',
      events: [
        {
          day : '2024-09-28',
          name_subevent: 'Dia Central San Miguel',
          name_father: 'Fiesta Patronal San Miguel',
          location: 'Chinchurajra San Miguel',          
          range_subevent: "18/01 - 25/01",
        },
        {
          day : '2024-09-29',
          name_subevent: 'Carrera de Cientas San Miguel',
          name_father: 'Fiesta Patronal San Miguel',
          location: 'Chinchurajra San Miguel',
          range_subevent: "18/01 - 25/01",
        },
        {
          day : '2024-09-31',
          name_subevent: '1ra Tarde Taurina  San Miguel',
          name_father: 'Fiesta Patronal San Miguel',
          location: 'Chinchurajra San Miguel',
          range_subevent: "18/01 - 25/01",
        },        
      ]

    } ,
    {
      fecha: '2024-10-01',
      events : [
        {
          day : '2024-10-01',
          name_subevent: '2ra Tarde Taurina  San Miguel',
          name_father: 'Fiesta Patronal San Miguel',
          location: 'Chinchurajra San Miguel',
          range_subevent: "18/01 - 25/01",
        },
        {
          day : '2024-10-02',
          name_subevent: '3ra Tarde Taurina  San Miguel',
          name_father: 'Fiesta Patronal San Miguel',
          location: 'Chinchurajra San Miguel',
          range_subevent: "18/01 - 25/01",
        },
      ]
    }

  ]
}
