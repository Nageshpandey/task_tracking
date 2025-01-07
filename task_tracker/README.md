# Task Tracker Application

## Overview
The Task Tracker application is a simple task management tool that allows users to register, log in, and manage their tasks. It utilizes React for the frontend, Zustand for state management, and Axios for API calls to a mock backend.

## Code Flow and Logic

### Authentication Flow
1. **AuthPage Component**: 
   - This component serves as the entry point for user authentication. It toggles between the `LoginForm` and `RegisterForm` based on user selection.
   - It uses the `useAuthStore` to manage authentication state and provides a `handleLogin` function that is called upon successful login.

2. **LoginForm Component**:
   - Collects user email and password.
   - Calls `loginUser` from `authService` to authenticate the user.
   - On successful login, it triggers the `onLogin` callback to update the global authentication state and navigates to the main dashboard.
   - Displays error messages using toast notifications for better user feedback.

3. **RegisterForm Component**:
   - Similar to `LoginForm`, but for user registration.
   - Calls `registerUser` from `authService` to create a new user.
   - On success, it triggers the `onRegisterSuccess` callback to switch to the login view and provides feedback through toast notifications.

### Task Management Flow
1. **TaskDashboard Component**:
   - The main interface for managing tasks. It fetches tasks from the API using `useQuery` from React Query.
   - Displays tasks using `TaskItem` components and allows users to create, update, and delete tasks.
   - Uses local storage to persist tasks, ensuring that tasks remain available even after a page refresh.

2. **TaskStore**:
   - Manages the state of tasks using Zustand, providing a simple and efficient way to handle global state.
   - Methods include:
     - `setTasks`: Updates the task list and syncs with local storage.
     - `addTask`: Adds a new task to the state and local storage.
     - `updateTask`: Updates an existing task in the state and local storage.
     - `deleteTask`: Removes a task from the state and local storage.
     - `setFilter`: Updates the current filter for displaying tasks.

3. **API Service**:
   - Uses Axios to interact with a mock API (JSONPlaceholder).
   - Provides functions to fetch, create, update, and delete tasks, ensuring a clear separation of concerns between API calls and UI logic.

### Components
- **TaskForm**: A form for creating new tasks. It takes user input for the task title and submits it to the `TaskDashboard`.
- **TaskItem**: Represents a single task with options to toggle completion and delete. It displays the task title and completion status.
- **TaskFilter**: Allows users to filter tasks based on their completion status (all, completed, pending).

### User Interaction
- Users can register and log in to access their tasks.
- Users can create new tasks, mark them as completed, and delete them.
- The application provides feedback through toast notifications for actions like login, registration, task creation, and deletion.
- Error handling is implemented to inform users of any issues during authentication or task management.

### Conclusion
This application demonstrates a full-stack approach to task management, integrating user authentication and task CRUD operations in a user-friendly interface. The use of Zustand for state management and Axios for API calls provides a robust architecture that is easy to maintain and extend.
