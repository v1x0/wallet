import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

/** Standalone mode root: never exposed. */
@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.scss',
  template: `
    <nav class="app__nav" aria-label="Host demo">
      <a class="app__brand" routerLink="/wallet">wallet · standalone</a>
    </nav>
    <main class="app__main">
      <router-outlet />
    </main>
  `,
})
export class App {}
