import React, { useState, useEffect } from 'react';
import '@styles/pages/Addresses.scss';
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/react'

const OfficeAddress = ({ data }) => {
    const [notification, setNotification] = useState('');
    const [isNumRefactored, setIsNumRefactored] = useState(false)
    

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(`7${data.phone}`)
            .then(() => {
                setNotification('Номер скопирован!');
                setTimeout(() => {
                    setNotification('');
                }, 1000);
            })
    };

    return (
        <Popover>
            <div className="addresses__office-bg f-row gap-10">
                <span className="addresses__office-text title-m text-green">
                    {data.name}, {data.address1}
                </span>
                <PopoverButton className="addresses__office-text title-m text-green simple-button"  onClick={handleCopyToClipboard}>
                    {`+7 ${data.phone.slice(0, 3)} ${data.phone.slice(3, 6)} ${data.phone.slice(6, 8)} ${data.phone.slice(8)}`}
                </PopoverButton>
                {notification && <PopoverPanel anchor="top end" className="addresses__office-popover">{notification}</PopoverPanel>}
            </div>
        </Popover>
    );
}

export default OfficeAddress;
