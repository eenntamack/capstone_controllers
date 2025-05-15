# Note taking, tracking applcation

This is a note taking MERN application where a user can save their notes and keep track on their productivity, based on the amount of notes the user makes and can access through authentication

**This is the back end portion of the application** 

# Schemas
This application utilizes the 2 schemas:

## users :

There are 2 required fields, the username and password


## userData :

There are 2 required fields, the userKey and the book(note) schema [array]

# Routes

## Authentication

- handles the registration, login, deletion and update of the account

## userData

- handles the  deletion, insertion and creation of user's notes/data

## fetchQuote

- handles fetching the quiotes api to display on the user's home page

