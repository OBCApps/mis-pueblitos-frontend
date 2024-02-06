import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Carousel } from 'flowbite';

@Component({
  selector: 'app-carusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carusel.component.html',
  styleUrl: './carusel.component.scss'
})
export class CaruselComponent {
  @Input() events: any[] = [];
  @Input() uniqueID: any;
  /* ngOnInit(){
    console.log("INPUT", this.events);    
  } */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  carusel_form: any;
  ngOnInit() {
    setTimeout(() => {
      this.activateCarusel()
    }, 200);
  }

  activateCarusel() {
    if (isPlatformBrowser(this.platformId)) {
      const carouselElement = document.getElementById(`carousel-example-${this.uniqueID}`);
      if (carouselElement) {


        const items = this.events.map((item, index) => ({
          position: index,
          el: document.getElementById(`carousel-item-${this.uniqueID}-${index + 1}`),
        }));

        const options = {
          defaultPosition: 0,
          interval: 3000,

          indicators: {
            activeClasses: 'bg-white dark:bg-gray-800',
            inactiveClasses:
              'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
            items: this.events.map((item, index) => ({
              position: index,
              el: document.getElementById(`carousel-indicator-${this.uniqueID}-${index + 1}`),
            }))
          },

          // callback functions
          onNext: () => {
            //console.log('next slider item is shown');
          },
          onPrev: () => {
            //console.log('previous slider item is shown');
          },
          onChange: () => {
            //console.log('new slider item has been shown');
          },
        };

        // instance options object
        const instanceOptions = {
          id: `carousel-example-${this.uniqueID}`,
          override: true
        };
        this.carusel_form = new Carousel(carouselElement, items, options, instanceOptions);
        this.carusel_form.cycle();
      }
    }

  }


  prev(): void {
    this.carusel_form.prev();
  }

  next(): void {
    this.carusel_form.next();
  }
}
