
import './FtfStatistics.scss'

interface IVisit {
    visits: number;
    number: number;
}

const FtfStatistic = ({visits, number}: IVisit) => {
    return (  
            <div className="item-statistic">
                   <div className="item-statistic__title">Очные посещения: {visits}</div> 
                   <div className="item-statistic__title">Процент посещений {visits/number*100}</div>
            </div>
    );
}
 
export default FtfStatistic;