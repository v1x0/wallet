import { Injectable, InjectionToken, Injector, inject, signal } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { COMPONENTS_LIBRARY, LibraryElementsModule } from '../contracts/componentsLibrary.contract';

/** Loads an exposed module by remote name; the URL is resolved by the host's federation manifest. */
export type RemoteLoader = (remoteName: string, exposedModule: string) => Promise<unknown>;

/**
 * Stand-in for `PLATFORM_REMOTE_LOADER`, planned in `@vixo/platform-contracts` 2.0.0.
 * Until then it defaults to the federation runtime; replace it by the platform token when available.
 */
export const LIBRARY_REMOTE_LOADER = new InjectionToken<RemoteLoader>('LIBRARY_REMOTE_LOADER', {
  providedIn: 'root',
  factory: () => (remoteName, exposedModule) => loadRemoteModule(remoteName, exposedModule),
});

export type LibraryState = 'loading' | 'ready' | 'unavailable';

@Injectable({ providedIn: 'root' })
export class LibraryLoaderService {
  private readonly loader = inject(LIBRARY_REMOTE_LOADER);
  private readonly injector = inject(Injector);
  private loading?: Promise<void>;

  readonly state = signal<LibraryState>('loading');

  /** Registers the library custom elements once; later calls reuse the same attempt. */
  ensureElements(): Promise<void> {
    this.loading ??= this.load();
    return this.loading;
  }

  private async load(): Promise<void> {
    try {
      const { registerCustomElements } = (await this.loader(
        COMPONENTS_LIBRARY,
        './CustomElements',
      )) as LibraryElementsModule;
      registerCustomElements(this.injector); // idempotent
      this.state.set('ready');
    } catch (err) {
      // The module loader caches failed imports by URL: retrying requires a page reload
      console.error(`Component library "${COMPONENTS_LIBRARY}" unavailable`, err);
      this.state.set('unavailable');
    }
  }
}
