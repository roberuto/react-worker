export type HedersData = {
  [key: string]: string;
};

export type ParserOptions = {
  delimiter?: string;
  headers?: boolean;
};

export type Parsed = {
  data: string[][] | HedersData[];
  meta: {
    delimiter: string;
    headers?: string[];
  };
};
