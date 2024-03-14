import { Component } from '@angular/core';
import { TitleService } from '../view-pueblito.service';

@Component({
  selector: 'app-services-activities',
  standalone: true,
  imports: [],
  templateUrl: './services-activities.component.html',
  styleUrl: './services-activities.component.scss'
})
export class ServicesActivitiesComponent {
  constructor(
    private titleService: TitleService,    
  ) { }

  ngOnInit() {
   

    const dataNavar = {
      sidebar: 'servicios',
    };
    this.transferedDataToNavar(dataNavar);
  }

  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }
}
