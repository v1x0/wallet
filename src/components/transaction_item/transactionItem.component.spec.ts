import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Transaction } from '../../models/transaction.model';
import { TransactionItemComponent } from './transactionItem.component';

describe('TransactionItemComponent', () => {
  let fixture: ComponentFixture<TransactionItemComponent>;
  let element: HTMLElement;

  const expense: Transaction = {
    id: 'tx-1',
    type: 'expense',
    description: 'Supermercado',
    detail: 'Compra semanal',
    category: 'Comida',
    labels: ['Personal', 'Recurrente'],
    amount: 10,
    motivo: 'Supermercado',
  };

  async function render(transaction: Transaction): Promise<void> {
    fixture.componentRef.setInput('transaction', transaction);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function text(selector: string): string | undefined {
    return element.querySelector(selector)?.textContent?.replace(/\s+/g, ' ').trim();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionItemComponent);
    element = fixture.nativeElement as HTMLElement;
  });

  it('renders an expense with a negative amount, category, and labels', async () => {
    await render(expense);
    expect(text('.transaction__description')).toBe('Supermercado');
    expect(text('.transaction__detail')).toBe('Compra semanal');
    expect(text('.transaction__category')).toBe('Comida');
    const labels = Array.from(element.querySelectorAll('.transaction__label')).map((el) =>
      el.textContent?.trim(),
    );
    expect(labels).toEqual(['Personal', 'Recurrente']);
    expect(text('.transaction__amount')).toBe('Gasto: -$10.00');
    expect(element.querySelector('.transaction--income')).toBeNull();
  });

  it('renders an income with a positive amount', async () => {
    await render({ ...expense, type: 'income' });
    expect(text('.transaction__amount')).toBe('Ingreso: +$10.00');
    expect(element.querySelector('.transaction--income')).not.toBeNull();
  });

  it('hides empty detail, category and labels', async () => {
    await render({ ...expense, detail: '', category: '', labels: [] });
    expect(element.querySelector('.transaction__detail')).toBeNull();
    expect(element.querySelector('.transaction__category')).toBeNull();
    expect(element.querySelector('.transaction__label')).toBeNull();
  });
});
