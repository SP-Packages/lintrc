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

  const { ext = [] } = options;
  const toolResults: CommandResult[] = [];

  let filesToLint = files.length > 0 ? files : getGitTrackedFiles();
  filesToLint = filesToLint.filter(existsSync);
  const tools = getToolsByExtension(filesToLint, config, ext);

  if (Object.keys(tools).length === 0) {
    Printer.error("No matching tools found. Skipping checks.");
    process.exit(1);
  }

  const results = await executeCommands(tools);
  toolResults.push(...results);
  summary(toolResults);
}
