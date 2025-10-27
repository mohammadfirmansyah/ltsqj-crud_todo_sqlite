# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-10-27

**GitHub Release:** [v1.1.0](https://github.com/mohammadfirmansyah/ltsqj-crud_todo_sqlite/releases/tag/v1.1.0)

### Added
- Modern web UI interface in `public/index.html`
- Static file serving with Express
- Beautiful gradient design with responsive layout
- Real-time statistics (total and completed tasks)
- Interactive task management through web browser
- ASCII art demo in README.md
- Comprehensive documentation (CONTRIBUTING.md, CHANGELOG.md)

### Changed
- Updated `.gitignore` to include Node.js specific files
- Enhanced README.md with complete setup instructions

### Features
- **Web Interface**: Modern, responsive UI for managing todos
- **CRUD via Web**: Add, delete, and toggle tasks through browser
- **Visual Feedback**: Smooth animations and hover effects
- **Statistics**: Real-time task completion tracking

## [1.0.0] - Initial Release

### Added
- RESTful API backend with Express.js
- SQLite in-memory database
- Complete CRUD operations for todo items
- CORS enabled for cross-origin requests
- Error handling for all endpoints

### API Endpoints
- `GET /todos` - Fetch all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo by ID
- `PUT /todos/:id` - Update a todo by ID
- `DELETE /todos/:id` - Delete a todo by ID

### Technical Details
- Express.js for HTTP server
- SQLite3 for database
- CORS middleware for API access
- Port 3000 default configuration

### Developer
- Mohammad Firman Syah

## [Unreleased]

### Planned Features
- Persistent database (file-based SQLite)
- User authentication with JWT
- API rate limiting
- Request validation with Joi or express-validator
- Pagination for large datasets
- Filtering and sorting capabilities
- Bulk operations (create/update/delete multiple items)
- Swagger/OpenAPI documentation
- Docker containerization
- Environment-based configuration
- Logging with Winston or Morgan
- Unit tests with Jest
- Integration tests with Supertest
- CI/CD pipeline setup
- Database migrations
- API versioning

### Future Improvements
- Add TypeScript support
- Implement caching with Redis
- Add database connection pooling
- Implement soft deletes
- Add created_at and updated_at timestamps
- Implement search functionality
- Add WebSocket support for real-time updates
- Deploy to cloud platform (Heroku, AWS, Azure)

---

**Note:** This API is actively maintained. Check the [GitHub repository](https://github.com/mohammadfirmansyah/ltsqj-crud_todo_sqlite) for the latest updates.
