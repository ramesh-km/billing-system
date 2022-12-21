import { Flex, Text } from "@mantine/core";
import CustomerFormLayout from "../layouts/CustomerFormLayout";
import { createCustomer } from "../api/customers";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CustomerData } from "../layouts/CustomerFormLayout";
import BreadCrumb from "../layouts/BreadCrumb";

function CreateCustomer() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(createCustomer);

  const onFormSubmit = async (data: CustomerData) => {
    await mutateAsync({ ...data });
    navigate("/customer");
  };
  return (
    <>
      <BreadCrumb
        title="Customers"
        titlePath="/customers"
        subTitle="Create Customer"
        subTitlePath="/create-customer"
      />
      <Text
        p="2rem"
        sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}
      >
        Create Item
      </Text>
      <Flex justify="center" align="center">
        <CustomerFormLayout onCustomerSubmit={onFormSubmit} />
      </Flex>
    </>
  );
}

export default CreateCustomer;
