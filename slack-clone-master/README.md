# SOEN341-project

[![Build Status](https://travis-ci.com/gpnn/slack-clone.svg?branch=master)](https://travis-ci.com/gpnn/slack-clone)

## Description

This is a clone of the Slack web application. Developed using a MERN stack. Basic features such as creating channels, joining channels and sending messages in channels. More features to come...

## Objective

Purpose of the project is to demonstrate the importance and application of the software process. As well as develop our hard and soft skills, such as ones to work collaboratively in a team.

## Core features
There are three core features: 

*  Users must be able to create channels
*  Users must be able to join channels
*  Users must be able to send messages in channels

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure to have node installed https://nodejs.org/en/

### Installing

* Clone the repository.
* From the project directory, run the following command to install the dependencies
````bash
npm run installall
````
* Run the following command to start both the client and back-end of the project
````bash
npm run start
````

Note that you must have authentication data to the MongoDB instance to manipulate the data. Contact [Mackbellemore](https://github.com/Mackbellemore/) for more information about that.

## Running the tests

````bash
npm test
````
## Block diagram

![block diagram](doc/Block-diagram.png)

## Built With

* [MongoDB](https://www.mongodb.com/) - Database
* [Express](https://expressjs.com/) - Web framework for Node.js
* [React](https://reactjs.org/) - JavaScript library for user interfaces
* [Node.js](https://nodejs.org/en/) - JavaScript run-time environment

## Authors

* **Gordon Pham-Nguyen** - *Developer* - [gpnn](https://github.com/gpnn/)
* **Mackenzie Bellemore** - *Developer* - [Mackbellemore](https://github.com/Mackbellemore/)
* **Alejandro Lacasia** - *Developer* - [alelacasi](https://github.com/alelacasi)
* **Sujan Saravanamuthu** - *Developer* - [tbksujan](https://github.com/tbksujan/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

MIT License
