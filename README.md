# Cookin' Up 🍲

Welcome to **Cookin' Up** — a web application that recreates the fun of the popular Polish TV show, "Ugotowani." This platform enables you and your friends to create a "Cookin' Up" lobby, where you can:

- Invite friends to join the fun.
- Specify ingredients or foods you dislike.
- Schedule meetups to cook and dine together.
- Upload photos of prepared dishes and rate each other’s creations.
- View a summary of the lobby when everyone has submitted their ratings.

### Live Demo
You can access the demo of this application here: [cookinup.lkrawczyk.pl](https://cookinup.lkrawczyk.pl).

### Technical Overview

#### Tech Stack

- **Client**: The frontend is built using React with Vite, and utilizes Node.js (v20.x) and npm (v10.x).
- **Server**: A .NET 8.0 Web API powers the backend, ensuring efficient and robust API interactions.
- **Cloud Storage**: Azure Blob Storage is integrated for managing user-uploaded images of dishes.
- **Secret Management**: Azure Secrets provides secure storage for sensitive information, enhancing security.

# Client Installation Guide

- node v20.X (check version via `node -v`, for multiple versions use nvm [info](https://github.com/nvm-sh/nvm/blob/master/README.md))
- npm v10.X
- Visual Studio Code

## Clone and install

1. After downloaded, open in Visual Studio Code and install extensions from settings.json file.

2. If you don't have yet yarn, install via:

```bash
$ npm i -g yarn
```

3. Go to root project directory and install all dependencies via:

```bash
$ yarn install
```

4. Run client via:

```bash
$ yarn run dev
```

Client local url: [http://localhost:5173](http://localhost:5173)

## Setting linter

1. In Visual Studio Code press Ctrl+Shift+P and type `Restart ESLint server`.
2. Then, press Ctrl+J and open output -> Eslint. If you have any errors after invoke ESlint daemon,
   try reload window (Ctrl+Shift+P, type `Reload window`) or rerun entire Visual Studio Code app.
3. Once ESlint server is running, toggle default formatter to Right Click -> Format Document With -> Configure
   default formatted and choose ESlint (in any .js file).
4. Set Editor: Tab Size - 2
5. Set Select End Of Line Sequence to LF

  
# Server Installation Guide

This guide provides steps for setting up the server environment, installing dependencies, and connecting to Azure for managing secrets and database configuration.

## Requirements
- **.NET 8.0 SDK** — Check your version by running `dotnet --version`.
- **Azure CLI** — Allows management of Azure resources from the terminal.
- **Azure Account** with access to Azure Key Vault and Azure SQL (or MySQL, per your configuration).

## Step 1: Environment Setup and Configuration
1. **Install Azure CLI**: If Azure CLI is not installed, follow the installation instructions on the [Microsoft website](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
2. **Log in to Azure**: Use the following command in the terminal to sign in to your Azure account:

   ```bash
   az login
   ```

3. **Verify .NET SDK version**: Ensure version 8.0 or higher is installed:

   ```bash
   dotnet --version
   ```

## Step 2: Configuring Keys in Azure Key Vault
1. **Create Azure Key Vault**: If you don't have a Key Vault, create one:

   ```bash
   az keyvault create --name cookinupsecrets --resource-group <YourResourceGroup> --location <Location>
   ```

2. **Add Secrets to Key Vault**:
   - **JWT Key**: Add your JWT secret key:

     ```bash
     az keyvault secret set --vault-name cookinupsecrets --name "jwtKey" --value "<YourJWTSecret>"
     ```

   - **Database Connection String**: Add the connection string for the database:

     ```bash
     az keyvault secret set --vault-name cookinupsecrets --name "dbCon" --value "<YourConnectionString>"
     ```

   - **Blob Storage Connection String**: Add the connection string for Blob Storage:

     ```bash
     az keyvault secret set --vault-name cookinupsecrets --name "blobContainerCon" --value "<YourBlobStorageConnectionString>"
     ```

## Step 3: Database Configuration and Migrations
1. **Configure Connection String**: After setting the database and blob storage connection strings in Azure Key Vault, the server will automatically retrieve the `dbCon` and `blobContainerCon` values from Key Vault.
2. **Create and Apply Migrations**:
   - Navigate to the project directory containing the `.csproj` file.
   - Create a migration:

     ```bash
     dotnet ef migrations add InitialMigration
     ```

   - Apply the migrations to the database:

     ```bash
     dotnet ef database update
     ```

## Step 4: Running the Server
1. **Run the server locally**:

   ```bash
   dotnet run
   ```

2. **API Preview**:
   - When running in development mode, Swagger UI will be available at [http://localhost:5000/swagger](http://localhost:5194/swagger).
   - For production, the application will automatically redirect to HTTPS.

## CORS Configuration
Configure CORS to enable client connectivity:
- For development environment (`http://localhost:5173`)
- For production environment (`https://cookinup.lkrawczyk.pl`)

Ensure the correct URLs are set in `appsettings.json`.
