import { fileReader } from './fileReader';

describe('ParseCSV', () => {
  it('should convert csv without headers to json', async () => {
    const file = new File(['a,b,c\n1,2,3\n4,5,6'], 'example.csv', {
      type: 'text/csv'
    });

    const fileTxt = await fileReader(file);
    expect(fileTxt).toEqual('a,b,c\n1,2,3\n4,5,6');
  });
});
