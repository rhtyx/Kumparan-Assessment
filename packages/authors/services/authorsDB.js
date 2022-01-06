/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const pool = require('../../database/connection');

class AuthorsService {
  constructor() {
    this._pool = pool;
  }

  async addAuthor(name) {
    const id = `${nanoid(12)}`;
    const query = {
      text: 'INSERT INTO authors VALUES($1, $2) RETURNING id',
      values: [id, name],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Authors gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyAuthor(id) {
    const query = {
      text: 'SELECT * FROM authors WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return Error('Id Anda tidak terdaftar');
    }
    return result.rows;
  }
}

module.exports = new AuthorsService();
