import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';

import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('should call onLoad with correct data', async () => {
    const onFileLoadedFn = jest.fn();

    const { getByLabelText } = render(
      <FileUpload onFileLoaded={onFileLoadedFn} />
    );

    const file = new File(['a,b,c\n1,2,3\n4,5,6'], 'example.csv', {
      type: 'text/csv'
    });

    const fileInputField = getByLabelText('Parse CSV File');

    fireEvent.change(fileInputField, { target: { files: [file] } });

    await wait(() => expect(onFileLoadedFn).toHaveBeenCalled());
  });
  it('should not call onLoad for empty data', async () => {
    const onFileLoadedFn = jest.fn();

    const { getByLabelText } = render(
      <FileUpload onFileLoaded={onFileLoadedFn} />
    );

    const fileInputField = getByLabelText('Parse CSV File');

    fireEvent.change(fileInputField, { target: { files: [] } });

    await wait(() => expect(onFileLoadedFn).not.toHaveBeenCalled());
  });
});
