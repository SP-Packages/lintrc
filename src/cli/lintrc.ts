import { existsSync } from "fs";
import { Printer } from "../utils/logger.js";
import { executeCommands } from "../core/executor.js";
import { Config, CommandResult, LintRCOptions } from "../types/types.js";
import { getGitTrackedFiles, getToolsByExtension, summary } from "../utils/helper.js";

/**
 * Lint files based on the configuration file
 * @param files - List of files to lint
 * @param config - Configuration object
 * @param options - CLI options
 */
export async function lintrc(
  files: string[],
  config: Config,
  options: LintRCOptions,
): Promise<void> {
  Printer.log("Running LintRC", "header");

  const spinner = Printer.spinner("Running linters...").start();

  const { ext = [] } = options;
  const toolResults: CommandResult[] = [];

  let filesToLint = files.length > 0 ? files : getGitTrackedFiles();
  filesToLint = filesToLint.filter(existsSync);
  const tools = getToolsByExtension(filesToLint, config, ext);

  if (Object.keys(tools).length === 0) {
    spinner.fail();
    Printer.error("No matching tools found. Skipping checks.");
    process.exit(1);
  }

  try {
    const results = await executeCommands(tools, spinner);
    spinner.succeed("Linting complete!");
    toolResults.push(...results);
    summary(toolResults);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    spinner.fail(`Error during execution: ${message}`);
    throw error;
  }
}
