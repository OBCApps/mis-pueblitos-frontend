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
import { RestaurantViewComponent } from './pages/modules/view-pueblito/services-activities/restaurantes/restaurant-view/restaurant-view.component';
import { HabitacionViewComponent } from './pages/modules/view-pueblito/services-activities/hospedajes/habitacion-view/habitacion-view.component';
import { HotelViewComponent } from './pages/modules/view-pueblito/services-activities/hospedajes/hotel-view/hotel-view.component';
import { TourViewComponent } from './pages/modules/view-pueblito/services-activities/tours/views/tour-view/tour-view.component';
import { AgenciaViewComponent } from './pages/modules/view-pueblito/services-activities/tours/views/agencia-view/agencia-view.component';
import { HospedajesListComponent } from './pages/modules/view-pueblito/services-activities/hospedajes/hospedajes-list/hospedajes-list.component';
import { RestaurantesListComponent } from './pages/modules/view-pueblito/services-activities/restaurantes/restaurantes-list/restaurantes-list.component';
import { ToursListComponent } from './pages/modules/view-pueblito/services-activities/tours/views/tours-list/tours-list.component';
import { AtractivosTuristicosListComponent } from './pages/modules/view-pueblito/services-activities/atractivos-turisticos/atractivos-turisticos.list.component';
import { AtractivosTuristicosComponent } from './pages/modules/view-pueblito/services-activities/atractivos-turisticos/atractivos-turisticos.component';
import { ListBlogTuristicoComponent } from './pages/modules/view-pueblito/services-activities/blog-turistico/views/list-blog-turistico/list-blog-turistico.component';
import { ManageBlogTuristicoComponent } from './pages/modules/view-pueblito/services-activities/blog-turistico/views/manage-blog-turistico/manage-blog-turistico.component';

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
        component: AtractivosTuristicosListComponent,
      },
      {
        path: 'lugares-turisticos/:atractivo_name',
        component: AtractivosTuristicosComponent,
      },

      {
        path: 'hospedajes',
        component: HospedajesListComponent,
      },
      {
        path: 'hospedajes/:hotel_name',
        component: HotelViewComponent,
      },
      {
        path: 'hospedajes/:hotel_name/:habitacion_detail',
        component: HabitacionViewComponent,
      },
      {
        path: 'tours-experiencias',
        component: ToursListComponent,
      },
      {
        path: 'tours-experiencias/:agencia_name',
        component: AgenciaViewComponent,
      },
      {
        path: 'tours-experiencias/:agencia_name/:tour_name',
        component: TourViewComponent,
      },
      {
        path: 'restaurantes',
        component: RestaurantesListComponent,
      },
      {
        path: 'restaurantes/:restaurante_name',
        component: RestaurantViewComponent,
      },
    ],
  },

  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'blog-turistico',
    children: [
      {
        path: 'list',
        component: ListBlogTuristicoComponent,
      },
      {
        path: 'info/:name_route',
        component: ManageBlogTuristicoComponent,
      },
    ]
    
  },
];
