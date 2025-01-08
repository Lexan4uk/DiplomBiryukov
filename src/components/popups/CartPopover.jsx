import '@styles/popups/CartPopover.scss';
import { PopoverPanel } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import getSvg from '@images/svg'
import useCart from '@scripts/custom_hooks/useCart'
import useAuth from '@scripts/custom_hooks/useAuth';
import { InputMask } from '@react-input/mask';
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from 'react';

const formatPhoneNumber = (phone) => {
  if (!phone) return "+7 (999) 999-99-99";
  const phoneString = phone.toString();
  return `+7 (${phoneString.slice(0, 3)}) ${phoneString.slice(3, 6)}-${phoneString.slice(6, 8)}-${phoneString.slice(8, 10)}`;
};

function CartPopover() {
  const {
    cross
  } = getSvg()
  const {
    isCartActive,
    cartCount,
    cartData,
    removeFromCart
  } = useCart()

  const { accData } = useAuth();
  const [formattedPhone, setFormattedPhone] = useState(formatPhoneNumber(accData?.phoneNumber));
  const methods = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      phone: formattedPhone
    }
  });
  const { handleSubmit, formState: { errors }, register, clearErrors, setValue, setError, trigger } = methods;
  const validationRules = {
    phoneNumber: {
      required: "Телефон обязателен для заполнения",
      pattern: {
        value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        message: "Некорректный формат номера телефона"
      }
    },
    name: {
      required: "Имя обязательно для заполнения",
      minLength: {
        value: 1,
        message: "Минимальная длина имени 1 символ"
      }
    }
  };
  const handleSaveClick = async () => {
    const isValid = await trigger();
    console.log(isValid)
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };


  const onSubmit = async (data) => {
    console.log(data)
  }




  return (
    <AnimatePresence>
      <PopoverPanel
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }} anchor="bottom end" className="cart-popover cart-popover_props">
        <div className="cart-popover__holder f-column gap-16">
          <FormProvider {...methods}>
            <div className="cart-popover__input-holder f-row ">
              <span className='cart-popover__input-text text-m'>Ваше имя</span>
              <div className={`cart-popover__input-border ${errors.name ? 'cart-popover__input-border_invalid' : ''}`}>
                <input 
                  className='cart-popover__input' 
                  {...register("name", validationRules.name)}
                  defaultValue={accData?.name} 
                  maxLength={20} 
                />
              </div>
            </div>
            <div className="cart-popover__input-holder f-row ">
              <span className='cart-popover__input-text text-m'>Ваш номер</span>
              <div className={`cart-popover__input-border ${errors.phoneNumber ? 'cart-popover__input-border_invalid' : ''}`}>
                <InputMask {...register("phoneNumber", validationRules.phoneNumber)}
                  className="profile-menu-popover__input"
                  mask="+7 (___) ___-__-__"
                  replacement={{ _: /\d/ }}
                  showMask={true}
                  type="tel"
                  defaultValue={formattedPhone}
                />
              </div>
            </div>
          </FormProvider>
          <h2 className="cart-popover__title title-s">Ваша корзина</h2>
          <div className='cart-popover__items-holder f-column gap-4'>
            {Object.entries(cartData).map(([id, item]) => (
              <div key={id} className="cart-popover__item gap-4 f-row">
                <span className='cart-popover__item-text text-m'>{item.name}: {item.count} шт. - {item.total} руб.</span>
                <button
                  className="cart-popover__remove-button simple-button"
                  onClick={() => removeFromCart(id)}
                >
                  {cross()}
                </button>
              </div>
            ))}
          </div>
          <button className='cart-popover__sumbit-button profile-button' onClick={handleSaveClick}>Создать заказ</button>
        </div>

      </PopoverPanel>
    </AnimatePresence>
  )
}
export default CartPopover
