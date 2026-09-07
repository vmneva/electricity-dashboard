# Electricity Data Dashboard

This project is a fullstack application for showing electricity data in a table format. Database contains data in hourly basis so app first sums it up to show data as daily rows. By clicking a row, a view with graph visualization of daily hour prices opens.

Table view supports

- searching by date
- ordering by columns
- filtering by date and price ranges
- opening single day view by clicking the date

Backend is ASP.NET Core Web API that fetches the data from PostgreSQL database. User interface is a simple React web app that calls for the API and just renders the data. All logic for handling the data is on the backend side. Visual graph for hourly prices per day is done using Recharts library. Styling is done using SCSS.

## How to get started

### Running backend with Docker

From the repo root build new `api` container next to db ones:

    docker compose up --build -d

API will run on http://localhost:5152.

### Running backend without Docker

The database needs to be running in Docker. From `backend/`:

    dotnet run --project ElectricityData.Api

API starts on the port shown in the console output.

## Running the frontend

Once backend is running, start frontend from `frontend/electricity-data-app`. First install dependencies and then run the app:

    npm install
    npm run dev

The UI starts on http://localhost:5173 (or the port shown in the console).

Note that if you are running backend without Docker, the `vite.config.ts` proxy targets port 5152 for the API requests to work. If that port is busy in your local machine, adjust the proxy. If API is running on Docker, everything should work automatically.

## Running the tests

Backend has currently unit tests only to helper class. You can run the tests from `/backend/ElectricityData.Api.Tests`:

    dotnet test

TODO: e2e tests

## Tech stack

| Area                | Technology                         | Purpose                             |
| ------------------- | ---------------------------------- | ----------------------------------- |
| Database            | PostgreSQL                         | Existing database running in Docker |
| Backend             | C# + .NET10 (ASP.NET Core Web API) | REST API backend                    |
| Database Access     | EF Core                            | Data access and ORM                 |
| PostgreSQL Provider | Npgsql                             | PostgreSQL integration for .NET     |
| API Documentation   | OpenAPI / Swagger                  | API documentation and testing       |
| Frontend            | React + TypeScript + Vite          | User interface                      |
| E2E Tests           | Playwright                         | End-to-end browser testing          |
| Charts              | Recharts                           | Graph visualizations                |
| Backend Unit Tests  | xUnit                              | Unit testing                        |
| Containerization    | Docker                             | Containerize backend and database   |

## Use of generative AI

Claude ([https://claude.ai/](https://claude.ai/)) was used to plan a timetable for this project. It was also utilised with debugging, CSS style generating, and ensuring that new technologies, such as Recharts, were used efficiently since I also learned them through this exercise.

Claude Code was not used. Github Copilot was already installed to VS Code so inline suggestions were enabled also in this project. However, everything that AI suggested or tried to correct was evaluated by human.
