# Setup

## Prerequisites
- Node.js (version 14 or higher)
- .NET SDK (version 9)
- A code editor (e.g., Visual Studio Code)
- Git

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jasonabanico/redgranite.git
   ```
2. Navigate to the project directory:
   ```bash
   cd redgranite
   ```
3. Install dependencies:
   - For the client (frontend):
     ```bash
     cd client
     npm install
     ```
   - For the server (backend):
     ```bash
     cd ../server
     dotnet restore
     ```
## Database Configuration
1. Add storage.
   - This implementation defaults to Azure CosmosDB (while also supporting other data implementations with EntityFramework).
   - Update the appsettings.Development.json file at src\Server\RedGranite.Server.Api and provide a value for the Cosmos connection.
     ```json
        "ConnectionStrings": {
            "CosmosConnection": "[connection string]"
        }
     ```

## Running the Project
1. Start the server:
   - Navigate to the server directory:
     ```bash
     cd src\Server\RedGranite.Server.Api
     ```
   - Run the server:
     ```bash
     dotnet run
     ```
2. Start the client:
   - Navigate to the client directory:
     ```bash
     cd src\Client\RedGranite.Client.Web
     ```
   - Run the client:
     ```bash
     npm start
     ```
3. Access the application:
   - Open your browser and navigate to `http://localhost:3000` (or the specified port).
