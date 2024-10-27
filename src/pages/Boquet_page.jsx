import '@styles/pages/Boquet_page.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';

import { useState } from 'react';
import useSWR from 'swr';
import { simpleGet, apiTags } from '@api/simpleGet'
import { useParams } from 'react-router-dom';




function Boquet_page() {
    const { link } = useParams();
    const { data: bData, error : bError, isLoading: bIsLoading  } = useSWR(apiTags.getBoquetByLink(link), simpleGet);
    if (!bIsLoading)
        console.log(bData)
  return (
    <>
      <Header active={1} />
      <main className="boquet-page">
        
      </main>
      <Footer />
    </>
  );
}

export default Boquet_page;
