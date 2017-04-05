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

Todo:
  - Integrate tokens to the api using the users table and some roles
  - Add all the controllers and test them
  - Handle errors for each route!
  - User Controller (Use promises!!):
    - updateUserInfo method, to update FirstName, LastName, email...
    - updatePassword, use the bcrypt library methods with promises to get the hash from the db
