import '@styles/Header.scss';
import getSvg from '@images/svg'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "@images/header/logo.png"
import AuthPopup from "@components/popups/AuthPopup"
import MobMenuPopup from "@components/popups/MobMenuPopup"
import ProfileMenuPopover from "@components/popups/ProfileMenuPopover"
import BaseHeaderOptions from "@components/page_elements/header_elements/BaseHeaderOptions"
import { Popover, PopoverButton } from '@headlessui/react'

import useAuth from '@scripts/custom_hooks/useAuth';


function Header({ active }) {
    const {
        person,
        clock,
        pin,
        menu
    } = getSvg()
    const {
        isAuthorised,
        accData,
    } = useAuth()
    const [loginOpen, setLoginOpen] = useState(false)
    const [mobMenuOpen, setMobMenuOpen] = useState(false)
    return (
        <header className="header">
            <div className="header__container block-normalizer f-column">
                <div className="header__top-block header__sections-padding f-row">
                    <nav className="header__nav f-row gap-16">
                        <BaseHeaderOptions activeOption={active} />
                    </nav>
                    <div className="header__user-block">
                        {!isAuthorised ? (
                            <>
                                <button onClick={() => setLoginOpen(true)} className="header__user-block-link text-menu f-row gap-4 simple-button">
                                    {person()}
                                    Войти
                                </button>
                                <AuthPopup state={loginOpen} loginSwitcher={setLoginOpen} />
                            </>
                        ) : (
                            <Popover>
                                <PopoverButton className="header__user-block-link text-menu f-row gap-4 simple-button text-green">
                                    {person()}
                                    {accData?.name ? accData?.name : "Пользователь"}
                                </PopoverButton>
                                <ProfileMenuPopover />
                            </Popover>
                        )}
                    </div>
                </div>
                <div className="header__bottom-block header__sections-padding f-row">
                    <Link to="/" className="header__logo-holder f-column gap-4">
                        <img src={logo} alt="Logo" className="header__logo-img" />
                        <span className="header__logo-text text-m">сеть цветочных оптово-розничных центров</span>
                    </Link>
                    <div className="header__mob-menu-elements">
                        <button onClick={() => setMobMenuOpen(true)} className="header__mob-menu-button simple-button">
                            {menu(undefined, 30, 30)}
                        </button>
                        <MobMenuPopup state={mobMenuOpen} mobMenuSwitcher={setMobMenuOpen} activeOption={active} name={accData?.name}/>
                    </div>
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
