import { Config } from './types/types.js';

/**
 * Default configuration for the linter.
 */
export const DEFAULT_CONFIG: Config = {
  TOOLS: {
    COMMITLINT: {
      title: 'Commit Lint',
      type: 'npm',
      command: 'commitlint',
      args: ['--from HEAD~1', '--to HEAD'],
      behavior: 'warn',
      includeFiles: false,
      priority: 9
    },
    CSPELL: {
      title: 'cSpell',
      type: 'npm',
      command: 'cspell',
      args: ['--no-progress', '--no-summary'],
      behavior: 'warn',
      ignoreFiles: ['composer.lock', 'package-lock.json'],
      priority: 8
    },
    ESLINT: {
      title: 'ESLint',
      type: 'npm',
      command: 'eslint',
      args: ['--fix'],
      behavior: 'error',
      priority: 4
    },
    MARKDOWNLINT: {
      title: 'Markdown Lint',
      type: 'npm',
      command: 'markdownlint',
      args: ['--fix'],
      behavior: 'warn',
      priority: 5
    },
    PHPCBF: {
      title: 'PHP Code Beautifier',
      type: 'composer',
      command: 'phpcbf',
      behavior: 'warn',
      priority: 3
    },
    PHPCS: {
      title: 'PHP Code Sniffer',
      type: 'composer',
      command: 'phpcs',
      behavior: 'error',
      priority: 6
    },
    PHPCSFIXER: {
      title: 'PHP Coding Standards Fixer',
      type: 'composer',
      command: 'php-cs-fixer',
      args: ['fix', '--config=.php-cs-fixer.php'],
      behavior: 'error',
      priority: 1
    },
    PHPSTAN: {
      title: 'PHPStan',
      type: 'composer',
      command: 'phpstan',
      args: ['analyze', '--error-format=raw'],
      behavior: 'error',
      priority: 7
    },
    PRETTIER: {
      title: 'Prettier',
      type: 'npm',
      command: 'prettier',
      args: ['--write'],
      behavior: 'error',
      priority: 2
    }
  },
  MAPPING: {
    php: ['PHPCSFIXER', 'PHPCBF', 'PHPCS', 'PHPSTAN'],
    js: ['ESLINT', 'PRETTIER'],
    jsx: ['ESLINT', 'PRETTIER'],
    ts: ['ESLINT', 'PRETTIER'],
    tsx: ['ESLINT', 'PRETTIER'],
    cjs: ['ESLINT', 'PRETTIER'],
    mjs: ['ESLINT', 'PRETTIER'],
    md: ['PRETTIER', 'MARKDOWNLINT'],
    mdx: ['PRETTIER', 'MARKDOWNLINT'],
    markdown: ['PRETTIER', 'MARKDOWNLINT'],
    json: ['PRETTIER'],
    yaml: ['PRETTIER'],
    yml: ['PRETTIER'],
    html: ['PRETTIER'],
    css: ['PRETTIER'],
    scss: ['PRETTIER'],
    less: ['PRETTIER'],
    '*': ['CSPELL', 'COMMITLINT']
  }
};
