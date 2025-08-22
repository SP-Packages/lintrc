#!/usr/bin/env node
import { program } from 'commander';
import { createRequire } from 'module';
import { lintrc } from '../cli/lintrc.js';
import { Printer } from './../utils/logger.js';
import { readConfig } from './../core/config.js';

const require = createRequire(import.meta.url);
const { version } = require('../../package.json');

program
  .name('LintRC')
  .version(version)
  .description(
    'A lightweight CLI tool for running multiple linters efficiently.'
  )
  .argument(
    '[files...]',
    'List of files to lint. If omitted, uses Git-tracked files.'
  )
  .option('--skip-composer', 'Skip processing Composer dependencies')
  .option('--skip-npm', 'Skip processing NPM dependencies')
  .option(
    '-c, --config <config>',
    'Path to the configuration file (default: lintrc.json)'
  )
  .option(
    '-e, --ext <ext...>',
    'Optionally limit the linter to specific extensions',
    (value) => value.split(',').map((ext) => ext.replace(/^=/, ''))
  )
  .option('-s, --strict', 'Enable strict mode')
  .option('-q, --quiet', 'Disable output')
  .option('-m, --minimal', 'Enable minimal output')
  .option('-v, --verbose', 'Enable verbose logging')
  .action(async (files, options) => {
    if (options.verbose) {
      Printer.enableVerbose();
    }
    if (options.quiet) {
      Printer.enableQuiet();
    }
    if (options.minimal) {
      Printer.enableMinimal();
    }
    const config = await readConfig(options.config);
    lintrc(files, config, options);
  });

program.parse(process.argv);
