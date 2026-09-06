# Backend containerization
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app

EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy and restore dependencies
COPY ["../Directory.Packages.props", "./"]
COPY ["ElectricityData.Api/ElectricityData.Api.csproj", "ElectricityData.Api/"]
RUN dotnet restore "ElectricityData.Api/ElectricityData.Api.csproj"

# Build the app
COPY . .
WORKDIR "/src/ElectricityData.Api"
RUN dotnet build "./ElectricityData.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "./ElectricityData.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ElectricityData.Api.dll"]