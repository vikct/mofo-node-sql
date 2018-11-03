import express from 'express';
import expressValidation from 'express-validation';

import userController from '../controllers/user.controller';
import paramValidation from '../../config/param-validation';

const router = express.Router();

router.route('/')
  // HTTP Post
  .post(expressValidation(paramValidation.postUser), userController.postUser)

  // HTTP Get
  .get(userController.getUsers);

router.route('/:id')
  // HTTP Get
  .get(userController.getUser)

  // HTTP Put
  .put(userController.putUser)

  // HTTP Delete (hard delete)
  .delete(userController.hardDeleteUser);

router.route('/delete/:id')
  // HTTP Put (soft delete)
  .put(userController.deleteUser);

router.route('/authenticate')
  .post(userController.authenticateUser);

export default router;
