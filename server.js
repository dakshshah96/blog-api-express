const express = require('express');
const morgan = require('morgan');

const app = express();

const blogRouter = require('./router');

// log the http layer
app.use(morgan('common'));

// route requests through the router instances
app.use('/blog-posts', blogRouter);

// listen on port 8080 and log
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});