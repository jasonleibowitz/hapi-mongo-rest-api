const Dog = require('../models/dog');

exports.list = (req, h) => {
  return Dog.find({}).exec().then(dog => {
    return {
      dogs: dog,
    };
  }).catch(err => {
    return {
      err,
    };
  });
}

exports.get = (req, h) => {
  return Dog.findById(req.params.id).exec().then(dog => {
    if (!dog) {
      return {
        message: 'Dog not found',
      };
    } else {
      return {
        dog,
      };
    }
  }).catch(err => {
    return {
      err,
    };
  });
}

exports.create = (req, h) => {
  const dogData = {
    name: req.payload.name,
    breed: req.payload.breed,
    age: req.payload.age,
    image: req.payload.image,
  };

  return Dog.create(dogData).then(dog => {
    return {
      message: 'Dog created successfully',
      dog,
    };
  }).catch(err => {
    return { err };
  });
}

exports.update = (req, h) => {
  return Dog.findById(req.params.id).exec().then(dog => {
    if (!dog) return { err: 'Dog not found' };

    dog.name = req.payload.name;
    dog.breed = req.payload.breed;
    dog.age = req.payload.age;
    dog.image = req.payload.image;

    dog.save(dogData);
  }).then(data => {
    return { message: 'Dog updated successfully' };
  }).catch(err => {
    return { err };
  });
}

exports.remove = (req, h) => {
  return Dog.findById(req.params.id).exec((err, dog) => {
    if (err) return { dberror: err };
    if (!dog) return { message: 'Dog not found' };

    dog.remove(err => {
      if (err) return { dberror: err };
      return { success: true };
    });
  });
}