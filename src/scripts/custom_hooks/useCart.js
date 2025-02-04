import { useRecoilState } from 'recoil';
import { cartAtom } from '@scripts/atoms/cartAtom'
import { useEffect, useState } from 'react';


function useCart() {
  const [cartData, setCartData] = useRecoilState(cartAtom)
  const [isCartActive, setIsCartActive] = useState(false)
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (Object.keys(cartData).length) {
      setIsCartActive(true)
    }
    else {
      setIsCartActive(false)
    }
    setCartCount(Object.keys(cartData).length)
  }, [cartData])

  const addToCart = (price, count, id, name, cover) => {
    setCartData((prev) => {
      const newCart = { ...prev }
      if (newCart[id]) {
        newCart[id] = {
          ...newCart[id],
          count: newCart[id].count + count,
          total: newCart[id].total + price * count
        }
      } else {
        newCart[id] = {
          name,
          price,
          count,
          total: price * count,
          cover
        }
      }
      console.log(newCart)
      return newCart
    })
  }

  const removeFromCart = (id) => {
    setCartData((prev) => {
      const newCart = { ...prev }
      delete newCart[id]
      return newCart
    })
  }

  const clearCart = () => {
    setCartData({});
  }

  return {
    addToCart,
    removeFromCart,
    cartData,
    isCartActive,
    cartCount,
    clearCart
  };
}

export default useCart;
