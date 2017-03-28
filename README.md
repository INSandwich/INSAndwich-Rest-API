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
  - Finish the user controller (Hashing is done, I guess)
  - Integrate tokens to the api using the users table and some roles
  - Add all the controllers and test them
  - Handle errors for each route!!
  - Add a gulpfile to help cleaning the repo before pushing (aka removing node modules)
  - User Controller (Use promises!!):
    - addToken method with a certain amount of tokens in the JSON sent via post
    - removeToken method, checking if possible, otherwise sending error
    - updateUserInfo method, to update FirstName, LastName, email...
    - updatePassword, use the bcrypt library methods with promises to get the hash from the db
