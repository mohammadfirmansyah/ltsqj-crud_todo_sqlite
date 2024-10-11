// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a new to-do
app.post('/todos', (req, res) => {
  const { title } = req.body;
  const query = `INSERT INTO todos (title) VALUES (?)`;

  db.run(query, [title], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, completed: false });
  });
});

// Retrieve all to-dos
app.get('/todos', (req, res) => {
  const query = `SELECT * FROM todos`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Retrieve a single to-do by ID
app.get('/todos/:id', (req, res) => {
  const query = `SELECT * FROM todos WHERE id = ?`;
  const { id } = req.params;

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'To-do not found' });
    }
    res.json(row);
  });
});

// Update a to-do
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const query = `UPDATE todos SET title = ?, completed = ? WHERE id = ?`;

  db.run(query, [title, completed, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'To-do not found' });
    }
    res.json({ id, title, completed });
  });
});

// Delete a to-do
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM todos WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'To-do not found' });
    }
    res.status(204).send();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
