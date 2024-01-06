
const Card = ({ cardData }: any) => {
    return (
        <div className="modules-page__module">
            <img src={cardData.src} alt="" className="modules-page__img" />
            <h3 className="modules-page__title">{cardData.title}</h3>
            <h4 className="modules-page__subtitle">{cardData.subtitle}</h4>
<<<<<<< HEAD
=======
            {/* <div className="modules-page__card-footer">
                <p className="modules-page__card-footer_text">{cardData.footer}</p>
                <Button className="modules-page__button" variant="contained" size="small">
                    More info
                </Button>
            </div> */}
>>>>>>> b86afed7297cd1de8d65dc1fe3941eaf51fd0be5
        </div>
    );
};

export default Card;
