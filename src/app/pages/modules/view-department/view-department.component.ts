import { Component } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDepartmentService } from './view-department.service';
import { DtoViewDepartmentAndLugares } from './structures/DtoViewDepartmentAndLugares';
import { LugarService } from '../../../services/lugar.service';
import { FooterComponent } from "../../footer/footer.component";
import { BreadCrumbComponent } from '../../bread-crumb/bread-crumb.component';

@Component({
    selector: 'app-view-department',
    standalone: true,
    templateUrl: './view-department.component.html',
    styleUrl: './view-department.component.scss',
    imports: [NavarComponent, FooterComponent,BreadCrumbComponent]
})
export class ViewDepartmentComponent {
  constructor(
    private route: ActivatedRoute,
    private viewDepartmentService: ViewDepartmentService,
    private lugarService: LugarService,
    private router: Router

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const departmentId = params['departmentId'];
      this.load_department_lugares(departmentId);
    });
  }

  departmentAndLugares: DtoViewDepartmentAndLugares = new DtoViewDepartmentAndLugares()
  load_department_lugares(idDepartamento: any) {
    this.viewDepartmentService.get_list_lugaresDepartment(idDepartamento).subscribe(
      response => {
        this.departmentAndLugares = response;

      }, err => {

      }
    )
  }

  goToRoute(idLugar: any) {
    this.lugarService.getLugares(idLugar).subscribe(
      (response: any) => {
        localStorage.setItem('lugar', JSON.stringify(response));
        this.router.navigate(['/pueblitos']);
      },
      (err) => {
        console.log('Error:', err);
      }
    );

  }
}
