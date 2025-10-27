const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// Initialize the Express app and middleware
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
// This enables real-time bidirectional communication between server and clients
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development and production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  },
  // Production-ready configuration for IBM Code Engine and other cloud platforms
  transports: ['polling', 'websocket'],
  allowUpgrades: true,
  pingTimeout: 60000,
  pingInterval: 25000,
});

app.use(express.json()); // for parsing application/json
app.use(cors()); // enable CORS

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up SQLite database
const db = new sqlite3.Database(':memory:'); // In-memory database for demo purposes

// Create the to-do table
db.serialize(() => {
  db.run(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )`);
});

// Socket.IO connection handling
// Emits real-time updates to all connected clients when data changes
io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);
  console.log('🚀 Transport:', socket.conn.transport.name);
  
  socket.conn.on('upgrade', (transport) => {
    console.log('⬆️ Transport upgraded to:', transport.name);
  });
  
  socket.on('disconnect', (reason) => {
    console.log('❌ Client disconnected:', socket.id, 'Reason:', reason);
  });
  
  socket.on('error', (error) => {
    console.log('⚠️ Socket error:', error.message);
  });
});

// Helper function to broadcast todo updates to all connected clients
const broadcastTodos = () => {
  db.all('SELECT * FROM todo', [], (err, rows) => {
    if (!err) {
      console.log('📡 Broadcasting todos update to all clients:', rows.length, 'items');
      io.emit('todos-updated', rows);
    } else {
      console.error('❌ Error fetching todos for broadcast:', err.message);
    }
  });
};

// API Endpoints

// Create a new to-do item
app.post('/todos', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO todo (title) VALUES (?)', [title], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const newTodo = { id: this.lastID, title, completed: 0 };
    res.status(201).json(newTodo);
    // Broadcast update to all connected clients in real-time
    broadcastTodos();
  });
});

// Read all to-do items
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todo', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Read a specific to-do item by ID
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM todo WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'To-do item not found' });
    }
    res.json(row);
  });
});

// Update a to-do item by ID
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.run(
    'UPDATE todo SET title = ?, completed = ? WHERE id = ?',
    [title, completed, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'To-do item not found' });
      }
      res.json({ id, title, completed });
      // Broadcast update to all connected clients in real-time
      broadcastTodos();
    }
  );
});

// Delete a to-do item by ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todo WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'To-do item not found' });
    }
    res.status(204).end();
    // Broadcast update to all connected clients in real-time
    broadcastTodos();
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('WebSocket server is ready for real-time updates');
});
