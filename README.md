# RedGranite: React + Redux Toolkit + GraphQL + .Net Boilerplate

## Description
RedGranite is a full-stack boilerplate designed to help developers quickly build applications using React, Redux Toolkit, GraphQL, and .Net. It provides a solid foundation for creating scalable and maintainable applications with full CRUD (Create, Read, Update, Delete) functionality, leveraging GraphQL for efficient data operations.

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

## Using the GraphQL API
- The GraphQL API is available at `http://localhost:5000/graphql` (or the server's port).
- Use tools like GraphiQL or Postman to test queries and mutations.
- Example query:
   ```graphql
   query {
     users {
       id
       name
     }
   }
   ```

## Contributing
- Contributions are welcome! Please follow these guidelines:
  - Fork the repository.
  - Create a feature branch (`git checkout -b feature/new-feature`).
  - Commit your changes (`git commit -m "Add new feature"`).
  - Push to your fork (`git push origin feature/new-feature`).
  - Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## References
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [GraphQL](https://graphql.org/)
- [Apollo GraphQL with Typescript](https://www.apollographql.com/docs/react/development-testing/static-typing)
- [HotChocolate](https://chillicream.com/docs/hotchocolate/v13)
- [.Net](https://docs.microsoft.com/en-us/dotnet/)

## Additional Notes
- This boilerplate is designed for scalability and includes best practices for state management, data fetching, and backend development.
- For any issues or feature requests, please open an issue on the GitHub repository.
