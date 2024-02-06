import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carusel',
  standalone: true,
  imports: [],
  templateUrl: './carusel.component.html',
  styleUrl: './carusel.component.scss'
})
export class CaruselComponent {
  @Input() events: any[] = [];
  ngOnInit(){
    console.log("INPUT", this.events);    
  }
}
