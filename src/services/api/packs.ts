import { IAddPackSubmit } from 'sections/packs-page/NewPackModal';
import { instance } from 'services/config';

export interface ICardPack {
  _id: string;
  user_id?: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
}

export interface ICardsPacks {
  cardPacks: ICardPack[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
}

export interface IGetCardsPacksParams {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
}

export const packsAPI = {
  getCardsPacks(params: IGetCardsPacksParams) {
    return instance.get('/cards/pack', {
      params: {
        ...params,
      },
    });
  },
  addCardPack(userData: IAddPackSubmit) {
    return instance.post<{ newCardsPack: ICardPack }>('/cards/pack', {
      cardsPack: userData,
    });
  },
  deletePack(cardPackId: string) {
    return instance.delete('/cards/pack', { params: { id: cardPackId } });
  },
};
