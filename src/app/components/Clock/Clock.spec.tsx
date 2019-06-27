import React from 'react';
import { render, wait, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Clock } from './Clock';

const dateNowStub = jest.fn();
global.Date.now = dateNowStub;

dateNowStub
  .mockReturnValueOnce(1561060800000)
  .mockReturnValueOnce(1561064400000);

describe('Clock', () => {
  it('should render correctly', async () => {
    jest.useFakeTimers();

    const firstTime = '22:00:00';
    const secondTime = '23:00:00';

    const { getByText, queryByText } = render(<Clock />);

    await waitForElement(() => getByText(firstTime));
    await wait(() => expect(queryByText(firstTime)).not.toBeNull());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await wait(() => expect(queryByText(secondTime)).not.toBeNull());
  });
});
