import axiosInstance from "../../lib/http-client";
import { CustomerData } from "../../layouts/CustomerFormLayout";
import { DataWithTotal, GetAllCustomersProps } from "../../types/customers";

export async function getAllCustomers({
  page,
  sortBy,
  nameOrDescriptionMatch,
}: GetAllCustomersProps) {
  try {
    const response = await axiosInstance.get<DataWithTotal>(
      `/customers/paginated?size=10`,
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
    console.log("🚀 ~ file: customers/index.ts:41 ~ error", error);
  }
}

export async function getCustomer(id: undefined | string) {
  try {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: customers/index.ts:33 ~ getCustomer ~ error", error);
  }
}

export async function createCustomer({ ...data }: CustomerData) {
  try {
    const response = await axiosInstance.post("/customers", { ...data });
  } catch (error) {
    console.log(
      "🚀 ~ file: customers/index.ts:41 ~ createCustomer ~ error",
      error
    );
  }
}

export async function updateCustomer({
  id,
  formData,
}: {
  id: string;
  formData: CustomerData;
}) {
  try {
    const response = await axiosInstance.put(`/customers/${id}`, {
      ...formData,
    });
  } catch (error) {
    console.log("🚀 ~ file: customers/index.ts:60 ~ error", error);
  }
}

export async function removeCustomer(id: number) {
  try {
    await axiosInstance.delete(`/customers/${id}`);
  } catch (error) {
    console.log(
      "🚀 ~ file: customers/index.ts:68 ~ removeCustomer ~ error",
      error
    );
  }
  return true;
}
