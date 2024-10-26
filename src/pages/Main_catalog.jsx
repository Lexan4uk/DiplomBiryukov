import '@styles/pages/Main_catalog.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BoquetMain from '@components/page_elements/main_elements/BoquetMain'
import ConstructorMain from '@components/page_elements/main_elements/ConstructorMain'

import { useState } from 'react';
import useSWR from 'swr';

import { simpleGet, apiTags } from '@api/simpleGet'




function Main_catalog() {
  const [mode, setMode] = useState('boquet')

  return (
    <>
      <Header active={1} />
      <main className="main-catalog">
        <div className="main-catalog__content-holder main-block block-normalizer f-column gap-16">
          <div className="main-catalog__switcher-holder gap-10">
            <button className={`main-catalog__switcher-button profile-button ${mode === "boquet" && 'button-inactive'}`} onClick={() => setMode('boquet')}>Выбор букета</button>
            <button className={`main-catalog__switcher-button profile-button ${mode === "constructor" && 'button-inactive'}`} onClick={() => setMode('constructor')}>Конструктор букета</button>
          </div>
          {mode  === "boquet" ? <BoquetMain /> : <ConstructorMain />}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main_catalog;
