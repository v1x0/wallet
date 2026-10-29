import { initFederation } from '@angular-architects/native-federation';

// Standalone mode: the manifest of each environment lists the component libraries this MFE uses
initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  .catch((err) => {
    console.error(err);
    return null;
  })
  .then((federation) => import('./bootstrap').then((m) => m.bootstrap(federation)))
  .catch((err) => console.error(err));
