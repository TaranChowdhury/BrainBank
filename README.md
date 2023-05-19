# BrainBank

Welcome to BrainBank! BrainBank is a private repository designed to store your company's research documents, track project progress, and foster collaboration among your team. It provides a convenient and efficient way for employees to access valuable resources, contribute to projects, and stay informed about the latest developments. With features like document management, a powerful search engine, and interactive project tracking, BrainBank aims to enhance productivity and knowledge sharing within your organization.

## Abstract

BrainBank is a comprehensive platform that allows you to securely store and organize your company's research documents. It serves as a centralized hub for team members to access confidential information, collaborate on projects, and stay up to date with the progress of various initiatives. By leveraging a customized search engine and robust document management features, BrainBank ensures that your team can easily find relevant resources and contribute to the success of your projects.

## Dependencies

To run BrainBank, make sure you have the following dependencies installed:

- bcrypt: ^5.1.0
- bcryptjs: ^2.4.3
- cors: ^2.8.5
- express: ^4.18.2
- jsonwebtoken: ^9.0.0
- mongoose: ^6.11.1
- multer: ^1.4.5-lts.1

## Installation

Follow these steps to install BrainBank and its necessary dependencies:

1. Start by navigating to the project's backend directory:
  ```cd Mern/Server```

2. Install the backend dependencies:
  ```npm install```


3. Next, navigate to the project's frontend directory:
   ```cd mern/Client```

4. Install the frontend dependencies:
   ```npm install```

## Running the Project

To run BrainBank, follow these steps:

1. Start the backend server:
- Navigate to the backend directory:
  ```
  cd mern/server
  ```
- Run the server:
  ```
  npm run dev
  ```

2. Start the frontend client:
- Navigate to the frontend directory:
  ```
  cd mern/client
  ```
- Run the client:
  ```
  npm start
  ```

3. Open your favorite browser and visit `http://localhost:3000` to access the BrainBank application.

## API Endpoints

BrainBank provides the following API endpoints for seamless integration with your projects:

- `POST /api/register`: Register a new user.
- `POST /api/login`: User login.
- `GET /api/userIds`: Get a list of user IDs.
- `GET /api/user/:userId/projects`: Get projects associated with a specific user.
- `GET /api/project/:projectId/team`: Get the team members of a project.
- `POST /api/projects`: Create a new project.
- `GET /api/projects`: Search for projects by title or file name.
- `GET /api/projects/:projectId`: Get details of a specific project.
- `PUT /api/projects/:projectId`: Update a project's summary and members.
- `GET /api/projects/:projectId/download/:filename`: Download a specific file from a project.

## Contributors
Taran Chowdhury | Sharanya Udupa | Gautham Narayanan

## Contributing

We value your contributions to BrainBank! If you would like to contribute, please follow our guidelines for submitting bug reports, feature requests, or pull requests. Together, we can make BrainBank even better!

## License

BrainBank is released under the [MIT License](LICENSE). 
