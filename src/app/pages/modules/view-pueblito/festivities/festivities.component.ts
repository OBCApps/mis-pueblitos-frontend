import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CalendarDesktopComponent } from './calendar-desktop/calendar-desktop.component';
import { CalendarMobileComponent } from './calendar-mobile/calendar-mobile.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { CaruselComponent } from './carusel/carusel.component';

@Component({
  selector: 'app-festivities',
  standalone: true,
  imports: [CaruselComponent,  CarouselModule, CalendarDesktopComponent, CalendarMobileComponent, CalendarListComponent],
  templateUrl: './festivities.component.html',
  styleUrl: './festivities.component.scss'
})
export class FestivitiesComponent {
  tab_selected: any = 'calendar';
  change_tabs(type: any) {
    this.tab_selected = type;
  }
}
