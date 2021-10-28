# React Comments (Server)
React Comments backend

## Local Installation
1. Install `MongoDB` & `MongoDB Compass`

2. Create a database called `react_comments` & import the 3 documents provided in the react_comments `folder` provided in this repo ([MongoDB Docs](https://docs.mongodb.com/compass/current/import-export/))

3. create a `config.env` file in the config folder with the following
- `PORT`=the port you want to run on (make sure it matches the proxy in the `main` branch package.json)
- `MONGO_URI`=mongodb://localhost:(port number provider by your local installation)/react_comments (or what you call the local database)
- `ACCESS_SIGNATURE`=random string
