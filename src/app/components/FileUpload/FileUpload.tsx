import React, { useState, useEffect, useRef, useCallback } from 'react';

//eslint-disable-next-line
import ParserWorker from 'worker-loader!../../workers/parserCSV/parserCSV.worker';

import styles from './FileUpload.module.css';

import { Props } from './FileUpload.types';

export const FileUpload = ({ onFileLoaded, parserOptions }: Props) => {
  const [fileName, setFileName] = useState('Parse CSV File');
  const [parsing, setParsingStatus] = useState(false);
  const parseWorker = useRef<Worker>();
  const setParsedData = useCallback(
    event => {
      setParsingStatus(false);
      onFileLoaded(event.data);
    },
    [onFileLoaded]
  );

  useEffect(() => {
    parseWorker.current = new ParserWorker();
    parseWorker.current.addEventListener('message', setParsedData);
    return () => {
      if (parseWorker && parseWorker.current) {
        parseWorker.current.removeEventListener('message', setParsedData);
      }
    };
  }, [setParsedData]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || (files && !files.length)) {
      setFileName('Parse CSV File');
      return;
    }

    const file = files[0];

    setFileName(file.name);
    setParsingStatus(true);

    if (parseWorker && parseWorker.current) {
      parseWorker.current.postMessage({ file, parserOptions });
    }
  };

  return (
    <div className={styles.uploader}>
      <label
        htmlFor="csv-loader"
        className={`${parsing ? styles['disabled'] : ''}`}
      >
        {fileName}
        {parsing && <span className={styles.loader} />}
      </label>
      <span className={`${styles.button} ${parsing ? styles['disabled'] : ''}`}>
        Select
      </span>
      <input
        id="csv-loader"
        type="file"
        accept=".csv"
        name="csv-loader"
        disabled={parsing}
        onChange={onChange}
      />
    </div>
  );
};
