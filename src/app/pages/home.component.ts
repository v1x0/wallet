import { Component, OnInit, AfterViewInit, ChangeDetectorRef, NgZone, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'home-wallet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatDialogModule, MatDividerModule, CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit, AfterViewInit {
  balanceTotal: number = 0;
  tx = {
    type: 'income',
    logoUrl: 'https://flaticon.com',
    motivo: 'Transferencia Recibida',
    subtitulo: 'De: Carlos Mendoza - Concepto: Cena',
    etiqueta: 'Reembolso',
    precio: 15.00
  };

  repositorioListo: boolean = false;

  constructor(
    private readonly cdr: ChangeDetectorRef, 
    private readonly zone: NgZone
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.run(() => {
      this.repositorioListo = true;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }
}
