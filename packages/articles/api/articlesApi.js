const Router = require('express').Router();
const { validationResult } = require('express-validator');
const authorsDB = require('../../authors/services/authorsDB');
const validate = require('../../middlewares/validator');
const articlesService = require('../services/articlesDB');

Router.route('/articles')
  .post(validate('postArticles'), async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        throw new Error('Bad Request');
      }

      const authorId = req.get('x-api-key');
      if (!await authorsDB.verifyAuthor(authorId)) {
        res.status(401).json({
          status: 'Unauthorized',
          message: 'Id Anda belum terdaftar.',
        });
        return;
      }

      const { title, body } = req.body;
      const date = new Date();

      await articlesService.addArticle(authorId, title, body, date);

      res.status(201).json({
        status: 'success',
        message: 'Article sudah ditambahkan',
      });
    } catch (error) {
      res.status(400).json({
        status: 'Bad Request',
        message: 'X-API-KEY Anda salah',
      });
    }
  })
  .get(validate('getArticles'), async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        throw new Error('Bad Request');
      }

      let articles;
      const { query, author } = req.query;

      if (query) {
        articles = await articlesService.getArticlesByKeyword(query);
      } else if (author) {
        articles = await articlesService.getArticlesByAuthor(author);
      }

      res.status(200).json({
        status: 'success',
        data: articles,
      });
    } catch (error) {
      if (error.message === 'Article gagal ditemukan') {
        res.status(404).json({
          status: 'Not Found',
          message: error.message,
        });
      }
    }
  });

module.exports = Router;
