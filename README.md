# Address Book

Address Book is a new application that is used to store and view contact information for multiple persons.

## Technologies

- Node.js
- PostgreSQL
- React
- react-bootstrap-table2 (used for displaying the contacts)

## Deployed App

https://the-address-book-app.herokuapp.com/

## Docker Development Environment

Edit the environment variables in ./docker-compose.yml to change database user, password and host etc. Then run the following command from the root folder:

```console
foo@bar:~$ docker-compose up -d
```

## Instructions (Non-dockerized)

### Database

You need to change the environment variables in .env.example and rename it to .env in order to connect Node.js to your database:

```javascript
DB_USER=<user>
DB_PASSWORD=<password>
DB_HOST=<host>
DB_PORT=<port>
DB_DATABASE=<database>
```

Execute ./init.sql to create the tables needed and add sample data to the database.

### Server and Client

Run the following commands from the root folder to install/start both the client and server:

```sh
npm install
npm run dev
```

## Development Approach

1. I started by defining how the data should be structured in the database and I also inserted some sample data into the database.

2. In the second step I started to set up the back-end and connected it to the database. I also started to create the REST API and determined which routes and status codes were needed.

3. In the third step I started working on the front-end which was done in React. I also spent time configuring react-bootstrap-table2 which was used to display all of the contact information in a table. Finally, I added some CSS to make it look better.

## Database Schema

![Database Schema](https://user-images.githubusercontent.com/42525041/90418454-6a93e080-e0b5-11ea-8ed5-2aff1a64ed57.png)

## To Do

- Add unit tests.
- Add functionality for creating contacts.
- Move the server to it's own folder and split it up into different controllers and routes.
