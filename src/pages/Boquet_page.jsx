import '@styles/pages/Boquet_page.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BoquetActionCard from '@components/page_elements/boquet_elements/BoquetActionCard';

import { useState } from 'react';
import useSWR from 'swr';
import { simpleGet, apiTags } from '@api/simpleGet'
import { useParams } from 'react-router-dom';
import React from 'react';
import getSvg from '@images/svg'
import useCart from '@scripts/custom_hooks/useCart';




function Boquet_page() {
  const { link } = useParams();
  const { data: bData, error: bError, isLoading: bIsLoading } = useSWR(apiTags.getBoquetByLink(link), simpleGet);

  const {
    mini_plus,
    mini_minus
  } = getSvg()
  const {
    addToCart
  } = useCart()
  const [count, setCount] = useState(1);
  return (
    <>
      <Header active={0} />
      <main className="boquet-page boquet-page_props block-normalizer main-block">
        <section className='boquet-page__main f-column'>
          <div className="boquet-page__content-holder gap-16">
            <div className='boquet-page__img-holder'>
              <img className='boquet-page__img' src={bData?.cover} alt="boquet" />
            </div>
            <div className="boquet-page__content f-column gap-16">
              <h1 className='boquet-page__title title-l'>«{bData?.name}»</h1>
              {bData?.promo ? (
                <div className="boquet-page__boquet-promo-holder f-row">
                  <div className="boquet-page__boquet-price-holder f-row gap-10">
                    <h2 className="boquet-page__boquet-price title-l text-green">{`${bData?.price} руб`}</h2>
                    <h2 className="boquet-page__boquet-price title-s text-inactive">{`${bData?.oldPrice}`}</h2>
                  </div>
                  <BoquetActionCard />
                </div>
              ) : (
                <h2 className="boquet-page__boquet-price title-l text-green">{`${bData?.price} руб`}</h2>
              )}
              <div className="boquet-page__cart-block f-row gap-16">
                <div className="boquet-page__counter-holder f-row">
                  <button className='boquet-page__counter-button boquet-page__counter-button_left simple-button' onClick={() => count > 1 && setCount(count - 1)}>{mini_minus()}</button>
                  <input className='boquet-page__counter text-xl' readOnly value={count} type="number" />
                  <button className='boquet-page__counter-button boquet-page__counter-button_right simple-button' onClick={() => count < 99 && setCount(count + 1)}>{mini_plus()}</button>
                </div>
                <button className='boquet-page__cart-add profile-button profile-button' onClick={() => addToCart(bData.price, count, bData.id, bData.name, bData.cover)}>В корзину</button>
              </div>
              <span className='boquet-page__description text-menu'>{bData?.description}</span>
              <div className="boquet-page__composition-holder f-column">
                <h2 className='boquet-page__composition-element title-m'>Состав:</h2>
                {bData?.composition?.split('\\n').map((line, index) => (
                  <React.Fragment key={index}>
                    <span className='boquet-page__composition-element text-l'>{line}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Boquet_page;
