# Server Installation Guide

This guide provides steps for setting up the server environment, installing dependencies, and connecting to Azure for
managing secrets and database configuration.

## Requirements

- **.NET 8.0 SDK** — Check your version by running `dotnet --version`.
- **Azure CLI** — Allows management of Azure resources from the terminal.
- **Azure Account** with access to Azure Key Vault and Azure SQL (or MySQL, per your configuration).

## Step 1: Environment Setup and Configuration

1. **Install Azure CLI**: If Azure CLI is not installed, follow the installation instructions on
   the [Microsoft website](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
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

1. **Configure Connection String**: After setting the database and blob storage connection strings in Azure Key Vault,
   the server will automatically retrieve the `dbCon` and `blobContainerCon` values from Key Vault.
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
    - When running in development mode, Swagger UI will be available
      at [http://localhost:5194/swagger](http://localhost:5194/swagger).
    - For production, the application will automatically redirect to HTTPS.

## CORS Configuration

Configure CORS to enable client connectivity:

- For development environment (`http://localhost:5173`)
- For production environment (`https://cookinup.lkrawczyk.pl`)

Ensure the correct URLs are set in `appsettings.json`.
