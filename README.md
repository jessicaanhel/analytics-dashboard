# Getting Started with Analytical Dashboard CROCO digital


## Run the Project

1. Install requirements:
`
pip3 install -r backend/requirements.txt
cd frontend && npm install
`
2. To run development server, run:

### ` ./run.sh`

Opens two Terminal windows (macOS): one running the backend (python 3.13, port 5000) and one running the frontend in development mode (port 3000).
Open [http://127.0.0.1:5000](http://127.0.0.1:5000/api/blackrock) to view backend data in the browser.
Open [http://localhost:3000](http://localhost:3000) to view Dashboard in the browser.

3. The page will reload if you make edits.\
You will also see any lint errors in the console.

## Available Scripts

### `frontend/npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `frontend/npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Code Style / Pre-commit

Formatting and linting (black, isort, flake8, prettier) run via [pre-commit](https://pre-commit.com) and are auto-fixed on every PR into `develop`/`prod` by `.github/workflows/pre-commit.yml`.

To run the same checks locally before pushing:
`
pip3 install -r backend/requirements.txt
pre-commit install
`
This installs a git hook that runs the checks on every commit; you can also run them on demand with `pre-commit run --all-files`.
