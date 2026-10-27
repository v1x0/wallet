import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NewTransaction, TransactionType } from '../../models/transaction.model';

/** Dialog content: closes with a valid `NewTransaction`, or with nothing when cancelled. */
@Component({
  selector: 'app-add-transaction-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './addTransactionDialog.component.html',
  styleUrls: ['./addTransactionDialog.component.scss'],
})
export class AddTransactionDialogComponent {
  private readonly dialogRef = inject<MatDialogRef<AddTransactionDialogComponent, NewTransaction>>(MatDialogRef);

  protected readonly description = signal('');
  protected readonly detail = signal('');
  protected readonly category = signal('');
  protected readonly amount = signal('');
  protected readonly type = signal<TransactionType>('expense');
  protected readonly submitted = signal(false);

  protected readonly descriptionError = computed(() =>
    this.submitted() && !this.description().trim() ? 'Ingresa una descripción' : '',
  );
  protected readonly amountError = computed(() => {
    if (!this.submitted()) {
      return '';
    }
    const amount = Number(this.amount());
    return this.amount().trim() && Number.isFinite(amount) && amount > 0 ? '' : 'Ingresa un monto mayor a 0';
  });

  protected valueOf(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected save(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
    if (this.descriptionError() || this.amountError()) {
      return;
    }
    this.dialogRef.close({
      type: this.type(),
      description: this.description().trim(),
      detail: this.detail().trim(),
      category: this.category().trim(),
      amount: Number(this.amount()),
    });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
