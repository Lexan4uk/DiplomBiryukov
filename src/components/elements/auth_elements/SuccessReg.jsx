import '@styles/popups/AuthPopup.scss';


const SuccessReg = ({ setStep }) => {
    return (
        <div className="auth-popup__input-block f-column gap-10">
            <h3 className="auth-popup__undertitle title-s">Успех! Авторизуйтесь для входа</h3>
            <button className={`auth-popup__sumbit-button profile-button`} onClick={() => setStep('email')}>К авторизации</button>
        </div>
    )

}
export default SuccessReg 