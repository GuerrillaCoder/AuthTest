FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev 

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["api/api.csproj", "api/"]
COPY ["api.ServiceInterface/api.ServiceInterface.csproj", "api.ServiceInterface/"]
COPY ["api.ServiceModel/api.ServiceModel.csproj", "api.ServiceModel/"]
RUN dotnet restore "api/api.csproj"
COPY . .
WORKDIR "/src/api"
RUN dotnet build "api.csproj" -c Release -o /app/build --no-restore

FROM build AS publish
RUN dotnet publish "api.csproj" -c Release -o /app/publish /p:UseAppHost=false /p:ContainerizeDependencies=false --no-restore

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=publish /app/App_Data .
ENTRYPOINT ["dotnet", "api.dll"] 