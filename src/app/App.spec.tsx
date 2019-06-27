import React from 'react';
import {
  render,
  wait,
  waitForElement,
  fireEvent
} from '@testing-library/react';
import App from './App';

const dateNowStub = jest.fn();
global.Date.now = dateNowStub;

dateNowStub.mockReturnValue(1561060800000);

it('renders without crashing', async () => {
  //const onFileLoadedFn = jest.fn();

  const { getByText, getByLabelText } = render(<App />);

  await waitForElement(() => getByText('22:00:00'));

  const fileInputField = getByLabelText('Parse CSV File');

  const file = new File(['a,b,c\n1,2,3\n4,5,6'], 'example.csv', {
    type: 'text/csv'
  });

  fireEvent.change(fileInputField, { target: { files: [file] } });

  //await wait(() => expect(onFileLoadedFn).toHaveBeenCalled());
});
