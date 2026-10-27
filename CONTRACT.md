# wallet-angular — Feature Contract

Feature MFE (type 2) that shows the wallet balance and its transactions and lets the user add new ones.

| Item | Value |
|---|---|
| Remote name | `wallet-angular` |
| Integration | Route-based (`./Routes`) |
| Dev `remoteEntry.json` | `http://localhost:4204/remoteEntry.json` |
| Production `remoteEntry.json` | `/v1/wallet/remoteEntry.json` |
| Suggested registry entry | `path: 'wallet'`, `title: 'Billetera'`, `icon: 'account_balance_wallet'`, `roles: []` |
| Component libraries used | `SharedModule` (`./CustomElements`): `vixo-balance-ui`, `vixo-transaction-item-ui` |
| Required roles | None |
| Platform events | None published or consumed |

## `./Routes`

Exports `routes: Routes`, relative to the top-level path the shell assigns:

| Path | Title | Page |
|---|---|---|
| `''` | Billetera | `WalletOverviewComponent`: balance, transactions, "Agregar movimiento" dialog |

## Host Requirements

- Federation manifest lists `SharedModule`. If it cannot be loaded, the wallet falls back to its own components (`app-balance`, `app-transaction-item`).
- Angular Material theme and Material Symbols font provided by the host.

## Known Limitations

- There is no BFF endpoint yet: transactions are kept in memory (`TransactionService`), seeded with sample data, and are lost on reload.
- The inputs of the library elements were inferred from their previous usage (`src/federation/contracts/`); confirm them with the library team.

## Versioning

Renaming or removing an exposed key or a route path is a breaking change (new major version).

| Version | Change |
|---|---|
| 1.0.0 | Initial contract: `./Routes` |
