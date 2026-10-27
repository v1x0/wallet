import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LIBRARY_REMOTE_LOADER } from '../../federation/library_loader';
import { NewTransaction } from '../../models/transaction.model';
import { WalletOverviewComponent } from './walletOverview.component';

describe('WalletOverviewComponent', () => {
  let fixture: ComponentFixture<WalletOverviewComponent>;
  let element: HTMLElement;
  let dialogResult: NewTransaction | undefined;

  async function setup(loader: () => Promise<unknown>): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [WalletOverviewComponent],
      providers: [
        { provide: LIBRARY_REMOTE_LOADER, useValue: loader },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(dialogResult) }) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(WalletOverviewComponent);
    element = fixture.nativeElement as HTMLElement;
    await render();
  }

  async function render(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(() => {
    dialogResult = undefined;
  });

  /** Fake library catalog: plain elements that keep the properties the page sets. */
  function defineLibraryTags(): void {
    for (const tag of ['vixo-balance-ui', 'vixo-transaction-item-ui']) {
      if (!customElements.get(tag)) {
        customElements.define(tag, class extends HTMLElement {});
      }
    }
  }

  describe('with the component library', () => {
    beforeEach(() => setup(async () => ({ registerCustomElements: defineLibraryTags })));

    it('uses the library elements with the documented properties', () => {
      const balance = element.querySelector('vixo-balance-ui') as HTMLElement & { total: number };
      expect(balance.total).toBe(5);

      const items = element.querySelectorAll('vixo-transaction-item-ui');
      expect(items.length).toBe(2);
      const first = items[0] as HTMLElement & Record<string, unknown>;
      expect(first['type']).toBe('income');
      expect(first['motivo']).toBe('Transferencia recibida');
      expect(first['subtitulo']).toBe('De: Carlos Mendoza - Concepto: Cena');
      expect(first['etiqueta']).toBe('Reembolso');
      expect(first['precio']).toBe(15);
      expect(element.querySelector('app-balance')).toBeNull();
    });

    it('adds the transaction returned by the dialog', async () => {
      dialogResult = { type: 'income', description: 'Bono', detail: '', category: '', amount: 100 };
      (element.querySelector('.wallet__header button') as HTMLButtonElement).click();
      await render();

      const items = element.querySelectorAll('vixo-transaction-item-ui');
      expect(items.length).toBe(3);
      expect((items[0] as HTMLElement & { motivo: string }).motivo).toBe('Bono');
      expect((element.querySelector('vixo-balance-ui') as HTMLElement & { total: number }).total).toBe(105);
    });

    it('does nothing when the dialog is cancelled', async () => {
      (element.querySelector('.wallet__header button') as HTMLButtonElement).click();
      await render();
      expect(element.querySelectorAll('vixo-transaction-item-ui').length).toBe(2);
    });
  });

  describe('with a library that does not define the wallet tags', () => {
    beforeEach(() => {
      // jsdom keeps custom element definitions between tests: simulate the missing tags
      vi.spyOn(customElements, 'get').mockReturnValue(undefined);
      return setup(async () => ({ registerCustomElements: () => {} }));
    });

    it('falls back to the internal components', () => {
      expect(element.querySelector('vixo-balance-ui')).toBeNull();
      expect(element.querySelector('app-balance')).not.toBeNull();
    });
  });

  describe('without the component library', () => {
    beforeEach(() => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      return setup(() => Promise.reject(new Error('offline')));
    });

    it('falls back to the internal components', () => {
      expect(element.querySelector('vixo-balance-ui')).toBeNull();
      expect(element.querySelector('app-balance')).not.toBeNull();
      expect(element.querySelectorAll('app-transaction-item').length).toBe(2);
    });
  });
});
