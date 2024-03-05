import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { LugarService } from '../../../services/lugar.service';
import { TitleService } from './view-pueblito.service';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalProveedorComponent } from '../../../functions/modal-proveedor/modal-proveedor.component';
import { ModalProveedoresFotosService } from '../../../modal-proveedores-fotos/modal-proveedores-fotos/modal-proveedores-fotos.service';
import { ModalProveedorService } from '../../../functions/modal-proveedor/modal-proveedor.service';

@Component({
  selector: 'app-view-pueblito',
  standalone: true,
  imports: [
    NavarComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    FooterComponent,
    NgClass,
    BreadCrumbComponent,
    ModalProveedorComponent
  ],
  templateUrl: './view-pueblito.component.html',
  styleUrl: './view-pueblito.component.scss',
})
export class ViewPueblitoComponent implements OnInit {
  sideSelected: any = 'relative flex items-center space-x-4 border-b border-black from-sky-600 to-cyan-400 px-4 py-3 text-black'
  sideNotSelected: any = 'bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600'

  textSelected: any = '-mr-1 font-medium';
  textNotSelected: any = 'group-hover:text-gray-700';
  constructor(
    private lugarService: LugarService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private modalProveedorFotos : ModalProveedorService
  ) { }
  title: any = '';

  ngOnInit() {
    this.loading = true;
    if (typeof localStorage !== 'undefined') {
      this.lugarDetalle = localStorage.getItem('lugar');
      this.lugarDetalle = JSON.parse(this.lugarDetalle);
    }
    this.titleService.title$.subscribe((newTitle: any) => {
      setTimeout(() => {
        this.updateTitle(newTitle.sidebar);
      });
    });


  }

  view_sidebar: boolean = false;
  change_sidebar() {
    this.view_sidebar = !this.view_sidebar;
  }

  loading = false;
  lugarDetalle: any = {};
  private updateTitle(newTitle: any) {
    this.title = newTitle;
    console.log("titel", this.title);

  }


  // --------- OPTIONS MOBILE ------------- \\
  active : boolean = false;
  clickActiveModal(change : any){
    console.log(
      "change", change
    );
    
    this.active = change;
  }
  viewProveedorImage(item){
    var data = {
      option: 'open',
      valueInput: item
    }
    console.log("data: ", data);
    
    this.modalProveedorFotos.activateModal(data);
  }
}
