import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pueblito-detail',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './pueblito-detail.component.html',
  styleUrl: './pueblito-detail.component.scss'
})
export class PueblitoDetailComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.loading = true;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lugar')) {
        this.lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
      }
    }
    console.log('PueblitoDetailComponent:', this.lugarDetalle);
    this.loading = false;
  }

  loading = false;
  lugarDetalle: any = {};
}

