export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  /** Main text (e.g. "Transferencia recibida"). */
  description: string;
  /** Secondary text (e.g. "De: Carlos Mendoza - Concepto: Cena"). */
  detail: string;
  /** Short tag (e.g. "Reembolso"). */
  category: string;
  /** Always positive; `type` gives the sign. */
  amount: number;
  motivo: string;
  logoUrl?: string;
}

export type NewTransaction = Omit<Transaction, 'id'>;
