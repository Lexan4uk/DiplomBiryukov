import '@styles/pages/Main.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import emailjs from 'emailjs-com';
import { v4 as uuidv4 } from 'uuid';



function Main() {
  const buttonClick = () => {
    const randomCode = uuidv4().slice(0, 8); // Генерируем уникальный код (сокращаем до 10 символов)

    const templateParams = {
      to_name: 'Пользователю',
      email_to: "alkatras46rus@gmail.com",
      message: `Ваш код для проверки: ${randomCode}`, // Включаем код в сообщение
      reply_to: 'kurskflora@mail.ru',
    };

    emailjs.send('service_1k392fs', 'template_ar3mbq7', templateParams, 'I5q15VhPnkyKl8yWx')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <>
      <Header active={1} />
      <main className="main-catalog">
        <button className='button' onClick={buttonClick}>Послать письмо</button>
      </main>
      <Footer />
    </>
  );
}

export default Main;
