import { Routes } from '@angular/router';
import { LoginComponent } from './pages/modules/login/login.component';
import { HomeComponent } from './pages/modules/home/home.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },


];
