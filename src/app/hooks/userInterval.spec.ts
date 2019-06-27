import { renderHook } from '@testing-library/react-hooks';

import { useInterval } from './useInterval';

jest.useFakeTimers();

describe('useInterval', () => {
  it('should call calback function after delayed time', () => {
    const cb = jest.fn();
    const delay = 1000;

    renderHook(() => useInterval(cb, delay));

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);

    expect(cb).toHaveBeenCalled();
  });
  it('should call setInterval with delay time', () => {
    const mockSetInterval = jest.fn();
    const delay = 1000;

    global.setInterval = mockSetInterval;

    renderHook(() => useInterval(jest.fn(), delay));

    expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), delay);
  });
  it('should not call setInterval with delay eq to null', () => {
    const mockSetInterval = jest.fn();
    const delay = null;

    global.setInterval = mockSetInterval;

    renderHook(() => useInterval(jest.fn(), delay));

    expect(mockSetInterval).not.toHaveBeenCalled();
  });
});
