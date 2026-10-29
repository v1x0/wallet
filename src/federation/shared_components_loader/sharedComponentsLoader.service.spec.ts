import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  SHARED_COMPONENTS_REMOTE_LOADER,
  SharedComponentsLoaderService,
} from './sharedComponentsLoader.service';

describe('SharedComponentsLoaderService', () => {
  function setup(
    loader: (remoteName: string, exposedModule: string) => Promise<unknown>,
  ): SharedComponentsLoaderService {
    TestBed.configureTestingModule({
      providers: [{ provide: SHARED_COMPONENTS_REMOTE_LOADER, useValue: loader }],
    });
    return TestBed.inject(SharedComponentsLoaderService);
  }

  it('starts in loading state', () => {
    expect(setup(() => new Promise(() => {})).state()).toBe('loading');
  });

  it('loads components-shared and registers custom elements with the host injector', async () => {
    const registerCustomElements = vi.fn();
    const loader = vi.fn(async () => ({ registerCustomElements }));
    const service = setup(loader);

    await service.ensureElements();

    expect(loader).toHaveBeenCalledWith('components-shared', './CustomElements');
    expect(registerCustomElements).toHaveBeenCalledWith(TestBed.inject(Injector));
    expect(service.state()).toBe('ready');
  });

  it('loads only once across concurrent or repeated calls', async () => {
    const loader = vi.fn(async () => ({ registerCustomElements: () => {} }));
    const service = setup(loader);

    await Promise.all([service.ensureElements(), service.ensureElements()]);
    await service.ensureElements();

    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('transitions to unavailable when the library cannot be loaded', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const service = setup(() => Promise.reject(new Error('offline')));

    await service.ensureElements();

    expect(service.state()).toBe('unavailable');
  });
});
