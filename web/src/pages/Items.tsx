import { useQuery,useQueryClient } from "@tanstack/react-query";
import { getAllItems } from "../api";
import Item from "../components/Item";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
} from "@mantine/core";

import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
} from "@tabler/icons";

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
  // const Icon = 
  //     ? IconChevronUp
  //     : IconChevronDown
  //   : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            {/* <Icon size={14} stroke={1.5} /> */}
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function Items() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState();
  const [sorting, setSorting] = useState("updatedAt");

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["items", page],
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
  }, [data, isPreviousData, page, queryClient]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (value !== undefined) {
        setSearch(undefined);
      } else {
        setSearch(value);
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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

  const rows = data.map((item) => <Item key={item.id} {...item} />);

  return (
    <Flex direction={"column"} p="lg">
      <Button
        sx={{ width: "150px" }}
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
      >
        <Link
          to="/create-item"
          style={{
            textDecoration: "none",
            color: "white",
            alignItems: "center",
            display: "flex",
          }}
        >
          <IconPlus />
          Add Item
        </Link>
      </Button>
      <Title order={1} align="center" my="lg">
        Items
      </Title>
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={value}
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
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>{" "}
        <span>Current Page: {page + 1}</span>
        <button
          onClick={() => {
            //@ts-ignore
            setPage((old) => (data?.hasMore ? old + 1 : old));
          }} //@ts-ignore
          disabled={isPreviousData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}
      </ScrollArea>
    </Flex>
  );
}

export default Items;
