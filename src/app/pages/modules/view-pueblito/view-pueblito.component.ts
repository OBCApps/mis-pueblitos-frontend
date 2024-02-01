import { Component } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-pueblito',
  standalone: true,
  imports: [NavarComponent, CommonModule],
  templateUrl: './view-pueblito.component.html',
  styleUrl: './view-pueblito.component.scss'
})
export class ViewPueblitoComponent {

  view_sidebar : any = 'small'
  change_sidebar(value: any) {
    this.view_sidebar = value
  }
}
