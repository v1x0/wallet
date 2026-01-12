/// <reference types="vitest/globals" />
import '@analogjs/vitest-angular/setup-zone';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Verificamos si la plataforma ya existe para evitar NG0401
// Si no existe, la inicializamos
if (!(TestBed as any).platform) {
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
}

console.log('--- ENTORNO ANGULAR 21 INICIALIZADO ---');
