
import './FtfStatistics.scss'

interface IVisit {
    visits: number;
    number: number;
    type: string;
}

const FtfStatistic = ({visits, number, type}: IVisit) => {
    return (  
            <div className="item-statistic">
                   <div className="item-statistic__title">{type}</div> 
                   <div className="item-statistic__sub-title">
                   <p>{visits}: {visits/number*100}</p> 
                   </div>
            </div>
    );
}
 
export default FtfStatistic;