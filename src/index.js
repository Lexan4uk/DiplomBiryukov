import Main_catalog from '@pages/Main_catalog';
import Addresses from '@pages/Addresses';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import reportWebVitals from './reportWebVitals';
import useAuth from '@scripts/custom_hooks/useAuth';
import { useState, useEffect } from 'react';
import { isUserFetchingState } from '@scripts/atoms/authState';



import '@fonts/fonts.scss'
import '@globalStyles/globals.scss';
import '@globalStyles/normalize.scss';



const ProcessAuth = (props) => {
  const [isUserFetching, setIsUserFetching] = useRecoilState(isUserFetchingState);

  const {
    initUser,
    isAuthorised
  } = useAuth();

  useEffect(() => {
    if (!isUserFetching && !isAuthorised) {
      setIsUserFetching(true)
      initUser()
      setIsUserFetching(false)
    }
  }, [isAuthorised, isUserFetching])

  return props.children
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ProcessAuth>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/catalog" />} />
            <Route path="/catalog" element={<Main_catalog />} />
            <Route path="/addresses" element={<Addresses />} />
          </Routes>
        </Router>
      </ProcessAuth>
    </RecoilRoot>
  </React.StrictMode>
);


reportWebVitals();
