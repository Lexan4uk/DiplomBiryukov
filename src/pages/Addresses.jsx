import '@styles/pages/Addresses.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import OfficeAdress from '@components/page_elements/adresses_elements/OfficeAdress'
import useSWR from 'swr';
import { simpleGet, apiTags } from '@api/simpleGet'




function Addresses() {
  const { data: addresses, error: adError, isLoading: adIsLoading } = useSWR(apiTags.getAddresses, simpleGet);

  if (!adIsLoading) {
    addresses.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      <Header active={3} />
      <main className="addresses block-normalizer main-block">
        <div className="addresses__content-holder f-column gap-16">
          <div className="addresses__offices-block f-column gap-10">
            <h2 className="addresses__offices-title title-l">Точки продажи</h2>
            <p className="addresses__office-text text-l">Наш магазин располагает несколькими точками продажи цветов в Курске. Вы можете сами прийти туда и в очном формате заказать или собрать букет. У нас всегда есть свежие цветы и разнообразные композиции на любой вкус. Мы рады помочь вам создать идеальный букет для любого повода!
              <br /><br />Наши точки продажи:
            </p>
            <div className="addresses__offices-holder f-column gap-10">
              {addresses?.map((address) => (
                <OfficeAdress key={address.id} data={address} />
              ))}
              <div className="addresses__map-holder">
                <iframe className="addresses__map" src="https://yandex.ru/map-widget/v1/?um=constructor%3Acd50cc691969efc7d52cb6ae65735025ef0a27bcd3058f822962df6163682c77&amp;source=constructor" frameBorder="0"></iframe>
              </div>
            </div>
          </div>
          <div className="addresses__delivery-block f-column gap-10">
            <h2 className="addresses__delivery-title title-l">Доставка</h2>
            <p className="addresses__delivery-text text-l">Служба доставки компании осуществляет доставку цветов и букетов в любое удобное для Вас время 365 дней в году, мы работаем без выходных и праздников. Мы готовы нести красоту и радость каждому, кто обратится к нам.</p>
            <p className="addresses__delivery-text text-l">Оформить срочную или обычную заявку на доставку букета можно телефону, ежедневно с 9-00 до 21-00. Если стоимость заказа не менее 5000 рублей — доставка цветов бесплатная.</p>
            <h3 className="addresses__delivery-text title-s">Стоимость доставки заказа в пределах г. Курск:</h3>
            <div className="addresses__delivery-grid">
              <span className="addresses__delivery-grid-header address__delivery-grid-element title-s">Время доставки</span>
              <span className="addresses__delivery-grid-header address__delivery-grid-element title-s">Сумма заказа от 5000 ₽</span>
              <span className="addresses__delivery-grid-header address__delivery-grid-element title-s">Сумма заказа до 5000 ₽</span>

              <span className="addresses__delivery-grid-element text-l">Более 3 (трех) часов</span>
              <span className="addresses__delivery-grid-element text-l">БЕСПЛАТНО</span>
              <span className="addresses__delivery-grid-element text-l">500 ₽</span>
              
              <span className="addresses__delivery-grid-element text-l">Срочная от 1-3 часов</span>
              <span className="addresses__delivery-grid-element text-l">800 ₽</span>
              <span className="addresses__delivery-grid-element text-l">800 ₽</span>

              <span className="addresses__delivery-grid-element text-l">К определенному времени</span>
              <span className="addresses__delivery-grid-element text-l">800 ₽</span>
              <span className="addresses__delivery-grid-element text-l">800 ₽</span>

              <span className="addresses__delivery-grid-element text-l">Доставка ночью</span>
              <span className="addresses__delivery-grid-element text-l">1000 ₽</span>
              <span className="addresses__delivery-grid-element text-l">1000 ₽</span>
            </div>
            <p className="addresses__delivery-text text-l">Доставка в пределах Курской области: 50 руб. за км.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Addresses;
