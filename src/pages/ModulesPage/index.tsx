import './ModulesPage.scss';
import Header from '../../components/Header';
import Card from '../../components/Card';
import cardData from '../../utils/cards';
const ModulesPage = () => {
    return (
        <div className="modules-page">
            <Header />
            <div className="modules-page__content">
                <div className="modules-page__modules">
                    {cardData.map((card: any) => (
                        <Card cardData={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModulesPage;
