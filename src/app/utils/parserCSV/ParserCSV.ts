import { HedersData, ParserOptions, Parsed } from './ParserCSV.types';

import { DEFAULT_OPTIONS } from './ParserCSV.const';

export class ParserCSV {
  static parse(data: string, options?: ParserOptions): Parsed {
    const opt = { ...DEFAULT_OPTIONS, ...options };

    const lines = data.split(/\r?\n|\r/);

    const result: string[][] = [];
    const resultWithHeaders: HedersData[] = [];

    let headers: string[] | null = null;
    if (opt.headers) {
      lines.forEach(line => {
        if (line.length) {
          if (headers) {
            const lineWithHeaders: HedersData = {};

            const values = line.split(opt.delimiter);
            values.forEach((value, valueIdx) => {
              if (headers && headers[valueIdx]) {
                lineWithHeaders[headers[valueIdx]] = value;
              }
            });
            resultWithHeaders.push(lineWithHeaders);
          }

          if (!headers) {
            headers = line.split(opt.delimiter);
          }
        }
      });
    } else {
      lines.forEach(line => {
        if (line.length) {
          result.push(line.split(opt.delimiter));
        }
      });
    }

    return {
      data: headers ? resultWithHeaders : result,
      meta: {
        delimiter: opt.delimiter,
        ...(headers ? { headers } : {})
      }
    };
  }
}
