/* eslint-disable no-underscore-dangle */
const pool = require('../../database/connection');

class ArticlesService {
  constructor() {
    this._pool = pool;
  }

  async addArticle(authorId, title, body, createdAt) {
    const query = {
      text: 'INSERT INTO articles(author_id, title, body, created_at) VALUES($1, $2, $3, $4) RETURNING id',
      values: [authorId, title, body, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Article gagal dimasukkan');
    }
  }

  async getArticlesByKeyword(keyword) {
    const query = {
      text: `
      SELECT (articles.title, articles.body, articles.created_at) FROM articles
      JOIN authors
      ON articles.author_id = authors.id
      WHERE articles.title LIKE $1
      OR articles.body LIKE $1
      ORDER BY articles.created_at DESC`,
      values: [`%${keyword}%`],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Article gagal ditemukan');
    }

    return result.rows;
  }

  async getArticlesByAuthor(author) {
    const query = {
      text: `
      SELECT (articles.id, articles.title, articles.body, articles.created_at) FROM articles
      JOIN authors
      ON articles.author_id = authors.id
      WHERE authors.name LIKE $1
      ORDER BY articles.created_at DESC`,
      values: [`%${author}%`],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Article gagal ditemukan');
    }
    return result.rows;
  }
}

module.exports = new ArticlesService();
