import '@styles/Header.scss';
import HeaderOption from "@components/page_elements/header_elements/HeaderOption"

const BaseHeaderOptions = ({ activeOption }) => {
    return (
        <>
            <HeaderOption href="/" text="Каталог" active={activeOption === 1} />
            <HeaderOption href="/about" text="О компании" active={activeOption === 2} />
            <HeaderOption href="/addresses" text="Адреса/Доставка" active={activeOption === 3} />
            <HeaderOption href="/reviews" text="Отзывы" active={activeOption === 4} />
        </>
    )
}
export default BaseHeaderOptions