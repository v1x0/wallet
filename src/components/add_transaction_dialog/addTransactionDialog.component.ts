import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import {
  DEFAULT_CATEGORIES,
  DEFAULT_LABELS,
  TransactionCatalogData,
} from '../../models/catalog.model';
import { NewTransaction, TransactionType } from '../../models/transaction.model';

export const SEARCH_DEBOUNCE_MS = 300;

export type AddTransactionDialogData = Partial<TransactionCatalogData>;

/** Dialog content: closes with a valid `NewTransaction`, or with nothing when cancelled. */
@Component({
  selector: 'app-add-transaction-dialog',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './addTransactionDialog.component.html',
  styleUrls: ['./addTransactionDialog.component.scss'],
})
export class AddTransactionDialogComponent {
  private readonly dialogRef =
    inject<MatDialogRef<AddTransactionDialogComponent, NewTransaction>>(MatDialogRef);
  private readonly dialogData = inject<AddTransactionDialogData | null>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly destroyRef = inject(DestroyRef);

  private readonly categorySearch$ = new Subject<string>();
  private readonly labelSearch$ = new Subject<string>();

  protected readonly availableCategories = signal<readonly string[]>(
    this.dialogData?.categories ?? DEFAULT_CATEGORIES,
  );
  protected readonly availableLabels = signal<readonly string[]>(
    this.dialogData?.labels ?? DEFAULT_LABELS,
  );

  protected readonly description = signal('');
  protected readonly detail = signal('');
  protected readonly categorySearchInput = signal('');
  protected readonly labelSearchInput = signal('');
  protected readonly debouncedCategoryQuery = signal('');
  protected readonly debouncedLabelQuery = signal('');

  /** Only populated when a category is selected from the search input. */
  protected readonly selectedCategory = signal('');
  /** Only populated when labels are selected from the search input. */
  protected readonly selectedLabels = signal<string[]>([]);

  protected readonly amount = signal('');
  protected readonly type = signal<TransactionType>('expense');
  protected readonly motivo = signal('');
  protected readonly submitted = signal(false);

  /** Categories filtered inside the autocomplete dropdown after SEARCH_DEBOUNCE_MS. */
  readonly filteredCategories = computed(() => {
    const query = this.debouncedCategoryQuery().trim().toLowerCase();
    if (!query) {
      return this.availableCategories();
    }
    return this.availableCategories().filter((cat) => cat.toLowerCase().includes(query));
  });

  /** Labels filtered inside the autocomplete dropdown after SEARCH_DEBOUNCE_MS. */
  readonly filteredLabels = computed(() => {
    const query = this.debouncedLabelQuery().trim().toLowerCase();
    if (!query) {
      return this.availableLabels();
    }
    return this.availableLabels().filter((label) => label.toLowerCase().includes(query));
  });

  protected readonly descriptionError = computed(() =>
    this.submitted() && !this.description().trim() ? 'Ingresa una descripción' : '',
  );
  protected readonly amountError = computed(() => {
    if (!this.submitted()) {
      return '';
    }
    const amount = Number(this.amount());
    return this.amount().trim() && Number.isFinite(amount) && amount > 0
      ? ''
      : 'Ingresa un monto mayor a 0';
  });

  constructor() {
    this.categorySearch$
      .pipe(
        debounceTime(SEARCH_DEBOUNCE_MS),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((query) => {
        this.debouncedCategoryQuery.set(query);
      });

    this.labelSearch$
      .pipe(
        debounceTime(SEARCH_DEBOUNCE_MS),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((query) => {
        this.debouncedLabelQuery.set(query);
      });
  }

  protected valueOf(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected onCategorySearchInput(value: string): void {
    this.categorySearchInput.set(value);
    this.categorySearch$.next(value);
  }

  protected onLabelSearchInput(value: string): void {
    this.labelSearchInput.set(value);
    this.labelSearch$.next(value);
  }

  selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.categorySearchInput.set('');
    this.categorySearch$.next('');
  }

  clearCategory(): void {
    this.selectedCategory.set('');
  }

  selectLabel(label: string): void {
    if (!this.selectedLabels().includes(label)) {
      this.selectedLabels.update((current) => [...current, label]);
    }
    this.labelSearchInput.set('');
    this.labelSearch$.next('');
  }

  removeSelectedLabel(label: string): void {
    this.selectedLabels.update((current) => current.filter((item) => item !== label));
  }

  protected save(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
    if (this.descriptionError() || this.amountError()) {
      return;
    }
    const cleanDescription = this.description().trim();
    const categoryValue = this.selectedCategory().trim() || this.categorySearchInput().trim();
    const labels = this.selectedLabels();
    this.dialogRef.close({
      type: this.type(),
      description: cleanDescription,
      detail: this.detail().trim(),
      category: categoryValue,
      ...(labels.length > 0 ? { labels } : {}),
      amount: Number(this.amount()),
      motivo: this.motivo().trim(),
    });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
