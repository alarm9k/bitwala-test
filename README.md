# What is this repo?
This is a coding challenge that I was asked to do at Bitwala.

# How to run it.
- Clone the repo and make sure you have reasonably recent versions of `yarn` and `node`.
- Go to the project directory and run `yarn install`.
- Go to `packages/backend` and run `yarn start` to start the back-end on port 3001.
- Go to `packages/frontend` and run `yarn start` to start the front-end. This will launch webpack development server on port 3000 and open the page in the default browser.

# About the project structure.
The project is a monorepo based on yarn workspaces. It consists of three packages:
- `backend` - back-end.
- `frontend` - front-end.
- `common` - the library package with the definitions shared between the client and the server.

# Missing pieces.
There are detailed comments in the code where either a mock was provided instead of the real solution, or an overly dumbed down solution was chosen for the sake of simplicity and saving time.

# Architecture overview.
The client would be a javascript bundle with client-side rendering (a.k.a. JAMStack).

The backend would be a horizontally scalable server. The only data layer that would be needed for such a simple case would be a distributed cache solution like Redis.

The server would be wrapped in a container and deployed to a cloud with automatic scaling.

# Testing.
No testing was done because I ran out of time.
