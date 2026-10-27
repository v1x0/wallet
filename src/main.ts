import { initFederation } from '@angular-architects/native-federation';
import { environment } from './environments/enviroments';

initFederation({
  SharedModule: `${environment.sharedModule.baseURl}${environment.sharedModule.remoteEntry}`
})
  .catch(err => console.error('Error cargando manifest:', err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error('Error inicializando bootstrap:', err));
