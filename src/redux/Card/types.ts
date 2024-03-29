export interface ICard {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  footer: string;
}

export interface Card {
  cards: ICard[];
}
