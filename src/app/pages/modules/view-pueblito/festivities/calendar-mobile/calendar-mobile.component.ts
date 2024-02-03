import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-calendar-mobile',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './calendar-mobile.component.html',
  styleUrl: './calendar-mobile.component.scss'
})
export class CalendarMobileComponent {

}
