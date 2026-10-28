import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddTransactionDialogComponent } from '../../components/add_transaction_dialog';
import { BalanceComponent } from '../../components/balance';
import { TransactionItemComponent } from '../../components/transaction_item';
import { NewTransaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction_service';
import { SharedComponentsLoaderService } from '../../federation/shared_components_loader';
import { FileChange, TransactionSaved } from '../../federation/contracts/sharedComponents.contract'

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
  protected readonly libraries = inject(SharedComponentsLoaderService);
  protected readonly wallet = inject(TransactionService);

  /** All required library custom element tags sourced directly from the service. */
  private readonly libraryTags: string[] = Object.values(this.libraries.tags);

  /** The library loaded and actually defines the tags (a remote with another catalog would leave them empty). */
  protected readonly useLibrary = computed(
    () =>
      this.libraries.state() === 'ready' &&
      this.libraryTags.every((tag: string) => !!customElements.get(tag)),
  );

  constructor() {
    void this.libraries.ensureElements();
  }

  /** Handler for the `transactionSaved` CustomEvent dispatched by `<vixo-transaction-dialog-ui>`. */
  protected onTransactionSaved(event: Event): void {
    const customEvent = event as TransactionSaved;
    if (customEvent.detail) {
      this.wallet.add(customEvent.detail as any);
    }
  }

  /** Handler for the `fileChange` CustomEvent dispatched by `<vixo-file-upload-ui>`. */
  protected onFileChange(event: Event): void {
    const customEvent = event as FileChange;
    const file = customEvent.detail;
    if (file) {
      // Handle uploaded file (e.g., attach to state or upload service)
      console.log('File selected:', file);
    } else {
      // Handle file removal
      console.log('File removed');
    }
  }

  /** Fallback dialog trigger when native custom elements are unavailable. */
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