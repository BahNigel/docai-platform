# 🧹 Code Quality & Formatting Setup

This project uses **ESLint**, **Prettier**, and **VS Code integration** to enforce consistent code quality, clean formatting, and developer productivity.

---

## 📦 Tools Used

| Tool                 | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| **ESLint**           | Finds problems in JavaScript/React code.         |
| **Prettier**         | Formats code consistently (style, spacing, etc). |
| **VS Code settings** | Enables auto-formatting and auto-fixing on save. |

---

## 📁 Files and Their Purpose

| File                    | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| `.eslintrc.json`        | ESLint config: rules and plugins for React, accessibility, imports, and Prettier. |
| `.prettierrc.js`        | Prettier config: sets formatting rules like quotes, tabs, line length, etc.       |
| `.vscode/settings.json` | VS Code-specific settings to enable auto-format and lint fixes on save.           |

---

## ⚙️ ESLint Configuration

### 📄 `.eslintrc.json`

```jsonc
{
  "extends": [
    "react-app",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
  ],
  "rules": {
    "no-unused-vars": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal"],
        "newlines-between": "always",
      },
    ],
    "prettier/prettier": ["error"],
  },
  "plugins": ["react", "jsx-a11y", "import", "prettier"],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
}
```

---

## 🧼 Prettier Configuration

### 📄 `.prettierrc.js`

```js
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 80,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  requirePragma: false,
  embeddedLanguageFormatting: 'auto',
};
```

---

## 💻 VS Code Integration (Highly Recommended)

### 📁 `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "prettier.enableDebugLogs": false
}
```

### ✅ Benefits

- Code is auto-formatted every time you save.
- ESLint automatically fixes problems (where safe).
- Consistent team-wide coding standards.

---

## 🚀 Installation Instructions

### 1. Install ESLint and Prettier with plugins:

```bash
npm install --save-dev \
  eslint prettier \
  eslint-config-prettier eslint-plugin-prettier \
  eslint-config-react-app \
  eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y eslint-plugin-import \
  @babel/core @babel/eslint-parser

```

### 2. Add Scripts in `package.json` (Optional)

```json
"scripts": {
  "lint": "eslint ./src --ext .js,.jsx,.ts,.tsx",
  "format": "prettier --write ."
}
```

Now you can:

```bash
npm run lint
npm run format
```

---

## 🧪 Testing Your Setup

You can test that everything works by:

1. Creating a badly formatted `.jsx` file.
2. Saving it in VS Code — it should auto-format.
3. Running `npm run lint` — you should see ESLint warnings if any rules are violated.

---

## 📝 Notes for Collaborators

- Please use **VS Code** with the **Prettier** and **ESLint** extensions.
- Make sure `formatOnSave` is enabled for smooth collaboration.
- All commits should be linted and formatted before pushing. Consider adding a pre-commit hook using [lint-staged](https://github.com/okonet/lint-staged) if working in teams.

---

## 🔐 Git Pre-commit Checks (Optional but Recommended)

To enforce formatting and linting **before code is committed**, we use [`lint-staged`](https://github.com/okonet/lint-staged) and [`husky`](https://github.com/typicode/husky).

### 🔧 Step 1: Install Dependencies

```bash
npm install --save-dev husky lint-staged
```

### 🔧 Step 2: Enable Husky in Your Project

```bash
npx husky install
```

Then, add this line in your `package.json`:

```json
"scripts": {
  "prepare": "husky install"
}
```

Run it once:

```bash
npm run prepare
```

### 🔧 Step 3: Add Pre-commit Hook

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### 🔧 Step 4: Configure `lint-staged` in `package.json`

```json
"lint-staged": {
  "**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

> This runs ESLint and Prettier **only on the files you're committing**.

---

### ✅ Benefits

- Ensures all committed code is linted and formatted
- Catches errors **before they reach your Git history**
- Helps teams enforce standards automatically

---
