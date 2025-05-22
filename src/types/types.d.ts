export type Command = {
  title: string;
  command: string;
  type: 'composer' | 'npm';
  behavior: 'warn' | 'error';
  requires?: string;
  args?: string[];
  files?: string[];
  includeFiles?: boolean;
  ignoreFiles?: string[];
  priority?: number;
};

export type Commands = Record<string, Command>;

export type CommandResult = {
  title: string;
  status: 'success' | 'warning' | 'error';
  output: string;
};

export type LintRCOptions = {
  ext?: string[];
  config?: string;
  quiet?: boolean;
  verbose?: boolean;
};

interface Mapping {
  [key: string]: string[];
}

export interface Config {
  TOOLS: Commands;
  MAPPING: Mapping;
}
