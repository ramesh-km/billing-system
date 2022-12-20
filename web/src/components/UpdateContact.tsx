import { Flex, Text } from "@mantine/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import ContactFormLayout from "../layouts/ContactFormLayout";
import { getContact, updateContact } from "../api/contacts";
import { useParams, useNavigate } from "react-router-dom";
import { ContactData } from "../layouts/ContactFormLayout";
import BreadCrumb from "../layouts/BreadCrumb";

function UpdateContact() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery(
    ["contact", { id }],
    getContact
  );
  const { mutateAsync } = useMutation(updateContact);

  const onFormSubmit = async (formData: ContactData) => {
    if (id) {
      await mutateAsync({ id, formData });
      navigate("/contacts");
    } else {
      return;
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError && error instanceof Error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!data) {
    return null;
  }
  return (
    <>
      <BreadCrumb title='Contacts' titlePath="/contacts" subTitle="Update Item" subTitlePath="/update-item" />
      <Text
        p="2rem"
        sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}
      >
        Update Item
      </Text>
      <Flex justify="center" align="center">
        <ContactFormLayout defaultValues={data} onContactSubmit={onFormSubmit} />
      </Flex>
    </>
  );
}

export default UpdateContact;
