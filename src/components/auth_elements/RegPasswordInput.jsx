import '@styles/popups/AuthPopup.scss';
import { useForm, FormProvider } from "react-hook-form";
import { useState } from 'react';
import { simplePost, apiTags } from '@api/simplePost'
import getSvg from '@images/svg'


const RegPasswordInput = ({ setStep, setAuthData, authData }) => {
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const [isQuerry, setIsQuerry] = useState(false);
    const { trigger, handleSubmit, formState: { errors }, register, setError } = methods;
    const [isPassShown, setIsPassShown] = useState(false);
    const {
        eye,
    } = getSvg()
    const validationRules = {
        required: "Пароль обязателен",
        minLength: {
            value: 4,
            message: "Пароль должен быть длиннее 3-х символов"
        }
    };

    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            setIsQuerry(true);
            handleSubmit(onSubmit)();
        }
    };


    const onSubmit = async (data) => {
        if (data.password !== data.conf_password) {
            setError("password", {
                message: "Пароли не совпадают!"
            });
        }
        console.log(data)



        setIsQuerry(false)
    }

    return (
        <FormProvider {...methods} >
            <div className="auth-popup__input-block f-column gap-10">
                <h3 className="auth-popup__undertitle title-s">Придумайте себе пароль</h3>
                <div className="auth-popup__input-holder f-row">
                    <input className="auth-popup__input text-m element-inactive" defaultValue={authData.email} />
                </div>
                <div className="auth-popup__input-holder f-row">
                    <input {...register("password", validationRules)} className="auth-popup__input text-m" type={`${isPassShown ? "text" : "password"}`} placeholder='Введите пароль' />
                    <button className={`auth-popup__pass-shown-btn simple-button`} onClick={() => setIsPassShown((prev) => !prev)}>{eye(`${isPassShown ? "var(--green)" : "var(--gray-text-active)"}`)}</button>
                </div>
                <div className="auth-popup__input-holder f-row">
                    <input {...register("conf_password", validationRules)} className="auth-popup__input text-m" type={`${isPassShown ? "text" : "password"}`} placeholder='Повторите пароль' />
                </div>
                {(errors["password"] || errors["conf_password"]) && (
                    <span className="auth-popup__error text-m text-red">
                        {errors["password"] ? errors["password"].message : errors["conf_password"].message}
                    </span>
                )}
                <button className={`auth-popup__sumbit-button profile-button ${false ? "button-inactive" : ""}`} onClick={handleSaveClick}>Создать аккаунт</button>
            </div>
        </FormProvider>
    )

}
export default RegPasswordInput 