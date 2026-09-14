import { Component, inject, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, NgZone, signal, Injector, ViewEncapsulation } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from '@angular/material/divider';
import { loadRemoteModule } from "@angular-architects/native-federation";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'home-wallet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatDividerModule, CommonModule, MatDialogModule, MatIconModule],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePage implements OnInit {
  // public records: Array<RecordI> = []
  // readonly dialog = inject(MatDialog);
  balanceTotal: number = 0
  tx = {
    type: 'income',
    logoUrl: 'https://flaticon.com', // Icono genérico de transferencia entre amigos
    motivo: 'Transferencia Recibida',
    subtitulo: 'De: Carlos Mendoza - Concepto: Cena',
    etiqueta: 'Reembolso',
    precio: 15.00
  }
  constructor(private injector: Injector, private readonly cdr: ChangeDetectorRef, private readonly zone: NgZone) {
    // this.getBalance()
  }
  repositorioListo = signal<boolean>(false);

  ngOnInit() {
    console.log('Wallet inicializando su vista...');
    
    // Invocamos la carga segura del repositorio de componentes
    loadRemoteModule({
      remoteName: 'components-shared',
      exposedModule: './SharedModule'
    })
    .then((m: any) => {
      this.zone.run(() => {
        // Ejecutamos la función de arranque protegida
        if (m && m.bootstrapAllCustomElements) {
          m.bootstrapAllCustomElements().then(() => {
            this.cdr.detectChanges(); // Forzamos el repintado cuando estén listos
          });
        }
      });
    })
    .catch(err => console.warn('Bypass componentes en Wallet:', err));
    //console.log('Wallet cargada de forma limpia en producción.');
    /*
    // Cargamos el módulo de componentes directo en el ciclo de vida del componente
    loadRemoteModule({
      remoteName: 'components-shared',
      exposedModule: './SharedModule'
    })
    .then(m => {
      if (m && m.SharedWebComponentsModule) {
        // 🚀 INSTANCIACIÓN MANUAL: Obligamos al módulo a registrarse usando
        // el inyector de dependencias que ya está unificado en el Shell/Wallet
        new m.SharedWebComponentsModule(this.injector);
      }
    })
    .catch(err => console.warn('Bypass componentes:', err));
    */
  }
}