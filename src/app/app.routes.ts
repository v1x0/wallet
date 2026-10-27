import { Routes } from '@angular/router';
import { routes as walletRoutes } from '../routes/wallet.routes';

// Standalone mode only: mounts ./Routes under the same path the shell uses
export const routes: Routes = [
  { path: 'wallet', children: walletRoutes },
  { path: '', pathMatch: 'full', redirectTo: 'wallet' },
  { path: '**', redirectTo: 'wallet' },
];
