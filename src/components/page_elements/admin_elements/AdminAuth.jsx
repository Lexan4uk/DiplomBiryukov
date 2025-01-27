import '@styles/pages/AdminPage.scss';
import { useForm, FormProvider } from "react-hook-form";
import { useState } from 'react';
import { simplePost, apiTags } from "@api/simplePost";
import getSvg from '@images/svg';

const AdminAuth = ({ setIsAuth }) => {
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const [isQuerry, setIsQuerry] = useState(false);
    const [isPassShown, setIsPassShown] = useState(false);
    const { handleSubmit, formState: { errors }, register, setError, trigger } = methods;
    const { eye } = getSvg();

    const validationRules = {
        required: "Поле не может быть пустым",
    };

    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            setIsQuerry(true);
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = async (data) => {
        const response = await simplePost(apiTags.adminLogin, data);
        if (response.code === 200) {
            setIsAuth(true);
        } else {
            setError("password", {
                type: "manual", 
                message: "Неверный логин или пароль"
            });
        }
        setIsQuerry(false);
    };

    return (
        <FormProvider {...methods}>
            <div className="admin-auth">
                <h1 className="admin-auth__title title-l">Панель администратора</h1>
                <div className="admin-auth__form f-column gap-10">
                    <div className="admin-auth__input-holder f-row">
                        <input
                            {...register("login", validationRules)}
                            className="admin-auth__input text-m"
                            type="text"
                            placeholder="Логин"
                        />
                    </div>
                    <div className="admin-auth__input-holder f-row">
                        <input
                            {...register("password", validationRules)}
                            className="admin-auth__input text-m"
                            type={isPassShown ? "text" : "password"}
                            placeholder="Пароль"
                        />
                        <button 
                            className="admin-auth__pass-shown-btn simple-button"
                            onClick={() => setIsPassShown(prev => !prev)}
                        >
                            {eye(`${isPassShown ? "var(--green)" : "var(--gray-text-active)"}`)}
                        </button>
                    </div>
                    {errors.password && (
                        <span className="admin-auth__error text-s text-red">
                            {errors.password.message}
                        </span>
                    )}
                    <button 
                        className={`admin-auth__submit profile-button ${isQuerry ? "button-inactive" : ""}`}
                        onClick={handleSaveClick}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </FormProvider>
    );
};

export default AdminAuth;