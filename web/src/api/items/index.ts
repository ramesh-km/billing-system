import axiosInstance from "../../lib/http-client";
import { DataWithTotal, GetAllItemsProps } from "../../types/items";
import { ItemData } from "../../layouts/ItemFormLayout";

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
    console.log("🚀 ~ file: items/index.ts:24 ~ error", error);
  }
}

export async function getItem(id: undefined | string) {
  try {
    const response = await axiosInstance.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: items/index.ts:34 ~ getItem ~ error", error);
  }
}

export async function createItem({ ...data }: ItemData) {
  try {
    const response = await axiosInstance.post("/items", { ...data });
  } catch (error) {
    console.log("🚀 ~ file: items/index.ts:42 ~ createItem ~ error", error);
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
    console.log("🚀 ~ file: items/index.ts:56 ~ error", error);
  }
}

export async function removeItem(id: number) {
  try {
    await axiosInstance.delete(`/items/${id}`);
  } catch (error) {
    console.log("🚀 ~ file: items/index.ts:64 ~ removeItem ~ error", error);
  }
  return true;
}
