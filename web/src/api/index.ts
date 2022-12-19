import axiosInstance from "../lib/http-client";
import { ItemData } from "../layouts/ItemFormLayout";

export type GetAllItems = ItemData & {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  image: string;
  id: number; 
};


// GET  http://localhost:8080/api/items/paginated?size=5&page=0
type getAllItemsProps = {
  page: number;
  sortBy: string;
  nameOrDescriptionMatch: string;
};

export async function getAllItems({page,sortBy,nameOrDescriptionMatch
}:getAllItemsProps) {
  try {
    const response = await axiosInstance.get<GetAllItems[]>(
      `/items/paginated?size=5`,
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
