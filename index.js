const express = require('express');
const withAsyncRouter = require('./routes/withAsync');
const app = express();

app.use('/scrape', withAsyncRouter);


app.listen(8080);
console.log("app is running ");
