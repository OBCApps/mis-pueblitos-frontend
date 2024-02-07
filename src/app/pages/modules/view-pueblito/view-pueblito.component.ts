import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { LugarService } from '../../../services/lugar.service';

@Component({
  selector: 'app-view-pueblito',
  standalone: true,
  imports: [
    NavarComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    FooterComponent,
  ],
  templateUrl: './view-pueblito.component.html',
  styleUrl: './view-pueblito.component.scss',
})
export class ViewPueblitoComponent implements OnInit {
  constructor(
    private lugarService: LugarService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.loading = true;

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lugar')) {
        this.lugarDetalle = JSON.parse(localStorage.getItem('lugar'));
      }
      console.log('PueblitoDetailComponent:', this.lugarDetalle);
    }

    this.loading = false;
  }

  view_sidebar: boolean = false;
  change_sidebar() {
    this.view_sidebar = !this.view_sidebar;
  }

  loading = false;
  lugarDetalle: any = {};

}
