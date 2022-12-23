import { Flex, Text } from "@mantine/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import CustomerFormLayout from "../layouts/CustomerFormLayout";
import { getCustomer, updateCustomer } from "../api/customers";
import { useParams, useNavigate } from "react-router-dom";
import { CustomerData } from "../layouts/CustomerFormLayout";
import BreadCrumb from "../layouts/BreadCrumb";

function UpdateCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery(["customer", id], () =>
    getCustomer(id)
  );
  const { mutateAsync } = useMutation(updateCustomer);

  const onFormSubmit = async (formData: CustomerData) => {
    if (id) {
      await mutateAsync({ id, formData });
      navigate("/customers");
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
      <BreadCrumb
        title="Customers"
        titlePath="/customers"
        subTitle="Update Customer"
        subTitlePath="/update-customer"
      />
      <Text
        p="2rem"
        sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}
      >
        Update Item
      </Text>
      <Flex justify="center" align="center">
        <CustomerFormLayout
          defaultValues={data}
          onCustomerSubmit={onFormSubmit}
        />
      </Flex>
    </>
  );
}

export default UpdateCustomer;
