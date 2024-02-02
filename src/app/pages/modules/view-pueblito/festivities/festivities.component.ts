import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-festivities',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './festivities.component.html',
  styleUrl: './festivities.component.scss'
})
export class FestivitiesComponent {
  responsiveOptions = [

    {
      breakpoint: '1536px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}
