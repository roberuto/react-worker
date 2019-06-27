import React, { useState } from 'react';

import { useInterval } from '../../hooks/useInterval';

import styles from './Clock.module.css';

export const Clock = () => {
  const [date, setDate] = useState(new Date(Date.now()));

  const tick = () => {
    setDate(new Date(Date.now()));
  };

  useInterval(tick, 1000);

  const checkTime = (value: number) => {
    return value < 10 ? '0' + value : value;
  };

  const convertDateToTime = () => {
    const H = date.getHours();
    const M = checkTime(date.getMinutes());
    const S = checkTime(date.getSeconds());

    return `${H}:${M}:${S}`;
  };

  return <div className={styles.clock}>{convertDateToTime()}</div>;
};
