import '@styles/pages/Main_catalog.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BoquetMain from '@components/page_elements/main_elements/BoquetMain'

function Main_catalog() {

  return (
    <>
      <Header active={1} />
      <main className="main-catalog">
        <div className="main-catalog__content-holder main-block block-normalizer f-column gap-16">
          <BoquetMain />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main_catalog;
