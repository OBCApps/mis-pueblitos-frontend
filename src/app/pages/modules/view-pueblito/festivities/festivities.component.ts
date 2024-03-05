import { FestivitiesService } from './../../../../services/festivities.service';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CalendarDesktopComponent } from './calendar-desktop/calendar-desktop.component';
import { CalendarMobileComponent } from './calendar-mobile/calendar-mobile.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { CaruselComponent } from './carusel/carusel.component';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { SubEventoDetailComponent } from './sub-evento-detail/sub-evento-detail.component';
import { TitleService } from '../view-pueblito.service';
import { FormsModule } from '@angular/forms';
import { ModalRedesSocialesComponent } from '../../../../functions/modal-redes-sociales/modal-redes-sociales.component';

@Component({
  selector: 'app-festivities',
  standalone: true,
  imports: [
    CaruselComponent,
    CarouselModule,
    CalendarDesktopComponent,
    CalendarMobileComponent,
    CalendarListComponent,
    DetailEventComponent,
    SubEventoDetailComponent,
    FormsModule,
    ModalRedesSocialesComponent,
  ],
  templateUrl: './festivities.component.html',
  styleUrl: './festivities.component.scss',
})
export class FestivitiesComponent {
  constructor(
    private titleService: TitleService,
    private festivitiesService: FestivitiesService
  ) {}
  ngOnInit() {
    const dataNavar = {
      sidebar: 'festivities',
    };
    this.transferedDataToNavar(dataNavar);
  }
  modal_style="fixed w-full h-full inset-x-0 inset-y-0 global-center transition-all duration-1000 ease-in-out";
  close_modal() {
    this.modal_style="fixed w-full h-full inset-x-0 -top-full global-center transition-all duration-1000 ease-in-out";
  }

  tab_selected: any = 'calendar';
  change_tabs(type: any) {
    this.tab_selected = type;
  }
  transferedDataToNavar(value: any): void {
    console.log('CAMBIO');

    this.titleService.setTitle(value);
  }
  searchValue: string = '';
  search() {
    this.festivitiesService.search_evento_nombre({ name: this.searchValue }).subscribe(
      (response) => {
        console.log('response:', response);
      },
      (error) => {
        console.log('error:', error);
      }
    );
    console.log('search:', this.searchValue);
  }
}
