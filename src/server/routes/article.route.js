import express from 'express';
import validate from 'express-validation';

import articleController from '../controllers/article.controller';
import paramValidation from '../../config/param-validation';

const router = express.Router();

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    // Spliting up the strings
    const bearer = bearerHeader.split(' ');
    // Obtaining the JWT
    const bearerToken = bearer[1];
    // Appending a token variable in response object
    req.token = bearerToken;
    // Leaving middleware, entering the controller layer
    next();
  } else {
    res.status(403)
      .send(Object
        .assign(
          { code: 403 },
          { message: 'Please login' }
        ));
  }
};

router.get('/personal', ensureToken, articleController.getPersonalArticle);

router.route('/')
  // HTTP Post
  .post(validate(paramValidation.postArticle), articleController.postArticle)

  // HTTP Get
  .get(articleController.getArticles);

router.route('/:id')
  // HTTP Get
  .get(articleController.getArticle)

  // HTTP Put
  .put(articleController.updateArticle)

  // HTTP Delete
  .put(articleController.deleteArticle);

router.route('/delete/:id')
  .delete(articleController.hardDeleteArticle);

export default router;
