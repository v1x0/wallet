import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PLATFORM_SESSION } from '@vixo/platform-contracts';
import { AddTransactionDialogComponent } from '../../components/add_transaction_dialog';
import { BalanceComponent } from '../../components/balance';
import { TransactionItemComponent } from '../../components/transaction_item';
import { FileChange, TransactionSaved } from '../../federation/contracts/sharedComponents.contract';
import { SharedComponentsLoaderService } from '../../federation/shared_components_loader';
import { NewTransaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction_service';

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
  protected readonly session = inject(PLATFORM_SESSION, { optional: true });
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

  /** Handler for the `transactionSaved` CustomEvent dispatched by `<vixo-transaction-modal-form>`. */
  protected onTransactionSaved(event: Event): void {
    const { detail } = event as TransactionSaved;
    if (detail) {
      this.wallet.add({
        type: detail.type,
        description: detail.motivo,
        detail: detail.subtitulo,
        category: detail.etiqueta,
        amount: Number(detail.precio),
        motivo: detail.motivo,
        ...(detail.logoUrl ? { logoUrl: detail.logoUrl } : {}),
      });
    }
  }

  /** Handler for the `fileChange` CustomEvent dispatched by `<vixo-file-upload>`. */
  protected onFileChange(event: Event): void {
    const customEvent = event as FileChange;
    const file = customEvent.detail;
    if (file) {
      console.log('File selected:', file);
    } else {
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
