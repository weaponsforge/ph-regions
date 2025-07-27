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
<b>Data Set Forecast Date:</b> 2022/08/03<br>
<b>Last Updated:</b> 2025/07/27
</sup>

<br>

### Requirements

1. NodeJS LTS >= v20
2. Docker

## Installation

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
   <br>

4. Seed (create) the initial data set.<br>
   - This step requires running the `npm run seed` script.
   - Proceed to the [Using Docker](#-using-docker) section for more information.
   - Run the command after successfully running the server app from **Usage - Using Docker - step # 3**.
      ```sh
      docker exec -it weaponsforge-ph-regions npm run seed
      ```

## Usage

### 🐳 Using Docker

1. Build the image.<br>
   ```sh
   docker compose build --no-cache
   ```

2. Run the container.<br>
   ```sh
   docker compose up
   ```
   - > **INFO:** Windows OS users may need to uncomment the `CHOKIDAR_USEPOLLING` and `CHOKIDAR_INTERVAL` environment variables to enable hot reload.

3. Confirm the running containers.
   ```sh
   docker ps

   // -- weaponsforge-ph-regions (this app)
   // -- mongodb-ph-regions (Mongo DB service)
   ```

4. Access the local APIs at:<br>
   ```sh
   http://localhost:3001/api
   ```

5. Stop the containers to exit.<br>
   ```sh
   docker compose down
   ```

### 🟩 Alternate Usage Using Node

> [!NOTE]
> Running the server using only Node requires a running and accessible local MongoDB, which may need to be set up.<br>
> Adjust the `MONGO_URI` variable in the `.env` when using other MongoDB installations or services other than the ones packaged in the docker compose file.

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
   http://localhost:3001/api
   ```

</details>
<br>

@weaponsforge<br>
20250711
