import './ModulesPage.scss';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useEffect } from 'react';
import { ICard } from '../../redux/Card/types';
import { get } from '../../redux/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

const ModulesPage = () => {
    const cards = useSelector((store: RootState) => store.card.cards);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        dispatch(get());
    };

    return (
        <div className="modules-page">
            <Header />
            <div className="modules-page__content">
                <div className="modules-page__modules">
                    {cards.map((card: ICard) => (
                        <Card key={card.id} cardData={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModulesPage;
