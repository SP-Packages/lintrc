import chalk from 'chalk';
import pLimit from 'p-limit';
import { spawn } from 'child_process';
import { Ora, Printer } from '../utils/logger.js';
import { isToolAvailable } from '../utils/helper.js';
import { Command, Commands, CommandResult } from '../types/types.js';

const CONCURRENCY_LIMIT = 4;
const limit = pLimit(CONCURRENCY_LIMIT);

/**
 * Executes a single command and buffers output.
 * @param key - The command key
 * @param commandDetails - The details of the command
 * @param spinner - The spinner instance for logging
 * @returns The result of the command execution
 */
async function executeCommandBuffered(
  commandDetails: Command,
  spinner: Ora
): Promise<CommandResult> {
  const { title, type, command, args, files, behavior, requires } =
    commandDetails;
  spinner.text = title;
  if (
    (requires && !isToolAvailable(requires)) ||
    !isToolAvailable(command, type)
  ) {
    Printer.log(title, 'subheader');
    const message = `Skipping ${title}: Required tool '${requires || command}' not found.`;
    if (behavior === 'warn') {
      Printer.log(message, 'warning');
      return {
        title,
        status: 'warning',
        output: `Missing tool: ${requires || command}`
      };
    } else {
      if (!Printer.isVerbose) {
        spinner.clear().start();
        Printer.plainSubheader(title);
      }
      Printer.error(message);
      return {
        title,
        status: 'error',
        output: `Missing tool: ${requires || command}`
      };
    }
  }

  let cmd = type === 'npm' ? `npx --no-install ${command}` : command;
  cmd = type === 'composer' ? `vendor/bin/${command}` : cmd;
  if (args?.length) cmd += ` ${args.join(' ')}`;
  if (files?.length) cmd += ` ${files.join(' ')}`;

  return new Promise((resolve) => {
    const childProcess = spawn(cmd, {
      shell: true,
      env: { ...process.env, FORCE_COLOR: 'true' }
    });

    let stdoutBuffer = '';
    let stderrBuffer = '';
    let message = '';

    childProcess.stdout.on('data', (data) => {
      stdoutBuffer += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
      stderrBuffer += data.toString();
    });

    childProcess.on('close', (code) => {
      Printer.log(title, 'subheader');
      message = stdoutBuffer + stderrBuffer;

      if (code === 0) {
        resolve({
          title,
          status: 'success',
          output: message.trim() || 'Success'
        });
        Printer.log(
          [
            chalk.green.bold('COMMAND:') + '\n' + chalk.white(cmd),
            '',
            chalk.green.bold('RESPONSE:') +
              '\n' +
              chalk.gray(message.trim() ? message.trim() : 'No Response'),
            '',
            chalk.green.bold('STATUS:') +
              '\n' +
              chalk.white('Process completed successfully.')
          ].join('\n')
        );
      } else {
        if (behavior === 'warn') {
          resolve({
            title,
            status: 'warning',
            output: message.trim() || 'Warning'
          });
          if (!Printer.isVerbose) {
            spinner.clear().start();
            Printer.plainSubheader(title);
          }
          Printer.message(
            [
              chalk.yellow.bold('COMMAND:') + '\n' + chalk.white(cmd),
              '',
              chalk.yellow.bold('RESPONSE:') +
                '\n' +
                chalk.gray(message.trim() ? message.trim() : 'No Response'),
              '',
              chalk.yellow.bold('STATUS:') +
                '\n' +
                chalk.white('Process completed with warnings.')
            ].join('\n')
          );
        } else {
          resolve({
            title,
            status: 'error',
            output: message.trim() || 'Error'
          });
          if (!Printer.isVerbose) {
            spinner.clear().start();
            Printer.plainSubheader(title);
          }
          Printer.message(
            [
              chalk.red.bold('COMMAND:') + '\n' + chalk.white(cmd),
              '',
              chalk.red.bold('RESPONSE:') +
                '\n' +
                chalk.gray(message.trim() ? message.trim() : 'No Response'),
              '',
              chalk.red.bold('STATUS:') +
                '\n' +
                chalk.white('Process failed with errors.')
            ].join('\n')
          );
        }
      }
    });
  });
}

/**
 * Executes the given commands in parallel but prints outputs sequentially.
 * @param commands - The commands to execute
 * @param spinner - The spinner instance for logging
 * @returns The results of the command execution
 */
export async function executeCommands(
  commands: Commands,
  spinner: Ora
): Promise<CommandResult[]> {
  const results: CommandResult[] = [];
  if (Object.keys(commands).length > 0) {
    const fileList = [
      ...new Set(
        Object.values(commands).flatMap((command) => command.files || [])
      )
    ].sort();
    Printer.log('Files', 'subheader');
    Printer.log(fileList, 'array');
    Printer.log('Number of files: ' + fileList.length);

    // Run commands in parallel with controlled concurrency
    const commandPromises = Object.keys(commands).map((key) =>
      limit(() => executeCommandBuffered(commands[key], spinner))
    );

    // Execute all commands and collect results
    const commandResults = await Promise.all(commandPromises);
    results.push(...commandResults);
  }
  return results;
}
