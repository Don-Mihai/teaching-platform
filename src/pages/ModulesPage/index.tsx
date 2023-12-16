import './ModulesPage.scss';
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import cardData from '../../utils/cards';
const ModulesPage = () => {
    return (
        <div className="modules-page">
            <Header />
            <div className="modules-page__content">
                <div className="modules-page__modules">
                   {cardData.map((card: any)=> <Card cardData={card}/>)}
                </div>
            </div>
        </div>
    );
};

export default ModulesPage;
