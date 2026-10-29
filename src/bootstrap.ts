import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import type { NativeFederationResult } from '@angular-architects/native-federation';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { SHARED_COMPONENTS_REMOTE_LOADER } from './federation/shared_components_loader';

export function bootstrap(federation: NativeFederationResult | null) {
  const config = federation
    ? mergeApplicationConfig(appConfig, {
        providers: [
          {
            provide: SHARED_COMPONENTS_REMOTE_LOADER,
            useValue: (remoteName: string, exposedModule: string) =>
              federation.loadRemoteModule(remoteName, exposedModule),
          },
        ],
      })
    : appConfig;

  return bootstrapApplication(App, config).catch((err) => console.error(err));
}
