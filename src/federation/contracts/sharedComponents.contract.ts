import { Injector } from '@angular/core';
import { LibraryDescriptor } from './library.contract';

/**
 * Local contract of the component library `shared-components` (contract version 1.0.0).
 * Source imports from the library are forbidden: only the shape of what it exposes is declared here.
 * Inputs can be set as properties or kebab-case attributes; outputs are dispatched as `CustomEvent`.
 */

/** Shape of the library's `./SharedModule` module. */
export interface SharedComponentsModule {
  /**
   * Registers every library tag; uses the host injector when given. Idempotent.
   * Logs and resolves on failure instead of rejecting, so the loader checks the tags.
   */
  bootstrapAllCustomElements(parentInjector?: Injector): Promise<void>;
}

export const SHARED_COMPONENTS_TAGS = {
  balance: 'vixo-balance-ui',
  transactionItem: 'vixo-transaction-item-ui',
  transactionDialog: 'vixo-transaction-dialog-ui',
  fileUpload: 'vixo-file-upload-ui',
} as const;

export const SHARED_COMPONENTS: LibraryDescriptor = {
  remoteName: 'components-shared',
  exposedModule: './SharedModule',
  tags: Object.values(SHARED_COMPONENTS_TAGS),
  register: (module, injector) =>
    (module as SharedComponentsModule).bootstrapAllCustomElements(injector),
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

/** `<vixo-balance-ui>` — inputs. */
export interface BalanceUiInputs {
  /** Default `0`. */
  total: number;
}

/** `<vixo-transaction-item-ui>` — inputs. */
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

/** Transaction saved by `<vixo-transaction-dialog-ui>`; same shape as the item inputs. */
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
 * `<vixo-transaction-dialog-ui>` — no inputs; renders its own "Nuevo movimiento" button.
 * `transactionSaved` output: `CustomEvent` with the saved transaction in `detail`; the dialog closes itself.
 */
export type TransactionSaved = CustomEvent<TransactionFormValue>;

/**
 * `<vixo-file-upload-ui>` — no inputs; accepts images, PDF and .docx.
 * `fileChange` output: `CustomEvent` with the chosen file, or `null` when removed, in `detail`.
 */
export type FileChange = CustomEvent<File | null>;
