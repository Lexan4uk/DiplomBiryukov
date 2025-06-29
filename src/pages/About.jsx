import Footer from '@components/Footer'
import Header from '@components/Header'
import '@styles/pages/About.scss'

function About() {
	return (
		<>
			<Header active={2} />
			<main className='about block-normalizer main-block'>
				<div className='about__content f-column'>
					<div className='about__hero'>
						<h1 className='about__title title-l'>О компании</h1>
						<p className='about__welcome text-l'>
							Уважаемые Дамы и Господа, Компания КурскФлора рада приветствовать
							Вас на своем сайте!
						</p>
						<img
							src='https://img.dmclk.ru/vitrina/owner/87/4d/874d985633a74c67846127772bf8aa87.jpg'
							alt='Интерьер нашего магазина'
							className='about__hero-image'
						/>
					</div>

					<div className='about__section about__section-tocol f-row gap-10'>
						<div className='about__section-content'>
							<h2 className='about__subtitle title-m'>
								Цветочная оптово розничная компания «КурскФлора»
							</h2>
							<p className='about__text text-l'>
								Одна из ведущих компаний, успешно работающих в цветочной
								индустрии России более 15 лет.
							</p>
							<p className='about__text text-l'>
								Основное направление - это оптовая торговля срезанными цветами,
								горшечными растениями, посадочным материалом, луковицами,
								семенами газонных трав, искусственными растениями, сухоцветами и
								сопутствующими товарами.
							</p>
						</div>
						<img
							src='https://www.sunhome.ru/i/wallpapers/145/besplatno-vesna-oboi-skachat.xxl.jpg'
							alt='Нежный розовый цветок'
							className='about__section-image about__section-image--right'
						/>
					</div>

					<div className='about__section f-column gap-10'>
						<p className='about__text text-l'>
							Многолетнее сотрудничество с производителями и лучшими брокерами
							из Голландии, Италии, Дании, Израиля, Латинской Америки, Африки и
							России позволяет постоянно поддерживать широкий ассортимент,
							продаваемой нами продукции, включающий в себя несколько тысяч
							наименований.
						</p>
						<p className='about__text text-l'>
							Являясь лидером в области создания и доставки букетов и композиций
							из цветов, КурскФлора по праву гордится такими своими
							конкурентными преимуществами, как богатый ассортимент и высокое
							качество цветов, профессионализм операторов и флористов,
							оперативность доставки, конкурентные цены и широкая линейка
							скидок, удобство оформления и оплаты заказа цветов.
						</p>
					</div>

					<div className='about__section f-column gap-10'>
						<h2 className='about__subtitle title-m'>
							Богатый ассортимент и высокое качество цветов
						</h2>
						<p className='about__text text-l'>
							Работая напрямую с цветочными плантациями и обладая собственными
							прекрасными условиями для содержания цветов, КурскФлора имеет
							возможность всегда предлагать своим клиентам лучшее - высокое
							качество и отличный ассортимент. В каталоге компании Вы всегда
							найдете, как классические розы, лилии и гвоздики, так
							и экзотические и полевые цветы. Также компания предлагает
							композиции из сухоцветов и комнатные цветочные растения в горшках
							и кашпо.
						</p>
					</div>

					<div className='about__section f-column gap-10'>
						<h2 className='about__subtitle title-m'>
							Профессионализм операторов и флористов
						</h2>
						<p className='about__text text-l'>
							Компания КурскФлора во главу угла ставит не только высокое
							качество самих цветов, но и качество предоставляемых услуг. Именно
							поэтому в компании работают только профессионалы.
						</p>
						<p className='about__text text-l'>
							Опытные операторы на телефоне всегда помогут подобрать подходящий
							букет по случаю, а профессиональные флористы, победители
							многочисленных флористических конкурсов, создадут для Вас
							оригинальные и неповторимые букеты и цветочные композиции
							на заказ.
						</p>
					</div>

					<div className='about__section f-column gap-10'>
						<div className='about__section-content'>
							<h2 className='about__subtitle title-m'>
								Удобство оформления и оплаты заказа цветов
							</h2>
							<div className='about__textwimg about__section-tocol f-row gap-10'>
								<img
									src='https://avatars.mds.yandex.net/i?id=1fd718914e25314b4d34dd5121f4ab4fe8fcd0b2-9103996-images-thumbs&n=13'
									alt='Букет цветов'
									className='about__section-image about__section-image--left'
								/>
								<div className='about__textwimg-block f-column'>
									<p className='about__text text-l'>
										При организации работы компании в целом и сайте
										KurskFlora.ru в частности одним из важнейших моментов было и
										остается по сей день удобство заказа и оплаты услуг
										компании.
									</p>
									<p className='about__text text-l'>
										Сделать заказ цветов в КурскФлора можно по телефонам +7 800
										555 35 35, +7 800 666 36 36 или через сайт компании. Опытные
										операторы обязательно помогут Вам определить и +правильно
										подобрать букет для предстоящего торжества. Вы также можете
										заказать выезд менеджера к Вам домой или в офис.
									</p>
								</div>
							</div>
						</div>

						<p className='about__text text-l'>
							Оплата заказа осуществляется в КурскФлора любым удобным для Вас
							способом: наличными при доставке, курьеру, безналичным способом,
							при помощи кредитной карты, электронным платежом.
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default About
