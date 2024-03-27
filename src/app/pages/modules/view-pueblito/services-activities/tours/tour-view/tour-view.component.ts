import { Component } from '@angular/core';
import { ToursService } from '../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tour-view',
  standalone: true,
  imports: [],
  templateUrl: './tour-view.component.html',
  styleUrl: './tour-view.component.scss'
})
export class TourViewComponent {
  constructor(
    private readonly toursService: ToursService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ){}
  
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.agencia_name = params['agencia_name'];
      const tour_name = params['tour_name'];
      this.loading = true;
      this.loadTour(tour_name);
    });
  }
  agencia_name="";
  loading=false;
  tour: any;
  loadTour(tour_name: string) {
    this.toursService.get_tour_by_name_route(tour_name).subscribe(
      (data:any) => {
        this.tour = data;
        this.loading = false;
        console.log(this.tour);
      }, err => {
        this.loading = false;
        console.error(err);
      }
    );
  }

  gotoAgencia(){
    this.router.navigate(['home','Ancash','Chacas','servicios', 'tour', this.agencia_name]);
  }

}
