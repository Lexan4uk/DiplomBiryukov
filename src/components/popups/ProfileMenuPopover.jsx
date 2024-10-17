import '@styles/popups/PofileMenuPopover.scss';
import { PopoverPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import getSvg from '@images/svg'
import ProfileName from '@components/elements/profile_menu_elements/ProfileName'
import ProfilePhone from '@components/elements/profile_menu_elements/ProfilePhone'
import ProfileNewPassword from '@components/elements/profile_menu_elements/ProfileNewPassword'

import useAuth from '@scripts/custom_hooks/useAuth';
import { useEffect } from 'react';


function ProfileMenuPopover() {
  const {
    pen,
    cross
} = getSvg()
const { accData } = useAuth();



  return (
    <AnimatePresence>
      <PopoverPanel 
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} anchor="bottom end" className="profile-menu-popover profile-menu-popover_props">
        <div className="profile-menu-popover__holder f-column gap-16">
          <h2 className="profile-menu-popover__title text-m">Данные Вашего аккаунта<br/> будут использоваться для оформления заказа</h2>
          <ProfileName name={accData?.name}/>
          <ProfilePhone phone={accData?.phoneNumber}/>
          <ProfileNewPassword/>
        </div>

      </PopoverPanel>
    </AnimatePresence>
  )
}
export default ProfileMenuPopover
