# Gamified Quiz Frontend

This is the frontend application for the Quiz App, a platform where users can spin a wheel to select quiz categories, answer questions, and track their scores.

Features

- Spin a wheel to select a quiz category.
- Answer multiple-choice questions in selected categories.
- Track and display user's highest scores and achievements.
- Submit high scores to the backend.

Technologies Used

- React
- React Router
- Context API
- Tailwind CSS
- Confetti Explosion

Getting Started

Prerequisites

- Node.js and npm installed on your machine.

Installation

1. Clone the repository:
    ```sh
    git clone
    ``` 

2. Navigate to the project directory:
    ```sh
    cd gq-frontend
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

Running the App

1. Start the development server:
    ```npm start```

2. Open http://localhost:3000 to view it in the browser.

Project Structure

- src/components: Contains React components.
- src/context: Context API for managing state.
- src/constants: Contains question data and other constants.
- src/App.js: Main application component.
- src/index.js: Entry point of the application.

Environment Variables

Make sure to set up any necessary environment variables in a .env file at the root of the project. For example:


backend url:
```
REACT_APP_HOST=http://localhost:5000
```
