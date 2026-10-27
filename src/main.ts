import { initFederation } from '@angular-architects/native-federation';

// Standalone mode: the manifest of each environment lists the component libraries this MFE uses
initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
