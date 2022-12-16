import axiosInstance from "../lib/http-client";
import { ItemData } from "../layouts/ItemFormLayout";


export async function getAllItems() {
  try {
    const response = await axiosInstance.get<ItemData[]>("/items/paginated");
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function getItem({ queryKey }) {
  console.log('get item',typeof(queryKey))
  const [_key, { id }] = queryKey;
  try {
    const response = await axiosInstance.get(`/items/${id}`);
    return response.data
  } catch (error) {
    console.log(error);
  }
}


export async function createItem({ ...data }:ItemData) {
  try {
    const response = await axiosInstance.post("/items", { ...data });
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function updateItem({ id, ...data }:{id:number, data: ItemData}) {
  try {
    const response = await axiosInstance.put(`/items/${id}`, { data });
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function removeItem(id:number) {
  try {
    const response = axiosInstance.delete(`/items/${id}`);
  } catch (error) {
    console.log(error);
  }
  return true;
}
