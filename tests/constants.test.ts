import { describe, it, expect } from 'vitest';
import { DEFAULT_CONFIG } from '../src/constants.js';

describe('DEFAULT_CONFIG', () => {
  it('should have the correct structure', () => {
    expect(DEFAULT_CONFIG).toHaveProperty('TOOLS');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('COMMITLINT');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('CSPELL');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('ESLINT');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('MARKDOWNLINT');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('PHPCBF');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('PHPCS');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('PHPCSFIXER');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('PHPSTAN');
    expect(DEFAULT_CONFIG.TOOLS).toHaveProperty('PRETTIER');
  });
});
