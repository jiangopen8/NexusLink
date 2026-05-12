export class CLIError extends Error {
  constructor(
    message: string,
    public code: string,
    public exitCode: number = 1,
  ) { super(message); this.name = 'CLIError'; }
}

export function handleError(err: unknown, verbose = false): void {
  if (err instanceof CLIError) {
    console.error(`Error [${err.code}]: ${err.message}`);
    process.exit(err.exitCode);
  }
  if (verbose && err instanceof Error) {
    console.error(err.stack);
  } else {
    console.error(`Error: ${(err as Error)?.message ?? String(err)}`);
  }
  process.exit(1);
}
