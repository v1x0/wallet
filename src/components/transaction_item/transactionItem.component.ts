import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Transaction } from '../../models/transaction.model';

/** Fallback of `<vixo-transaction-item-ui>` while the component library is not available. */
@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule],
  templateUrl: './transactionItem.component.html',
  styleUrls: ['./transactionItem.component.scss'],
})
export class TransactionItemComponent {
  readonly transaction = input.required<Transaction>();
}
