import '@styles/popups/AuthPopup.scss';
import { useForm, FormProvider } from "react-hook-form";
import getSvg from '@images/svg'
import { simplePost, apiTags } from "@api/simplePost"
import { useState } from 'react';

const AuthPasswordInput = ({ setStep, setAuthData, authData }) => {
    const methods = useForm();
    const [isQuerry, setIsQuerry] = useState(false);
    const [isPassShown, setIsPassShown] = useState(false);
    const [passError, setPassError] = useState("")
    const { handleSubmit, formState: { errors }, register } = methods;
    const {
        eye,
    } = getSvg()

    const onSubmit = async (data) => {
        setPassError("")
        setIsQuerry(true)
        const querryData = {
            "email": authData.email,
            "password": data.password
        }

        const response = await simplePost(apiTags.get_token, querryData);
        if (response.token) {
            console.log(response);
            localStorage.setItem('token', response.token);
        }
        else if (response.code === 401) {
            setPassError(`${response.message}`)
        }
        setIsQuerry(false)
    }

    return (
        <FormProvider {...methods} >
            <div className="auth-popup__input-block f-column gap-10">
                <h3 className="auth-popup__undertitle title-s">Введите пароль</h3>
                <div className="auth-popup__input-holder f-row">
                    <input {...register("password")} className="auth-popup__input text-m" type={`${isPassShown ? "text" : "password"}`} />
                    <button className={`auth-popup__pass-shown-btn simple-button`} onClick={() => setIsPassShown((prev) => !prev)}>{eye(`${isPassShown ? "var(--green)" : "var(--gray-text-active)"}`)}</button>
                </div>
                {passError !== "" && <span className="auth-popup__message text-m text-red">{passError}</span>}
                <button className={`auth-popup__sumbit-button profile-button ${isQuerry ? "button-inactive" : ""}`} onClick={handleSubmit(onSubmit)}>Далее</button>
                <button className='auth-popup__back-button simple-button text-green' onClick={() => setStep('email')}>Вернуться</button>

            </div>
        </FormProvider>
    )
}
export default AuthPasswordInput