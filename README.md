# **LintRC**

<p align="center"><i>A lightweight CLI tool for running multiple linters efficiently.</i></p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sp-packages/lintrc"><img src="https://img.shields.io/npm/v/@sp-packages/lintrc" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@sp-packages/lintrc"><img src="https://img.shields.io/npm/dw/@sp-packages/lintrc" alt="npm downloads"></a>
  <a href="https://github.com/SP-Packages/lintrc/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@sp-packages/lintrc" alt="license"></a>
  <a href="https://github.com/SP-Packages/lintrc/actions/workflows/release.yml"><img src="https://github.com/SP-Packages/lintrc/actions/workflows/release.yml/badge.svg" alt="build status"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release" alt="semantic-release"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Made%20with-TypeScript-blue.svg" alt="TypeScript"></a>
  <a href="https://prettier.io/"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Prettier"></a>
  <a href="https://codecov.io/gh/SP-Packages/lintrc"><img src="https://codecov.io/gh/SP-Packages/lintrc/graph/badge.svg?token=60X95UNTQL" alt="codecov"></a>
  <a href="https://github.com/SP-Packages/lintrc/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome"></a>
  <a href="https://github.com/sponsors/iamsenthilprabu"><img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-pink?logo=github" alt="Sponsor"></a>
</p>

## **✨ Features**

- 🔍 **Detects file types and applies appropriate linters automatically**
- 🛠 **Supports multiple linters** (ESLint, Prettier, PHPStan, PHPCS, Markdownlint, etc.)
- 🚀 **Parallel execution** for improved performance
- 📜 **Customizable config file (`lintrc.json`)**
- ✅ **Runs only on Git-tracked files by default**
- 🏗 **Ideal for CI/CD pipelines and local development**

---

## **📦 Installation**

### **Global Installation** (For system-wide CLI use)

```sh
npm install -g @sp-packages/lintrc
```

This allows you to use `lintrc` globally in your terminal.

### **Local Installation** (For project-specific use)

```sh
npm install @sp-packages/lintrc --save-dev
```

Then, run it via:

```sh
npx lintrc
```

---

## **🚀 CLI Usage**

### **Basic Usage**

```sh
lintrc [options]
```

#### **Options:**

```sh
lintrc -h
Usage: LintRC [options] [files...]

LintRC - A CLI tool for running linters based on file extensions.

Arguments:
files List of files to lint. If omitted, uses Git-tracked files.

Options:
-V, --version output the version number
-c, --config <config> Path to the configuration file (default: lintrc.json)
-e, --ext <ext...> Optionally limit the linter to specific extensions
-q, --quiet Disable output
-v, --verbose Enable verbose logging
-h, --help display help for command
```

#### **Examples:**

```sh
lintrc --ext js,ts,php
lintrc --config custom-lintrc.json --verbose
```

---

## **📜 Programmatic Usage (Inside Node.js)**

You can also use `lintrc` inside your JavaScript/TypeScript projects.

### **Import and Use in Your Project**

```ts
import { lintrc } from '@sp-packages/lintrc';

lintrc({ verbose: true });
```

---

## **⚙️ Configuration (`lintrc.json`)**

By default, `lintrc` will look for a `lintrc.json` or `.lintrc.json` file in your project's root directory. You can customize it as follows:

The `lintrc.json` configuration file allows you to define the tools and file type mappings for `lintrc`. Below is an example configuration and explanation of its keys:

### **TOOLS**

The `TOOLS` section defines the linters and their configurations. Each tool has the following properties:

- `title`: The display name of the tool.
- `type`: The type of package manager used (`npm` or `composer`).
- `command`: The command to run the linter.
- `args`: An array of arguments to pass to the command.
- `behavior`: The behavior of the tool (`error` or `warn`).
- `priority`: The priority of the tool execution (lower number means higher priority).

Example:

```json
{
  "TOOLS": {
    "CSPELL": {
      "title": "cSpell",
      "type": "npm",
      "command": "cspell",
      "args": ["--no-progress", "--no-summary"],
      "behavior": "warn",
      "priority": 4
    },
    "ESLINT": {
      "title": "ESLint",
      "type": "npm",
      "command": "eslint",
      "args": ["--fix"],
      "behavior": "error",
      "priority": 2
    },
    "PHPCS": {
      "title": "PHP Code Sniffer",
      "type": "composer",
      "command": "phpcs",
      "behavior": "error",
      "priority": 3
    },
    "PRETTIER": {
      "title": "Prettier",
      "type": "npm",
      "command": "prettier",
      "args": ["--write"],
      "behavior": "error",
      "priority": 1
    }
  }
}
```

### **MAPPING**

The `MAPPING` section defines which tools to run based on file extensions. Each key is a file extension, and the value is an array of tool identifiers from the `TOOLS` section.

Example:

```json
{
  "MAPPING": {
    "php": ["PHPCS"],
    "js": ["ESLINT", "PRETTIER"],
    "jsx": ["ESLINT", "PRETTIER"],
    "ts": ["ESLINT", "PRETTIER"],
    "*": ["CSPELL"]
  }
}
```

In this example:

- PHP files (`.php`) will be checked with `PHPCS`.
- JavaScript files (`.js`) and TypeScript files (`.ts`) will be checked with `ESLINT` and `PRETTIER`.
- All files (`*`) will be checked with `CSPELL`.

This configuration allows `lintrc` to automatically apply the appropriate linters based on the file types in your project.

---

## **🎯 Example Outputs**

```sh
lintrc
------------------------------
 cSpell
------------------------------
❌  [ERROR] package.json:112:32 - Unknown word (lintrc)
------------------------------
 LintRC Results
------------------------------
✅ [SUCCESS] Prettier: Passed
✅ [SUCCESS] ESLint: Passed
✅ [SUCCESS] Markdown Lint: Passed
✅ [SUCCESS] Commit Lint: Passed
✅ [SUCCESS] DepCheck: Passed
❌  [ERROR] cSpell: Failed
```

---

## **💡 Use Cases**

- **CI/CD Pipelines** – Automate code quality checks in your workflows.
- **Pre-Commit Hooks** – Integrate with `husky` to enforce coding standards.
- **Local Development** – Run linters before pushing code changes.

---

## **🤝 Contributing**

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

---

## **📜 License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
