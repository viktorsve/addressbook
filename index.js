require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const isProd = process.env.NODE_ENV === 'production';
// eslint-disable-next-line
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
  connectionString: isProd ? process.env.DATABASE_URL : connectionString,
});
pool.on('error', (err, client) => {
  console.error('Error', err);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api', (req, res) => {
  pool
    .query('SELECT * FROM contacts ORDER BY id')
    .then(result => {
      res.status(200).send(result.rows);
    })
    .catch(err => {
      res.status(err.statusCode || err.status || 500).send({ error: err });
    });
});

app.put('/api/updatePhone', (req, res) => {
  pool
    .query('UPDATE contacts SET phone = $1  WHERE id = $2', [
      req.body.phone,
      req.body.id,
    ])
    .then(result => {
      if (result.rowCount !== 0) {
        res.status(200).send('Phone number was successfully updated');
      } else {
        res.status(404).send('No contact was found with that id');
      }
    })
    .catch(err => {
      res.status(err.statusCode || err.status || 500).send({ error: err });
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.info(`Server is listening on port ${port}.`);
});

module.exports = app;
