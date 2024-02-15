import { Component } from '@angular/core';
import { LoadingService } from './loading-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loadings',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './loadings.component.html',
  styleUrls: ['./loadings.component.scss']
})
export class LoadingsComponent {
  constructor(public loadingService: LoadingService) {}

}
