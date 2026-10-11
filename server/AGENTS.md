# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ph-regions** is a RESTful API serving hierarchical Philippine location data (islands → regions → provinces → municipalities → barangays). It supports testing/simulating RESTful API requests from client applications, with deployment targets for both regular Node.js and Vercel serverless.

## Commands

```bash
# Development
npm run dev           # Start with nodemon (tsx, no compilation needed)
npm run watch         # Watch TypeScript files (tsc --watch)

# Type checking & linting
npm run transpile:noemit   # Type-check without emitting files
npm run lint               # Lint TypeScript files
npm run lint:fix           # Auto-fix lint errors

# Build (full pipeline: transpile + docs)
npm run build         # Compile TypeScript + build all API docs
npm run transpile     # Compile TypeScript only (tsc-alias for path rewrites)

# Database seeding
npm run seed          # Seed MongoDB with Philippine location data

# API documentation
npm run docs:gen      # Generate OpenAPI YAML/JSON from Zod schemas
npm run docs:build    # Build Redocly HTML documentation
npm run docs:swagger  # Copy Swagger UI assets + generate docs
```

Docker (run from repo root):
```bash
docker compose up     # Start app + MongoDB (development mode)
```

## Architecture

### Request Lifecycle
```
HTTP Request → CORS → Body Parser → Zod Validation Middleware → Controller → MongoCrudClass → Mongoose → MongoDB
```

### Key Abstractions

**`server/src/classes/mongo.class.ts`** — `MongoCrudClass` provides reusable `find`, `findOne`, `create`, `update`, `delete` methods used by all controllers. Controllers instantiate it with a Mongoose model.

**`server/src/middleware/validate.ts`** — Generic validation middleware that takes a Zod schema and validates `req.query` or `req.body`. Throws `ServerError` on failure.

**`server/src/middleware/connectServerless.ts`** — Wraps controllers for Vercel serverless, re-establishing MongoDB connections per request (stateless environment).

**`server/src/utils/error.ts`** — `ServerError extends Error` with a `status` property. The global error handler in `app.ts` catches these and formats the error response.

### Data Model (Hierarchical)
```
Island (1) → Region (many) → Province (many) → Municipality (many) → Barangays (Stats collection)
```
Mongoose models use virtual population for nested queries. `Stats` holds barangay counts per municipality.

### Zod as Single Source of Truth
Zod schemas in `server/src/schemas/` drive both:
1. **Runtime validation** — query parameter and payload validation via middleware
2. **OpenAPI documentation** — `@asteasolutions/zod-to-openapi` generates the spec from the same schemas

When adding or modifying endpoints, update the corresponding Zod schema, the OpenAPI doc file in `server/src/scripts/openapi/docs/`, and run `npm run docs:gen`.

### API Response Shape
All successful responses follow this structure:
```json
{
  "success": true,
  "total": 17,
  "metadata": { "version": "...", "author": "...", "url": "...", "description": "..." },
  "data": []
}
```
Error responses:
```json
{ "success": false, "error": "...", "message": ["..."], "status": 400 }
```

### API Documentation

The app serves three API documentation UIs. All three read the same generated OpenAPI spec (`server/public/openapi.yaml` / `server/public/openapi.json`), and `express.static` serves them from `server/public/`.

| UI | Path | Source | Spec source |
|---|---|---|---|
| Scalar | `/` | `server/public/index.html` (Scalar's CDN standalone script) | `/openapi.json` |
| Swagger UI | `/docs` | `server/public/docs/index.html` + assets copied from `swagger-ui-dist` | `openapi.json` |
| Redocly | `/docs/redoc` | `server/public/docs/redoc/index.html` (generated) | `openapi.yaml` |

**After any endpoint/schema change**, regenerate the spec first. All three UIs pick it up:
```bash
npm run docs:gen      # Zod schemas + src/scripts/openapi/docs/*.doc.ts → public/openapi.yaml + public/openapi.json
```

#### 1. Scalar docs
Scalar is not an npm dependency. This project uses the HTML/CSS/JavaScript version: `server/public/index.html` loads the standalone script from jsDelivr, pinned to an exact version with a Subresource Integrity (SRI) hash. Scalar reads `/openapi.json` at runtime, so `npm run docs:gen` is enough to update its content. To upgrade Scalar itself:
1. Find the latest standalone script version at https://cdn.jsdelivr.net/npm/@scalar/api-reference.
2. Compare it with the version in the `<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@<version>/dist/browser/standalone.js">` tag in `server/public/index.html`.
3. If a newer version exists, update the script URL to the new exact version. Always pin an exact version, never a tag like `@latest`, or the SRI hash will break when the file changes.
4. Generate a new SRI hash for the full script URL (needs `curl` and `openssl`):
   ```bash
   ./scripts/genSriHash.sh https://cdn.jsdelivr.net/npm/@scalar/api-reference@<version>/dist/browser/standalone.js
   ```
5. Replace the script's `integrity` attribute with the printed `sha384-...` value. Keep `crossorigin="anonymous"`. If the hash doesn't match the file, the browser will refuse to load the script and the page will be blank.
6. Load `/` in a browser to confirm the reference renders with no SRI or console errors.

#### 2. Swagger UI
- **Content:** run `npm run docs:gen`.
- **Assets:** `npm run docs:swagger` copies `swagger-ui.css`, `swagger-ui-bundle.js`, `swagger-ui-standalone-preset.js`, and `favicon-32x32.png` from `node_modules/swagger-ui-dist` into `server/public/docs/` (or `server/public/` when `DEPLOYMENT_PLATFORM=vercel`). To upgrade Swagger UI, update the `swagger-ui-dist` package (it comes in through `swagger-ui-express`), then run `npm run docs:swagger` again.
- **Config:** the spec URL and options are set in the `SwaggerUIBundle({...})` call in `server/public/docs/index.html`. It currently points at `http://localhost:3001/openapi.json`.

#### 3. Redocly
- `npm run docs:build` runs `docs:gen` and then `redocly build-docs ./public/openapi.yaml -o public/docs/redoc/index.html`.
- `server/public/docs/redoc/index.html` is a build artifact. Regenerate it; don't edit it by hand. To upgrade the renderer, update the `@redocly/cli` devDependency.

`npm run build` regenerates everything: transpile, then `docs:build` (spec + Redocly), then `docs:swagger`. The Scalar script version and SRI hash are the only parts you have to update by hand.

### Deployment Platform Branching
The `DEPLOYMENT_PLATFORM` env var (`"regular"` | `"vercel"`) controls:
- Route mounting in `app.ts` (serverless wrapper applied only on Vercel)
- MongoDB connection strategy (`server.ts` vs `connectServerless.ts`)

### Module System
The project uses ESM (`"type": "module"`). TypeScript targets `NodeNext` modules. Path alias `@/*` maps to `src/*` — `tsc-alias` rewrites these after compilation.

## Environment Setup

Copy `server/.env.example` to `server/.env` and set:
- `MONGO_URI` — MongoDB connection string
- `DEPLOYMENT_PLATFORM` — `regular` for local dev
- `ALLOW_CORS=1` and `ALLOW_ALL_ORIGINS=1` for local dev
- `BASE_API_URL` — e.g. `http://localhost:3001`

## Code Style

ESLint enforces: single quotes, no semicolons, 2-space indent, Unix line endings, no trailing commas. Run `npm run lint:fix` before committing. TypeScript strict mode is on — no implicit `any`, strict null checks.
