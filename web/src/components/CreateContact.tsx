import { Flex, Text } from "@mantine/core";
import ContactFormLayout from "../layouts/ContactFormLayout";
import { createContact } from "../api/contacts";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ContactData } from "../layouts/ContactFormLayout";
import BreadCrumb from "../layouts/BreadCrumb";

function CreateContact() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(createContact);

  const onFormSubmit = async (data: ContactData) => {
    await mutateAsync({ ...data });
    navigate("/contacts");
  };
  return (
    <>
      <BreadCrumb title='Contacts' titlePath="/contacts" subTitle="Create Contact" subTitlePath="/create-contact" />
      <Text
        p="2rem"
        sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}
      >
        Create Item
      </Text>
      <Flex justify="center" align="center">
        <ContactFormLayout onContactSubmit={onFormSubmit} />
      </Flex>
    </>
  );
}

export default CreateContact;
