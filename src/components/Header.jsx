import '@styles/Header.scss';
import getSvg from '@images/svg'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import HeaderOption from '@components/cards/HeaderOption'
import logo from "@images/header/logo.png"
import AuthPopup from "@components/popups/AuthPopup"
import ProfileMenuPopover from "@components/popups/ProfileMenuPopover"

import useAuth from '@scripts/custom_hooks/useAuth';


function Header({ active }) {
    const {
        person,
        clock,
        pin
    } = getSvg()
    const {
        isAuthorised,
        accData,
    } = useAuth()
    const [loginOpen, setLoginOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    return (
        <header className="header">
            <div className="header__container block-normalizer f-column">
                <div className="header__top-block header__sections-padding f-row">
                    <nav className="header__nav f-row gap-16">
                        <HeaderOption href="/" text="Каталог" active={active === 1} />
                        <HeaderOption href="/" text="О компании" active={active === 2} />
                        <HeaderOption href="/" text="Доставка" active={active === 3} />
                        <HeaderOption href="/" text="Отзывы" active={active === 4} />
                    </nav>
                    <div className="header__user-block">
                        {/*ЕБАНОЕ МЕСИВО ОБОСРАЛ ФУНКЦИЮ ОТКРЫТИЯ ПОПОВЕРА*/}
                        <button onClick={() => {if (isAuthorised) setProfileOpen(prev => !prev); else setLoginOpen(true)}} className="header__user-block-link text-menu f-row gap-4 simple-button">
                            {person()}
                            {isAuthorised ? accData?.name : `Войти`}
                        </button>
                        {isAuthorised ? profileOpen && <ProfileMenuPopover /> : <AuthPopup state={loginOpen} loginSwitcher={setLoginOpen}/>}
                    </div>
                </div>
                <div className="header__bottom-block header__sections-padding f-row">
                    <Link to="/" className="header__logo-holder f-column gap-4">
                        <img src={logo} alt="Logo image" className="header__logo-img" />
                        <span className="header__logo-text text-m">сеть цветочных оптово-розничных центров</span>
                    </Link>
                    <div className="header__right-content f-row">
                        <div className="header__numbers-holder f-column gap-10">
                            <span className="header__number text-xl">+7 800 555 35 35</span>
                            <span className="header__number text-xl">+7 800 666 36 36</span>
                        </div>
                        <div className="header__actions-holder f-column">
                            <span className="header__action f-row gap-4 text-l">
                                {clock()}
                                Ждём вас с 8:00 до 22:00
                            </span>
                            <Link to="/" className="header__action f-row gap-4 text-l text-link">
                                {pin()}
                                Адреса цветочных центров
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}
Header.propTypes = {
    active: PropTypes.number.isRequired,
};
export default Header;
