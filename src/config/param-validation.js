import Joi from 'joi';

export default {
  postUser: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().email().trim().required(),
      // Password rules:- length min: 6, max: 30, in alphanumerical
      password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()
    }
  },

  postArticle: {
    body: {
      user_id: Joi.number().required(),
      title: Joi.string().required(),
      tag: Joi.string().required(),
      content: Joi.string().min(20).required()
    }
  }
};
