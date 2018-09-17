'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const dogModel = new Schema({
//   id: {
//     type: String,
//     required: true,
//     index: {
//       unique: true,
//     },
//   },
//   dateCreated: {
//     type: String,
//     required: true,
//   },
//   lastUpdated: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
//   html: {
//     type: String,
//     required: false,
//   },
//   time: {
//     type: String,
//     required: false,
//   },
//   date: {
//     type: String,
//     required: false,
//   },
// });

const dogModel = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model('Dog', dogModel, 'dogs');
