import { instance } from 'services/config';
import {
  GradeType,
  IAddNewCardRequest,
  ICard,
  ICardParams,
  ICardsResponse,
} from 'services/type';

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
