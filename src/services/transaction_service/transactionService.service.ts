import { Injectable, computed, signal } from '@angular/core';
import { NewTransaction, Transaction } from '../../models/transaction.model';

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'income',
    description: 'Transferencia recibida',
    detail: 'De: Carlos Mendoza - Concepto: Cena',
    category: 'Reembolso',
    amount: 15,
  },
  {
    id: 'tx-2',
    type: 'expense',
    description: 'Supermercado',
    detail: 'Compra semanal',
    category: 'Comida',
    amount: 10,
  },
];

/**
 * Feature state of the wallet.
 * There is no BFF endpoint yet: transactions live in memory, seeded with sample data.
 */
@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly items = signal<Transaction[]>(SAMPLE_TRANSACTIONS.map((tx) => ({ ...tx })));
  private nextId = SAMPLE_TRANSACTIONS.length + 1;

  /** Frozen copies of the transactions, newest first: shared by every reader, so they must not change. */
  readonly transactions = computed<ReadonlyArray<Readonly<Transaction>>>(() =>
    Object.freeze(this.items().map((tx) => Object.freeze({ ...tx }))),
  );

  /** Incomes minus expenses. */
  readonly balance = computed(() =>
    this.items().reduce((total, tx) => (tx.type === 'income' ? total + tx.amount : total - tx.amount), 0),
  );

  add(transaction: NewTransaction): Transaction {
    const created: Transaction = { ...transaction, id: `tx-${this.nextId++}` };
    this.items.update((items) => [created, ...items]);
    return { ...created };
  }
}
