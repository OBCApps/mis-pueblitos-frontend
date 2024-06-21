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
import { ServicesActivitiesComponent } from './pages/modules/view-pueblito/services-activities/services-activities.component';
import { LugaresTuristicosComponent } from './pages/modules/view-pueblito/lugares-turisticos/lugares-turisticos.component';
import { HotelesComponent } from './pages/modules/view-pueblito/hoteles/hoteles.component';
import { HabitacionComponent } from './pages/modules/view-pueblito/habitacion/habitacion.component';
import { RestaurantViewComponent } from './pages/modules/view-pueblito/services-activities/restaurantes/restaurant-view/restaurant-view.component';
import { HabitacionViewComponent } from './pages/modules/view-pueblito/services-activities/hospedajes/habitacion-view/habitacion-view.component';
import { HotelViewComponent } from './pages/modules/view-pueblito/services-activities/hospedajes/hotel-view/hotel-view.component';
import { TourViewComponent } from './pages/modules/view-pueblito/services-activities/tours/views/tour-view/tour-view.component';
import { AgenciaViewComponent } from './pages/modules/view-pueblito/services-activities/tours/views/agencia-view/agencia-view.component';
import { AtractivosTuristicosComponent } from './pages/modules/view-pueblito/services-activities/atractivos-turisticos/atractivos-turisticos.component';

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
      {
        path: 'lugares-turisticos',
        component: LugaresTuristicosComponent,
      },
      {
        path: 'servicios',
        component: ServicesActivitiesComponent,
      },
      {
        path: 'servicios/hospedaje/:hotel_name',
        component: HotelViewComponent,
      },
      {
        path: 'servicios/hospedaje/:hotel_name/:habitacion_detail',
        component: HabitacionViewComponent,
      },
      {
        path: 'servicios/tour/:agencia_name',
        component: AgenciaViewComponent,
      },
      {
        path: 'servicios/tour/:agencia_name/:tour_name',
        component: TourViewComponent,
      },
      {
        path: 'servicios/restaurante/:restaurante_name',
        component: RestaurantViewComponent,
      },
      {
        path: 'servicios/atractivo-turistico/:atractivo_name',
        component: AtractivosTuristicosComponent,
      }
      /* {
        path: 'servicios/restaurante/:restaurante_name',
        component: RestaurantViewComponent,
      },
      {
        path: 'servicios/restaurante/:hotel_name/:habitacion_name',
        component: HabitacionComponent,
      } */
    ],
  },

  {
    path: 'about',
    component: AboutUsComponent,
  },
];
