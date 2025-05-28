# Ant Design Financial Dashboard Demo

A modern financial dashboard built with React, TypeScript, Vite, and Ant Design. This application demonstrates various financial components including transaction history, portfolio overview, risk metrics, and more.

## 🚀 Live Demo

Visit the live demo: [https://dimi.github.io/antd-demo](https://dimi.github.io/antd-demo)

## 📋 Features

- **Transaction History**: View and filter financial transactions with advanced search capabilities
- **Portfolio Overview**: Track asset allocation and performance metrics
- **Risk Metrics Dashboard**: Monitor portfolio risk indicators
- **Security Metrics**: Analyze individual security performance
- **Cash Flow Charts**: Visualize cash flow patterns
- **Market Insights**: Access market data and analysis tools
- **Responsive Design**: Optimized for all device sizes

## 🛠️ Built With

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Ant Design 5** - Professional UI component library
- **Day.js** - Lightweight date manipulation library

## 🏗️ Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dimi/antd-demo.git
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Build for deployment

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

Contributions are welcome! Please feel free to submit a Pull Request.

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
