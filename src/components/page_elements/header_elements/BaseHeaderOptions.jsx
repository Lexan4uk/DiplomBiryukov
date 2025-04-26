import HeaderOption from '@components/page_elements/header_elements/HeaderOption'
import '@styles/Header.scss'

const BaseHeaderOptions = ({ activeOption }) => {
	return (
		<>
			<HeaderOption href='/' text='Каталог' active={activeOption === 1} />
			<HeaderOption
				href='/about'
				text='О компании'
				active={activeOption === 2}
			/>
			<HeaderOption
				href='/addresses'
				text='Адреса/Доставка'
				active={activeOption === 3}
			/>
			<HeaderOption href='/reviews' text='Отзывы' active={activeOption === 4} />
			<HeaderOption href='/news' text='Новости' active={activeOption === 5} />
		</>
	)
}
export default BaseHeaderOptions
