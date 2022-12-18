import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../api";
import { Flex, Text, Table, Title, Button } from "@mantine/core";
import Item from "../components/Item";
import { IconPlus } from "@tabler/icons";
import { Link } from "react-router-dom";
import { TableSort } from "../components/ItemsTable";

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

  const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <th style={{ textAlign: "center" }}>{children}</th>
  );

  return (
    <Flex direction={"column"} p="lg">
      <Button
        sx={{ width:'150px' }}
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
      >
        <Link
          to="/create-item"
          style={{ textDecoration: "none", color: "white",alignItems:'center',display:'flex' }}
        >
          <IconPlus />
          Add Item
        </Link>
      </Button>
      <Title order={1} align="center" my="lg">
        Items
      </Title>
      <TableSort data={data} />
      {/* <Table striped>
        <thead>
          <tr>
            <TableHeader> Name           </TableHeader>
            <TableHeader> Price          </TableHeader>
            <TableHeader> Available Qty  </TableHeader>
            <TableHeader> Allowed min Qty</TableHeader>
            <TableHeader> Allowed max Qty</TableHeader>
            <TableHeader> Description    </TableHeader>
            <TableHeader> Remove          </TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </tbody>
      </Table> */}
    </Flex>
  );
}

export default Items;
