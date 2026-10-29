import { Injector, Type } from '@angular/core';
import { LibraryDescriptor } from './library.contract';

/**
 * Local contract of the component library `components-shared` (contract version 1.0.0).
 * Source imports from the library are forbidden: only the shape of what it exposes is declared here.
 * Inputs can be set as properties or kebab-case attributes; outputs are dispatched as `CustomEvent`.
 */

export interface CustomElementsModule {
  /** Catalog of tags ('vixo-*') mapped to their Angular component class. */
  readonly CUSTOM_ELEMENTS: Record<string, Type<unknown>>;
  /** Idempotently registers all custom elements using the Angular host Injector. */
  registerCustomElements(injector: Injector): void;
  /** Entry point for non-Angular hosts (or hosts that do not share an Injector). */
  bootstrapCustomElements(): Promise<void>;
}

export const SHARED_COMPONENTS_TAGS = {
  balance: 'vixo-balance',
  transactionItem: 'vixo-transaction-item',
  transactionForm: 'vixo-transaction-form',
  transactionDialog: 'vixo-transaction-modal-form',
  fileUpload: 'vixo-file-upload',
} as const;

export const SHARED_COMPONENTS: LibraryDescriptor = {
  remoteName: 'components-shared',
  exposedModule: './CustomElements',
  tags: Object.values(SHARED_COMPONENTS_TAGS),
  register: (module, injector) => {
    (module as CustomElementsModule).registerCustomElements(injector);
  },
};

export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'Salario'
  | 'Completado'
  | 'Transporte'
  | 'Reembolso'
  | 'Comida'
  | 'Servicios'
  | 'Entretenimiento';

/** `<vixo-balance>` — inputs. */
export interface BalanceUiInputs {
  /** Default `0`. */
  total: number;
}

/** `<vixo-transaction-item>` — inputs. */
export interface TransactionItemUiInputs {
  /** Required. */
  type: TransactionType;
  /** Required. */
  motivo: string;
  /** Required. Any text; the dialog only produces `TransactionCategory` values. */
  etiqueta: string;
  /** Required. Always positive; the sign comes from `type`. */
  precio: number;
  /** Default `''`. */
  subtitulo: string;
  /** Default `''` (shows a placeholder icon). */
  logoUrl: string;
}

/** Transaction saved by `<vixo-transaction-modal-form>`; same shape as the item inputs. */
export interface TransactionFormValue {
  type: TransactionType;
  /** At least 3 characters. */
  motivo: string;
  /** `''` when not provided. */
  subtitulo: string;
  etiqueta: TransactionCategory;
  /** Greater than 0. */
  precio: number;
  /** `''` when not provided. */
  logoUrl: string;
}

/**
 * `<vixo-transaction-modal-form>` — renders its own "Nuevo movimiento" button.
 * `transactionSaved` output: `CustomEvent` with the saved transaction in `detail`; the dialog closes itself.
 */
export type TransactionSaved = CustomEvent<TransactionFormValue>;

/**
 * `<vixo-file-upload>` — accepts images, PDF and .docx.
 * `fileChange` output: `CustomEvent` with the chosen file, or `null` when removed, in `detail`.
 */
export type FileChange = CustomEvent<File | null>;
