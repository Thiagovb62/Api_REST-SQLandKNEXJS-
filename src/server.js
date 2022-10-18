const routes = require('./routes');
const express = require('express');

const app = express();

app.use(express.json());
app.use(routes);


app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})

app.listen(3000)