# 🚀 Todo API Backend

[![GitHub](https://img.shields.io/badge/GitHub-ltsqj--crud__todo__sqlite-blue?logo=github)](https://github.com/mohammadfirmansyah/ltsqj-crud_todo_sqlite)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-black?logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A RESTful API backend for todo applications built with Node.js, Express, and SQLite. This microservice provides complete CRUD operations with **real-time synchronization** using WebSocket technology, ensuring all connected clients stay in sync automatically.

## 📚 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - Learn how to contribute to this project
- **[Changelog](CHANGELOG.md)** - Version history and release notes
- **[License](LICENSE)** - Apache License 2.0 details

## ✨ Key Features

- **RESTful API**: Complete CRUD operations following REST principles
- **Real-time Sync**: WebSocket-powered live updates across all connected clients
- **SQLite Database**: Lightweight in-memory database for quick setup
- **Modern Web UI**: Beautiful responsive interface for managing todos
- **CORS Enabled**: Ready for cross-origin requests from frontend apps
- **Socket.IO Integration**: Bidirectional real-time communication
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes
- **Static File Serving**: Serves web interface from public directory
- **Easy Integration**: Simple API endpoints for any frontend framework
- **Production Ready**: Clean code with proper structure and documentation

## 📱 Web Interface Preview

```
┌──────────────────────────────────┐
│   📝 Todo Application            │
│   Manage your tasks efficiently  │
├──────────────────────────────────┤
│  [New task...________] [Add]     │
├──────────────────────────────────┤
│  ☐ Take clothes for laundry      │
│     [Complete] [Delete]          │
├──────────────────────────────────┤
│  ☑ Buy groceries                 │
│     [Unmark] [Delete]            │
├──────────────────────────────────┤
│  Total: 2  |  Completed: 1       │
└──────────────────────────────────┘
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - v4.21.1 - Fast, unopinionated web framework
- **Socket.IO** - v4.8.1 - Real-time bidirectional event-based communication
- **SQLite3** - v5.1.7 - Embedded SQL database engine
- **CORS** - v2.8.5 - Cross-Origin Resource Sharing middleware
- **HTML/CSS/JavaScript** - Modern web interface

## 📂 Project Structure

```
ltsqj-crud_todo_sqlite/
├── index.js            # Main server file with API routes
├── database.js         # Database configuration (if applicable)
├── package.json        # Dependencies and scripts
├── public/             # Static web interface
│   └── index.html      # Web UI for todo management
├── README.md           # This file
├── LICENSE             # Apache License 2.0
├── CONTRIBUTING.md     # Contribution guidelines
└── CHANGELOG.md        # Version history
```

## 🚀 Setup & Installation

Before you begin, make sure you have the following installed:
- **Node.js** >= 18.0
- **npm** (comes with Node.js)

Follow these steps to get your development environment running:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mohammadfirmansyah/ltsqj-crud_todo_sqlite.git
    cd ltsqj-crud_todo_sqlite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 💻 Usage / How to Run

1.  **Start the server:**
    ```bash
    node index.js
    ```
    
    The server will start on `http://localhost:3000`

2.  **Access the web interface:**
    
    Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

3.  **Use the API endpoints:**
    
    The API is now ready to accept requests from your frontend applications.

## 🔄 Real-time Synchronization

This backend implements WebSocket-based real-time synchronization using Socket.IO. All CRUD operations automatically broadcast updates to connected clients.

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                     Real-time Sync Flow                              │
└──────────────────────────────────────────────────────────────────────┘

┌─────────────┐                 ┌──────────────┐                ┌─────────────┐
│   Client 1  │                 │   Backend    │                │   Client 2  │
│  (Web UI)   │                 │  Socket.IO   │                │(Mobile App) │
└──────┬──────┘                 └──────┬───────┘                └──────┬──────┘
       │                               │                               │
       │ 1. POST /todos                │                               │
       │──────────────────────────────►│                               │
       │    {title: "New Task"}        │                               │
       │                               │                               │
       │                          2. Save to DB                        │
       │                               │                               │
       │ 3. HTTP 201 Response          │                               │
       │◄──────────────────────────────│                               │
       │                               │                               │
       │                          4. Broadcast via WebSocket           │
       │                               │                               │
       │ 5. Socket: 'todos-updated'    │  6. Socket: 'todos-updated'   │
       │◄──────────────────────────────┼──────────────────────────────►│
       │    [All Todos Array]          │      [All Todos Array]        │
       │                               │                               │
       │ 7. Update UI (No Refresh!)    │  8. Update UI (No Refresh!)   │
       │    ✓ New task appears         │      ✓ New task appears       │
       │                               │                               │


WebSocket Connection Flow:
─────────────────────────────
Client → io.connect('http://localhost:3000')
         │
         ├──► socket.on('connect') → Connected!
         │
         ├──► socket.on('todos-updated') → Receive updates
         │
         └──► socket.on('disconnect') → Reconnect automatically
```

### How It Works

1. **Server broadcasts** - Every CREATE, UPDATE, or DELETE operation triggers a broadcast to all connected clients
2. **Clients listen** - Connected web UIs and mobile apps receive instant updates via WebSocket
3. **Automatic sync** - No manual refresh needed - data stays consistent across all platforms

### WebSocket Events

**Server emits:**
- `todos-updated` - Sends complete todo list after any CRUD operation

**Clients receive:**
```javascript
socket.on('todos-updated', (todos) => {
  // Update UI with new data automatically
  updateTodoList(todos);
});
```

### Benefits

- ✅ **No polling** - Eliminates need for periodic API calls
- ✅ **Instant updates** - Changes appear immediately on all devices
- ✅ **Reduced load** - More efficient than constant HTTP requests
- ✅ **Better UX** - Users see changes in real-time without manual refresh

### Testing Real-time Sync

1. Open web UI at `http://localhost:3000` in multiple browser windows
2. Add, update, or delete a todo in one window
3. Watch the changes appear instantly in all other windows
4. Test with mobile app running simultaneously - all stay in sync!

## �📝 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Get All Todos
```http
GET /todos
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Take clothes for laundry",
    "completed": 0
  },
  {
    "id": 2,
    "title": "Buy groceries",
    "completed": 1
  }
]
```

#### Get Todo by ID
```http
GET /todos/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Take clothes for laundry",
  "completed": 0
}
```

#### Create Todo
```http
POST /todos
Content-Type: application/json

{
  "title": "New task"
}
```

**Response:**
```json
{
  "id": 3,
  "title": "New task",
  "completed": 0
}
```

#### Update Todo
```http
PUT /todos/:id
Content-Type: application/json

{
  "title": "Updated task",
  "completed": 1
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated task",
  "completed": 1
}
```

#### Delete Todo
```http
DELETE /todos/:id
```

**Response:**
```
Status: 204 No Content
```

### Status Codes

- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `404 Not Found` - Todo item not found
- `500 Internal Server Error` - Server error

## 🔧 Code Highlights

### RESTful API Implementation

```javascript
// Create a new to-do item via POST endpoint
// Validates input and returns the created item with generated ID
app.post('/todos', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO todo (title) VALUES (?)', [title], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});
```

*This endpoint demonstrates proper REST API design with appropriate status codes and error handling.*

### Database Setup

```javascript
// Set up SQLite database with in-memory storage
// Creates todo table on server startup
db.serialize(() => {
  db.run(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )`);
});
```

*Using SQLite's serialize mode ensures table creation completes before accepting requests.*

## 📖 Learning Outcomes

This project demonstrates:

- ✅ **RESTful API Design**: Proper HTTP methods and status codes
- ✅ **Express.js Framework**: Routing, middleware, and error handling
- ✅ **Database Integration**: SQLite with Node.js
- ✅ **CORS Configuration**: Enabling cross-origin requests
- ✅ **Static File Serving**: Hosting web interfaces
- ✅ **Error Handling**: Comprehensive try-catch and error responses
- ✅ **API Documentation**: Clear endpoint specifications
- ✅ **Code Organization**: Clean, maintainable structure

## 🔌 Frontend Integration

### React Native Example

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';

// Fetch all todos
const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new todo
const createTodo = async (title) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};
```

### PowerShell Example

```powershell
# Add new todo
$json = @{title="New task"} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3000/todos' `
  -Method Post -ContentType 'application/json' -Body $json

# Get all todos
Invoke-RestMethod -Uri 'http://localhost:3000/todos' -Method Get
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/NewEndpoint`)
3.  Commit your changes (`git commit -m 'feat: add new endpoint'`)
4.  Push to the branch (`git push origin feature/NewEndpoint`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

- **Mohammad Firman Syah**
- **Project Link:** [https://github.com/mohammadfirmansyah/ltsqj-crud_todo_sqlite](https://github.com/mohammadfirmansyah/ltsqj-crud_todo_sqlite)
- **Frontend Repository:** [https://github.com/mohammadfirmansyah/myTodoApp](https://github.com/mohammadfirmansyah/myTodoApp)

---

**Note**: This project uses an in-memory database. Data will be lost when the server restarts. For production use, consider:
- Migrating to a persistent SQLite database file
- Adding authentication and authorization
- Implementing input validation with express-validator
- Adding API rate limiting
- Setting up proper logging
- Deploying to a cloud platform
