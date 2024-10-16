import '@styles/popups/AuthPopup.scss';
import AuthEmailInput from '@components/elements/auth_elements/AuthEmailInput'
import AuthPasswordInput from '@components/elements/auth_elements/AuthPasswordInput'
import ConfirmEmailInput from '@components/elements/auth_elements/ConfirmEmailInput'
import RegPasswordInput from '@components/elements/auth_elements/RegPasswordInput'
import SuccessReg from '@components/elements/auth_elements/SuccessReg'
import NewPasswordInput from '@components/elements/auth_elements/NewPasswordInput'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import getSvg from '@images/svg'
import { useState } from 'react';


const AuthPopup = ({ state, loginSwitcher }) => {
    const [step, setStep] = useState("email");
    const [authData, setAuthData] = useState({});
    const {
        cross
    } = getSvg()

    return (
        <Dialog open={state} onClose={() => loginSwitcher(false)}>
            <div className="auth-popup_bg f-column gap-10">
                <DialogPanel className="auth-popup__main f-column">
                    <button className="auth-popup__close-btn simple-button" onClick={() => loginSwitcher(false)}>
                        {cross("var(--black)")}
                    </button>

                    <DialogTitle className="auth-popup__title title-m">Личный кабинет</DialogTitle>
                    {step === "email" && <AuthEmailInput setStep={setStep} setAuthData={setAuthData} />}
                    {step === "login" && <AuthPasswordInput setStep={setStep} authData={authData} loginSwitcher={loginSwitcher} />}
                    {step === "conf" && <ConfirmEmailInput setStep={setStep} setAuthData={setAuthData} authData={authData} confirmType={"confirmReg"}/>}
                    {step === "forgotPassword" && <ConfirmEmailInput setStep={setStep} setAuthData={setAuthData} authData={authData} confirmType={"forgotPassword"}/>}
                    {step === "regPassword" && <RegPasswordInput setStep={setStep} setAuthData={setAuthData} authData={authData} />}
                    {step === "successReg" && <SuccessReg setStep={setStep} />}
                    {step === "newPassword" && <NewPasswordInput setStep={setStep} setAuthData={setAuthData} authData={authData} />}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
export default AuthPopup