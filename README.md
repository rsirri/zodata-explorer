# zodata-explorer — SAP OData Service Explorer

A SAP Fiori application built with UI5 and TypeScript that discovers, lists, and inspects all OData V2 and V4 services registered on an SAP S/4HANA system in real time.

## Overview

This app connects to the SAP Gateway Catalog Service and provides a clean UI to:

- Browse all **OData V2** services registered on the system
- Browse all **OData V4** services (RAP-based bindings)
- Search and filter services by name
- Drill into service details — Service ID, Technical Name, Service URL, Metadata URL, Service Type, Version
- Inspect **Entity Sets** exposed by each service

Built as a portfolio project to demonstrate real-world SAP Fiori development skills across multiple S/4HANA environments.

---

## Screenshots

| Home             | V2 Service List             | Service Detail                      |
| ---------------- | --------------------------- | ----------------------------------- |
| V2 / V4 selector | 3,500+ services with search | Full service metadata + Entity Sets |

---

## Branch Guide

| Branch     | System                | Catalog Version                 | Dev Environment                 |
| ---------- | --------------------- | ------------------------------- | ------------------------------- |
| `main`     | Kiewit S/4HANA        | OData V2 — `CATALOGSERVICE`     | SAP Business Application Studio |
| `pinnacle` | Pinnacle S/4HANA 2023 | OData V4 — `iwfnd/catalog/0001` | VS Code + SAP Fiori Tools       |

Each branch is independently deployable against its respective SAP backend.

---

## Tech Stack

| Layer              | Technology                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Framework          | SAPUI5 1.120+                                                     |
| Language           | TypeScript                                                        |
| Template           | SAP Fiori Basic (freestyle)                                       |
| Theme              | sap_horizon                                                       |
| Catalog (main)     | `/sap/opu/odata/iwfnd/CATALOGSERVICE` — OData V2                  |
| Catalog (pinnacle) | `/sap/opu/odata4/iwbep/all/default/iwfnd/catalog/0001` — OData V4 |
| Tooling            | SAP Fiori Tools, UI5 Tooling, ui5-tooling-transpile               |

---

## App Structure

```
webapp/
├── controller/
│   ├── App.controller.ts       # Shell / root controller
│   ├── View1.controller.ts     # Home — V2/V4 selector
│   ├── View2.controller.ts     # Service list with search
│   └── View3.controller.ts     # Service detail + Entity Sets
├── view/
│   ├── App.view.xml
│   ├── View1.view.xml
│   ├── View2.view.xml
│   └── View3.view.xml
├── model/
│   └── models.ts               # Device model
├── css/
│   └── style.css
└── manifest.json               # App descriptor + routing
```

---

## Getting Started

### Prerequisites

- Node.js LTS
- npm
- SAP Fiori Tools VS Code extension (or SAP BAS)
- Access to an SAP S/4HANA system with Gateway enabled

### Run Locally

```bash
npm install
npm start
```

The app proxies `/sap` requests to your configured backend in `ui5.yaml`. A browser authentication prompt will appear — enter your SAP credentials.

### Run with Mock Data

```bash
npm run start-mock
```

Uses the local metadata file in `webapp/localService/` — no SAP system connection needed.

---

## Key Learning Points

- Freestyle UI5 app with TypeScript and full type safety
- Multi-view navigation with SAP Router (3 views)
- Real-time OData catalog consumption — no hardcoded service list
- Same app architecture adapted for both V2 and V4 catalog APIs
- Multi-system deployment across two independent S/4HANA environments
- Git branching strategy for multi-environment SAP Fiori projects

---

## Author

**Rajesh Sirri** — Senior SAP Technical Consultant  
14+ years SAP ABAP | Fiori | RAP | BTP | TypeScript  
[Portfolio](https://rsirri.github.io) · [GitHub](https://github.com/rsirri)
