import { Component } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-view-pueblito',
  standalone: true,
  imports: [NavarComponent, CommonModule, RouterOutlet, RouterLink,FooterComponent],
  templateUrl: './view-pueblito.component.html',
  styleUrl: './view-pueblito.component.scss'
})
export class ViewPueblitoComponent {

  view_sidebar : boolean = false;
  change_sidebar() {
    this.view_sidebar = !this.view_sidebar 
  }
}
