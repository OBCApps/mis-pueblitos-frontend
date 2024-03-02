import { Routes } from '@angular/router';

import { HomeComponent } from './pages/modules/home/home.component';
import { NavarComponent } from './pages/navar/navar.component';
import { ViewPueblitoComponent } from './pages/modules/view-pueblito/view-pueblito.component';
import { ViewDepartmentComponent } from './pages/modules/view-department/view-department.component';
import { PueblitoDetailComponent } from './pages/modules/view-pueblito/pueblito-detail/pueblito-detail.component';
import { FestivitiesComponent } from './pages/modules/view-pueblito/festivities/festivities.component';
import { AboutUsComponent } from './pages/modules/about-us/about-us.component';
import { SubEventoDetailComponent } from './pages/modules/view-pueblito/festivities/sub-evento-detail/sub-evento-detail.component';
import { TipsViajerosComponent } from './pages/modules/view-pueblito/tips-viajeros/tips-viajeros.component';
import { ModalProveedoresFotosComponent } from './modal-proveedores-fotos/modal-proveedores-fotos/modal-proveedores-fotos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'pueblitos',
    component: ViewPueblitoComponent,
    data: { breadcrumb: 'pueblitos' },
    children: [
      {
        path: '',
        component: PueblitoDetailComponent,

      },
      {
        path: 'meet',
        component: PueblitoDetailComponent,
      },
      {
        path: 'subeventodetail',
        component: SubEventoDetailComponent,
        data: { breadcrumb: 'subeventodetail' }
      },
      {
        path: 'festivities',
        component: FestivitiesComponent,
        data: { breadcrumb: 'festivities' }
      },
      {
        path: 'tipsviajero',
        component: TipsViajerosComponent,
        data: { breadcrumb: 'tipsviajero' }
      },
    ],
  },
  {
    path: 'department',
    component: ViewDepartmentComponent,
    data: { breadcrumb: 'department' }
  },
  {
    path: 'about',
    component: AboutUsComponent,
    data: { breadcrumb: 'about' }
  },
  {
    path: 'modalfotos',
    component: ModalProveedoresFotosComponent,
    data: { breadcrumb: 'modalfotos' }
  }
];
