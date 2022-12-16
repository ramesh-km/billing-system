import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../api";
import { Flex, Text } from "@mantine/core";
import { ItemData } from "../layouts/ItemFormLayout";

function Items() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  
  return (
    <Flex>
      {data?.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </Flex>
  );
}

export default Items;
