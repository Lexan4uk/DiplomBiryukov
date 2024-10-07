import '@styles/popups/AuthPopup.scss';
import { useForm, FormProvider } from "react-hook-form";
import {  useState } from 'react';
import { simplePost, apiTags} from '@api/simplePost'

const AuthEmailInput = ({ setStep, setAuthData }) => {
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const [isQuerry, setIsQuerry] = useState(false);
    const [registration, setRegistration] = useState(false);
    const { trigger, handleSubmit, formState: { errors }, register } = methods;

    const validationRules = {
        required: "Email обязателен для заполнения",
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Некорректный формат email"
        }
    }
    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            if (registration) {
                setStep("conf");
            }
            else {
                setIsQuerry(true);
                handleSubmit(onSubmit)();
            }
        }
    };


    const onSubmit = async (data) => {
        const response = await simplePost(apiTags.email_enter, data);
        if (response.code === 200) {
            setAuthData(data)
            setStep("login")
        }
        else if (response.code === 201) {
            setRegistration(true)
            setAuthData(data)
        }
        setIsQuerry(false);
    }

    return (
        <FormProvider {...methods} >
            <div className="auth-popup__input-block f-column gap-10">
                <h3 className="auth-popup__undertitle title-s">Введите свой email</h3>
                <div className="auth-popup__input-holder f-row">
                    <input {...register("email", validationRules)} className="auth-popup__input text-m" onChange={(e) => { registration && setRegistration(false) }} />
                </div>
                {errors["email"] && <span className="auth-popup__error text-m text-red">{errors["email"].message}</span>}
                {registration && <span className="auth-popup__message text-m">Аккаунта с таким email не существует.</span>}
                <button className={`auth-popup__sumbit-button profile-button ${isQuerry ? "button-inactive" : ""}`} onClick={handleSaveClick}>{registration ? "Создать аккаунт с таким email" : "Далее"}</button>
            </div>
        </FormProvider>
    )

}
export default AuthEmailInput 