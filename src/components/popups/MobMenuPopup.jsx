import '@styles/popups/MobMenuPopup.scss';

import { Dialog, DialogPanel, Popover, PopoverButton } from '@headlessui/react'
import getSvg from '@images/svg'
import ProfileMenuPopover from "@components/popups/ProfileMenuPopover"
import BaseHeaderOptions from "@components/page_elements/header_elements/BaseHeaderOptions"


const MobMenuPopup = ({ state, mobMenuSwitcher, activeOption, name }) => {
    const {
        cross,
        person
    } = getSvg()

    return (
        <Dialog open={state} onClose={() => mobMenuSwitcher(false)}>
            <div className="mobmenu-popup_bg f-column gap-10">
                <DialogPanel className="mobmenu-popup__main f-column">
                    <button className="mobmenu-popup__close-btn simple-button" onClick={() => mobMenuSwitcher(false)}>
                        {cross("var(--black)", 16, 16)}
                    </button>
                    <nav className="header__nav f-column gap-10">
                    <BaseHeaderOptions activeOption={activeOption} />
                        <Popover>
                            <PopoverButton className="header__user-block-link text-menu f-row gap-4 simple-button text-green">
                                {person(undefined, 16, 16)}
                                {name ? name : "Пользователь"}
                            </PopoverButton>
                            <ProfileMenuPopover />
                        </Popover>
                    </nav>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
export default MobMenuPopup