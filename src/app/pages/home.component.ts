import { Component } from "@angular/core";
import { RecordComponent } from "../../components/record/record.component";
import { RecordI } from "../../components/record/record.interface";
import { NgFor } from "@angular/common";

@Component({
  selector: 'home-wallet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RecordComponent, NgFor],
  standalone: true
})
export class HomePage {
  public records: Array<RecordI> = []
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
}