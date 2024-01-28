
import { ReactNode } from 'react';
import './FtfStatistics.scss'

interface IVisit {
    
    type: string;
    children: ReactNode;
}

const FtfStatistic = ({ type, children}: IVisit) => {
    return (  
            <div className="item-statistic">
                   <div className="item-statistic__title">{type}</div> 
                   <div className="item-statistic__sub-title">
                   {children}
                   </div>
            </div>
    );
}
 
export default FtfStatistic;