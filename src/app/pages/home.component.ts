import { Component, inject } from "@angular/core";
import { RecordComponent } from "../../components/record/record.component";
import { RecordI } from "../../components/record/record.interface";
import { NgFor } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddRecordContentComponent } from "../../components/addRecordModal/addRecordModalContent.component";
import { BalanceWalletComponent } from "../../components/balance/balance.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'home-wallet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RecordComponent, NgFor, MatDialogModule, BalanceWalletComponent, MatDividerModule],
  standalone: true
})
export class HomePage {
  public records: Array<RecordI> = []
  readonly dialog = inject(MatDialog);
  balanceTotal: number = 0
  constructor() {
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
    const dialogRef = this.dialog.open(AddRecordContentComponent);
    dialogRef.afterClosed().subscribe((result: RecordI) => {
      if (result !== undefined) {
        this.records.push({
          ...result
        })
      }
      this.getBalance()
    });
  }
}