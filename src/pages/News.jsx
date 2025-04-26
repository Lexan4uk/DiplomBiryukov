import { apiTags, simpleGet } from '@api/simpleGet'
import Footer from '@components/Footer'
import Header from '@components/Header'
import '@styles/pages/News.scss'
import useSWR from 'swr'

function News() {
	const {
		data: news,
		error: newsError,
		isLoading: newsIsLoading,
	} = useSWR(apiTags.getNews, simpleGet)

	const latestNews = news?.slice(-4).reverse()

	return (
		<>
			<Header active={5} />
			<main className='news block-normalizer main-block'>
				<div className='news__content'>
					<h1 className='news__title title-l text-green'>Последние новости</h1>
					<div className='news__grid'>
						{latestNews?.map(item => (
							<div key={item.id} className='news__card'>
								<h2 className='news__card-title title-m'>{item.title}</h2>
								{item.imgUrl && (
									<div className='news__card-image-wrapper'>
										<img
											src={item.imgUrl}
											alt={item.title}
											className='news__card-image'
										/>
									</div>
								)}
								<div className='news__card-content'>
									<p className='news__card-text text-l'>{item.text}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default News
