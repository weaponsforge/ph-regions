## ph-regions

A RESTful API that serves **hierarchical location data** of the Philippines — including regions, provinces municipalities, and a **randomly generated number of barangays** per municipality.

> [!IMPORTANT]
> This API is intended **for testing and simulating RESTful API requests** from client applications.<br>
> **Note:** The location data may be outdated and does **not** reflect the most current official records.

<sup>
<b>Data Source</b><br>
&nbsp; &nbsp; - Provinces and Municipalities: <a href="https://www.pagasa.dost.gov.ph/climate/climate-prediction/10-day-climate-forecast">PAGASA 10-Day weather forecast Excel files</a><br>
&nbsp; &nbsp; - Regions and Provinces: <a href="https://www.pagasa.dost.gov.ph/climate/climate-prediction/seasonal-forecast">PAGASA Seasonal Forecast Rainfall Analysis Table</a><br>
</sup>

<sup>
<b>Data Set Forecast Date:</b> 2022/08/03
</sup>

<br>

### 📋 Requirements

1. NodeJS LTS >= v20
2. Docker

### 📦 Core Libraries/Frameworks

The server app uses the following libraries and frameworks.

| Library | Version | Description |
| --- | --- | --- |
| express | `v5.1.0` |  Node.js web framework for building APIs and web servers. |
| mongoose | `v8.16.5` | ODM for MongoDB that provides schema-based modeling and data interaction. |
| zod | `v4.0.10` | TypeScript-first schema validation for request payloads and query parameters. |
| nodemon | `v3.1.10` | Development tool that automatically restarts the server on file changes. |
| tsx | `v4.20.3` | Executes TypeScript and TSX files directly, ideal for dev and script running. |
| tsc-alias | `v1.8.16` | Rewrites path aliases in compiled TypeScript output (`tsconfig` paths). |
| eslint | `v9.32.0` | Linting tool that enforces code style, quality, and formatting rules. |

## 📚 Project Folder Structure

The main app is inside the `📂 server/src` folder.

- 📂 **dist** - Contains the compiled JavaScript output from TypeScript.
- 🧩 **classes** - Contains reusable class-based logic and services.
- ⚙️ **controllers** - Contains scripts for handling incoming HTTP requests and responses.
- 🔗 **middlewares** - Contains functions that process HTTP requests before controllers.
- 🧊 **models** - Contains MongoDB database models and schema definitions using Mongoose.
- 🪧 **routes** - Contains API endpoint definitions and route bindings.
- 📐 **schemas** - Contains Zod validation schemas.
- 📜 **scripts** - Contains utility scripts for setup and maintenance tasks.
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
   | ALLOW_CORS | Allow Cross-Origin Resource Sharing (CORS) on the API endpoints.<br><br>Default value is `1`, allowing access to domains listed in `ALLOWED_ORIGINS`.<br> Setting to `0` will make all endpoints accept requests from all domains, including Postman. |
   | ALLOWED_ORIGINS | IP/domain origins in comma-separated values that are allowed to access the API if `ALLOW_CORS=1`.<br> Include `http://localhost:3000` by default to allow CORS access to the **/client** app. |
   | DEPLOYMENT_PLATFORM | This variable refers to the backend `server`'s hosting platform, defaulting to `DEPLOYMENT_PLATFORM=regular`<br>for full-server NodeJS express apps.<br><br>Valid values are:<br>`regular` - for traditional full-server NodeJS express apps<br>`vercel` - for Vercel (serverless) |
   | MONGO_URI | MongoDB connection string.<br>Default value uses the Docker MongoDB connection string (defined in the docker compose file). |
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

4. Access the local APIs at:<br>
   ```sh
   http://localhost:3001
   ```
   - > 💡 **INFO:**<br>
     > Browse thru the available API routes within the `📂 /server/src/routes` directory to view the available routes for now.

5. Stop the containers to exit.<br>
   ```sh
   docker compose down
   ```

### 🟩 Alternate Usage Using Node

> [!NOTE]
> Running the server directly with Node.js requires a locally installed and accessible MongoDB instance, which may need to be set up manually.<br>
>
> When using a different MongoDB service or installation (other than the one provided in the Docker Compose setup), ensure the `MONGO_URI` variable in the `.env` file is properly configured.

<details>
<summary>View usage instructions</summary>
<br>

1. Run the API for local development.<br>
   ```sh
   npm run dev
   ```

2. Run the seeder script only once.<br>
   ```sh
   npm run seed
   ```

3. Access the local APIs at:<br>
   ```sh
   http://localhost:3001
   ```
   - > 💡 **INFO:**<br>
     > Browse thru the available API routes within the `📂 /server/src/routes` directory to view the available routes for now.

</details>
<br>

## 📜 Available Scripts

These scripts, compatible with running in Node and Docker, run various TypeScript scripts and tests.

<details>
<summary>Click to expand the list of available scripts</summary>

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

Runs the database seeder script, inserting intial data contents to the database.

</details>

## 📦 Docker Scripts

These scripts allow optional Docker-related processes, such as enabling file watching in Docker containers running in Windows WSL2 and others.

<details>
<summary>Click to expand the list of available scripts</summary>

#### Docker run command

```sh
docker exec -it weaponsforge-ph-regions <AVAILABLE_SCRIPT>
```

### `npm run docker:dev`

Runs the app for local development with the `--inspect` flag, enabling it for debugging with breakpoints in VS Code when running inside containers.

### `npm run docker:seed:debug`

Runs the database seeder script, inserting intial data contents to the database.

```sh
docker exec -it weaponsforge-ph-regions npm run docker:seed:debug
```

> 🔔 **IMPORTANT**<br>
> This script requires having run only the `docker compose up` command. This ensures port `9229` is free for watching the script since it does not run the nodemon + server app with `tsx` and `--inspect=0.0.0.0:9229`.

### `npm run docker:watch:win`

Watches file changes in `.ts` files using the `tsc --watch` option with `dynamicPriorityPolling` in Docker containers running in Windows WSL2.

</details>
<br>

@weaponsforge<br>
20250711
