/* eslint-disable tsdoc/syntax */
import { existsSync } from 'fs';
import { Printer } from './logger.js';
import { execSync } from 'child_process';
import { CommandResult, Commands, Config } from '../types/types.js';

type ComposerCommand = {
  name: string;
  aliases?: string[];
};

type ComposerList = {
  commands: ComposerCommand[];
};

type NpmCommandInfo = {
  description?: string;
  aliases?: string[];
};

type NpmHelp = {
  commands: Record<string, NpmCommandInfo>;
};

/**
 * Checks if the given object is a ComposerList.
 * @param obj - The object to check
 * @returns True if the object is a ComposerList, false otherwise
 */
function isComposerList(obj: unknown): obj is ComposerList {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray((obj as { commands?: unknown }).commands)
  );
}

/**
 * Checks if the given object is an NpmHelp.
 * @param obj - The object to check
 * @returns True if the object is an NpmHelp, false otherwise
 */
function isNpmHelp(obj: unknown): obj is NpmHelp {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'commands' in obj &&
    typeof (obj as { commands?: unknown }).commands === 'object'
  );
}

/**
 * Cache for tool availability checks to avoid redundant filesystem checks.
 * Keyed by tool name or type:toolName.
 */
const toolCache = new Map<string, boolean>();

/**
 * Cache for Git-tracked files to avoid redundant Git commands.
 * Initialized as null to indicate no files cached yet.
 */
let cachedGitFiles: string[] | null = null;

/**
 * Checks if the given tool is available in the system.
 * @param tool - The tool to check for
 * @param type - Optional type (e.g., "npm", "composer") to ensure the correct tool is checked
 * @returns True if the tool is available, false otherwise
 */
export function isToolAvailable(
  tool: string,
  type?: 'npm' | 'composer'
): boolean {
  const cacheKey = type ? `${type}:${tool}` : tool;
  if (toolCache.has(cacheKey)) return toolCache.get(cacheKey)!;

  const pathsToCheck: string[] = [];

  // Composer local bin
  if (!type || type === 'composer') {
    pathsToCheck.push(`vendor/bin/${tool}`);
  }

  // NPM local bin
  if (!type || type === 'npm') {
    pathsToCheck.push(`node_modules/.bin/${tool}`);
  }

  // Common system-wide paths
  pathsToCheck.push(`/usr/local/bin/${tool}`, `/usr/bin/${tool}`);

  // NPM global bin
  if (!type || type === 'npm') {
    try {
      const npmGlobalBin = execSync('npm bin -g', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore']
      }).trim();
      pathsToCheck.push(`${npmGlobalBin}/${tool}`);
    } catch {
      // ignore if npm not available
    }
  }

  // Check filesystem paths
  for (const path of pathsToCheck) {
    if (existsSync(path)) {
      toolCache.set(cacheKey, true);
      return true;
    }
  }

  const commandsToCheck: string[] = [];

  // NPM subcommands
  if (!type || type === 'npm') {
    try {
      const output = execSync('npm help --json', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore']
      });
      const parsed: unknown = JSON.parse(output);

      if (isNpmHelp(parsed)) {
        for (const [name, info] of Object.entries(parsed.commands)) {
          if (name === tool || info.aliases?.includes(tool)) {
            toolCache.set(cacheKey, true);
            return true;
          }
        }
      }
    } catch {
      // fallback
      commandsToCheck.push(
        `npx ${tool} --no-install --version`,
        `npm ${tool} --version`
      );
    }
  }

  // Composer subcommands
  if (!type || type === 'composer') {
    try {
      const output = execSync('composer list --format=json', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore']
      });
      const parsed: unknown = JSON.parse(output);

      if (isComposerList(parsed)) {
        if (
          parsed.commands.some(
            (cmd) => cmd.name === tool || cmd.aliases?.includes(tool)
          )
        ) {
          toolCache.set(cacheKey, true);
          return true;
        }
      }
    } catch {
      // fallback
      commandsToCheck.push(`composer ${tool}`);
    }
  }

  // Generic fallbacks
  commandsToCheck.push(`command -v ${tool}`, `${tool} --version`);

  for (const cmd of commandsToCheck) {
    try {
      execSync(cmd, { stdio: 'ignore' });
      toolCache.set(cacheKey, true);
      return true;
    } catch {
      continue;
    }
  }

  toolCache.set(cacheKey, false);
  return false;
}

/**
 * Retrieves the Git-tracked files in the repository.
 * @returns The list of Git-tracked files
 */
export function getGitTrackedFiles(): string[] {
  if (cachedGitFiles) return cachedGitFiles;

  try {
    const output = execSync(
      'git ls-files --exclude-standard --others --cached',
      {
        encoding: 'utf8'
      }
    );
    cachedGitFiles = output.split('\n').filter(Boolean);
    return cachedGitFiles;
  } catch {
    Printer.error('Failed to retrieve Git-tracked files');

    return [];
  }
}

/**
 * Sorts the tools by priority.
 * @param tools - The tools to sort
 * @returns The sorted tools
 */
function sortToolsByPriority(tools: Commands): Commands {
  // Sort tools by priority and maintain the order of files within each tool
  const sortedTools = Object.entries(tools)
    .sort(
      ([, toolA], [, toolB]) =>
        (toolA.priority ?? Number.MAX_SAFE_INTEGER) -
        (toolB.priority ?? Number.MAX_SAFE_INTEGER)
    )
    .map(([tool, lintTool]) => [
      tool,
      { ...lintTool, files: (lintTool.files ?? []).sort() }
    ]);

  return Object.fromEntries(sortedTools);
}

/**
 * Filters the available tools based on the provided options.
 * @param tools - The tools to filter
 * @param options - Options to skip certain tools:
 * - `skipComposer`: If true, composer tool will be skipped. (default: false)
 * - `skipNpm`: If true, npm tool will be skipped. (default: false)
 * @param options.skipComposer
 * @param options.skipNpm
 * @param options.skipComposer
 * @param options.skipNpm
 * @returns Filtered commands object with only available tools
 */
function filterAvailableTools(
  tools: Commands,
  options: { skipComposer?: boolean; skipNpm?: boolean } = {}
): Commands {
  const { skipComposer = false, skipNpm = false } = options;

  const toolChecks = [
    { type: 'composer', skipFlag: skipComposer, file: 'composer.json' },
    { type: 'npm', skipFlag: skipNpm, file: 'package.json' }
  ];

  return Object.fromEntries(
    Object.entries(tools).filter(([, tool]) => {
      const check = toolChecks.find((c) => c.type === tool.type);
      if (check) {
        if (
          check.skipFlag ||
          !isToolAvailable(check.type) ||
          !existsSync(check.file)
        ) {
          return false;
        }
      }
      return true;
    })
  );
}

/**
 * Build tool commands based on file extensions and config mappings.
 *
 * @param files - List of files to analyze.
 * @param config - Config object containing TOOLS and MAPPING.
 * @param ext - List of file extensions to filter against. Empty means "all".
 * @param options - Optional flags to skip certain tools:
 * - `skipComposer`: If true, composer tool will be skipped. (default: false)
 * - `skipNpm`: If true, npm tool will be skipped. (default: false)
 * @param options.skipComposer
 * @param options.skipNpm
 * @param options.skipComposer
 * @param options.skipNpm
 * @returns Commands object with filtered tools and their assigned files.
 */
export function getToolsByExtension(
  files: string[],
  config: Config,
  ext: string[],
  options: { skipComposer?: boolean; skipNpm?: boolean } = {}
): Commands {
  const MAPPING = new Map(Object.entries(config.MAPPING));

  // Map files to tools based on extension
  const toolsToLint = files.reduce(
    (group, file) => {
      const extension = file.split('.').pop() || '';

      if (ext.length === 0 || ext.includes(extension)) {
        const tools = MAPPING.get(extension) || [];
        tools.forEach((tool) => {
          (group[tool] ||= []).push(file);
        });
      }

      if (ext.length === 0 || ext.includes('*')) {
        const tools = MAPPING.get('*') || [];
        tools.forEach((tool) => {
          (group[tool] ||= []).push(file);
        });
      }

      return group;
    },
    {} as Record<string, string[]>
  );

  // Filter out unavailable tools
  const availableTools = filterAvailableTools(config.TOOLS, options);

  // Build formatted tools
  const formattedTools = Object.fromEntries(
    Object.entries(toolsToLint)
      .filter(([tool]) => availableTools[tool])
      .map(([tool, fileList]) => {
        const def = availableTools[tool];
        const filteredFiles = fileList.filter(
          (file) => !def.ignoreFiles?.includes(file)
        );
        // If no files are found after filtering, add "." as a placeholder
        // This ensures the tool can still run without failing due to missing files
        if (filteredFiles.length === 0) filteredFiles.push('.');
        return [
          tool,
          {
            ...def,
            files: def.includeFiles === false ? [] : filteredFiles
          }
        ];
      })
  );

  return sortToolsByPriority(formattedTools);
}

/**
 * Prints the summary of the LintRC.
 * @param results - The results of the commands
 * @param strict - If true, treat warnings as errors
 */
export function summary(results: CommandResult[], strict = false): void {
  if (Printer.isVerbose) {
    Printer.log('LintRC Results', 'subheader');
  } else {
    Printer.plainSubheader('LintRC Results');
  }

  const successes: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  results.forEach(({ title, status }) => {
    if (status === 'success') {
      successes.push(`${title}: Passed`);
    } else if (status === 'warning') {
      warnings.push(`${title}: Warning`);
    } else {
      errors.push(` ${title}: Failed`);
    }
  });

  successes.forEach((success) => Printer.success(success));
  warnings.forEach((warning) => Printer.warning(warning));
  errors.forEach((error) => Printer.error(error));

  Printer.log('LintRC Summary', 'header');

  if (errors.length === 0 && (!strict || warnings.length === 0)) {
    Printer.log('LintRC completed successfully. Happy coding!', 'success');
    process.exit(0);
  } else if (errors.length === 0 && strict && warnings.length > 0) {
    Printer.log('LintRC completed with warnings (strict mode).', 'error');
    process.exit(1);
  } else {
    Printer.log('LintRC completed with errors.', 'error');
    process.exit(1);
  }
}
