import { Injector } from "@angular/core";

export interface LibraryDescriptor {
  remoteName: string;
  exposedModule: string;
  tags: readonly string[];
  register(module: unknown, injector: Injector): void | Promise<void>
}