import '@styles/popups/AuthPopup.scss';
import { useForm, FormProvider } from "react-hook-form";
import getSvg from '@images/svg';
import { simplePost, apiTags } from "@api/simplePost";
import { useState } from 'react';
import useAuth from '@scripts/custom_hooks/useAuth';

const AuthPasswordInput = ({ setStep, authData, loginSwitcher }) => {
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const [isQuerry, setIsQuerry] = useState(false);
    const [isPassShown, setIsPassShown] = useState(false);
    const { handleSubmit, formState: { errors }, register, setError, trigger } = methods;
    const { initUser } = useAuth();
    const { eye } = getSvg();

    const validationRules = {
        required: "Поле не может быть пустым",
    };

    const onSubmit = async (data) => {
        const querryData = {
            "email": authData.email,
            "password": data.password
        };

        setIsQuerry(true);
        const response = await simplePost(apiTags.get_token, querryData);

        if (response.token) {
            localStorage.setItem('token', response.token);
            initUser();
            loginSwitcher(false)
        } else if (response.code === 401) {
            setError("password", {
                type: "manual",
                message: response.message,
            });
        }
        setIsQuerry(false);
    };

    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="auth-popup__input-block f-column gap-10">
                <h3 className="auth-popup__undertitle title-s">Введите пароль</h3>
                <div className="auth-popup__input-holder f-row">
                    <input
                        {...register("password", validationRules)}
                        className="auth-popup__input text-m"
                        type={isPassShown ? "text" : "password"}
                        placeholder="Введите пароль"
                    />
                    <button
                        className={`auth-popup__pass-shown-btn simple-button`}
                        onClick={() => setIsPassShown((prev) => !prev)}
                    >
                        {eye(`${isPassShown ? "var(--green)" : "var(--gray-text-active)"}`)}
                    </button>
                </div>
                {errors.password && (
                    <span className="auth-popup__error text-m text-red">
                        {errors.password.message}
                    </span>
                )}
                <button
                    className={`auth-popup__sumbit-button profile-button ${isQuerry ? "button-inactive" : ""}`}
                    onClick={handleSaveClick}
                >
                    Далее
                </button>
                <button
                    className="auth-popup__back-button simple-button text-green"
                    onClick={() => setStep("email")}
                >
                    Вернуться
                </button>
            </div>
        </FormProvider>
    );
};

export default AuthPasswordInput;
