import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../api";
import { Flex, Text, Table, Title } from "@mantine/core";
import Item from "../components/Item";

function Items() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });

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
    <Flex direction={"column"} p="lg">
      <Title order={1} align="center" my="lg">
        Items
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th> Price</th>
            <th> Available Qty</th>
            <th> Allowed min Qty</th>
            <th> Allowed max Qty</th>
            <th> Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </tbody>
      </Table>
    </Flex>
  );
}

export default Items;
