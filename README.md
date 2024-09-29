# Officer Connect: An Police Personnel Management System

E-HRMS is a comprehensive Electronic Human Resource Management System designed specifically for law enforcement agencies. This intuitive platform streamlines the management of police personnel, facilitating efficient tracking of officers, their duties, and essential records.

With E-HRMS, police departments can easily manage employee data, performance evaluations, shift schedules, and training records, all within a secure and user-friendly interface. The system enhances communication and coordination among officers, promotes transparency, and ultimately helps improve service delivery to the community.

## Project Setup

To get started with local development, follow the steps below to install the necessary dependencies.

### Client-Side Dependencies

We use **pnpm** for managing dependencies in the VueJS. Ensure that all package installations or removals are done using `pnpm`.

```bash
cd client # navigate to client directory
pnpm install
```

### Server-Side Dependencies

Our FastAPI server uses **pipenv** to manage a virtual Python environment. Ensure you use `pipenv` for all package installations and removals.

```bash
cd Server # navigate to server directory
pipenv shell # Activate the virtual environment
pipenv install
```

### Running the Development Server

Starting the Client

```bash
cd client
pnpm run dev
```

Starting the Backend

```bash
cd server
uvicorn main:app --reload
```