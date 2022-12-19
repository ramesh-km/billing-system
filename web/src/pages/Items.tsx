import { useQuery } from "@tanstack/react-query";
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
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
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
  const [page, setPage] = useState(0);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sorting, setSorting] = useState("");

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["items", page],
      queryFn: () =>
        getAllItems({ page, sortBy: sorting, nameOrDescriptionMatch: search }),
      keepPreviousData: true,
    });

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearch(value);
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
              <Th sorted={sortBy === "name"} onSort={() => setSorting("name")}>
                Name
              </Th>
              <Th
                sorted={sortBy === "price"}
                onSort={() => setSorting("price")}
              >
                Price
              </Th>
              <Th
                sorted={sortBy === "availableQuantity"}
                onSort={() => setSorting("availableQuantity")}
              >
                Available Qty
              </Th>
              <Th
                sorted={sortBy === "allowedMinQuantity"}
                onSort={() => setSorting("allowedMinQuantity")}
              >
                Allowed Min Qty
              </Th>
              <Th
                sorted={sortBy === "allowedMaxQuantity"}
                onSort={() => setSorting("allowedMaxQuantity")}
              >
                Allowed Max Qty
              </Th>
              <Th
                sorted={sortBy === "description"}
                onSort={() => setSorting("description")}
              >
                Description
              </Th>
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
            if (!isPreviousData && data.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          //@ts-ignore
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
