import { routes } from './wallet.routes';
import { WalletOverviewComponent } from '../pages/wallet_overview';

/** Federation contract of ./Routes (see CONTRACT.md). Changing it is a breaking change. */
describe('./Routes contract', () => {
  it('exports routes relative to the shell path, with lazy pages', async () => {
    expect(routes.map((route) => route.path)).toEqual(['']);
    expect(routes.every((route) => typeof route.loadComponent === 'function')).toBe(true);
    expect(routes.some((route) => route.path === '**')).toBe(false);
    expect(await routes[0].loadComponent!()).toBe(WalletOverviewComponent);
  });
});
