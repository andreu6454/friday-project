import { instance } from 'services/config';

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

export interface BaseCard {
  cardsPack_id: string;
  shots?: number;
  grade: number;
  answer?: string;
  question?: string;
}

export type GradeType = Omit<ICard, 'answer' | 'question' | 'created' | 'updated'> & {
  card_id: string;
};

export interface ICard extends BaseCard {
  user_id: string;
  created: string;
  updated: string;
  _id: string;
}

///////////////

export interface IAddNewCardRequest extends BaseCard {
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
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

export const cardsAPI = {
  getCards(params: ICardParams) {
    return instance.get<ICardsResponse>('/cards/card', {
      params: {
        ...params,
      },
    });
  },
  addNewCard(newCard: IAddNewCardRequest) {
    return instance.post<{ newCard: ICard }>('/cards/card', {
      card: { ...newCard },
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
  grade(grade: number, cardId: string) {
    return instance.put<{ updatedGrade: GradeType }>('/cards/grade', {
      grade,
      card_id: cardId,
    });
  },
};
