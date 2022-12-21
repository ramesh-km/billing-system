import { ItemData } from './../layouts/ItemFormLayout';


export type GetAllItems = ItemData & {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  image: string;
  id: number;
};

export type DataWithTotal = {
  data: GetAllItems[];
  total: number;
};

export type GetAllItemsProps = {
  page: number;
  sortBy: string;
  nameOrDescriptionMatch: undefined | string;
};