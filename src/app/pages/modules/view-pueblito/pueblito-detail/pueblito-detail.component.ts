import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { isPlatformBrowser } from '@angular/common';
import { TitleService } from '../view-pueblito.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalProveedorService } from '../../../../functions/modal-proveedor/modal-proveedor.service';
import { ModalProveedorComponent } from '../../../../functions/modal-proveedor/modal-proveedor.component';

@Component({
  selector: 'app-pueblito-detail',
  standalone: true,
  imports: [CarouselModule, ModalProveedorComponent],
  templateUrl: './pueblito-detail.component.html',
  styleUrl: './pueblito-detail.component.scss',
})
export class PueblitoDetailComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    private modalProveedorFotos: ModalProveedorService,
  ) {}

  ngOnInit() {
    this.loading = true;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lugar')) {
        this.lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
        if (this.lugarDetalle.video) {
          this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.lugarDetalle.video.url
          );
        }
      }
    }
    console.log('PueblitoDetailComponent:', this.lugarDetalle);
    this.loading = false;

    // Set value sidebar
    const dataNavar = {
      sidebar: 'location',
    };
    this.transferedDataToNavar(dataNavar);
  }

  loading = false;
  lugarDetalle: any = {};
  urlSegura: any = this.sanitizer.bypassSecurityTrustResourceUrl("");
  transferedDataToNavar(value: any): void {
    console.log('CAMBIO');

    this.titleService.setTitle(value);
  }
  responsiveOptions = [
    {
      breakpoint: '1536px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1,
    },
  ];


  // ---------- VER LOS DATOS DEL PROVEEDOR ------------- \\4
  viewProveedorImage(item){
    var data = {
      option: 'open',
      valueInput: item
    }
    console.log("data: ", data);
    
    this.modalProveedorFotos.activateModal(data);
  }
}
