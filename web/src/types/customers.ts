import { CustomerData } from "../layouts/CustomerFormLayout";

export type GetAllCustomers = CustomerData & {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  id: number;
};

export type DataWithTotal = {
  data: GetAllCustomers[];
  total: number;
};

export type GetAllCustomersProps = {
  page: number;
  sortBy: string;
  nameOrDescriptionMatch: undefined | string;
};
