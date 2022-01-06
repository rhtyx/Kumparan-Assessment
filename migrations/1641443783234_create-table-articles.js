/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('articles', {
    id: {
      type: 'BIGSERIAL',
      primaryKey: true,
    },
    author_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });

  pgm.addConstraint('articles', 'fk_articles.author_id_authors.id', 'FOREIGN KEY(author_id) REFERENCES authors(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('articles');
};
