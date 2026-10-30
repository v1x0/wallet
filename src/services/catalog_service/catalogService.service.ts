import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_CATEGORIES, DEFAULT_LABELS } from '../../models/catalog.model';

/**
 * In-memory domain state for user-managed categories and labels.
 * Returns frozen copies so consumers cannot mutate internal state.
 */
@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly categoryItems = signal<string[]>([...DEFAULT_CATEGORIES]);
  private readonly labelItems = signal<string[]>([...DEFAULT_LABELS]);

  /** Frozen list of categories available when creating a movement. */
  readonly categories = computed<ReadonlyArray<string>>(() =>
    Object.freeze([...this.categoryItems()]),
  );

  /** Frozen list of labels available when creating a movement. */
  readonly labels = computed<ReadonlyArray<string>>(() =>
    Object.freeze([...this.labelItems()]),
  );

  /**
   * Adds a new category if non-empty and not already present (case-insensitive).
   * @returns true if the category was added, false otherwise.
   */
  addCategory(rawName: string): boolean {
    const name = rawName.trim();
    if (!name) {
      return false;
    }
    const exists = this.categoryItems().some(
      (item) => item.toLowerCase() === name.toLowerCase(),
    );
    if (exists) {
      return false;
    }
    this.categoryItems.update((items) => [...items, name]);
    return true;
  }

  /** Removes a category by exact name. */
  removeCategory(name: string): void {
    this.categoryItems.update((items) => items.filter((item) => item !== name));
  }

  /**
   * Adds a new label if non-empty and not already present (case-insensitive).
   * @returns true if the label was added, false otherwise.
   */
  addLabel(rawName: string): boolean {
    const name = rawName.trim();
    if (!name) {
      return false;
    }
    const exists = this.labelItems().some(
      (item) => item.toLowerCase() === name.toLowerCase(),
    );
    if (exists) {
      return false;
    }
    this.labelItems.update((items) => [...items, name]);
    return true;
  }

  /** Removes a label by exact name. */
  removeLabel(name: string): void {
    this.labelItems.update((items) => items.filter((item) => item !== name));
  }
}
