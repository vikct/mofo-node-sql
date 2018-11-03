import articleModule from '../modules/article.module';

// Naming convention is based on HTTP request type, look closely

// Post article
const postArticle = (req, res) => {
  const obj = req.body;
  articleModule.createArticle(obj)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

// Get ALL articles
const getArticles = (req, res) => {
  articleModule.readArticles()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

// Get only an article
const getArticle = (req, res) => {
  // In ES6 standards, objects or array destructuring
  // is highly preferred. instead of accessing a property
  // via member expression
  // For more info, please refer to
  // https://eslint.org/docs/rules/prefer-destructuring
  // const { id: article_id } = this.req.params;
  const { id } = req.params;
  articleModule.readArticle(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

// Put article
const updateArticle = (req, res) => {
  // const articleId = req.params.id;
  // const obj = req.body;
  const { body } = req;
  const { id } = req.params;
  articleModule.updateArticle(body, id).then((result) => {
    res.send(result);
  }).catch((err) => { return res.send(err); });
};

// Put article (soft delete)
const deleteArticle = (req, res) => {
  const articleId = req.params.id;
  articleModule.deleteArticle(articleId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

// Delete article (hard delete)
const hardDeleteArticle = (req, res) => {
  const articleId = req.params.id;
  articleModule.hardDeleteArticle(articleId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

const getPersonalArticle = (req, res) => {
  articleModule.readPersonalArticle(req.token)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.status(401).send(err);
    });
};

export default {
  postArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  hardDeleteArticle,
  getPersonalArticle
};
