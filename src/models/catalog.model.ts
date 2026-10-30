export type CatalogKind = 'category' | 'label';

export const DEFAULT_CATEGORIES: readonly string[] = [
  'Salario',
  'Transporte',
  'Reembolso',
  'Comida',
  'Servicios',
  'Entretenimiento',
];

export const DEFAULT_LABELS: readonly string[] = [
  'Personal',
  'Trabajo',
  'Recurrente',
  'Urgente',
  'Ahorro',
];

export interface TransactionCatalogData {
  readonly categories: readonly string[];
  readonly labels: readonly string[];
}
