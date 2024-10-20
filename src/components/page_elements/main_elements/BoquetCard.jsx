import '@styles/pages/Main.scss';

const BoquetCard = ({data}) => {
    return (
        <div className="main-catalog__boquet-card">
            <img className="main-catalog__boquet-card-img" src={data.cover} alt="card image" />
            {data.name}
        </div>
    )
}
export default BoquetCard