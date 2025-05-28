# Ant Design Financial Dashboard Demo

> A modern, professional financial dashboard built with React, TypeScript, Vite, and Ant Design, showcasing enterprise-grade financial data visualization and management.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://dimi-r1.github.io/antd-demo)
[![Build Status](https://github.com/dimi-r1/antd-demo/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/dimi-r1/antd-demo/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.25-blue)](https://ant.design/)

A modern financial dashboard built with React, TypeScript, Vite, and Ant Design. This application demonstrates various financial components including transaction history, portfolio overview, risk metrics, and more.

## 🚀 Live Demo

Visit the live demo: [https://dimi-r1.github.io/antd-demo](https://dimi-r1.github.io/antd-demo)

## 📋 Features

- **💼 Portfolio Management**: Comprehensive portfolio overview with real-time performance metrics
- **📊 Transaction History**: Advanced transaction tracking with filtering and search capabilities
- **📈 Risk Analytics**: Sophisticated risk metrics dashboard with VaR and volatility analysis
- **🔍 Security Analysis**: In-depth security performance metrics and fundamental analysis
- **💰 Cash Flow Visualization**: Interactive cash flow charts and trend analysis
- **🏢 Entity Management**: Hierarchical entity relationship management
- **📱 Market Insights**: Real-time market alerts and opportunity notifications
- **🎨 Theming Support**: Multiple theme configurations with professional design
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **♿ Accessibility**: WCAG compliant with keyboard navigation support

## 🛠️ Built With

- **[React 19](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe development with latest features
- **[Vite 6](https://vitejs.dev/)** - Lightning-fast build tool and development server
- **[Ant Design 5](https://ant.design/)** - Enterprise-grade UI design language
- **[Day.js](https://day2js.gitee.io/)** - Lightweight date manipulation library
- **[ESLint](https://eslint.org/)** - Code quality and consistency

## 🏗️ Architecture & Design

This project demonstrates modern React development practices and enterprise-grade architecture:

- **Component-Driven Development**: Modular, reusable components with clear separation of concerns
- **TypeScript Integration**: Full type safety with advanced TypeScript features
- **Performance Optimization**: Code splitting, lazy loading, and optimized rendering
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG 2.1 compliance with semantic HTML and ARIA attributes
- **Modern Tooling**: Latest development tools and build optimizations

## 🎨 Design System

The application follows a consistent design system based on Ant Design principles:

- **Color Palette**: Professional financial industry colors with accessibility compliance
- **Typography**: Clear hierarchy with readable font scales
- **Spacing**: Consistent 4px grid system for predictable layouts
- **Components**: Reusable UI components with variant support
- **Icons**: Comprehensive icon library with semantic meaning

## 🏗️ Getting Started

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dimi-r1/antd-demo.git
cd antd-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📦 Available Scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build optimized production bundle        |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |
| `npm run deploy`  | Build for deployment to GitHub Pages     |

## 🚢 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

### Manual Deployment

To deploy manually:

1. Build the project:

```bash
npm run build
```

2. The `dist` folder contains the production build ready for deployment.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── cash/           # Cash flow related components
│   ├── entities/       # Entity management components
│   ├── insights/       # Market insights components
│   ├── layout/         # Layout components
│   ├── portfolio/      # Portfolio components
│   ├── risk/           # Risk metrics components
│   ├── securities/     # Securities components
│   ├── trading/        # Trading components
│   └── transactions/   # Transaction components
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test them
4. Run the linter: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

For bug reports and feature requests, please use our [GitHub Issues](https://github.com/dimi-r1/antd-demo/issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
