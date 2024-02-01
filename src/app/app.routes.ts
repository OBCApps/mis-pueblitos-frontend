import { Routes } from '@angular/router';

import { HomeComponent } from './pages/modules/home/home.component';
import { NavarComponent } from './pages/navar/navar.component';
import { ViewPueblitoComponent } from './pages/modules/view-pueblito/view-pueblito.component';
import { ViewDepartmentComponent } from './pages/modules/view-department/view-department.component';

export const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'pueblitos',
        component: ViewPueblitoComponent
    },
    {
        path: 'department',
        component: ViewDepartmentComponent
    },



];
