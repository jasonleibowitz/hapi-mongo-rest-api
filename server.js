'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const DogController = require('./src/controllers/dog');
const UserController = require('./src/controllers/user');

const { validate, verifyCredentials } = require('./src/utils/auth');

const MongoDBUrl = 'mongodb://localhost:27017/dogapi';

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost',
});

const registerRoutes = () => {
  server.route({
    method: 'POST',
    path: '/api/authenticate',
    options: {
      auth: false,
      handler: UserController.authenticate,
      pre: [{ method: verifyCredentials, assign: 'user' }],
    }
  });

  server.route({
    method: 'POST',
    path: '/api/users',
    options: {
      auth: false,
      handler: UserController.create,
    }
  })

  server.route({
    method: 'GET',
    path: '/api/dogs',
    handler: DogController.list,
  });

  server.route({
    method: 'GET',
    path: '/api/dogs/{id}',
    handler: DogController.get,
  });

  server.route({
    method: 'POST',
    path: '/api/dogs',
    handler: DogController.create,
  });

  server.route({
    method: 'PUT',
    path: '/api/dogs/{id}',
    handler: DogController.update,
  });

  server.route({
    method: 'DELETE',
    path: '/api/dogs/{id}',
    handler: DogController.remove,
  });
}

const main = async () => {
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    key: 'DO_THE_THING',
    validate,
    verifyOptions: {
      algorithms: ['HS256'],
    },
  });

  server.auth.default('jwt');

  registerRoutes();

  await server.start();
  mongoose.connect(MongoDBUrl, {
    useNewUrlParser: true,
  }, err => {
    if (err) console.error(err);
    console.log('Connected to Mongo Server');
  });
  return server;
}

main().then(server => {
  console.log(`Server running at ${server.info.uri}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
