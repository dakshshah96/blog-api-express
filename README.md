# Blog API using Express and Node.js

## Setup

1. Clone this repo locally.

```
$ git clone https://github.com/dakshshah96/blog-api-express.git
```

2. Go to the new directory and install dependencies.

```
$ cd blog-api-express
$ npm install
```

## Run

1. Run app from the command line.

```
$ node server.js
``` 

2. Use an application like [Postman](https://www.getpostman.com/) to send requests to the appropriate API endpoint:
* GET and POST requests should go to `/blog-posts`
* DELETE and PUT requests should go to `/blog-posts/:id`