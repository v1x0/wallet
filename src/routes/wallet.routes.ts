import { Routes } from '@angular/router';

// Exposed as ./Routes: paths are relative to the top-level path assigned by the shell
export const routes: Routes = [
  {
    path: '',
    title: 'Billetera',
    loadComponent: () => import('../pages/wallet_overview').then((m) => m.WalletOverviewComponent),
  },
];
