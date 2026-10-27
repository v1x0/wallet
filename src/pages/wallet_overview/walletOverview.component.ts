import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddTransactionDialogComponent } from '../../components/add_transaction_dialog';
import { BalanceComponent } from '../../components/balance';
import { TransactionItemComponent } from '../../components/transaction_item';
import { LibraryLoaderService } from '../../federation/library_loader';
import { NewTransaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction_service';

/** Library tags this page renders; without them it uses its own components. */
const LIBRARY_TAGS = ['vixo-balance-ui', 'vixo-transaction-item-ui'];

@Component({
  selector: 'app-wallet-overview',
  standalone: true,
  imports: [BalanceComponent, TransactionItemComponent, MatButtonModule, MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './walletOverview.component.html',
  styleUrls: ['./walletOverview.component.scss'],
})
export class WalletOverviewComponent {
  private readonly dialog = inject(MatDialog);
  protected readonly libraries = inject(LibraryLoaderService);
  protected readonly wallet = inject(TransactionService);

  /** The library loaded and actually defines the tags (a remote with another catalog would leave them empty). */
  protected readonly useLibrary = computed(
    () => this.libraries.state() === 'ready' && LIBRARY_TAGS.every((tag) => !!customElements.get(tag)),
  );

  constructor() {
    void this.libraries.ensureElements();
  }

  protected openAddDialog(): void {
    this.dialog
      .open<AddTransactionDialogComponent, void, NewTransaction>(AddTransactionDialogComponent)
      .afterClosed()
      .subscribe((transaction) => {
        if (transaction) {
          this.wallet.add(transaction);
        }
      });
  }
}
