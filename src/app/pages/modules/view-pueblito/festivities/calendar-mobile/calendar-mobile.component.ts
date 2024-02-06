import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import moment from 'moment';
import { CarouselModule } from 'primeng/carousel';
import { CaruselComponent } from '../carusel/carusel.component';

@Component({
  selector: 'app-calendar-mobile',
  standalone: true,
  imports: [CarouselModule, NgFor , CaruselComponent],
  templateUrl: './calendar-mobile.component.html',
  styleUrl: './calendar-mobile.component.scss'
})
export class CalendarMobileComponent {

  anioElegido: any = new Date().getFullYear();
  mesElegido: any = new Date().getMonth() + 1;
  actualDay: any = new Date().getDate();

  monthSelect: any[] = []; // Los dias del mes a mostrar
  dateSelect: any; // La fecha que se esta traendo los dias a mostrar

  week: any = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  ngOnInit() {
    this.getDaysFromDate(this.mesElegido, this.anioElegido)
  }

  getDaysFromDate(month: any, year: any) { // Trae todos los dias del mes
    console.log("fechas: ", month, year);

    const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD')
    const endDate = startDate.clone().endOf('month')

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`, 'YYYY-MM-DD');
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        fecha: dayObject.format(),
        class: 'bg-blue-400'
      };
    });
    this.dateSelect = startDate;
    this.monthSelect = arrayDays;
    console.log("mes seleccionado", this.monthSelect);
    this.functAgendaMes()
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.anioElegido = Number(prevDate.format("YYYY")); this.mesElegido = Number(prevDate.format("MM"));
      console.log(this.mesElegido);
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.anioElegido = Number(nextDate.format("YYYY")); this.mesElegido = Number(nextDate.format("MM"));
      console.log(this.mesElegido);

      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  days_month = [
    {
      fecha: '2024-02-01',
      events: [
        {
          name_subevent: 'Dia Central Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          name_subevent: 'Aniversario Amauta Atusparia',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]
    },
    {
      fecha: '2024-02-02',
      events: [
        {
          name_subevent: 'Carrera de Cientas Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          name_subevent: '1ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]
    },
    {
      fecha: '2024-02-03',
      events: [
        {
          name_subevent: '2ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          name_subevent: '3ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]
    },
    {
      fecha: '2024-02-14',
      events: [
        {
          name_subevent: '2ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          name_subevent: '3ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]
    },
    {
      fecha: '2024-02-15',
      events: [
        {
          name_subevent: '2ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          name_subevent: '3ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]
    },
    {
      fecha: '2024-02-28',
      events: [
        {
          name_subevent: '2ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          name_subevent: '3ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]
    },
    {
      fecha: '2024-02-22',
      events: [
        {
          name_subevent: '2ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
        {
          name_subevent: '3ra Tarde Taurina Chacas',
          name_father: 'Fiesta Patronal Chacas',
          location: 'Chacas',
          range_subevent: "18/01 - 25/01",
        },
      ]
    }

  ]

  functAgendaMes() {
    const data = this.days_month;
    const result: any[] = [];

    this.monthSelect.forEach((item1) => {
      const item2 = data.find((item2: any) => {
        let p1 = moment.utc(item2.fecha);
        let p2 = moment.utc(item1.fecha);        
        // Comparar fechas con Moment.js
        return p1.isSame(p2, 'day');
      });

      if (item2) { // ENCONTRADO
        result.push({
          events: item2.events,
          class: 'A',
          name: item1.name,
          value: item1.value,
          indexWeek: item1.indexWeek,
          fecha: item1.fecha
        });
      } else { // NO ENCONTRADO
        result.push({
          events: [],
          class: '----',
          name: item1.name,
          value: item1.value,
          indexWeek: item1.indexWeek,
          fecha: item1.fecha
        });
      }
    });

    this.monthSelect = result;
    console.log("FINAL: ", this.monthSelect);
  }

  viewDaysParts : any [] = []
  partHorario (item : any ){
    
    this.viewDaysParts =  this.monthSelect.filter(i => {
      const dia = new Date(i.fecha).getDate();
      return dia >= item.value && dia < item.value + 6;
    });
    console.log(this.viewDaysParts);
    
  }
}
