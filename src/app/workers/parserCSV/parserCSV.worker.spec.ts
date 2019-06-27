import ParserCSV from 'worker-loader!./parserCSV.worker';
import { parseCSVworker } from './parserCSV.worker';

describe('ParserCSV Worker', () => {
  it('should...', done => {
    const filea = new File(['a,b,c\n1,2,3\n4,5,6'], 'example.csv', {
      type: 'text/csv'
    });

    const worker = new ParserCSV();
    parseCSVworker(worker);

    worker.postMessage({ file: filea, parserOptions: undefined });

    worker.addEventListener('message', e => {
      expect(e.data).toEqual({
        data: [['a', 'b', 'c'], ['1', '2', '3'], ['4', '5', '6']],
        meta: { delimiter: ',' }
      });
      done();
    });
  });
});
