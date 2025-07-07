# Contributing to TubeBenderReviews.com

We welcome contributions to TubeBenderReviews.com! This document provides guidelines for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Testing](#testing)
- [Security](#security)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager
- Git
- PostgreSQL (optional, for production database testing)

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/tubebenderreviews.git
   cd tubebenderreviews
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file for local development:
   ```bash
   cp .env.example .env
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/description-of-feature`
- `bugfix/description-of-bug`
- `hotfix/urgent-fix`
- `docs/documentation-update`

### Commit Messages

Follow conventional commit format:
- `feat: add new feature`
- `fix: resolve bug in component`
- `docs: update README`
- `style: format code`
- `refactor: restructure component`
- `test: add unit tests`
- `chore: update dependencies`

### Types of Contributions

#### Bug Fixes
- Ensure the bug is reproducible
- Include tests that fail before the fix
- Update documentation if needed

#### New Features
- Discuss major features in an issue first
- Add comprehensive tests
- Update documentation
- Ensure backward compatibility

#### Documentation
- Keep language clear and concise
- Include code examples where helpful
- Update table of contents if needed

## Code Style

### TypeScript
- Use TypeScript for all new code
- Ensure proper type definitions
- Avoid `any` types when possible

### React/Frontend
- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Keep components focused and reusable

### Backend
- Follow RESTful API conventions
- Use proper error handling
- Validate all inputs
- Include proper logging

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Ensure accessibility compliance
- Test across different browsers

## Testing

### Running Tests

```bash
# Run type checking
npm run type-check

# Build project
npm run build

# Test production build
npm run start
```

### Test Coverage

- Add tests for new features
- Ensure existing tests still pass
- Include edge cases in testing

## Security

### Security Guidelines

- Never commit sensitive data (API keys, passwords)
- Validate all user inputs
- Use parameterized queries for database operations
- Follow OWASP security guidelines
- Report security vulnerabilities privately

### Authentication & Authorization

- Use proper authentication mechanisms
- Implement role-based access control
- Secure API endpoints appropriately
- Use HTTPS in production

## Submitting Changes

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add tests if applicable
4. Ensure all tests pass
5. Update documentation
6. Submit a pull request

### Pull Request Requirements

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Security considerations addressed

### Review Process

- All pull requests require review
- Address feedback promptly
- Maintain a clean commit history
- Rebase if needed before merging

## Database Changes

### Schema Changes

- Use proper migration files
- Test migrations thoroughly
- Document schema changes
- Consider backward compatibility

### Data Integrity

- Validate data before insertion
- Use transactions for complex operations
- Implement proper error handling
- Test with realistic data sets

## Performance Considerations

- Optimize database queries
- Minimize bundle sizes
- Use proper caching strategies
- Test performance with realistic data

## Accessibility

- Follow WCAG guidelines
- Test with screen readers
- Ensure keyboard navigation
- Use semantic HTML elements

## Documentation

### Code Documentation

- Use JSDoc for functions and classes
- Include usage examples
- Document complex logic
- Keep comments up to date

### API Documentation

- Document all endpoints
- Include request/response examples
- Specify authentication requirements
- Document error responses

## Getting Help

- Create an issue for questions
- Join our Discord community
- Check existing documentation
- Review closed issues/PRs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code.

---

Thank you for contributing to TubeBenderReviews.com! 🛠️