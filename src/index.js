import Main from '@pages/Main';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import reportWebVitals from './reportWebVitals';


import '@fonts/fonts.scss'
import '@globalStyles/globals.scss';
import '@globalStyles/mixins.scss';
import '@globalStyles/normalize.scss';
import '@globalStyles/variables.scss';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
        <Router>
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    </RecoilRoot>
  </React.StrictMode>
);


reportWebVitals();
