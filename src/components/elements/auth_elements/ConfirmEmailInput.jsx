import '@styles/popups/AuthPopup.scss';
import { useForm, FormProvider } from "react-hook-form";
import { InputMask } from '@react-input/mask';
import { useEffect, useState } from 'react';
import { sendCode } from '@scripts/helpers/sendCode'

const ConfirmEmailInput = ({ setStep, setAuthData, authData }) => {
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
    let generatedCode = ''
    useEffect(() => {
        if (authData.email && generatedCode === '') {
            generatedCode = sendCode(authData.email)
        }

    }, [authData])

    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = async (data) => {

        const cleanedCode = data.verCode.replace(/\s|_/g, '');
        if (cleanedCode === generatedCode) {
            setAuthData({email: authData.email})
            setStep("regPassword")
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
                <button className={`auth-popup__sumbit-button profile-button`}onClick={handleSaveClick}>Далее</button>
                <button className='auth-popup__back-button simple-button text-green' onClick={() => setStep('email')}>Вернуться</button>
            </div>
        </FormProvider>
    );
};
export default ConfirmEmailInput