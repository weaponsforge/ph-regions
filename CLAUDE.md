# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ph-regions** is a RESTful API serving hierarchical Philippine location data (islands → regions → provinces → municipalities → barangays). It supports testing/simulating RESTful API requests from client applications, with deployment targets for both regular Node.js and Vercel serverless.

The codebase lives in `/server` — all development work happens there.

## Commands

Run these from the `/server` directory:

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
