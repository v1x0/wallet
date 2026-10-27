import { Injector } from '@angular/core';

/**
 * Local contract of the component library that provides the wallet UI elements.
 * Source imports from the library are forbidden: only the shape of what it exposes is declared here.
 * The inputs below were inferred from the previous usage of the tags: confirm them with the library team.
 */

/** Remote name of the library in the federation manifest of the host. */
export const COMPONENTS_LIBRARY = 'SharedModule';

/** Shape of the library's `./CustomElements` module. */
export interface LibraryElementsModule {
  /** Registers every library tag with the given injector. Idempotent. */
  registerCustomElements(injector: Injector): void;
}

/** `<vixo-balance-ui>` — inputs. */
export interface BalanceUiInputs {
  total: number;
}

/** `<vixo-transaction-item-ui>` — inputs. */
export interface TransactionItemUiInputs {
  type: 'income' | 'expense';
  logoUrl: string;
  motivo: string;
  subtitulo: string;
  etiqueta: string;
  precio: number;
}
