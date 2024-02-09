import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import moment from 'moment';
import { CaruselComponent } from '../carusel/carusel.component';
import { FestivitiesService } from '../../../../../services/festivities.service';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-calendar-desktop',
  standalone: true,
  imports: [CaruselComponent, FormsModule, CommonModule, CarouselModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  constructor(
    private festivitiesService: FestivitiesService,
    private router: Router,
  ) { }


  ngOnInit() {
    /* const data = {
      "mes": "2",
      "anio": "2024",
      "lugar": "97d1a344-6c48-422c-b790-e44f5a10497f"
    }
    console.log("sadf");
*/
    //this.getDataCalendar(data); 
    this.getDaysFromDate(this.mesElegido, this.anioElegido)
  }

  getDaysFromDate(month: any, year: any) {
    //this.monthSelect = []
    const data = {
      "mes": month.toString(),
      "anio": year.toString(),
      "lugar": "97d1a344-6c48-422c-b790-e44f5a10497f"
    }
    this.festivitiesService.search_events_dia(data).subscribe(
      (response: any) => {
        //this.functAgendaMes(response, month_selected)
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
            class: 'bg-blue-400',
            events: []
          };
        });
        this.dateSelect = startDate;
        //this.monthSelect = arrayDays;
        this.functAgendaMes(response, arrayDays)
      },
      err => {
      }
    )
  }
  //days_month: any[] = []
  getDataCalendar(data: any, month_selected: any) {
    this.festivitiesService.search_events_dia(data).subscribe(
      (response: any) => {
        this.functAgendaMes(response, month_selected)

      },
      err => {
      }
    )
  };

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




  functAgendaMes(days: any, month_selected: any) {
    const data = days;
    const result: any[] = [];

    month_selected.forEach((item1) => {
      const item2 = data.find((item2: any) => {
        let p1 = moment.utc(item2.fecha);
        let p2 = moment.utc(item1.fecha);
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

    //console.log("FINAL: ", this.monthSelect);
  }

  goToSubEventoDetail(item: any) {
    console.log("item: ", item);
    const queryParamsObject = {
      id_father: item.id_father,
    };
    this.router.navigate(['pueblitos/subeventodetail'], { queryParams: queryParamsObject });

  }
}
