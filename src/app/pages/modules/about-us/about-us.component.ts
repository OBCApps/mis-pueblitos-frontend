import { Component } from '@angular/core';
import { NavarComponent } from "../../navar/navar.component";
import { FooterComponent } from '../../footer/footer.component';

@Component({
    selector: 'app-about-us',
    standalone: true,
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    imports: [NavarComponent, FooterComponent]
})
export class AboutUsComponent {

}
