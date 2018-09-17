const Boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createToken = user => {
  let scopes;

  if (user.admin) scopes = 'admin';

  return jwt.sign({
    id: user.id,
    username: user.email,
    scope: scopes,
  }, 'DO_THE_THING', {
    algorithm: 'HS256',
    // expiresIn: 1h,
  });
}

const hashPassword = async password => {
  // Salt level 10
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}

const validate = async (decoded, request) => {
  // TODO: Use a ternary
  if (decoded) {
    return { isValid: true };
  } else {
    return { isValid: false };
  }
}

const verifyCredentials = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const user = await User.where({ email }).findOne();
    if (!user) return Boom.badRequest('Incorrect username or password');

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : Boom.badRequest('Incorrect username or password');
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}

module.exports = {
  createToken,
  hashPassword,
  validate,
  verifyCredentials,
}
