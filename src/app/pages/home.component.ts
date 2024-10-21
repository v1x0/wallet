import { Component, inject } from "@angular/core";
import { RecordComponent } from "../../components/record/record.component";
import { RecordI } from "../../components/record/record.interface";
import { NgFor } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddRecordContentComponent } from "../../components/addRecordModal/addRecordModalContent.component";

@Component({
  selector: 'home-wallet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RecordComponent, NgFor, MatDialogModule],
  standalone: true
})
export class HomePage {
  public records: Array<RecordI> = []
  readonly dialog = inject(MatDialog);
  constructor() {
    this.records.push({
      amount: 10,
      category: 'simple',
      icon: 'fa fa-cutlery',
      name: 'record 1',
      type: 'expense'
    })
    this.records.push({
      amount: 10,
      category: 'simple',
      icon: 'fa fa-cutlery',
      name: 'record 1',
      type: 'income'
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRecordContentComponent);
    dialogRef.afterClosed().subscribe((result: RecordI) => {
      if (result !== undefined) {

        /*name: [''],
      category: [''],
      amount: [''],
      type*/
        this.records.push({
          ...result
        })
      }
    });
  }
}