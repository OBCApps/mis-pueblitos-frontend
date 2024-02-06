import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import moment from 'moment';
import { CaruselComponent } from '../carusel/carusel.component';

@Component({
  selector: 'app-calendar-desktop',
  standalone: true,
  imports: [CaruselComponent, FormsModule, CommonModule, CarouselModule],
  templateUrl: './calendar-desktop.component.html',
  styleUrl: './calendar-desktop.component.scss'
})
export class CalendarDesktopComponent {
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



  diasAtendidos: any = "font-normal px-1 rounded h-8 text-sm 2xl:text-xl 2xl:h-14 mx-2 my-1 bg-green-300 border-green-500 flex justify-center items-center text-white  hover:border-green-500 hover:text-green-500 cursor-pointer";
  diasValidos: any = "font-bold px-1 rounded h-8 text-sm 2xl:text-xl 2xl:h-14 mx-2 my-1 bg-green-300 border-green-500 flex justify-center items-center text-white  hover:border-green-500 hover:text-green-500 cursor-pointer";


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
        console.log("P1", p1);
        console.log("P2", p2);

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

}
