import './ItemStatistic.scss';

interface Props {
    title: string;
}

const ItemStatistic = ({ title }: Props) => {
    return (
        <div className="item-statistic">
            <h2 className="item-statistic__title">{title}</h2>
            <p className="item-statistic__sub-title">Уроков 4 из 54</p>
        </div>
    );
};

export default ItemStatistic;
