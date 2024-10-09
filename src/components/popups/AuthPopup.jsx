import '@styles/popups/AuthPopup.scss';
import AuthEmailInput from '@components/auth_elements/AuthEmailInput'
import AuthPasswordInput from '@components/auth_elements/AuthPasswordInput'
import ConfirmEmailInput from '@components/auth_elements/ConfirmEmailInput'
import RegPasswordInput from '@components/auth_elements/RegPasswordInput'
import SuccessReg from '@components/auth_elements/SuccessReg'

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
            <div className="auth-popup auth-popup_bg f-column gap-10">
                <DialogPanel className="auth-popup__main f-column">
                    <button className="auth-popup__close-btn simple-button" onClick={() => loginSwitcher(false)}>
                        {cross("var(--black)")}
                    </button>

                    <DialogTitle className="auth-popup__title title-m">Личный кабинет</DialogTitle>
                    {step === "email" && <AuthEmailInput setStep={setStep} setAuthData={setAuthData} />}
                    {step === "login" && <AuthPasswordInput setStep={setStep} authData={authData} loginSwitcher={loginSwitcher} />}
                    {step === "conf" && <ConfirmEmailInput setStep={setStep} setAuthData={setAuthData} authData={authData} />}
                    {step === "regPassword" && <RegPasswordInput setStep={setStep} setAuthData={setAuthData} authData={authData} />}
                    {step === "successReg" && <SuccessReg setStep={setStep} />}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
export default AuthPopup