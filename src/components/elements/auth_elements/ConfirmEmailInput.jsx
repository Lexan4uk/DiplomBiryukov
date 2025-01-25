import '@styles/popups/AuthPopup.scss';
import { useForm, FormProvider } from "react-hook-form";
import { InputMask } from '@react-input/mask';
import { useEffect, useState, useRef } from 'react';
import { sendCode } from '@scripts/helpers/sendCode'

const ConfirmEmailInput = ({ setStep, setAuthData, authData, confirmType }) => {
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const { trigger, handleSubmit, formState: { errors }, register, setError, clearErrors } = methods;

    const validationRules = {
        required: "Код подтверждения обязателен",
        validate: {
            isFilled: (value) => {
                const cleanedValue = value.replace(/\s|_/g, '');
                return cleanedValue.length === 8 || "Заполните поле кода!";
            }
        }
    };
    const [generatedCode, setGeneratedCode] = useState('');
    const isCodeSent = useRef(false); // Флаг для контроля отправки кода

    useEffect(() => {
        if (authData.email && !isCodeSent.current) {
            const code = sendCode(authData.email);
            setGeneratedCode(code);
            isCodeSent.current = true; // Устанавливаем флаг, чтобы предотвратить повторную отправку
        }
    }, [authData.email]);

    const handleSaveClick = async () => {
        clearErrors('verCode');
        const isValid = await trigger();
        if (isValid) {
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = async (data) => {

        const cleanedCode = data.verCode.replace(/\s|_/g, '');
        console.log(generatedCode)
        if (cleanedCode === generatedCode) {
            console.log(confirmType)
            setAuthData({ email: authData.email })
            switch (confirmType) {
                case ("confirmReg"):
                    setStep("regPassword")
                    return
                case ("forgotPassword"):
                    setStep("newPassword")
                    return
                default:
                    return
            }
        }
        else {
            setError("verCode", {
                message: "Неверный код!"
            });
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="auth-popup__input-block f-column gap-10">
                <h3 className="auth-popup__undertitle title-s">Введите код подтверждения, пришедший на Ваш email</h3>
                <div className="auth-popup__input-holder auth-popup__input-holder_code f-row">
                    <InputMask
                        mask='_ _ _ _ _ _ _ _'
                        showMask={true}
                        {...register("verCode", validationRules)}
                        className="auth-popup__input text-m"
                        type="text"
                        replacement={{ _: /[A-Za-zА-Яа-я0-9]/ }}

                    />
                </div>
                {errors["verCode"] && <span className="auth-popup__error text-m text-red">{errors["verCode"].message}</span>}
                <button className={`auth-popup__sumbit-button profile-button`} onClick={handleSaveClick}>Далее</button>
                <button className='auth-popup__back-button simple-button text-green' onClick={() => setStep('email')}>Вернуться</button>
            </div>
        </FormProvider>
    );
};
export default ConfirmEmailInput