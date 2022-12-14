const express = require('express');
const routes = express.Router();


const UserController = require('./controllers/UserController')
const ProjectsController = require('./controllers/ProjectsController')
routes
    .get('/users', UserController.index)
    .post('/users', UserController.create)
    .put('/users/:id', UserController.update)
    .delete('/users/:id', UserController.delete)

routes
    .get('/projects', ProjectsController.index)
    .post('/projects', ProjectsController.create)
    .put('/projects/:user_id', ProjectsController.update)
    .delete('/projects/:user_id', ProjectsController.delete)


module.exports = routes;