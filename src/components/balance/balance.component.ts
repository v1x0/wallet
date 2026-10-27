import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';

/** Fallback of `<vixo-balance-ui>` while the component library is not available. */
@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  /** Incomes minus expenses. */
  readonly total = input(0);
}
