import bcrypt from 'bcrypt';

import userModule from '../modules/user.module';

// Naming convention is based on HTTP request type, look closely

// Post user
const postUser = (req, res) => {
  // const obj = req.body;
  const obj = {
    username: req.body.username,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  userModule.createUser(obj)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      return res.send(err);
    });
};

// Get ALL users
const getUsers = (req, res) => {
  userModule.readUsers()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

// Get only a user
const getUser = (req, res) => {
  const userId = req.params.id;
  userModule.readUser(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

// Put user
const putUser = (req, res) => {
  // const obj = req.body;
  const obj = {
    username: req.body.username,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  const userId = req.params.id;

  userModule.updateUser(obj, userId)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Put user (soft delete)
const deleteUser = (req, res) => {
  const userId = req.params.id;

  userModule.deleteUser(userId)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Delete user (hard delete)
const hardDeleteUser = (req, res) => {
  const userId = req.params.id;
  userModule.hardDeleteUser(userId)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Authenticate user
const authenticateUser = (req, res, next) => {
  const obj = req.body;
  userModule.authenticate(obj)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      // res.send(error);
      next(error);
    });
};

export default {
  postUser,
  getUsers,
  getUser,
  putUser,
  deleteUser,
  hardDeleteUser,
  authenticateUser
};
