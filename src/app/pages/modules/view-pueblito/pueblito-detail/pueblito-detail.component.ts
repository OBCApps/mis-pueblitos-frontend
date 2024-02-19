import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { isPlatformBrowser } from '@angular/common';
import { TitleService } from '../view-pueblito.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pueblito-detail',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './pueblito-detail.component.html',
  styleUrl: './pueblito-detail.component.scss'
})
export class PueblitoDetailComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loading = true;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lugar')) {
        this.lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
        this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(this.lugarDetalle.video);
      }
    }
    console.log('PueblitoDetailComponent:', this.lugarDetalle);
    this.loading = false;

    // Set value sidebar
    const dataNavar = {
      sidebar : 'location'
    }
    this.transferedDataToNavar(dataNavar)
  }

  loading = false;
  lugarDetalle: any = {};
  urlSegura: any = '';
  transferedDataToNavar(value : any): void {
    console.log("CAMBIO");

    this.titleService.setTitle(value);
  }
  responsiveOptions = [

    {
      breakpoint: '1536px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}

