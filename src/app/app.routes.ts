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

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  
  {
    path: 'home/:departamento',
    component: ViewDepartmentComponent,
  },
  {
    path: 'home/:departamento/:lugar',
    component: ViewPueblitoComponent,
    children: [
      {
        path: '',
        component: PueblitoDetailComponent,
      },
      {
        path: 'meet',
        component: PueblitoDetailComponent,
      },
      /* {
        path: ':eventoDetalle',
        component: SubEventoDetailComponent,
      }, */
      {
        path: 'festividades',
        component: FestivitiesComponent,
      },
      {
        path: 'festividades/:eventoDetalle',
        component: SubEventoDetailComponent,
      },
      {
        path: 'tips-viajero',
        component: TipsViajerosComponent,
      },
    ],
  },
  
  {
    path: 'about',
    component: AboutUsComponent,
  },

];
