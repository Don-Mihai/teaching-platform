const Card = ({ cardData }: any) => {
  return (
    <div className="modules-page__module">
      <img src={cardData.src} alt="" className="modules-page__img" />
      <h3 className="modules-page__title">{cardData.title}</h3>
      <h4 className="modules-page__subtitle">{cardData.subtitle}</h4>
    </div>
  );
};

export default Card;
