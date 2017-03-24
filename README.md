# INSAndwich Rest API
This folder contains the code for our REST API. We used nodeJS Express to build it up.

Useful tools:
  - [Postman](https://www.getpostman.com/)


First, don't forget to create the database: `$ sqlite3 insandwich.db < sql/insandwich.sql`

To start the project:
```
$ npm install
$ npm run start
```

Please remove the node_modules folder before pushing to github!

Todo:
  - Better SQL Integration (have the database automatically generated if !exists)
  - Add all the controllers and test them
  - Add some "security" with the db connection (potentially)
  - Handle errors for each route!!
  - Make a paging for each list of elements retrieved using the SQL capabilities of selecting a certain amount of elements
  - Add a gulpfile to help cleaning the repo before pushing (aka removing node modules)
