import { HotelesService } from '../../../../services/hoteles.service';
import { Component } from '@angular/core';
import { DtoHoteles } from './entities/DtoHoteles';

@Component({
  selector: 'app-hoteles',
  standalone: true,
  imports: [],
  templateUrl: './hoteles.component.html',
  styleUrl: './hoteles.component.scss'
})
export class HotelesComponent {
  constructor( private readonly hotelesService:HotelesService) {}

  hoteles: DtoHoteles[] = [];

  ngOnInit() {
    this.getHoteles();
  }


  getHoteles() {
    this.hotelesService.get_hoteles().subscribe((response) => {
      this.hoteles = response;
      console.log('response', response);
    });
  }


}
