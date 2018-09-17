const User = require('../models/user');
const { createToken, hashPassword } = require('../utils/auth.js');

exports.authenticate = async (req, h) => {
  try {
    const user = await User.where({ email: req.payload.email });
    const idToken = await createToken(request.pre.user);
    return h.response({ idToken }).code(201);
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}

exports.create = async (req, h) => {
  try {
    const userToCreate = {
      name: req.payload.name,
      email: req.payload.email,
      username: req.payload.username,
    };

    // Hash Passowrd
    const hashedPassword = await hashPassword(req.payload.password);
    userToCreate.password = hashedPassword;

    const user = await User.create(userToCreate);

    // Create token
    const idToken = createToken(user);

    return h.response({ idToken }).code(201);
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}