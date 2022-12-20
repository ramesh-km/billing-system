import axiosInstance from "../../lib/http-client";
import { ItemData } from "../../layouts/ItemFormLayout";

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


type GetAllItemsProps = {
  page: number;
  sortBy: string;
  nameOrDescriptionMatch: undefined | string;
};

export async function getAllItems({
  page,
  sortBy,
  nameOrDescriptionMatch,
}: GetAllItemsProps) {
  try {
    const response = await axiosInstance.get<DataWithTotal>(
      `/items/paginated?size=10`,
      {
        params: {
          page,
          sortBy,
          nameOrDescriptionMatch,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getItem({ queryKey }: any) {
  const [_key, { id }] = queryKey;
  try {
    const response = await axiosInstance.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createItem({ ...data }: ItemData) {
  try {
    const response = await axiosInstance.post("/items", { ...data });
  } catch (error) {
    console.log(error);
  }
}

export async function updateItem({
  id,
  formData,
}: {
  id: string;
  formData: ItemData;
}) {
  try {
    const response = await axiosInstance.put(`/items/${id}`, { ...formData });
  } catch (error) {
    console.log(error);
  }
}

export async function removeItem(id: number) {
  try {
    const response = axiosInstance.delete(`/items/${id}`);
  } catch (error) {
    console.log(error);
  }
  return true;
}
