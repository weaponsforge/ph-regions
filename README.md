## ph-regions

A RESTful API that serves **hierarchical location data** of the Philippines — including regions, provinces, municipalities, and a **randomly generated number of barangays** per municipality.

> [!IMPORTANT]
> This API is intended **for testing and simulating RESTful API requests** from client applications.<br>
> **Note:** The location data may be outdated and does **not** reflect the most current official records.

### Online URLs

- REST API: <https://ph-regions.vercel.app/api>
- API documentation:
   - <https://ph-regions.vercel.app/>
   - <https://ph-regions.vercel.app/docs/>

### Table of Contents

- [Requirements](#-requirements)
- [Core Libraries/Frameworks](#-core-librariesframeworks)
- [Project Folder Structure](#-project-folder-structure)
- [Installation](#️-installation)
- [Usage](#-usage)
   - [Using Docker](#-using-docker)
   - [Alternate Usage Using Node](#-alternate-usage-using-node)
- [Available Scripts](#-available-scripts)
- [Docker Scripts](#-docker-scripts)
- [Adding New Endpoints](#️-adding-new-endpoints)
- [Usage with GitHub Actions](#usage-with-github-actions)
- [References](#references)

### 📋 Requirements

1. NodeJS LTS >= v22
2. Docker

### 📦 Core Libraries/Frameworks

The server app uses the following core libraries and frameworks.

| Library | Version | Description |
| --- | --- | --- |
| express | `5.1.0` |  Node.js web framework for building APIs and web servers. |
| mongoose | `8.16.5` | ODM for MongoDB that provides schema-based modeling and data interaction. |
| zod | `4.0.10` | TypeScript-first schema validation for request payloads and query parameters. |
| nodemon | `3.1.10` | Development tool that automatically restarts the server on file changes. |
| tsx | `4.20.3` | Executes TypeScript and TSX files directly, ideal for dev and script running. |
| tsc-alias | `1.8.16` | Rewrites path aliases in compiled TypeScript output (`tsconfig` paths). |
| eslint | `9.32.0` | Linting tool that enforces code style, quality, and formatting rules. |
| @asteasolutions/zod-to-openapi | `8.1.0` | Generates an OpenAPI yaml file from Zod schemas. |

## 📚 Project Folder Structure

The main app is inside the `📂 server/src` folder.

- 📂 **dist** - Contains the compiled JavaScript output from TypeScript.
- 🧩 **classes** - Contains reusable class-based logic and services.
- ⚙️ **controllers** - Contains scripts for handling incoming HTTP requests and responses.
- 🔗 **middleware** - Contains functions that process HTTP requests before controllers.
- 🧊 **models** - Contains MongoDB database models and schema definitions using Mongoose.
- 🪧 **routes** - Contains API endpoint definitions and route bindings.
- 📐 **schemas** - Contains Zod validation schemas.
- 📜 **scripts** - Contains utility scripts for setup and maintenance tasks.
- 🌐 **openapi** - Contains OpenAPI definitions using Zod schemas (folder: `/scripts/openapi/docs`)
- 🧾 **types** - Contains shared TypeScript types and interfaces
- 🛠️ **utils** - Contains general-purpose helper functions.
- 📱 `app.ts` - Sets up the Express app and middleware.
- 🖥️ `server.ts` - Starts the server and listens for requests


## 🛠️ Installation

1. Clone the repository.<br>
`git clone https://github.com/weaponsforge/ph-regions.git`

2. Install dependencies.<br>
   ```sh
   cd server
   npm install
   ```

3. Create a `.env` file from the `.env.example` file using its default values. Edit the variables and values as needed.

   <details>
   <summary>👉 List of Environment Variables</summary>

   | Variable Name | Description |
   | --- | --- |
   | ALLOW_ALL_ORIGINS | Flag to allow HTTP requests from all origins (domains). When set to `1` (default), enables CORS for all domains. When set to `0`, restricts access to domains specified in `ALLOWED_ORIGINS`. |
   | ALLOW_CORS | Enable Cross-Origin Resource Sharing (CORS) on the API endpoints.<br><br>`ALLOW_CORS=1` enables CORS for specified `ALLOWED_ORIGINS` and restricts access to those domains.<br> `ALLOW_CORS=0` disables CORS restrictions, allowing all domains including Postman. |
   | ALLOWED_ORIGINS | IP/domain origins in comma-separated values that are allowed to access the API if `ALLOW_CORS=1` and `ALLOW_ALL_ORIGINS=0`.<br> Include `http://localhost:3000` by default to allow CORS access to the **/client** app. |
   | DEPLOYMENT_PLATFORM | This variable refers to the backend `server`'s hosting platform, defaulting to `DEPLOYMENT_PLATFORM=regular`<br>for full-server NodeJS express apps.<br><br>Valid values are:<br>`regular` - for traditional full-server NodeJS express apps<br>`vercel` - for Vercel (serverless) |
   | MONGO_URI | MongoDB connection string.<br>Default value uses the Docker MongoDB connection string (defined in the docker compose file). |
   | BASE_API_URL | Server base API url minus the forward slash |
   | CHOKIDAR_USEPOLLING | Enables hot reload on `nodemon` running inside Docker containers on a Windows host. Set it to `true` if running Docker Desktop with WSL2 on a Windows OS. |
   | CHOKIDAR_INTERVAL | Chokidar polling interval. Set it along with `CHOKIDAR_USEPOLLING=true` if running Docker Desktop with WSL2 on a Windows OS. The default value is `1000`. |

   </details>

4. Seed (create) the initial data set.<br>
   - This step requires running the `npm run seed` script.
   - Proceed to the [Using Docker](#-using-docker) section for more information.
   - Run the command after successfully running the server app from **Usage - Using Docker - step # 3**.
      ```sh
      docker exec -it weaponsforge-ph-regions npm run seed
      ```

## ⚡ Usage

### 🐳 Using Docker

### A. Use Pre-Built Development Docker Image

See [Docker Hub: weaponsforge/ph-regions](https://hub.docker.com/r/weaponsforge/ph-regions)

1. Pull the development Docker image from Docker Hub using one of the options.<br>
   - `docker pull weaponsforge/ph-regions:latest`
   - `docker compose pull` (using Docker compose from the root project directory)

2. Navigate to the project directory. Create a `.env` file at **server/.env** using **server/.env.example** as reference.
   - See [Installation](#️-installation) - **step # 3** for more information.

3. Run the development Docker image.

   - ```sh
     docker compose up
     ```

   - Proceed to **Build the Development Docker Image - step # 2** for more information.

### B. Build the Development Docker Image

1. Build the image.<br>
   ```sh
   docker compose build --no-cache
   ```

2. Run the container.<br>
   ```sh
   docker compose up
   ```
   - > 💡 **INFO:** Windows OS users may need to uncomment the `CHOKIDAR_USEPOLLING` and `CHOKIDAR_INTERVAL` environment variables to enable hot reload.
   - > 🔄 **Alternate Run Command**<br>
     > Run this command instead of the first one to enable debugging with breakpoints in VS Code.

        ```sh
        docker compose -f docker-compose.debug.yml up
        ```

3. Confirm the running containers.
   ```sh
   docker ps

   // -- weaponsforge-ph-regions (this app)
   // -- mongodb-ph-regions (Mongo DB service)
   ```

4. 💡 Launch the API documentation to view available endpoints.

   ```text
   # Main API docs
   http://localhost:3001

   # Alternate API docs (interactive)
   http://localhost:3001/docs
   ```

5. View the [Available Scripts](#-available-scripts) to run.

6. Stop the containers to exit.<br>
   ```sh
   docker compose down
   ```

### 🟩 Alternate Usage Using Node

> [!NOTE]
> Running the server directly with Node.js requires a locally installed and accessible MongoDB instance, which may need to be set up manually.<br>
>
> When using a different MongoDB service or installation (other than the one provided in the Docker Compose setup), ensure the `MONGO_URI` variable in the `.env` file is properly configured.

<details>
<summary>👉 View usage instructions</summary>
<br>

1. Run the API for local development.<br>
   ```sh
   npm run dev
   ```

2. Run the seeder script only once.<br>
   ```sh
   npm run seed
   ```

3. 💡 Launch the API documentation to view available endpoints.

   ```text
   # Main API docs
   http://localhost:3001

   # Alternate API docs (interactive)
   http://localhost:3001/docs
   ```

4. View the [Available Scripts](#-available-scripts) to run.

</details>
<br>

## 📜 Available Scripts

These scripts, compatible with running in Node and Docker, run various TypeScript scripts and tests.

<details>
<summary>👉 Click to expand the list of available scripts</summary>

### `npm start`

Runs the compiled (JavaScript) server app for production mode.

### `npm run dev`

Runs the app for local development (when using Node).

### `npm run transpile`

Builds JavaScript, `.d.ts` declaration files, and map files from the TypeScript source files.

### `npm run transpile:noemit`

Runs type-checking without generating the JavaScript or declaration files from the TypeScript files.

### `npm run watch`

Watches file changes in `.ts` files using the `tsc --watch` option.

### `npm run lint`

Lints TypeScript source codes.

### `npm run lint:fix`

Fixes lint errors in TypeScript files.

### `npm run seed`

Runs the database seeder script, inserting initial data contents to the database.

### `npm run docs:gen`

Generates the OpenAPI `openapi.yaml` (YAML) and `openapi.json` (JSON) files into the `/server/public` directory.

### `npm run docs:build`

Builds the API documentation using the [Redocly CLI](https://www.npmjs.com/package/@redocly/cli) into the `/server/public/index.html` file.

### `npm run build`

Standard NPM build script that runs transpile, builds OpenAPI docs, and copies Swagger UI assets (`transpile` + `docs:build` + `copySwaggerFiles`).

### `npm run copySwaggerFiles`

Builds the Swagger UI API documentation by copying only relevant CSS and JavaScript files from `node_modules` into the `/public/docs` directory.

</details>

## 📦 Docker Scripts

These scripts allow optional Docker-related processes, such as enabling file watching in Docker containers running in Windows WSL2 and others.

<details>
<summary>👉 Click to expand the list of available scripts</summary>

### Docker run command

```sh
docker exec -it weaponsforge-ph-regions <AVAILABLE_SCRIPT>
```

### `npm run docker:dev`

Runs the app for local development with the `--inspect` flag, enabling it for debugging with breakpoints in VS Code when running inside containers.

### `npm run docker:seed:debug`

Runs the database seeder script, inserting initial data contents to the database.

```sh
docker exec -it weaponsforge-ph-regions npm run docker:seed:debug
```

> 🔔 **IMPORTANT**<br>
> This script requires having run only the `docker compose up` command. This ensures port `9229` is free for watching the script since it does not run the nodemon + server app with `tsx` and `--inspect=0.0.0.0:9229`.

### `npm run docker:watch:win`

Watches file changes in `.ts` files using the `tsc --watch` option with `dynamicPriorityPolling` in Docker containers running in Windows WSL2.

</details>

## 🗂️ Adding New Endpoints

Follow the steps for adding (or editing) new endpoints to the API.

<details>
<summary>👉 Click to view the guidelines</summary>

1. **Create a Zod schema**<br>
Follow the patterns in the `📐 schemas` directory (e.g., `province.schema.ts`).

2. **Create a Mongoose model**<br>
Follow the patterns in the `🧊 models` directory (e.g., `province.model.ts`).

3. **Set up routes (API endpoints)**<br>
Add new routes for the model in the `🪧 routes` directory (e.g., `/routes/province.ts`) **without input validation** for now.

4. **Define query, response, and request schemas**<br>
Create Zod schemas for query, response, params, and body in:<br>
`server/src/scripts/openapi/docs/api.schema.ts`

   > 💡 **INFO**<br>
   Follow the existing schema patterns in this file.

5. **Add validation middleware**<br>
   - Implement `🔗 validation` middleware for the routes (from **step 3**) using the Zod schemas from **step 4**.
   - Attach this middleware to the routes.

6. **Document with OpenAPI**<br>
Create OpenAPI documentation for the model in the `🌐 openapi` directory (e.g., `/scripts/openapi/docs/province.doc.ts`) and **register it** in `main.ts`.

7. **Create a controller**<br>
Add model-specific business logic in the `⚙️ controllers` directory (e.g., `/controllers/province.ts`) and connect it to the routes.

8. **Test the endpoints**<br>
Perform manual tests to ensure everything works correctly.

</details>
<br>

## Usage with GitHub Actions

### Deployment to Docker Hub

This repository deploys the latest development Docker image `weaponsforge/ph-regions:latest` to Docker Hub on the creation of new Tags/Releases with GitHub Actions. Supply the following GitHub Secrets and Variable to enable deployment to Docker Hub. It requires a Docker Hub account.

The Docker Hub image is available at:

https://hub.docker.com/r/weaponsforge/ph-regions

#### GitHub Secrets

| GitHub Secrets | Description |
| --- | --- |
| BASE_API_URL | Base URL of the production ph-regions API. |
| DOCKERHUB_USERNAME | Docker Hub username |
| DOCKERHUB_TOKEN | Deploy token for the Docker Hub account |
| VERCEL_ORG_ID | Vercel app's organization ID |
| VERCEL_PROJECT_ID | Vercel app's project ID |
| VERCEL_TOKEN | Vercel personal/token used by the CLI for auth in CI |
| BASE_API_URL | The Vercel server base API url minus the forward slash |
| DEPLOYMENT_PLATFORM | Target deployment platform of the backend server. Value is `vercel` |

#### GitHub Variables

| GitHub Variable | Description |
| --- | --- |
| DOCKERHUB_USERNAME | Docker Hub username |

## References

- [OpenAPI Specification](https://swagger.io/specification/)
- [Redocly - Introduction to OpenAPI](https://redocly.com/learn/openapi/learning-openapi)
- [Redocly - API Governance](https://redocly.com/api-governance)
- [Redocly Configuration](https://redocly.com/docs/redoc/config)
- [Redocly CLI](https://www.npmjs.com/package/@redocly/cli)
- [Redocly CLI Cookbook](https://github.com/Redocly/redocly-cli-cookbook)
- [Redoc Demo](https://redocly.github.io/redoc/)
- [Swagger Editor (Online)](https://swagger.io/tools/swagger-editor/)

@weaponsforge<br>
20250711<br>
20250908

