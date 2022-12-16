import { Flex, Text } from "@mantine/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import ItemFormLayout from "../layouts/ItemFormLayout";
import { getItem, updateItem } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { ItemData } from "../layouts/ItemFormLayout";

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery(
    ["book", { id }],
    getItem
  );
  const { mutateAsync } = useMutation(updateItem);

  const onFormSubmit = async (formData: ItemData) => {
    await mutateAsync({ ...formData, id });
    navigate("/");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <Flex justify="center" align="center" pt="4rem">
      <>
      <Text sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}>
        Update Item
      </Text>
      <ItemFormLayout defaultValues={data} onFormSubmit={onFormSubmit} />
      </>
    </Flex>
  );
}

export default UpdateItem;
