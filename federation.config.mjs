import {
  withNativeFederation,
  fromPackageJson,
} from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'wallet-angular',

  exposes: {
    // Route-based integration: the shell mounts it under its own top-level path
    './Routes': './src/routes/wallet.routes.ts',
  },

  shared: fromPackageJson({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    build: 'package',
  })
    .patch(['@angular/*'], { includeSecondaries: { keepAll: true } })
    .get(),

  skip: [
    'rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket',
    // Legacy animations: require @angular/animations, which Material no longer uses
    '@angular/platform-browser/animations',
    '@angular/platform-browser/animations/async',
    // Node-only entry points (schematics) and testing: never shared in the browser
    (pkg) => /^@angular\/(cdk|material)\/(schematics|testing)/.test(pkg),
  ],

  // Please read our docs about configuring native federation:
  // https://native-federation.com/docs/v4/angular-adapter/configuration/

  features: {
    denseChunking: true,
    denseExternals: true,
    strictImports: false,
    // A feature MFE consumes component libraries: share everything, even what it does not import itself
    ignoreUnusedDeps: false,
  },
});
