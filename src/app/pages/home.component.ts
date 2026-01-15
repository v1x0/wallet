import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { VixoBalanceUI, RecordModalComponent, RecordModalI, AddRecordContentComponent } from "vixo-library-ui";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'home-wallet',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [MatDialogModule, VixoBalanceUI, RecordModalComponent, MatDividerModule, MatButtonModule]
})
export class HomePage {
  public records: Array<RecordModalI> = []
  readonly dialog = inject(MatDialog);
  balanceTotal: number = 0
  constructor(private readonly cdr: ChangeDetectorRef) {
    this.records.push({
      amount: 10,
      category: 'simple',
      icon: 'fa fa-cutlery',
      name: 'record 1',
      type: 'expense'
    })
    this.records.push({
      amount: 11,
      category: 'simple',
      icon: 'fa fa-cutlery',
      name: 'record 1',
      type: 'income'
    })
    this.getBalance()
  }

  getBalance() {
    this.balanceTotal = this.records.reduce((acc, record) => record.type === 'expense' ? acc - record.amount : acc + record.amount, 0)
  }

  openDialog(): void {
    console.log('hola mundo')
    const dialogRef = this.dialog.open(AddRecordContentComponent);
    dialogRef.afterClosed().subscribe((result: RecordModalI) => {
      if (result !== undefined) {
        this.records.push({
          ...result
        })
      }
      this.getBalance()
    });
    this.cdr.detectChanges()
  }
}