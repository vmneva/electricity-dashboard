# Electricity Data Dashboard

This project is a fullstack application for showing electricity data in a table format. Database contains data in hourly basis so app first sums it up to show data as daily rows. Project is part of Solita Academy task for autumn 2026.

Table view supports

- searching by date
- ordering by columns
- filtering by date and price ranges
- opening single day view with price graph by clicking the date cell

Backend is ASP.NET Core Web API that fetches the data from PostgreSQL database. User interface is a simple React web app that calls for the API and just renders the data. All logic for handling the data is on the backend side. For state management, frontend side uses React Context and React Query. Visual graph for hourly prices per day is done using Recharts library. Styling is done using SCSS.

## How to get started

### Running backend with Docker

From the repo root build new `api` container next to db ones:

    docker compose up --build -d

API will run on http://localhost:5152.

### Running backend without Docker

This is a .NET10 project so first, you need to install .NET10 SDK. You can follow instructions to download it from here: https://dotnet.microsoft.com/en-us/download/dotnet/10.0

Additionally, you need to first start Docker to run the database. When it is running, run from `backend/`:

    dotnet run --project ElectricityData.Api

API starts on the port shown in the console output.

## Running the frontend

Once backend is running, start frontend from `frontend/electricity-data-app`. First install dependencies and then run the app:

    npm install
    npm run dev

The UI starts on http://localhost:5173 (or the port shown in the console).

Note that if you are running backend without Docker, the `vite.config.ts` proxy targets port 5152 for the API requests to work. If that port is busy in your local machine, adjust the proxy. If API is running on Docker, everything should work automatically.

## Running the tests

Backend has currently unit tests only for the helper class `HourPriceHelper.cs`. You can run the tests from `/backend/ElectricityData.Api.Tests`:

    dotnet test

Time ran short with E2E tests on the frontend side.

## Tech stack

| Area                | Technology                         |
| ------------------- | ---------------------------------- |
| Database            | PostgreSQL                         |
| Backend             | C# + .NET10 (ASP.NET Core Web API) |
| Database Access     | EF Core                            |
| PostgreSQL Provider | Npgsql                             |
| API Documentation   | OpenAPI / Swagger                  |
| Frontend            | React + TypeScript + Vite          |
| Graphs              | Recharts                           |
| Backend Unit Tests  | xUnit                              |
| Containerization    | Docker                             |

## Use of generative AI

Claude ([https://claude.ai/](https://claude.ai/)) was used to plan a timetable and suitable stack for this project with current knowledge. It was also utilised with debugging, CSS style generating, and ensuring that new technologies, such as Recharts, were used efficiently since I also learned them through this exercise.

Claude Code was not used. Github Copilot was already installed to VS Code so inline suggestions were enabled also in this project. However, everything that AI suggested or tried to correct was evaluated by human.
