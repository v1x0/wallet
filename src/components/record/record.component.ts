import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { RecordI } from "./record.interface";
import { NgClass } from "@angular/common";

@Component({
    selector: 'record-wallet',
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardTitleGroup, NgClass],
    templateUrl: './record.component.html',
    styleUrls: ['./record.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordComponent {
  @Input('data') data!: RecordI;
}
