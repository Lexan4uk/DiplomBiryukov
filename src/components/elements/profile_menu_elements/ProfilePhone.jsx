import '@styles/popups/PofileMenuPopover.scss';
import getSvg from '@images/svg'
import { useForm, FormProvider } from "react-hook-form";
import { useState } from 'react';
import { simplePost, apiTags } from "@api/simplePost"
import useAuth from '@scripts/custom_hooks/useAuth';
import { InputMask } from '@react-input/mask';

const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    const phoneString = phone.toString();
    return `+7 (${phoneString.slice(0, 3)}) ${phoneString.slice(3, 6)}-${phoneString.slice(6, 8)}-${phoneString.slice(8, 10)}`;
};

function ProfilePhone({ phone }) {
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const [toggleEditing, setToggleEditing] = useState(false)
    const [querry, setIsQuerry] = useState(false)
    const { handleSubmit, formState: { errors }, register, clearErrors, setValue, setError, trigger } = methods;
    const validationRules = {
        required: "Телефон обязателен для заполнения",
        pattern: {
            value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
            message: "Некорректный формат номера телефона"
        }
    };
    const {
        pen,
        cross,
        done
    } = getSvg()
    const {
        initUser,
        accData
    } = useAuth()

    const formattedPhone = phone ? formatPhoneNumber(phone) : '';

    const handleCloseClick = () => {
        setToggleEditing(false);
        setValue('phoneNumber', accData.phoneNumber ? formattedPhone : '');
        clearErrors('phoneNumber');
    };

    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            setIsQuerry(true);
            handleSubmit(onSubmit)();
        }
    };


    const onSubmit = async (data) => {
        const querryData = {
            "phoneNumber": data.phoneNumber.replace(/\D/g, '').replace(/^7/, '')
        }
        console.log(querryData)
        const response = await simplePost(apiTags.editPhone, querryData);
        if (response.code === 200) {
            initUser()
        }
        else {
            setError("phoneNumber", { message: `${response.message}` })
        }
        console.log(response)
        setIsQuerry(false)
    }


    return (
        <FormProvider {...methods}>
            <div className="profile-menu-popover__input-block f-row gap-16">
                <p className='profile-menu-popover__input-block-name'>Телефон</p>
                <div className={`profile-menu-popover__input-border ${toggleEditing && "profile-menu-popover__input-border_active"}`}>
                    <InputMask {...register("phoneNumber", validationRules)}
                        className="profile-menu-popover__input"
                        mask="+7 (___) ___-__-__"
                        replacement={{ _: /\d/ }}
                        showMask={true}
                        type="tel"
                        defaultValue={formattedPhone}
                    />
                    <div className="profile-menu-popover__input-actions-holder f-row gap-4">
                        {!toggleEditing ? (
                            <button className="profile-menu-popover__input-edit simple-button" onClick={() => setToggleEditing(prev => !prev)}>{pen()}</button>
                        ) : (
                            <>
                                <button className="profile-menu-popover__input-save simple-button" onClick={handleSaveClick}>{done()}</button>
                                <button className="profile-menu-popover__input-close simple-button" onClick={handleCloseClick}>{cross(undefined, 20, 20)}</button>
                            </>
                        )}
                    </div>

                </div>
            </div>
            {(errors["phoneNumber"]) && (
                <span className="profile-menu-popover__error text-s text-red">
                    {errors["phoneNumber"].message}
                </span>
            )}
        </FormProvider>
    )
}
export default ProfilePhone
