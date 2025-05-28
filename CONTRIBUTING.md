# Contributing to Financial Dashboard Demo

We love your input! We want to make contributing to this financial dashboard demo as easy and transparent as possible.

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. **Fork** the repository and create your branch from `main`
2. **Install** dependencies: `npm install`
3. **Start** the development server: `npm run dev`
4. **Make** your changes and ensure they follow the coding standards
5. **Test** your changes thoroughly
6. **Lint** your code: `npm run lint`
7. **Build** the project to ensure it compiles: `npm run build`
8. **Update** documentation if you change APIs
9. **Submit** a pull request!

## Code Style

- Use **TypeScript** for all new code
- Follow the existing code style and conventions
- Use **Prettier** for code formatting (if configured)
- Ensure **ESLint** passes without warnings
- Write **meaningful commit messages**

### Component Guidelines

- Keep components **small and focused**
- Use **functional components** with hooks
- Implement **proper TypeScript types**
- Follow **Ant Design** patterns and conventions
- Ensure **accessibility** (ARIA attributes, keyboard navigation)

### File Structure

```
src/
├── components/          # Reusable UI components
│   ├── [feature]/      # Feature-specific components
│   └── layout/         # Layout components
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## Issues

We use GitHub issues to track public bugs and feature requests:

### Bug Reports

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

### Feature Requests

We love feature requests! Please provide:

- **Clear description** of the feature
- **Use case** - why would this be useful?
- **Examples** from other applications (if applicable)
- **Mock-ups or sketches** (if applicable)

## Coding Standards

### TypeScript

- Use **strict TypeScript** configuration
- Define **interfaces** for all props and data structures
- Avoid `any` type - use proper typing
- Use **optional chaining** and **nullish coalescing** where appropriate

### React

- Use **functional components** with hooks
- Keep **state management** simple and local when possible
- Use **useMemo** and **useCallback** for performance optimization when needed
- Follow **React best practices** for accessibility

### Ant Design

- Use **Ant Design components** as the foundation
- Follow **Ant Design's design principles**
- Customize through **theme configuration** when possible
- Ensure **responsive design** with Ant Design's grid system

## Testing

While this is a demo project, contributions should:

- Ensure the application **builds successfully**
- Test **core functionality** manually
- Verify **responsive design** on different screen sizes
- Check **accessibility** with keyboard navigation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Getting Help

If you need help or have questions:

1. Check the **README.md** for setup instructions
2. Look through **existing issues** to see if your question has been answered
3. Create a **new issue** with your question
4. Join our discussions in the **GitHub Discussions** tab

## Recognition

Contributors will be recognized in our release notes and project documentation. We appreciate all contributions, no matter how small!

Thank you for contributing! 🎉
