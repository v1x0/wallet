import { CurrencyPipe } from "@angular/common";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'balance-wallet',
  styleUrls: ['./balance.component.scss'],
  templateUrl: './balance.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CurrencyPipe]
})
export class BalanceWalletComponent {
  @Input() total: number = 0
}