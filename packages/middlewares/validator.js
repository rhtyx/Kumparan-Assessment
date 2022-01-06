const {
  header, body, query, oneOf,
} = require('express-validator');

const Auth = (method) => {
  switch (method) {
    case 'postArticles': {
      return [
        header('x-api-key').exists().isLength({ min: 12 }),
        body('title').exists(),
        body('body').exists(),
      ];
    }
    case 'getArticles': {
      return oneOf([
        query('query').isString().trim().isLength({ min: 3 }),
        query('author').isString().trim().isLength({ min: 3 }),
      ]);
    }
    case 'postAuthors': {
      return [
        body('name').exists().isLength({ min: 3 }),
      ];
    }
    default: {
      throw new Error('No method was found');
    }
  }
};

module.exports = Auth;
