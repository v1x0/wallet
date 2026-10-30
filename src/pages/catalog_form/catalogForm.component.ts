import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogKind } from '../../models/catalog.model';
import { CatalogService } from '../../services/catalog_service';

/**
 * Shared routed page for creating and managing both categories and labels.
 * Reads the target `:kind` ('category' | 'label') from `ActivatedRoute.paramMap`.
 */
@Component({
  selector: 'app-catalog-form',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './catalogForm.component.html',
  styleUrls: ['./catalogForm.component.scss'],
})
export class CatalogFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly catalog = inject(CatalogService);

  protected readonly kind = signal<CatalogKind>('category');
  protected readonly name = signal('');
  protected readonly errorMessage = signal('');
  protected readonly loading = signal(false);

  protected readonly isCategory = computed(() => this.kind() === 'category');
  protected readonly pageTitle = computed(() =>
    this.isCategory() ? 'Crear categoría' : 'Crear etiqueta',
  );
  protected readonly fieldLabel = computed(() =>
    this.isCategory() ? 'Nombre de la categoría' : 'Nombre de la etiqueta',
  );
  protected readonly placeholder = computed(() =>
    this.isCategory() ? 'Ej. Inversiones' : 'Ej. Vacaciones',
  );
  protected readonly currentItems = computed(() =>
    this.isCategory() ? this.catalog.categories() : this.catalog.labels(),
  );

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const rawKind = params.get('kind');
      this.kind.set(rawKind === 'label' ? 'label' : 'category');
      this.name.set('');
      this.errorMessage.set('');
    });
  }

  protected valueOf(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected onNameInput(event: Event): void {
    this.name.set(this.valueOf(event));
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  protected save(event: Event): void {
    event.preventDefault();
    const trimmed = this.name().trim();
    if (!trimmed) {
      this.errorMessage.set(
        this.isCategory() ? 'Ingresa el nombre de la categoría' : 'Ingresa el nombre de la etiqueta',
      );
      return;
    }

    const added = this.isCategory()
      ? this.catalog.addCategory(trimmed)
      : this.catalog.addLabel(trimmed);

    if (!added) {
      this.errorMessage.set(
        this.isCategory() ? 'La categoría ya existe' : 'La etiqueta ya existe',
      );
      return;
    }

    this.name.set('');
    this.errorMessage.set('');
    void this.router.navigate(['../..'], { relativeTo: this.route });
  }

  protected removeItem(item: string): void {
    if (this.isCategory()) {
      this.catalog.removeCategory(item);
    } else {
      this.catalog.removeLabel(item);
    }
  }
}
