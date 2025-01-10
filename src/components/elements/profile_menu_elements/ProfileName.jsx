import '@styles/popups/PofileMenuPopover.scss';
import getSvg from '@images/svg'
import { useForm, FormProvider } from "react-hook-form";
import { useState } from 'react';
import { simplePost, apiTags } from "@api/simplePost"
import useAuth from '@scripts/custom_hooks/useAuth';


function ProfileName({ name }) {
    const methods = useForm({ reValidateMode: 'onSubmit' });
    const [toggleEditing, setToggleEditing] = useState(false)
    const [querry, setIsQuerry] = useState(false)
    const { handleSubmit, formState: { errors }, register, clearErrors, setValue, setError, trigger } = methods;
    const validationRules = {
        required: "Поле не может быть пустым",
        maxLength: {
            value: 15,
            message: "Имя должно быть не длиннее 15 знаков"
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


    const handleCloseClick = () => {
        setToggleEditing(false);
        setValue('name', accData.name ? accData.name : '');
        clearErrors('name'); 
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
            "name": data.name
        }
        const response = await simplePost(apiTags.editName, querryData);
        if (response.code === 200) {
            initUser()
        }
        else {
            setError("name", {message: `${response.message}`})
        }
        setIsQuerry(false)
    }
    return (
        <FormProvider {...methods}>
            <div className="profile-menu-popover__input-block f-row gap-16">
                <p className='profile-menu-popover__input-block-name'>Имя</p>
                <div className={`profile-menu-popover__input-border ${toggleEditing && "profile-menu-popover__input-border_active"}`}>
                    <input className="profile-menu-popover__input" {...register("name", validationRules)} type="text" defaultValue={name} />
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
            {(errors["name"]) && (
                <span className="profile-menu-popover__error text-s text-red">
                    {errors["name"].message}
                </span>
            )}
        </FormProvider>
    )
}
export default ProfileName
