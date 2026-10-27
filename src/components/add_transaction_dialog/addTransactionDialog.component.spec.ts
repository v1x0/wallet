import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from './addTransactionDialog.component';

describe('AddTransactionDialogComponent', () => {
  let fixture: ComponentFixture<AddTransactionDialogComponent>;
  let element: HTMLElement;
  let close: ReturnType<typeof vi.fn>;

  async function render(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function type(name: string, value: string): void {
    const input = element.querySelector(`input[name="${name}"]`) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  async function submit(): Promise<void> {
    element.querySelector('form')!.dispatchEvent(new Event('submit'));
    await render();
  }

  function errors(): (string | undefined)[] {
    return Array.from(element.querySelectorAll('.add-transaction__error')).map((e) => e.textContent?.trim());
  }

  beforeEach(async () => {
    close = vi.fn();
    await TestBed.configureTestingModule({
      imports: [AddTransactionDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: { close } }],
    }).compileComponents();
    fixture = TestBed.createComponent(AddTransactionDialogComponent);
    element = fixture.nativeElement as HTMLElement;
    await render();
  });

  it('requires a description and a positive amount', async () => {
    await submit();
    expect(close).not.toHaveBeenCalled();
    expect(errors()).toEqual(['Ingresa una descripción', 'Ingresa un monto mayor a 0']);

    type('description', 'Cine');
    type('amount', '-5');
    await submit();
    expect(close).not.toHaveBeenCalled();
    expect(errors()).toEqual(['Ingresa un monto mayor a 0']);
  });

  it('closes with the new transaction', async () => {
    type('description', '  Cine ');
    type('detail', 'Viernes');
    type('category', 'Ocio');
    type('amount', '120.5');
    await submit();
    expect(close).toHaveBeenCalledWith({
      type: 'expense',
      description: 'Cine',
      detail: 'Viernes',
      category: 'Ocio',
      amount: 120.5,
    });
  });

  it('closes without a result when cancelled', () => {
    (element.querySelector('button[type="button"]') as HTMLButtonElement).click();
    expect(close).toHaveBeenCalledWith();
  });
});
