import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 30000,
    include: ['packages/*/src/**/*.test.ts', 'src/**/*.test.ts'],
    exclude: ['node_modules', 'dist', '.worktrees', '.codex-check'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['packages/*/src/**/*.ts'],
      exclude: [
        'packages/*/src/**/*.test.ts',
        'packages/*/src/index.ts',
        'packages/cli/src/**',
        'packages/marketplace/src/server.ts',
        'packages/*/src/types.ts',
      ],
    },
  },
});
