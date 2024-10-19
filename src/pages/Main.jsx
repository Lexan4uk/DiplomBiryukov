import '@styles/pages/Main.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';




function Main() {
  

  return (
    <>
      <Header active={1} />
      <main className="main-catalog main-block">
        <button className='button' >Послать письмо</button>
      </main>
      <Footer />
    </>
  );
}

export default Main;
