import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-wallet-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'wallet-angular';
  constructor() {
    console.log('¡AppComponent del Wallet instanciado!');
  }
}
