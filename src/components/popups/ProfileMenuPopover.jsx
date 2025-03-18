import ProfileName from '@components/elements/profile_menu_elements/ProfileName'
import ProfileNewPassword from '@components/elements/profile_menu_elements/ProfileNewPassword'
import ProfilePhone from '@components/elements/profile_menu_elements/ProfilePhone'
import { PopoverPanel } from '@headlessui/react'
import getSvg from '@images/svg'
import '@styles/popups/PofileMenuPopover.scss'
import { AnimatePresence, motion } from 'framer-motion'

import useAuth from '@scripts/custom_hooks/useAuth'

function ProfileMenuPopover() {
	const { pen, cross } = getSvg()
	const { accData, initUser } = useAuth()
	const exitAcc = () => {
		localStorage.removeItem('token')
		initUser()
	}

	return (
		<AnimatePresence>
			<PopoverPanel
				as={motion.div}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				anchor='bottom end'
				className='profile-menu-popover profile-menu-popover_props'
			>
				<div className='profile-menu-popover__holder f-column gap-16'>
					<h2 className='profile-menu-popover__title text-m'>
						Данные Вашего аккаунта
						<br /> будут использоваться для оформления заказа
					</h2>
					<ProfileName name={accData?.name} />
					<ProfilePhone phone={accData?.phoneNumber} />
					<ProfileNewPassword />
					<button
						className='profile-menu-popover__exit-btn simple-button text-red'
						onClick={exitAcc}
					>
						Выйти
					</button>
				</div>
			</PopoverPanel>
		</AnimatePresence>
	)
}
export default ProfileMenuPopover
