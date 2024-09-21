import { FindOperator, ILike } from 'typeorm';

export const ILikeWildCarded = (value: string): FindOperator<string> => {
  return ILike(`%${value}%`);
};
