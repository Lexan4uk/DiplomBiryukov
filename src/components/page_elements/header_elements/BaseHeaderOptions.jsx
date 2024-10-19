import '@styles/Header.scss';
import HeaderOption from '@components/cards/HeaderOption'

const BaseHeaderOptions = ({ activeOption }) => {
    return (
        <>
            <HeaderOption href="/" text="Каталог" active={activeOption === 1} />
            <HeaderOption href="/" text="О компании" active={activeOption === 2} />
            <HeaderOption href="/addresses" text="Адреса/Доставка" active={activeOption === 3} />
            <HeaderOption href="/" text="Отзывы" active={activeOption === 4} />
        </>
    )
}
export default BaseHeaderOptions