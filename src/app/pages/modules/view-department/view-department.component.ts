import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDepartmentService } from './view-department.service';
import { DtoViewDepartmentAndLugares } from './structures/DtoViewDepartmentAndLugares';
import { LugarService } from '../../../services/lugar.service';
import { FooterComponent } from "../../footer/footer.component";
import { BreadCrumbComponent } from '../view-pueblito/bread-crumb/bread-crumb.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoadingService } from '../../../functions/loadings/loading-service.service';

@Component({
  selector: 'app-view-department',
  standalone: true,
  templateUrl: './view-department.component.html',
  styleUrl: './view-department.component.scss',
  imports: [NavarComponent, FooterComponent, BreadCrumbComponent, CommonModule]
})
export class ViewDepartmentComponent {
  constructor(
    private route: ActivatedRoute,
    private viewDepartmentService: ViewDepartmentService,
    private lugarService: LugarService,
    private router: Router,
    private loading: LoadingService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  breadcrumbs: any[] = []
  departmentNameRoute : any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.departmentNameRoute = params['departamento'];

      this.loadDataDepartment(this.departmentNameRoute);

    });


    /* if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lugar')) {
        const lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
        


        this.breadcrumbs = [
          {
            name: 'Inicio',
            route: '/home',
            params: null,
            selected : false
          },
          {
            name: lugarDetalle.departamentoNombre,
            route: '/department',
            params: lugarDetalle.departamentoId,
            selected : true
          },
          
        ]
        console.log("LIsta", this.breadcrumbs);
      }
    } */
  }

  async loadDataDepartment(nameRouteDepartment: any) {
    this.loading.show();
    // -- Load Datos Departamento
    try {
      const datosDeparamento = await this.getDatosDepartment(nameRouteDepartment);
      this.load_department_lugares(datosDeparamento.id)
    } catch (error) {
      console.error('Error al obtener datos del proveedor:', error);
      this.loading.hide();
    }
  }

  getDatosDepartment(idProveedor: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.viewDepartmentService.get_departament_name_route(idProveedor).subscribe(
        (respuesta: any) => {
          resolve(respuesta);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  departmentAndLugares: DtoViewDepartmentAndLugares = new DtoViewDepartmentAndLugares()
  load_department_lugares(idDepartamento: any) {
    this.viewDepartmentService.get_list_lugaresDepartment(idDepartamento).subscribe(
      response => {
        this.departmentAndLugares = response;
        this.loading.hide();
      }, err => {
        this.loading.hide();
      }
    )
  }

  goToRoute(lugar: any) {
    console.log("lugar", lugar);
    this.router.navigate(['home', this.departmentNameRoute, lugar.name_route]);
    /* this.lugarService.getLugares(lugar.id).subscribe(
      (response: any) => {
        
        this.router.navigate(['home', this.departmentNameRoute, lugar.name_route]);
      },
      (err) => {
        console.log('Error:', err);
      }
    ); */

  }
}
