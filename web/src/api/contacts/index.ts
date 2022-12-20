import axiosInstance from "../../lib/http-client";
import { ContactData } from "./../../layouts/ContactFormLayout";

export type GetAllContacts = ContactData & {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  id: number;
};

export type DataWithTotal = {
  data: GetAllContacts[];
  total: number;
};

type getAllContactsProps = {
  page: number;
  sortBy: string;
  nameOrDescriptionMatch: undefined | string;
};

export async function getAllContacts({
  page,
  sortBy,
  nameOrDescriptionMatch,
}: getAllContactsProps) {
  try {
    const response = await axiosInstance.get<DataWithTotal>(
      `/contacts/paginated?size=10`,
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
    console.log("🚀 ~ file: index.ts:41 ~ error", error);
  }
}

export async function getContact({ queryKey }: any) {
  const [_key, { id }] = queryKey;
  try {
    const response = await axiosInstance.get(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createContact({ ...data }: ContactData) {
  try {
    const response = await axiosInstance.post("/contacts", { ...data });
  } catch (error) {
    console.log(error);
  }
}

export async function updateContact({
  id,
  formData,
}: {
  id: string;
  formData: ContactData;
}) {
  try {
    const response = await axiosInstance.put(`/contacts/${id}`, { ...formData });
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(id: number) {
  try {
    const response = axiosInstance.delete(`/contacts/${id}`);
  } catch (error) {
    console.log(error);
  }
  return true;
}
