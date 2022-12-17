import { Flex, Text } from "@mantine/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import ItemFormLayout from "../layouts/ItemFormLayout";
import { getItem, updateItem } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { ItemData } from "../layouts/ItemFormLayout";

function UpdateItem() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery(
    ["book", { id }],
    getItem
  );
  const { mutateAsync } = useMutation(updateItem);

  const onFormSubmit = async (formData: ItemData) => {
    if (id) {
      await mutateAsync({ id, formData });
      navigate("/items");
    } else {
      return
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
      <Text
        pt="4rem"
        sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}
      >
        Update Item
      </Text>
      <Flex justify="center" align="center" pt="4rem">
        <ItemFormLayout defaultValues={data} onFormSubmit={onFormSubmit} />
      </Flex>
    </>
  );
}

export default UpdateItem;
