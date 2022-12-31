///auth API types

export interface GetLoginType {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ResponseLoginDataType {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
}

export interface ResponseRegisterDataType {
  addedUser: object;
  error?: string;
}

export interface getRegisterType {
  email: string;
  password: string;
}

export interface ResponseLogOutDataType {
  info: string;
  error?: string;
}
export interface ResponseUpdateUserDataType {
  updatedUser: ResponseLoginDataType;
  error?: string;
}
export interface GetForgotPasswordDataType {
  email: string;
  from: string;
  message: string;
}
export interface ResponseNewPassword {
  info: string;
  error?: string;
}
export interface GetSetNewPasswordDataType {
  password: string;
  resetPasswordToken: string;
}

//pack types

export interface ICardPack {
  _id: string;
  user_id?: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
  private: boolean;
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

////cards API types

export interface ICardsResponse {
  cards: ICard[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
  packName: string;
  private: boolean;
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
