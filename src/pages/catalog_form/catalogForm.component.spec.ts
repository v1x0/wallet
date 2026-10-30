import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Router, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CatalogService } from '../../services/catalog_service';
import { CatalogFormComponent } from './catalogForm.component';

describe('CatalogFormComponent', () => {
  let fixture: ComponentFixture<CatalogFormComponent>;
  let element: HTMLElement;
  let paramMap$: BehaviorSubject<ParamMap>;
  let router: Router;
  let catalog: CatalogService;

  async function render(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function type(value: string): void {
    const input = element.querySelector('input[name="catalogName"]') as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  async function submit(): Promise<void> {
    element.querySelector('form')!.dispatchEvent(new Event('submit'));
    await render();
  }

  beforeEach(async () => {
    paramMap$ = new BehaviorSubject<ParamMap>(convertToParamMap({ kind: 'category' }));

    await TestBed.configureTestingModule({
      imports: [CatalogFormComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMap$.asObservable() },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    catalog = TestBed.inject(CatalogService);

    fixture = TestBed.createComponent(CatalogFormComponent);
    element = fixture.nativeElement as HTMLElement;
    await render();
  });

  it('renders category creation mode when kind is "category" and switches to "label" when route param changes', async () => {
    expect(element.querySelector('.catalog-page__title')?.textContent?.trim()).toBe(
      'Crear categoría',
    );
    expect(element.textContent).toContain('Comida');

    paramMap$.next(convertToParamMap({ kind: 'label' }));
    await render();

    expect(element.querySelector('.catalog-page__title')?.textContent?.trim()).toBe(
      'Crear etiqueta',
    );
    expect(element.textContent).toContain('Personal');
  });

  it('validates empty and duplicate category names, then saves a valid category and navigates back relatively', async () => {
    await submit();
    expect(element.querySelector('.catalog-page__error')?.textContent?.trim()).toBe(
      'Ingresa el nombre de la categoría',
    );
    expect(router.navigate).not.toHaveBeenCalled();

    type('comida');
    await submit();
    expect(element.querySelector('.catalog-page__error')?.textContent?.trim()).toBe(
      'La categoría ya existe',
    );

    type(' Inversiones ');
    await submit();
    expect(catalog.categories()).toContain('Inversiones');
    expect(router.navigate).toHaveBeenCalledWith(['../..'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });

  it('saves a valid label in label mode and navigates back relatively', async () => {
    paramMap$.next(convertToParamMap({ kind: 'label' }));
    await render();

    type(' Vacaciones ');
    await submit();

    expect(catalog.labels()).toContain('Vacaciones');
    expect(router.navigate).toHaveBeenCalledWith(['../..'], {
      relativeTo: TestBed.inject(ActivatedRoute),
    });
  });

  it('renders the empty state when all items of the active kind are removed', async () => {
    for (const cat of [...catalog.categories()]) {
      catalog.removeCategory(cat);
    }
    await render();

    expect(element.querySelector('.catalog-page__empty')?.textContent?.trim()).toBe(
      'Todavía no hay categorías registradas.',
    );
  });
});
