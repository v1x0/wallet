# wallet-angular

Feature MFE of the wallet: balance, transactions and a dialog to add new ones. It is exposed through Native Federation as `./Routes` and mounted by the shell. Its public contract is in [CONTRACT.md](./CONTRACT.md).

## Development (standalone mode)

```bash
npm install
npm start
```

Open `http://localhost:4204/wallet`. In standalone mode `src/app/` plays the role of the shell and mounts `./Routes` under `/wallet`.

The component library is loaded by remote name (`SharedModule`) from the manifest of each environment:

| Environment | Manifest |
|---|---|
| Development | `federation_manifests/development/federation.manifest.json` |
| Production | `federation_manifests/production/federation.manifest.json` |

If the library is not available, the wallet uses its own components.

## Build and Tests

```bash
npm run build
npm test
```

Do not run `ng build` while the dev server of this project is running.

## Structure

```text
src/
├── app/            # standalone root only (never exposed)
├── routes/         # wallet.routes.ts — exposed as ./Routes
├── pages/          # wallet_overview
├── components/     # balance, transaction_item, add_transaction_dialog (fallbacks and internal UI)
├── services/       # transaction_service (in-memory state until there is a BFF)
├── models/         # transaction.model.ts
└── federation/     # component library contract + LibraryLoaderService
```
