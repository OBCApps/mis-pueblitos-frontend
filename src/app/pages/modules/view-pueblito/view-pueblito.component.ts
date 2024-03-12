import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { LugarService } from '../../../services/lugar.service';
import { TitleService } from './view-pueblito.service';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalProveedorComponent } from '../../../functions/modal-proveedor/modal-proveedor.component';
import { ModalProveedorService } from '../../../functions/modal-proveedor/modal-proveedor.service';
import { ModalRedesSocialesComponent } from '../../../functions/modal-redes-sociales/modal-redes-sociales.component';
import { stringify } from 'querystring';
import { LoadingService } from '../../../functions/loadings/loading-service.service';

@Component({
  selector: 'app-view-pueblito',
  standalone: true,
  imports: [
    NavarComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    FooterComponent,
    NgClass,
    BreadCrumbComponent,
    ModalProveedorComponent,
    ModalRedesSocialesComponent,
  ],
  templateUrl: './view-pueblito.component.html',
  styleUrl: './view-pueblito.component.scss',
})
export class ViewPueblitoComponent implements OnInit {
  sideSelected: any = 'relative flex items-center space-x-4 border-b border-black from-sky-600 to-cyan-400 px-4 py-3 text-black'
  sideNotSelected: any = 'bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600 cursor-pointer'

  textSelected: any = '-mr-1 font-medium';
  textNotSelected: any = 'group-hover:text-gray-700 cursor-pointer';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private lugarService: LugarService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private modalProveedorFotos: ModalProveedorService,
    private router: Router,
    private loading : LoadingService
  ) { }
  title: any = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const departamento = params['departamento'];
      const lugar = params['lugar'];


      this.loadLugarDetalles(lugar)
    });

    /* if (typeof localStorage !== 'undefined') {
      this.lugarDetalle = localStorage.getItem('lugar');
      this.lugarDetalle = JSON.parse(this.lugarDetalle);
    } */

    this.titleService.title$.subscribe((newTitle: any) => {
      setTimeout(() => {
        this.updateTitle(newTitle.sidebar);
      });
    });


  }
  finalRpta: any;
  loadLugarDetalles(lugar: any) {
    this.loading.show();
    this.lugarService.getLugarByNameRoute(lugar).subscribe(
      rpta => {
        this.lugarDetalle = rpta;

        // TRAER TODOS LOS DATOS DEL LUGAR
        this.lugarService.getLugares(rpta.id).subscribe(
          rpta => {
            if (isPlatformBrowser(this.platformId)) {
              rpta['diaCalendario'] = {
                anioElegido :  new Date().getFullYear(),
                mesElegido :  new Date().getMonth() + 1
              }
              localStorage.setItem('lugar', JSON.stringify(rpta))
              this.finalRpta = rpta
            }
            this.loading.hide();
          }, error => {
            this.loading.hide();
          }
        );


      },
      (error) => {
        console.log("erro");
        this.loading.hide();
      }
    )

  }

  // -------- TITLE SELECTED NAVAR ----------- \\
  lugarDetalle: any = {};
  private updateTitle(newTitle: any) {
    this.title = newTitle;
    console.log("titel", this.title);

  }


  // --------- OPTIONS MOBILE ------------- \\
  active: boolean = false;
  clickActiveModal(change: any) {
    console.log(
      "change", change
    );

    this.active = change;
  }
  viewProveedorImage(item) {
    var data = {
      option: 'open',
      valueInput: item
    }
    console.log("data: ", data);

    this.modalProveedorFotos.activateModal(data);
  }

  // ------ GO TO ROUTE SELECTED ----------- \\
  goToRoute(departament: any, lugar: any, action: any) {
    this.router.navigate(['home', departament, lugar, action])
  }

  goToInit(departament: any, lugar: any) {
    this.router.navigate(['home', departament, lugar])
  }
}
