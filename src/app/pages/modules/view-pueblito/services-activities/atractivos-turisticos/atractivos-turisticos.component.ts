import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtractivoTuristicoService } from '../../../../../services/atractivos-turisticos.service';
import { DtoAtractivo, DtoAtractivos } from './entities/DtoAtractivos';

@Component({
  selector: 'app-atractivos-turisticos',
  standalone: true,
  imports: [],
  templateUrl: './atractivos-turisticos.component.html',
  styleUrl: './atractivos-turisticos.component.scss',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtractivosTuristicosComponent {
  constructor(
    private atractivoTuristicoService: AtractivoTuristicoService,
    private readonly route: ActivatedRoute
  ) {}
  name_route = '';
  dtoAtractivoTuristicoInfo: DtoAtractivo = new DtoAtractivo();
  loading = false;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const atractivo_name = params['atractivo_name'];
      this.loading = true;
      this.atractivoTuristicoService.get_atractivos_turisticos_by_name_route(atractivo_name).subscribe(
        (data: any) => {
          this.dtoAtractivoTuristicoInfo = data;
          this.loading = false;
          console.log(this.dtoAtractivoTuristicoInfo);
        },
        (err) => {
          this.loading = false;
          console.error(err);
        }
      );
    });
  }

  get_Keys(obj: any) {
    if (obj === undefined || obj === null) {
      return [];
    } else {
      return Object.keys(obj);
    }
  }
}
