import '@styles/popups/PofileMenuPopover.scss';
import { PopoverPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

function ProfileMenuPopover() {
  return (
    <AnimatePresence>
      <PopoverPanel 
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} anchor="bottom end" className="profile-menu-popover profile-menu-popover_props">
        <div className="profile-menu-popover__holder f-column gap-16">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>

      </PopoverPanel>
    </AnimatePresence>
  )
}
export default ProfileMenuPopover
