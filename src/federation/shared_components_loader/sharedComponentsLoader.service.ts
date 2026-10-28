import { Injectable, InjectionToken, Injector, inject, signal } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { SHARED_COMPONENTS, SHARED_COMPONENTS_TAGS } from '../contracts/sharedComponents.contract';

/** Loads an exposed module by remote name; the URL is resolved by the host's federation manifest. */
export type RemoteLoader = (remoteName: string, exposedModule: string) => Promise<unknown>;

/**
 * Stand-in for `PLATFORM_REMOTE_LOADER`, planned in `@vixo/platform-contracts` 2.0.0.
 * Until then it defaults to the federation runtime; replace it by the platform token when available.
 */
export const SHARED_COMPONENTS_REMOTE_LOADER = new InjectionToken<RemoteLoader>('SHARED_COMPONENTS_REMOTE_LOADER', {
  providedIn: 'root',
  factory: () => (remoteName, exposedModule) => loadRemoteModule(remoteName, exposedModule),
});

export type SharedComponentsState = 'loading' | 'ready' | 'unavailable';

@Injectable({ providedIn: 'root' })
export class SharedComponentsLoaderService {
  private readonly loader = inject(SHARED_COMPONENTS_REMOTE_LOADER);
  private readonly injector = inject(Injector);
  private loading?: Promise<void>;

  readonly state = signal<SharedComponentsState>('loading');
  
  /** Exposes tags constants for convenience in components/templates */
  readonly tags: Record<string, string> = SHARED_COMPONENTS_TAGS;

  /** Registers the library custom elements once; later calls reuse the same attempt. */
  ensureElements(): Promise<void> {
    this.loading ??= this.load();
    return this.loading;
  }

  private async load(): Promise<void> {
    try {
      const module = await this.loader(
        SHARED_COMPONENTS.remoteName,
        SHARED_COMPONENTS.exposedModule,
      );
      
      // Use the registration function defined in the contract descriptor
      await SHARED_COMPONENTS.register(module, this.injector);
      
      this.state.set('ready');
    } catch (err) {
      // The module loader caches failed imports by URL: retrying requires a page reload
      console.error(`Component library "${SHARED_COMPONENTS.remoteName}" unavailable`, err);
      this.state.set('unavailable');
    }
  }
}