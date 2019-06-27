import { Parsed } from '../../utils/parserCSV/ParserCSV.types';

export type Props = {
  onFileLoaded: (parsed: Parsed) => void;
  parserOptions?: any;
};
