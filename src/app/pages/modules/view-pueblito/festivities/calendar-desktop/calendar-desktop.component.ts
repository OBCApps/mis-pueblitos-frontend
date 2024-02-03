import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import moment from 'moment';
import { CaruselComponent } from '../carusel/carusel.component';

@Component({
  selector: 'app-calendar-desktop',
  standalone: true,
  imports: [ CaruselComponent,FormsModule, CommonModule, CarouselModule],
  templateUrl: './calendar-desktop.component.html',
  styleUrl: './calendar-desktop.component.scss'
})
export class CalendarDesktopComponent {
  anioElegido: any = new Date().getFullYear();
  mesElegido: any = new Date().getMonth() + 1;
  actualDay: any = new Date().getDate();
 
  monthSelect: any[] = []; // Los dias del mes a mostrar
  dateSelect: any; // La fecha que se estra traendo los dias a mostrar
  dateValue: any = new Date(); // La data seleccionada (el click)
  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ]; 
  ngOnInit() {
    this.getDaysFromDate(this.mesElegido, this.anioElegido)
  }

  getDaysFromDate(month: any, year: any) {
    console.log("fechas: ", month, year);

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        fecha: dayObject.format(),
        class: ''
      };
    });

    this.monthSelect = arrayDays;
    //this.functAgendaMes()
    console.log("mes seleccionado", this.monthSelect);
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
  esDaySelect(fecha01: any, fecha02: any): boolean {
    let fecha1 = new Date(fecha01);

    // crear una nueva fecha con solo año, mes y día
    let fecha2 = new Date(fecha02);

    // establecer la hora, los minutos y los segundos en cero
    fecha1.setHours(0, 0, 0, 0);
    fecha2.setHours(0, 0, 0, 0);

    return fecha1.getTime() === fecha2.getTime() ? true : false;
  }
  years = [2020, 2021, 2022, 2023]
  months = [{ index: 1, name: 'Enero' }, { index: 2, name: 'Febrero' }, { index: 3, name: 'Marzo' }, { index: 4, name: 'Abril' }, { index: 5, name: 'Mayo' }, { index: 6, name: 'Junio' }, { index: 7, name: 'Julio' }, { index: 8, name: 'Agosto' }, { index: 9, name: 'Septiembre' }, { index: 10, name: 'Octubre' }, { index: 11, name: 'Noviembre' }, { index: 12, name: 'Diciembre' }];
  diasAtendidos: any = "font-normal px-1 rounded h-8 text-sm 2xl:text-xl 2xl:h-14 mx-2 my-1 bg-green-300 border-green-500 flex justify-center items-center text-white  hover:border-green-500 hover:text-green-500 cursor-pointer";

  functAgendaMes() {
    console.log('  functAgendaMes(){');
    const data = {
      "anio": this.anioElegido,
      "mes": this.mesElegido,
      "dia": this.actualDay,
      "medico": "1001177",
      "sucursal": "0001",
      "unidadNegocio": "0001",
      "compania": "01000000",
      "unidadReplicacion": "LIMA"
    }

    /* this.DoctorService.getAgendaMes(data).subscribe(data => {

      this.asgendaMes = data;
      console.log("Agenda mes", this.asgendaMes);

      const result: any[] = [];
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
      const diaActual = fechaActual.getDate();
      const anioActual = fechaActual.getFullYear();
      this.monthSelect.forEach((item1) => {
        const item2 = this.asgendaMes.find((item2: any) => {
          let p1 = new Date(Date.parse(item2.dias));
          let p2 = new Date(Date.parse(item1.fecha));
          return p1.getFullYear() === p2.getFullYear() && p1.getMonth() === p2.getMonth() && p1.getDate() === p2.getDate();
        });
        if (item2) {
          result.push({
            idHorario: item2.idHorario,
            idMedico: item2.idMedico,
            dias: item2.dias,       
            class: this.diasAtendidos,
            name: item1.name,
            value: item1.value,
            indexWeek: item1.indexWeek,
            fecha: item1.fecha
          });

        } else {
          result.push({
            idHorario: null,
            idMedico: null,
            dias: null,          
            class: this.diasValidos,
            name: item1.name,
            value: item1.value,
            indexWeek: item1.indexWeek,
            fecha: item1.fecha
          });

        }
      });      

      console.log("Resultado final fechas: ", result);

      this.monthSelect = result;
    }) */



  }

}
