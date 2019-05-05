# SMS-Manager-API

SMA is an API that enables users manage and send messages to one another.

## Features
* Authentication is done using **Json Web Token**. This ensure the api endpoints are secured. 

* User can create account and login to retrieve authentication token
* User can send messages to other users/contacts on the application
* User can view all messages sent and received
* User can delete his/her account

## Pivotal Tracker
Project is managed using pivotal tracker management tool. You can view the board with the link below:

https://www.pivotaltracker.com/n/projects/2344833

## Requirements

* Node.js v10.x or higher
* npm
* PostgreSQL


## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>QUERY</th><th>BODY PARAMS</th><th>HEADER PARAMS</th></tr>
<tr><td>POST</td><td>/api/v1/users/signup</td><td>Creates a user account</td><td></td><td>email, username, password, phoneNumber</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/users/signin</td><td>Generates a new user token</td><td></td>
<td>email, password</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/sms/:phoneNumber</td><td>Sends sms to contact</td><td></td>
<td>message</td><td>x-access-token</td></tr>
<tr><td>GET</td><td>/api/v1/sms</td><td>Gets the list of sms sent and received</td><td></td>
<td></td><td>x-access-token</td></tr>
</table>


# Getting Started
**Via Cloning The Repository**
```
# Clone the app
git clone https://github.com/stylll/sms-manager-api.git

# Switch to directory
cd sms-manager-api

# Create .env file in the root directory
touch .env
update env file with required information
use the .env.example file as a guideline

# Install Package dependencies
npm install

#Start the application
npm run start:dev

You should now be able to access the API via http://localhost:port/api/v1/
```


## Built with
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
* [NPM](https://www.npmjs.com/) - A Node Package Dependency Manager
* [PGSQL](https://www.postgresql.org/) - Opened source relational database

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

## Contributing
SMS-Manager-API is open source and contributions are highly welcomed.

If you are interested in contributing, follow the instructions below.

* Fork the repository

* Create a new branch

* Make your changes and commit them

* Provide a detailed commit description

* Raise a pull request against staging

`Ensure your codes follow the` [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)

`See project wiki for commit message, pull request and branch naming conventions.`

`All Pull requests must be made against Develop branch. PRs against master would be rejected.`

## FAQ

* Who can contribute ?
  - This is an open source project. Contributions are welcome from everyone.

* Was any management tool used ?
  - Yes. Pivotal tracker was used. Refer to the Pivotal Tracker section above to get the link.

* Who maintains SMA ?
  - I currently maintain the application. Reach out to me via email on `stephen.aribaba@gmail.com` if 
  you will like to maintain the app.


## License and Copyright

&copy; Stephen Aribaba

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
