import { Routes } from '@angular/router';

import { HomeComponent } from './pages/modules/home/home.component';
import { NavarComponent } from './pages/navar/navar.component';

export const routes: Routes = [
    {
        path: '',
        component: NavarComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
        ]
    }
    /* {
        path: 'login',
        component: LoginComponent
    }, */



];
