import { ParserCSV } from '../../utils/parserCSV/ParserCSV';
import { fileReader } from '../../utils/fileaReader/fileReader';

function parseCSVworker(context: Worker) {
  const worker = context;

  worker.addEventListener('message', event => {
    const { file, parserOptions } = event.data;

    if (file && file instanceof File) {
      fileReader(file).then(result => {
        if (typeof result === 'string') {
          const parsedData = ParserCSV.parse(result, parserOptions);

          worker.postMessage(parsedData);
        }
      });
    }
  });
}

(function(context: Worker | Window) {
  if ('importScripts' in context) {
    parseCSVworker(context);
  }
})(self);

export { parseCSVworker };
