import { Component, Input } from "@angular/core";

@Component({
  selector: 'balance-wallet',
  styleUrls: ['./balance.component.scss'],
  templateUrl: './balance.component.html',
  standalone: true,
})
export class BalanceWalletComponent {
  @Input() total: number = 0
}