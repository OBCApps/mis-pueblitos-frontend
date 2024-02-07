import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-pueblito-detail',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './pueblito-detail.component.html',
  styleUrl: './pueblito-detail.component.scss'
})
export class PueblitoDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loading = true;
    if (localStorage.getItem('lugar')) {
      this.lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
    }
    console.log('PueblitoDetailComponent:', this.lugarDetalle);
    this.loading = false;
  }

  loading = false;
  lugarDetalle: any = {};
}

