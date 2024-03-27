import { Component } from '@angular/core';
import { ToursService } from '../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agencia-view',
  standalone: true,
  imports: [],
  templateUrl: './agencia-view.component.html',
  styleUrl: './agencia-view.component.scss',
})
export class AgenciaViewComponent {
  constructor(
    private readonly toursService: ToursService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  loading = false;
  agencia: any;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const agencia_name = params['agencia_name'];
      this.loading = true;
      this.toursService.get_agencia_by_name_route(agencia_name).subscribe(
        (data: any) => {
          this.agencia = data;
          this.loading = false;
          console.log(this.agencia);
        },
        (err) => {
          this.loading = false;
          console.error(err);
        }
      );
    });
  }

  getKeysObject(obj: any) {
    return Object.keys(obj);
  }
}
