import { IAddPackSubmit } from 'sections/packs-page/NewPackModal';
import { instance } from 'services/config';
import { ICardPack, IGetCardsPacksParams } from 'services/type';

export const packsAPI = {
  getCardsPacks(params: IGetCardsPacksParams) {
    return instance.get('/cards/pack', {
      params: {
        ...params,
      },
    });
  },
  fetchOnePack(params: IGetCardsPacksParams) {
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
  editPack(cardPackId: string, name: string) {
    return instance.put('/cards/pack', { cardsPack: { _id: cardPackId, name } });
  },
};
