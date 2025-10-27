# Contributing to Todo API Backend

Thank you for your interest in contributing to the Todo API Backend! This REST API serves as the backend microservice for todo applications.

## 🚀 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: Node.js version, OS, database details

### Suggesting Enhancements

To suggest an enhancement:
1. Check if the enhancement has already been suggested
2. Create an issue with the `enhancement` label
3. Describe the feature and its benefits
4. Provide API design examples if applicable

### Pull Requests

1. **Fork the repository**
   ```bash
   gh repo fork mohammadfirmansyah/ltsqj-crud_todo_sqlite
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ltsqj-crud_todo_sqlite.git
   cd ltsqj-crud_todo_sqlite
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/NewEndpoint
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments explaining your logic
   - Ensure backward compatibility

6. **Test your changes**
   ```bash
   node index.js
   # Test with curl or Postman
   ```

7. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new endpoint for bulk operations"
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/NewEndpoint
   ```

9. **Open a Pull Request**

## 📝 Code Style Guidelines

### JavaScript/Node.js

- Use ES6+ features where appropriate
- Use async/await for asynchronous operations
- Add proper error handling with try-catch
- Return meaningful HTTP status codes
- Use descriptive variable names

### Example:

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

## 🧪 Testing

Before submitting a PR, ensure:
- The server starts without errors
- All CRUD endpoints work correctly
- Error handling is comprehensive
- CORS is properly configured
- No console errors or warnings

### Manual Testing

```bash
# Start server
node index.js

# Test CREATE
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task"}'

# Test READ
curl http://localhost:3000/todos

# Test UPDATE
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated task","completed":1}'

# Test DELETE
curl -X DELETE http://localhost:3000/todos/1
```

## 📚 API Documentation

When adding new endpoints, document them with:
- HTTP method
- Endpoint path
- Request body schema
- Response schema
- Status codes
- Example requests/responses

## 🎯 Priority Areas

We especially welcome contributions in:
- Additional API endpoints
- Database migration to persistent storage
- Authentication and authorization
- Input validation improvements
- API rate limiting
- Logging and monitoring
- API versioning
- Swagger/OpenAPI documentation

## 📋 Checklist

Before submitting your PR:
- [ ] Code follows the project's style
- [ ] Proper error handling added
- [ ] Comments added for complex logic
- [ ] API endpoints tested manually
- [ ] No breaking changes to existing endpoints
- [ ] README updated if needed

## 🙏 Thank You!

Every contribution is valuable and appreciated!

---

**Developer:** Mohammad Firman Syah
