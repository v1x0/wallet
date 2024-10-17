import { Routes } from '@angular/router';
import { HomePage } from './pages/home.component';

export const routes: Routes = [
  { path: "", component: HomePage },
  { path: "home", component: HomePage }
];
