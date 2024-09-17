import '@styles/popups/AuthPopup.scss';
import { Dialog, DialogPanel, DialogTitle, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import getSvg from '@images/svg'
import { InputMask } from '@react-input/mask';
import { simplePost, apiTags } from "@api/simplePost"
import { useState } from 'react';

const AuthPasswordInput = ( {setStep, setAuthData, authData} ) => {
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
            <div className="auth-popup__input-block f-column gap-4">
                <h3 className="auth-popup__undertitle title-s">Введите пароль</h3>
                <div className="auth-popup__input-holder f-row">
                    <input {...register("password")} className="auth-popup__input text-m" type={`${isPassShown ? "text" : "password"}`}/>
                    <button className={`auth-popup__pass-shown-btn simple-button`} onClick={() => setIsPassShown((prev) => !prev)}>{eye(`${isPassShown ? "var(--green)" : "var(--gray-text-active)"}`)}</button>
                </div>
                {passError !== "" && <span className="auth-popup__message text-m text-red">{passError}</span>}
                <button className={`auth-popup__sumbit-button profile-button ${isQuerry && "button-inactive"}`} onClick={handleSubmit(onSubmit)}>Далее</button>
            </div>
        </FormProvider>
    )
}

const AuthEmailInput = ( {setStep, setAuthData} ) => {
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
                    setStep("confirm-email");
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
        }
        setIsQuerry(false);
    }

    return (
        <FormProvider {...methods} >
            <div className="auth-popup__input-block f-column gap-4">
                <h3 className="auth-popup__undertitle title-s">Введите свой email</h3>
                <div className="auth-popup__input-holder f-row">
                    <input {...register("email", validationRules)} className="auth-popup__input text-m" />
                </div>
                {errors["email"] && <span className="auth-popup__error text-m text-red">{errors["email"].message}</span>}
                {registration && <span className="auth-popup__message text-m">Аккаунта с таким email не существует.</span>}
                <button className={`auth-popup__sumbit-button profile-button ${isQuerry && "button-inactive"}`} onClick={handleSaveClick}>{registration ? "Создать аккаунт" : "Далее"}</button>
            </div>
        </FormProvider>
    )

}

const AuthPopup = ({ state, switcher }) => {
    const [step, setStep] = useState("email");
    const [authData, setAuthData] = useState({});
    const {
        cross
    } = getSvg()

    return (
        <Dialog open={state} onClose={() => switcher(false)}>
            <div className="auth-popup auth-popup_bg f-column gap-10">
                <DialogPanel className="auth-popup__main f-column">
                    <button className="auth-popup__close-btn simple-button" onClick={() => switcher(false)}>
                        {cross("var(--black)")}
                    </button>

                    <DialogTitle className="auth-popup__title title-m">Личный кабинет</DialogTitle>
                    {step === "email" && <AuthEmailInput setStep={setStep} setAuthData={setAuthData}/>}
                    {step === "login" && <AuthPasswordInput setStep={setStep} setAuthData={setAuthData} authData={authData}/>}
                    {step === "confirm-email" && ""}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
export default AuthPopup