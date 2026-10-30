import { CUSTOM_ELEMENTS_SCHEMA, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PLATFORM_SESSION } from '@vixo/platform-contracts';
import {
  AddTransactionDialogComponent,
  AddTransactionDialogData,
} from '../../components/add_transaction_dialog';
import { BalanceComponent } from '../../components/balance';
import { TransactionItemComponent } from '../../components/transaction_item';
import { SharedComponentsLoaderService } from '../../federation/shared_components_loader';
import { NewTransaction } from '../../models/transaction.model';
import { CatalogService } from '../../services/catalog_service';
import { TransactionService } from '../../services/transaction_service';

@Component({
  selector: 'app-wallet-overview',
  standalone: true,
  imports: [
    RouterLink,
    BalanceComponent,
    TransactionItemComponent,
    MatButtonModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './walletOverview.component.html',
  styleUrls: ['./walletOverview.component.scss'],
})
export class WalletOverviewComponent {
  private readonly dialog = inject(MatDialog);
  protected readonly session = inject(PLATFORM_SESSION, { optional: true });
  protected readonly libraries = inject(SharedComponentsLoaderService);
  protected readonly catalog = inject(CatalogService);
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

  /** Opens the modal dialog passing all categories and labels so the user can search with debounce. */
  protected openAddDialog(): void {
    this.dialog
      .open<AddTransactionDialogComponent, AddTransactionDialogData, NewTransaction>(
        AddTransactionDialogComponent,
        {
          data: {
            categories: this.catalog.categories(),
            labels: this.catalog.labels(),
          },
        },
      )
      .afterClosed()
      .subscribe((transaction) => {
        if (transaction) {
          const formattedDetail =
            transaction.labels && transaction.labels.length > 0
              ? [transaction.detail, `Etiquetas: ${transaction.labels.join(', ')}`]
                  .filter(Boolean)
                  .join(' · ')
              : transaction.detail;

          this.wallet.add({
            ...transaction,
            detail: formattedDetail,
            motivo: transaction.motivo || transaction.description,
          });
        }
      });
  }
}
