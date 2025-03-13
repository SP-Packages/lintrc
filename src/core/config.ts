import fs from "fs";
import path from "path";
import { Config } from "../types/types.js";
import { createInterface } from "readline";
import { Printer } from "../utils/logger.js";
import { existsSync, writeFileSync } from "fs";
import { DEFAULT_CONFIG } from "../constants.js";

/**
 * Asynchronously ask a question in the console.
 * @param query - The question to ask
 * @returns The user's answer
 */
function askQuestion(query: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    }),
  );
}

/**
 * Read the configuration file.
 * @param configPath - Path to the configuration file
 * @returns The configuration object
 */
export async function readConfig(configPath?: string): Promise<Config> {
  const defaultConfigFile = ".lintrc.json";
  let resolvedPath = configPath ? path.resolve(configPath) : path.resolve(defaultConfigFile);

  if (!existsSync(resolvedPath)) {
    Printer.error(`Config file not found at: ${resolvedPath}`);
    Printer.error(
      `Please create a "${defaultConfigFile}" or specify a config file with --config <path>`,
    );
    const response = await askQuestion(
      `Generate a default ${defaultConfigFile} and proceed? (y/n) `,
    );
    if (response === "y") {
      writeFileSync(defaultConfigFile, JSON.stringify(DEFAULT_CONFIG));
      resolvedPath = path.resolve(defaultConfigFile);
    } else {
      process.exit(1);
    }
  }

  try {
    const configData = fs.readFileSync(resolvedPath, "utf-8");
    return JSON.parse(configData);
  } catch (error: unknown) {
    Printer.error(`Error reading config file: ${resolvedPath}`, error);
    process.exit(1);
  }
}
