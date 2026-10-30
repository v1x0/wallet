# wallet-angular — Feature Contract

Feature MFE (type 2) that shows the wallet balance and its transactions and lets the user add new ones, as well as create categories and labels on a dedicated route.

| Item | Value |
|---|---|
| Remote name | `wallet-angular` |
| Integration | Route-based (`./Routes`) |
| Dev `remoteEntry.json` | `http://localhost:4204/remoteEntry.json` |
| Production `remoteEntry.json` | `/v1/wallet/remoteEntry.json` |
| Suggested registry entry | `path: 'wallet'`, `title: 'Billetera'`, `icon: 'account_balance_wallet'`, `roles: []` |
| Component libraries used | `components-shared` (`./CustomElements`): `vixo-balance`, `vixo-transaction-item`, `vixo-transaction-modal-form`, `vixo-file-upload` |
| Required roles | None |
| Platform events | None published or consumed |

## `./Routes`

Exports `routes: Routes`, relative to the top-level path the shell assigns:

| Path | Title | Page |
|---|---|---|
| `''` | Billetera | `WalletOverviewComponent`: balance, categories/labels summary, transactions, "Agregar movimiento" dialog |
| `'catalog/:kind'` | Crear categoría o etiqueta | `CatalogFormComponent`: shared page to create/manage categories (`kind = 'category'`) and labels (`kind = 'label'`) |

## Host Requirements

- Federation manifest lists `components-shared`. If it cannot be loaded, the wallet falls back to its own components (`app-balance`, `app-transaction-item`).
- Angular Material theme and Material Symbols font provided by the host.
- Provides `PLATFORM_SESSION` from `@vixo/platform-contracts` (optional in standalone mode).

## Known Limitations

- There is no BFF endpoint yet: transactions, categories and labels are kept in memory (`TransactionService`, `CatalogService`), seeded with sample data, and are lost on reload.

## Versioning

Renaming or removing an exposed key or a route path is a breaking change (new major version).

| Version | Change |
|---|---|
| 1.0.0 | Initial contract: `./Routes` |
| 1.1.0 | Added `catalog/:kind` route to `./Routes` for creating categories and labels |
