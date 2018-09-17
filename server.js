'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const hapiAuthJWT = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');
const DogController = require('./src/controllers/dog');

const MongoDBUrl = 'mongodb://localhost:27017/dogapi';

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost',
});

const registerRoutes = () => {
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
