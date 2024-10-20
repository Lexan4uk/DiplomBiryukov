import '@styles/pages/Main.scss';
import BoquetCard from '@components/page_elements/main_elements/BoquetCard'
import useSWR from 'swr';
import { simpleGet, apiTags } from '@api/simpleGet'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import { Grid } from 'swiper/modules';


const BoquetMain = () => {
    const { data: boquets, error: bError, isLoading: bIsLoading } = useSWR(apiTags.getBoquetCompleted, simpleGet);

    if (!bIsLoading) {
        console.log(boquets)
    }

    return (
        <div className="main-catalog__boquet-holder f-column gap-10">
            <h1 className="main-catalog__page-title title-l">Выбор букета</h1>
            <p className="main-catalog__page-desc text-l">На этой странице вы сможете выбрать готовый букет, созданный лучшими флористами. Каждый букет — это сочетание утончённых цветов, идеально подобранных по цветовой гамме и стилю. Оцените разнообразие предложений: от классических роз до необычных авторских композиций. Сделайте выбор, который подчеркнет особенный момент или станет идеальным подарком.</p>
            <div className="main-catalog__swiper-holder">
                <Swiper
                    slidesPerView={3}
                    grid={{
                        rows: 2
                    }}
                    spaceBetween={10} 
                    modules={[Grid]}
                    className="main-catalog__swiper"
                >
                    {boquets?.map((boquet) => (
                        <SwiperSlide>
                            <BoquetCard key={boquet.id} data={boquet} />
                        </SwiperSlide>
                    ))}
                    {boquets?.map((boquet) => (
                        <SwiperSlide>
                            <BoquetCard key={boquet.id} data={boquet} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    )
}
export default BoquetMain