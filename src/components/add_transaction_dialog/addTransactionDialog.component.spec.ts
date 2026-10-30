import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AddTransactionDialogComponent,
  AddTransactionDialogData,
  SEARCH_DEBOUNCE_MS,
} from './addTransactionDialog.component';

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
    return Array.from(element.querySelectorAll('.add-transaction__error')).map((e) =>
      e.textContent?.trim(),
    );
  }

  async function setup(data?: AddTransactionDialogData): Promise<void> {
    close = vi.fn();
    await TestBed.configureTestingModule({
      imports: [AddTransactionDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close } },
        ...(data ? [{ provide: MAT_DIALOG_DATA, useValue: data }] : []),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddTransactionDialogComponent);
    element = fixture.nativeElement as HTMLElement;
    await render();
  }

  beforeEach(() => setup());

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows dropdown arrow icons and does not render categories or labels until selected', () => {
    const arrows = Array.from(element.querySelectorAll('.add-transaction__dropdown-icon')).map(
      (icon) => icon.textContent?.trim(),
    );
    expect(arrows).toEqual(['arrow_drop_down', 'arrow_drop_down']);
    expect(element.querySelector('.add-transaction__selected-category')).toBeNull();
    expect(element.querySelector('.add-transaction__selected-label')).toBeNull();
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
      motivo: '',
    });
  });

  it('filters categories and labels by typing with debounce (does not refresh on every keystroke)', async () => {
    vi.useFakeTimers();
    TestBed.resetTestingModule();
    await setup({
      categories: ['Inversiones', 'Comida', 'Transporte'],
      labels: ['Urgente', 'Personal', 'Trabajo'],
    });

    const instance = fixture.componentInstance;
    expect(instance.filteredCategories()).toEqual(['Inversiones', 'Comida', 'Transporte']);
    expect(instance.filteredLabels()).toEqual(['Urgente', 'Personal', 'Trabajo']);

    // Type multiple characters quickly into both search inputs
    type('category', 'I');
    type('category', 'In');
    type('category', 'Inv');

    type('labelSearch', 'U');
    type('labelSearch', 'Ur');
    type('labelSearch', 'Urg');

    fixture.detectChanges();

    // Before debounce time has elapsed (200ms < 300ms), filtered options must NOT have refreshed yet
    vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS - 100);
    fixture.detectChanges();
    expect(instance.filteredCategories()).toEqual(['Inversiones', 'Comida', 'Transporte']);
    expect(instance.filteredLabels()).toEqual(['Urgente', 'Personal', 'Trabajo']);

    // Once the debounce window completes (300ms), filtered options refresh
    vi.advanceTimersByTime(100);
    fixture.detectChanges();
    expect(instance.filteredCategories()).toEqual(['Inversiones']);
    expect(instance.filteredLabels()).toEqual(['Urgente']);
  });

  it('renders selected category and labels only after selection and submits them', async () => {
    TestBed.resetTestingModule();
    await setup({
      categories: ['Inversiones'],
      labels: ['Urgente', 'Personal'],
    });

    type('description', 'Acciones');
    type('amount', '500');

    fixture.componentInstance.selectCategory('Inversiones');
    fixture.componentInstance.selectLabel('Urgente');
    await render();

    expect(
      element.querySelector('.add-transaction__selected-category')?.textContent,
    ).toContain('Inversiones');
    expect(element.querySelector('.add-transaction__selected-label')?.textContent).toContain(
      'Urgente',
    );

    await submit();

    expect(close).toHaveBeenCalledWith({
      type: 'expense',
      description: 'Acciones',
      detail: '',
      category: 'Inversiones',
      labels: ['Urgente'],
      amount: 500,
      motivo: '',
    });
  });

  it('closes without a result when cancelled', () => {
    (element.querySelector('button[type="button"]') as HTMLButtonElement).click();
    expect(close).toHaveBeenCalledWith();
  });
});
