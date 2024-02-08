import { Component } from '@angular/core';
import { SubEventoDetailService } from '../../../../../services/subeventodetail.service';

@Component({
  selector: 'app-sub-evento-detail',
  standalone: true,
  imports: [],
  templateUrl: './sub-evento-detail.component.html',
  styleUrl: './sub-evento-detail.component.scss'
})
export class SubEventoDetailComponent {
  constructor(private readonly subEventoService:SubEventoDetailService) {}
  dia: any = "Sábado";
  subEvento:any = {};
  loading: Boolean = false;
  ngOnInit() {
    this.loading = true;
    this.getSubEvento('f6ea26a4-2c9b-4990-a12e-835777f5d897');
    this.loading = false;
    console.log("subevento:",this.subEvento);

  }


  getSubEvento(id:any){
    this.subEventoService.getSubEvento(id).subscribe((response) => {
      this.subEvento = response;
    });
  }

}
