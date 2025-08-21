import { existsSync } from 'fs';
import { Printer } from './logger.js';
import { execSync } from 'child_process';
import { CommandResult, Commands, Config } from '../types/types.js';

let cachedGitFiles: string[] | null = null;
const toolCache = new Map<string, boolean>();

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

  const commandsToCheck = [
    `npx ${tool} --no-install --version`,
    `command -v ${tool}`,
    `${tool} --version`
  ];

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
 * Retrieves the tools to lint the given files.
 * @param files - The files to lint
 * @param config - The configuration object
 * @param ext - The file extensions to lint
 * @returns The tools to lint the files
 */
export function getToolsByExtension(
  files: string[],
  config: Config,
  ext: string[]
): Commands {
  const TOOLS = config.TOOLS;
  const MAPPING = new Map(Object.entries(config.MAPPING));
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

  const formattedTools = Object.fromEntries(
    Object.entries(toolsToLint)
      .filter(([tool]) => TOOLS[tool])
      .map(([tool, fileList]) => {
        const filteredFiles = fileList.filter(
          (file) => !TOOLS[tool].ignoreFiles?.includes(file)
        );
        // If no files are found after filtering, add "." as a placeholder
        // This ensures the tool can still run without failing due to missing files
        if (filteredFiles.length === 0) filteredFiles.push('.');
        return [
          tool,
          {
            ...TOOLS[tool],
            files: TOOLS[tool].includeFiles === false ? [] : filteredFiles
          }
        ];
      })
  );

  return sortToolsByPriority(formattedTools);
}

/**
 * Prints the summary of the LintRC.
 * @param results - The results of the commands
 */
export function summary(results: CommandResult[]): void {
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
      warnings.push(`${title}: Issues found`);
    } else {
      errors.push(`${title}: Failed`);
    }
  });

  successes.forEach((success) => Printer.success(success));
  warnings.forEach((warning) => Printer.warning(warning));
  errors.forEach((error) => Printer.error(error));

  Printer.log('LintRC Summary', 'header');

  if (errors.length === 0) {
    Printer.log('LintRC completed successfully. Happy coding!', 'success');
    process.exit(0);
  } else {
    Printer.log('LintRC completed with errors.', 'error');
    process.exit(1);
  }
}
