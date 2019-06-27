import React from 'react';

import { Clock } from './components/Clock/Clock';
import { FileUpload } from './components/FileUpload/FileUpload';

import { Parsed } from './utils/parserCSV/ParserCSV.types';

import style from './App.module.css';

const App: React.FC = () => {
  const onFileLoaded = (parsedData: Parsed) => {
    console.log(parsedData);
  };

  return (
    <div className={style.app}>
      <Clock />
      <FileUpload onFileLoaded={onFileLoaded} />
    </div>
  );
};

export default App;
