import { Component } from '@angular/core';
import { TitleService } from '../view-pueblito.service';

@Component({
  selector: 'app-lugares-turisticos',
  standalone: true,
  imports: [],
  templateUrl: './lugares-turisticos.component.html',
  styleUrl: './lugares-turisticos.component.scss'
})
export class LugaresTuristicosComponent {
  constructor(
    private titleService: TitleService,    
  ) { }

  ngOnInit() {
   

    const dataNavar = {
      sidebar: 'lugares-turisticos',
    };
    this.transferedDataToNavar(dataNavar);
  }

  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }
}
