import { Flex, Text } from "@mantine/core";
import ItemFormLayout from "../layouts/ItemFormLayout";
import { createItem } from "../api/items";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ItemData } from "../layouts/ItemFormLayout";
import BreadCrumb from "../layouts/BreadCrumb";

function CreateItem() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(createItem);

  const onFormSubmit = async (data: ItemData) => {
    await mutateAsync({ ...data });
    navigate("/items");
  };
  return (
    <>
      <BreadCrumb title='Items' titlePath="/items" subTitle="Create Item" subTitlePath="/create-item" />
      <Text
        p="2rem"
        sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}
      >
        Create Item
      </Text>
      <Flex justify="center" align="center">
        <ItemFormLayout onItemSubmit={onFormSubmit} />
      </Flex>
    </>
  );
}

export default CreateItem;
