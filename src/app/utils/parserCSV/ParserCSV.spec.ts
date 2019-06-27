import { ParserCSV } from './ParserCSV';

const csvWithEmptyLine = 'a,b,c\n1,2,3\n4,5,6\n';
const csvWithoutEmptyLine = 'a,b,c\n1,2,3\n4,5,6\n';
const csvWithEmptyFirstLine = '\na,b,c\n1,2,3\n4,5,6';

describe('ParseCSV', () => {
  it('should convert csv without headers to json', () => {
    const result = {
      data: [['a', 'b', 'c'], ['1', '2', '3'], ['4', '5', '6']],
      meta: {
        delimiter: ','
      }
    };

    expect(ParserCSV.parse(csvWithEmptyLine)).toEqual(result);
    expect(ParserCSV.parse(csvWithoutEmptyLine)).toEqual(result);
    expect(ParserCSV.parse(csvWithEmptyFirstLine)).toEqual(result);
  });
  it('should convert csv with headers to json', () => {
    const result = {
      data: [{ a: '1', b: '2', c: '3' }, { a: '4', b: '5', c: '6' }],
      meta: {
        delimiter: ',',
        headers: ['a', 'b', 'c']
      }
    };

    expect(ParserCSV.parse(csvWithEmptyLine, { headers: true })).toEqual(
      result
    );
    expect(ParserCSV.parse(csvWithoutEmptyLine, { headers: true })).toEqual(
      result
    );
    expect(ParserCSV.parse(csvWithEmptyFirstLine, { headers: true })).toEqual(
      result
    );
  });
});
