import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LIBRARY_REMOTE_LOADER, LibraryLoaderService } from './libraryLoader.service';

describe('LibraryLoaderService', () => {
  function setup(loader: (remoteName: string, exposedModule: string) => Promise<unknown>): LibraryLoaderService {
    TestBed.configureTestingModule({ providers: [{ provide: LIBRARY_REMOTE_LOADER, useValue: loader }] });
    return TestBed.inject(LibraryLoaderService);
  }

  it('starts loading', () => {
    expect(setup(() => new Promise(() => {})).state()).toBe('loading');
  });

  it('loads the library by remote name and registers the elements with its injector', async () => {
    const registerCustomElements = vi.fn();
    const loader = vi.fn(async () => ({ registerCustomElements }));
    const service = setup(loader);

    await service.ensureElements();

    expect(loader).toHaveBeenCalledWith('SharedModule', './CustomElements');
    expect(registerCustomElements).toHaveBeenCalledWith(TestBed.inject(Injector));
    expect(service.state()).toBe('ready');
  });

  it('loads only once', async () => {
    const loader = vi.fn(async () => ({ registerCustomElements: () => {} }));
    const service = setup(loader);

    await Promise.all([service.ensureElements(), service.ensureElements()]);
    await service.ensureElements();

    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('is unavailable when the library cannot be loaded', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const service = setup(() => Promise.reject(new Error('offline')));

    await service.ensureElements();

    expect(service.state()).toBe('unavailable');
  });
});
