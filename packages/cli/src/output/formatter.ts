import Table from 'cli-table3';
import yaml from 'yaml';

export type OutputFormat = 'table' | 'json' | 'yaml' | 'quiet';

export class OutputFormatter {
  constructor(private format: OutputFormat, private color: boolean) {}

  configure(format: OutputFormat, color = this.color): void {
    this.format = format;
    this.color = color;
  }

  table(headers: string[], rows: string[][]): void {
    if (this.format === 'quiet') {
      if (rows[0]?.[0]) process.stdout.write(rows[0][0] + '\n');
      return;
    }
    if (this.format === 'json') {
      console.log(JSON.stringify({ headers, rows }, null, 2));
      return;
    }
    if (this.format === 'yaml') {
      console.log(yaml.stringify({ headers, rows }));
      return;
    }
    const table = new Table({ head: headers });
    table.push(...rows);
    console.log(table.toString());
  }

  json(data: unknown): void {
    if (this.format === 'quiet') {
      if (typeof data === 'object' && data !== null) {
        const vals = Object.values(data as Record<string, unknown>);
        if (vals[0] !== undefined) process.stdout.write(String(vals[0]) + '\n');
      }
      return;
    }
    console.log(JSON.stringify(data, null, 2));
  }

  success(message: string): void {
    console.log(message);
  }

  info(message: string): void {
    if (this.format === 'json') {
      console.log(JSON.stringify({ message }, null, 2));
      return;
    }
    if (this.format === 'yaml') {
      console.log(yaml.stringify({ message }));
      return;
    }
    if (this.format === 'quiet') {
      process.stdout.write(message + '\n');
      return;
    }
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
