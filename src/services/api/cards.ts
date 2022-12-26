import { instance } from '../config';

export interface ICardsResponse {
  cards: ICard[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
  packName: string;
}

export interface ICard {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
}

export interface ICardParams {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
}

///////////////

export interface IAddNewCardRequest {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
}

export const cardsAPI = {
  getCards(params: ICardParams) {
    return instance.get<ICardsResponse>('/cards/card', {
      params: {
        ...params,
      },
    });
  },
  addNewCard(cardData: IAddNewCardRequest) {
    return instance.post<{ newCard: ICard }>('/cards/card', {
      ...cardData,
    });
  },
  deleteCard(id: string) {
    return instance.delete<{ deletedCard: ICardsResponse }>('/cards/card', {
      params: { id },
    });
  },
  updateCard(_id: string, question?: string) {
    return instance.put<{ updatedCard: ICardsResponse }>('/cards/card', {
      card: {
        _id,
        question,
      },
    });
  },
};
