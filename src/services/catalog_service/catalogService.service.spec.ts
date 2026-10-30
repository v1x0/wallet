import { TestBed } from '@angular/core/testing';
import { DEFAULT_CATEGORIES, DEFAULT_LABELS } from '../../models/catalog.model';
import { CatalogService } from './catalogService.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    service = TestBed.inject(CatalogService);
  });

  it('starts with default categories and labels', () => {
    expect(service.categories()).toEqual(DEFAULT_CATEGORIES);
    expect(service.labels()).toEqual(DEFAULT_LABELS);
  });

  it('adds and removes categories while ignoring empty or duplicate values', () => {
    expect(service.addCategory('   ')).toBe(false);
    expect(service.addCategory('comida')).toBe(false);
    expect(service.addCategory('  Inversiones  ')).toBe(true);
    expect(service.categories()).toContain('Inversiones');

    service.removeCategory('Inversiones');
    expect(service.categories()).not.toContain('Inversiones');
  });

  it('adds and removes labels while ignoring empty or duplicate values', () => {
    expect(service.addLabel('')).toBe(false);
    expect(service.addLabel('PERSONAL')).toBe(false);
    expect(service.addLabel(' Viajes ')).toBe(true);
    expect(service.labels()).toContain('Viajes');

    service.removeLabel('Viajes');
    expect(service.labels()).not.toContain('Viajes');
  });

  it('returns frozen arrays so external callers cannot mutate state', () => {
    expect(() => (service.categories() as string[]).push('Hack')).toThrow(TypeError);
    expect(() => (service.labels() as string[]).push('Hack')).toThrow(TypeError);
  });
});
