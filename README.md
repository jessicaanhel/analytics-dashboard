# Getting Started with Analytical Dashboard CROCO digital


## Run the Project

1. Install requirements:
`
pip3 install -r backend/requirements.txt
frontend/npm install
`
2. To run development server, run:

### ` ./run.sh`

Runs backend of application in python 3.13 and frontend in developmend mode.
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

##

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# About Project

The project presents data on the losses of Russian artillery for 3 selected months. (source: Ministry of Defense of Ukraine https://www.mil.gov.ua/)

Created 2 types of charts. On the HomePage you can create new graph visualizations by adding the required arguments.
