import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Home } from './home/home';
import { Product } from './product/product';
import { Registration } from './registration/registration';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'}, // Default to home
    {path: 'home', component: Home},
    {path: 'products', component: Product},
    {path: 'login', component: Login},
    {path: 'registration', component: Registration},
    {path: 'profile', component: Profile}
];
