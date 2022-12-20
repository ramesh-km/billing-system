import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllItems } from "../api/items";
import Item from "../components/Item";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDebouncedState } from "@mantine/hooks";
import {
  Flex,
  Text,
  Table,
  Title,
  Button,
  createStyles,
  ScrollArea,
  UnstyledButton,
  Group,
  Center,
  TextInput,
  Pagination,
  Paper,
} from "@mantine/core";

import { IconSelector, IconSearch, IconPlus } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  onSort(): void;
}

function Th({ children, reversed, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function Items() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useDebouncedState<undefined | string>(
    undefined,
    500
  );

  const [sorting, setSorting] = useState("updatedAt");

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["items", page, search, sorting],
      queryFn: () =>
        getAllItems({ page, sortBy: sorting, nameOrDescriptionMatch: search }),
      keepPreviousData: true,
      staleTime: 5000,
    }); 

  // Prefetch the next page!
  useEffect(() => {
    //@ts-ignore
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["items", page + 1],
        queryFn: () =>
          getAllItems({
            page: page + 1,
            sortBy: sorting,
            nameOrDescriptionMatch: search,
          }),
      });
    }
  }, [data, isPreviousData, page, queryClient, search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
    <Flex direction={"column"} p="lg">
      <Title order={1} align="center" my="lg">
        Items
      </Title>
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          defaultValue={search}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: "fixed", minWidth: 700 }}
        >
          <thead>
            <tr>
              <Th onSort={() => setSorting("name")}>Name</Th>
              <Th onSort={() => setSorting("price")}>Price</Th>
              <Th onSort={() => setSorting("availableQuantity")}>
                Available Qty
              </Th>
              <Th onSort={() => setSorting("allowedMinQuantity")}>
                Allowed Min Qty
              </Th>
              <Th onSort={() => setSorting("allowedMaxQuantity")}>
                Allowed Max Qty
              </Th>
              <Th onSort={() => setSorting("description")}>Description</Th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length > 0 ? (
              data.data.map((item) => <Item key={item.id} {...item} />)
            ) : (
              <tr>
                <td colSpan={6}>
                  {" "}
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>{" "}
              </tr>
            )}
          </tbody>
        </Table>
        <Button variant="outline">
          <Link
            to="/create-item"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconPlus />
            Add Item
          </Link>
        </Button>
        <Center py="2rem">
          {data?.total / 10 > 1 ? (
            <Pagination
              total={data.total / 10}
              page={page}
              onChange={setPage}
              initialPage={0}
            />
          ) : null}
          {isFetching ? <span> Loading...</span> : null}
        </Center>
      </ScrollArea>
    </Flex>
  );
}

export default Items;
