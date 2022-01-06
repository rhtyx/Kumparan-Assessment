const Router = require('express').Router();
const { validationResult } = require('express-validator');
const validate = require('../../middlewares/validator');
const authorsService = require('../services/authorsDB');

Router.route('/authors')
  .post(validate('postAuthors'), async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.status(400).json({
          status: 'Bad Request',
          message: 'Your request is invalid',
        });
      }

      const { name } = req.body;

      const authorId = await authorsService.addAuthor(name);

      res.status(201).json({
        status: 'success',
        message: 'Author sudah ditambahkan',
        authorId,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Bad Request',
        message: 'Name has been taken',
      });
    }
  });

module.exports = Router;
