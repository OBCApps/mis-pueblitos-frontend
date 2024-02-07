import { Component, OnInit } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { CommonModule } from '@angular/common';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    if (localStorage.getItem('lugar')) {
      this.lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
    } else {
      this.route.queryParams.subscribe((params) => {
        console.log('Params:', params);
        const id = params['id'];
        if (this.esUID(id)) {
          this.load_lugar(id);
        }
        console.log('ID del pueblo:', id);
      });
    }

    console.log('PueblitoDetailComponent:', this.lugarDetalle);
    this.loading = false;
  }

  view_sidebar: boolean = false;
  change_sidebar() {
    this.view_sidebar = !this.view_sidebar;
  }

  loading = false;
  lugarDetalle: any = {};
  esUID(texto: string): boolean {
    const regexUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexUID.test(texto);
  }

  load_lugar(id: any) {
    this.loading = true;
    this.lugarService.getLugares(id).subscribe(
      (response: any) => {
        this.lugarDetalle = response;
        localStorage.setItem('lugar', JSON.stringify(this.lugarDetalle));
        console.log('Lugar:', localStorage.getItem('lugar'));
        this.loading = false;
      },
      (err) => {
        console.log('Error:', err);
        this.loading = false;
      }
    );
  }
}
