import emailjs from 'emailjs-com';
import { v4 as uuidv4 } from 'uuid';

export const sendCode = (email) => {
    const generatedCode = uuidv4().slice(0, 8);
    
    const templateParams = {
        to_name: 'Пользователю',
        email_to: email,
        message: `Ваш код для проверки: ${generatedCode}`,
        reply_to: 'kurskflora@mail.ru',
    };

    emailjs.send('service_1k392fs', 'template_ar3mbq7', templateParams, 'I5q15VhPnkyKl8yWx')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    return generatedCode
}
