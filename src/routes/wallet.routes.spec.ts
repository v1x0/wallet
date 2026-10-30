import { CatalogFormComponent } from '../pages/catalog_form';
import { WalletOverviewComponent } from '../pages/wallet_overview';
import { routes } from './wallet.routes';

/** Federation contract of ./Routes (see CONTRACT.md). Changing it is a breaking change. */
describe('./Routes contract', () => {
  it('exports routes relative to the shell path, with lazy pages', async () => {
    expect(routes.map((route) => route.path)).toEqual(['', 'catalog/:kind']);
    expect(routes.every((route) => typeof route.loadComponent === 'function')).toBe(true);
    expect(routes.some((route) => route.path === '**')).toBe(false);
    expect(await routes[0].loadComponent!()).toBe(WalletOverviewComponent);
    expect(await routes[1].loadComponent!()).toBe(CatalogFormComponent);
  });
});
