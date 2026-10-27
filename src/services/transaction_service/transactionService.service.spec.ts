import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transactionService.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    service = TestBed.inject(TransactionService);
  });

  it('starts with the sample transactions and their balance', () => {
    expect(service.transactions().length).toBe(2);
    expect(service.balance()).toBe(5);
  });

  it('adds a transaction first, with an id, and updates the balance', () => {
    const created = service.add({
      type: 'expense',
      description: 'Cine',
      detail: '',
      category: 'Ocio',
      amount: 20,
    });

    expect(created.id).toMatch(/^tx-/);
    expect(service.transactions()[0]).toEqual(created);
    expect(service.balance()).toBe(-15);
  });

  it('returns frozen copies, never its internal state', () => {
    const first = service.transactions()[0] as { amount: number };
    expect(() => (first.amount = 1000)).toThrow(TypeError);
    expect(service.transactions()[0].amount).toBe(15);
    expect(service.balance()).toBe(5);
  });
});
