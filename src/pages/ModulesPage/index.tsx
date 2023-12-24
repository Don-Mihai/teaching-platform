import './ModulesPage.scss';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ICard } from './types';

const ModulesPage = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        const cards = (await axios.get(`http://localhost:3001/cards`)).data;
        setCardData(cards);
    };

    return (
        <div className="modules-page">
            <Header />
            <div className="modules-page__content">
                <div className="modules-page__modules">
                    {cardData.map((card: ICard) => (
                        <Card key={card.id} cardData={card} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModulesPage;
