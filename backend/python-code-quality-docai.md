# 🧪 Python Code Quality Setup for Django (DocAi Backend)

This guide explains how we maintain clean, consistent, and reliable Python code in the **DocAi** backend using **Flake8**, **Black**, and **isort**.

---

## 📦 Tools Overview

| Tool     | Role                                                  |
|----------|-------------------------------------------------------|
| **Flake8** | Linter: Catches code style issues and common errors |
| **Black**  | Formatter: Automatically formats Python code        |
| **isort**  | Import Sorter: Ensures imports are ordered properly |

---

## ✅ Installation

Install the tools using pip in your virtual environment:

```bash
pip install flake8 black isort
```

---

## 📁 File Configurations

### 📄 `.flake8`

```ini
[flake8]
max-line-length = 88            # Match Black's default
exclude = venv, migrations, __pycache__
ignore = 
    E203,   # Whitespace before ':'
    W503,   # Line break before binary operator
    F403,   # 'from module import *' used
    F401,   # Imported but unused (often flagged when using __init__.py)
    E266    # Too many leading '#' for block comment
```

> These settings ignore some overly strict rules and avoid duplicate flags raised by Black.

---

### 📄 `pyproject.toml`

```toml
[tool.black]
line-length = 88
exclude = '''
/(
  venv
  | migrations
  | __pycache__
)/
'''

[tool.isort]
profile = "black"
line_length = 88
skip = ["venv", "migrations"]
multi_line_output = 3
include_trailing_comma = true
force_grid_wrap = 0
use_parentheses = true
```

- **Black** auto-formats all code with consistent line length and spacing.
- **isort** ensures imports are grouped and ordered consistently:
  - Standard library
  - Third-party
  - Local apps

---

## 🛠 Recommended Makefile Targets (Optional)

Create a `Makefile` in the backend root:

```makefile
lint:
	flake8 .
	black . --check
	isort . --check-only

format:
	black .
	isort .
```

Now you can use:

```bash
make lint     # Check code for issues
make format   # Auto-format code and imports
```

---

## 🔁 Workflow Recommendation

1. **Before Committing Code:**
   - Run `make format` to auto-format code and organize imports.
   - Run `make lint` to catch logic or style issues.
2. **In CI/CD (GitHub Actions or GitLab CI):**
   - Run `make lint` in your pipeline to enforce code quality before merge.

---

## 💻 VS Code Integration (Recommended)

In `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "python.formatting.provider": "black",
  "python.linting.flake8Enabled": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "python.sortImports.args": ["--profile", "black"]
}
```

---

## 🧪 Pre-commit Hook Setup (Optional but Recommended)

```bash
pip install pre-commit
pre-commit install
```

Create `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black

  - repo: https://github.com/PyCQA/flake8
    rev: 6.1.0
    hooks:
      - id: flake8

  - repo: https://github.com/pre-commit/mirrors-isort
    rev: v5.12.0
    hooks:
      - id: isort
```

Now pre-commit will:
- Auto-format and lint code **before commits**
- Block commits that don’t pass quality checks

---

## 🎯 Why This Matters for DocAi

- Clean, consistent code is easier to maintain and debug.
- Automated checks reduce review time and avoid silly mistakes.
- Standard formatting means fewer unnecessary diffs in Git.

---

Let your backend team always run:
```bash
make format && make lint
```

For clean code, every time. 🧼
