import '@styles/popups/PofileMenuPopover.scss';
import getSvg from '@images/svg'
import { useForm, FormProvider } from "react-hook-form";
import { useState } from 'react';
import { simplePost, apiTags } from "@api/simplePost"
import useAuth from '@scripts/custom_hooks/useAuth';


function ProfileNewPassword() {
    const [isEditing, setIsEditing] = useState(false)
    const [isQuerry, setIsQuerry] = useState(false);
    const [isPassShown, setIsPassShown] = useState(false);
    const [isSucess, setIsSucess] = useState(false)
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const { trigger, handleSubmit, formState: { errors }, register, setError } = methods;
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
        setIsSucess(false)
        const isValid = await trigger();
        if (isValid) {
            setIsQuerry(true);
            handleSubmit(onSubmit)();
        }
    };


    const onSubmit = async (data) => {
        const querryData = {
            "oldPassword": data.oldPassword,
            "newPassword": data.newPassword
        }
        const response = await simplePost(apiTags.editPassword, querryData);
        if (response?.code === 200) {
            setIsSucess(true)
        }
        else {
            setError("oldPassword", { message: `${response.message}` })
        }
        console.log(response)

        setIsQuerry(false)
    }

    return (isEditing ? (
        <FormProvider {...methods}>
            <button className="profile-menu-popover__new-pass-toggle profile-button" onClick={() => setIsEditing(prev => !prev)}>Скрыть</button>
            <div className="profile-menu-popover__input-border profile-menu-popover__input-border_active f-row">
                <input {...register("oldPassword", validationRules)} className="profile-menu-popover__input text-m" type={`${isPassShown ? "text" : "password"}`} placeholder='Текущий пароль' />
                <button className={`profile-menu-popover__pass-shown-btn simple-button`} onClick={() => setIsPassShown((prev) => !prev)}>{eye(`${isPassShown ? "var(--green)" : "var(--gray-text-inactive)"}`)}</button>
            </div>
            <div className="profile-menu-popover__input-border profile-menu-popover__input-border_active f-row">
                <input {...register("newPassword", validationRules)} className="profile-menu-popover__input text-m" type={`${isPassShown ? "text" : "password"}`} placeholder='Новый пароль' />
            </div>

            {(errors["oldPassword"] || errors["newPassword"]) && (
                <span className="auth-popup__error text-m text-red">
                    {errors["oldPassword"] ? errors["oldPassword"].message : errors["newPassword"].message}
                </span>
            )}
            {isSucess && <span className="profile-menu-popover__message text-m">Пароль изменён!</span>}

            <button className={`profile-menu-popover__sumbit-button profile-button ${isQuerry ? "button-inactive" : ""}`} onClick={handleSaveClick}>Сохранить</button>

        </FormProvider >)
        : (
            <button className="profile-menu-popover__new-pass-toggle profile-button" onClick={() => setIsEditing(prev => !prev)}>Изменить пароль</button>
        )

    )
}
export default ProfileNewPassword
