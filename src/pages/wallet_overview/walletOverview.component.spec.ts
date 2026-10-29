import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import {
  SHARED_COMPONENTS_TAGS,
  TransactionFormValue,
} from '../../federation/contracts/sharedComponents.contract';
import {
  SHARED_COMPONENTS_REMOTE_LOADER,
  SharedComponentsLoaderService,
} from '../../federation/shared_components_loader';
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
        { provide: SHARED_COMPONENTS_REMOTE_LOADER, useValue: loader },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(dialogResult) }) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(WalletOverviewComponent);
    element = fixture.nativeElement as HTMLElement;
    await TestBed.inject(SharedComponentsLoaderService).ensureElements();
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
    for (const tag of Object.values(SHARED_COMPONENTS_TAGS)) {
      if (!customElements.get(tag)) {
        customElements.define(tag, class extends HTMLElement {});
      }
    }
  }

  describe('with the component library', () => {
    beforeEach(() => setup(async () => ({ registerCustomElements: defineLibraryTags })));

    it('uses the library elements with the documented properties', () => {
      const balance = element.querySelector('vixo-balance') as HTMLElement & { total: number };
      expect(balance.total).toBe(5);

      const items = element.querySelectorAll('vixo-transaction-item');
      expect(items.length).toBe(2);
      const first = items[0] as HTMLElement & Record<string, unknown>;
      expect(first['type']).toBe('income');
      expect(first['motivo']).toBe('motivo 1');
      expect(first['subtitulo']).toBe('De: Carlos Mendoza - Concepto: Cena');
      expect(first['etiqueta']).toBe('Reembolso');
      expect(first['precio']).toBe(15);
      expect(element.querySelector('app-balance')).toBeNull();
    });

    it('adds the transaction emitted by vixo-transaction-modal-form', async () => {
      const modalForm = element.querySelector('vixo-transaction-modal-form') as HTMLElement;
      expect(modalForm).not.toBeNull();

      const payload: TransactionFormValue = {
        type: 'income',
        motivo: 'Bono',
        subtitulo: 'Empresa',
        etiqueta: 'Salario',
        precio: 100,
        logoUrl: '',
      };
      modalForm.dispatchEvent(new CustomEvent('transactionSaved', { detail: payload }));
      await render();

      const items = element.querySelectorAll('vixo-transaction-item');
      expect(items.length).toBe(3);
      expect((items[0] as HTMLElement & { motivo: string }).motivo).toBe('Bono');
      expect((element.querySelector('vixo-balance') as HTMLElement & { total: number }).total).toBe(
        105,
      );
    });
  });

  describe('with a library that does not define the wallet tags', () => {
    beforeEach(() => {
      // jsdom keeps custom element definitions between tests: simulate the missing tags
      vi.spyOn(customElements, 'get').mockReturnValue(undefined);
      return setup(async () => ({ registerCustomElements: () => {} }));
    });

    it('falls back to the internal components', () => {
      expect(element.querySelector('vixo-balance')).toBeNull();
      expect(element.querySelector('app-balance')).not.toBeNull();
    });
  });

  describe('without the component library', () => {
    beforeEach(() => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      return setup(() => Promise.reject(new Error('offline')));
    });

    it('falls back to the internal components', () => {
      expect(element.querySelector('vixo-balance')).toBeNull();
      expect(element.querySelector('app-balance')).not.toBeNull();
      expect(element.querySelectorAll('app-transaction-item').length).toBe(2);
    });

    it('adds the transaction returned by the fallback dialog', async () => {
      dialogResult = {
        type: 'income',
        description: 'Bono',
        detail: '',
        category: 'Salario',
        amount: 100,
        motivo: 'Bono',
      };
      (element.querySelector('.wallet__header button') as HTMLButtonElement).click();
      await render();

      expect(element.querySelectorAll('app-transaction-item').length).toBe(3);
    });

    it('does nothing when the fallback dialog is cancelled', async () => {
      (element.querySelector('.wallet__header button') as HTMLButtonElement).click();
      await render();
      expect(element.querySelectorAll('app-transaction-item').length).toBe(2);
    });
  });
});
