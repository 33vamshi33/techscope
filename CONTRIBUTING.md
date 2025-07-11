# Contributing to TechScope

Thank you for considering contributing to TechScope! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. The app will be available at `http://localhost:5000`

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and single-purpose

## Adding New Features

### Adding New Articles
Articles are stored in `server/storage.ts`. When adding new articles:

1. Focus on technical depth and implementation details
2. Include real company sources and URLs
3. Use proper categories and tags
4. Ensure content is accurate and well-researched

### Adding New Components
1. Create components in `client/src/components/`
2. Use TypeScript interfaces for props
3. Follow existing naming conventions
4. Add proper error handling

## Testing

Before submitting a pull request:

1. Test the application locally
2. Verify all links and navigation work
3. Check responsive design on different screen sizes
4. Ensure articles load and display correctly

## Submitting Changes

1. Create a descriptive commit message
2. Push your changes to your fork
3. Submit a pull request with:
   - Clear description of changes
   - Screenshots if UI changes
   - Steps to test the changes

## Code Review Process

All submissions require review. We use GitHub pull requests for this purpose. Reviewers will check:

- Code quality and style
- Functionality and testing
- Documentation updates
- Performance implications

## Questions?

If you have questions about contributing, feel free to open an issue or reach out to the maintainers.

Thank you for your contributions!