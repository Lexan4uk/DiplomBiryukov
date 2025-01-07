import '@styles/pages/Boquet_page.scss';
import getSvg from '@images/svg'


const BoquetActionCard = () => {
    const {
        award
    } = getSvg()
    return (
        <div className='boquet-page__action-card f-row gap-10'>
          {award()}
          <span className='boquet-page__action-card-text text-m'>АКЦИЯ</span>  
        </div>
    )
}
export default BoquetActionCard