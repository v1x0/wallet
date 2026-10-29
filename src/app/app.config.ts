import { ApplicationConfig, provideBrowserGlobalErrorListeners, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PLATFORM_SESSION, PlatformSession, SessionUser } from '@vixo/platform-contracts';
import { routes } from './app.routes';

const STANDALONE_USER: SessionUser = {
  username: 'dev@vixo.local',
  roles: ['Administrator'],
};

const standaloneSession: PlatformSession = {
  user: signal<SessionUser | null>(STANDALONE_USER).asReadonly(),
  hasRole: (...roles) => roles.some((role) => STANDALONE_USER.roles.includes(role)),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: PLATFORM_SESSION, useValue: standaloneSession },
  ],
};
