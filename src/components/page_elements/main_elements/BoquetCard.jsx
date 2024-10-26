import '@styles/pages/Main_catalog.scss';
import { Link } from "react-router-dom";
import getSvg from '@images/svg'
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';


const BoquetCard = ({ data }) => {
    const [isHover, setIsHover] = useState(false)
    const cartAnimation = useSpring({
        opacity: isHover ? 1 : 0,
        transform: isHover ? "scale(1)" : "scale(0.5)",
        config: { tension: 220, friction: 12 }
    });
    const {
        cart
    } = getSvg()
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //на мобилке карт должен быть по умолчанию
    return (
        <div className="main-catalog__boquet-card"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <animated.button style={cartAnimation} className="main-catalog__boquet-cart-button simple-button">
                <div className="main-catalog__boquet-cart-holder f-row">
                    {cart()}
                </div>
            </animated.button>
            <Link to={data.link} className="main-catalog__boquet-link">
                <div className="main-catalog__boquet-img-holder f-row">
                    <img className="main-catalog__boquet-card-img" src={data.cover} alt="card image" />
                </div>

                <div className="main-catalog__boquet-content f-column gap-10">
                    {data.promo === true ? (
                        <div className="main-catalog__boquet-promo-holder f-row gap-10">
                            <h2 className="main-catalog__boquet-price title-l text-green">{`${data.price} руб`}</h2>
                            <h2 className="main-catalog__boquet-price title-s text-inactive">{`${data.oldPrice}`}</h2>
                        </div>
                    ) : (
                        <h2 className="main-catalog__boquet-price title-l text-green">{`${data.price} руб`}</h2>
                    )}
                    <p className="main-catalog__boquet-name text-l">{data.name}</p>
                </div>
            </Link>
        </div>
    )
}
export default BoquetCard