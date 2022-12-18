import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItem } from "../api";
import { GetAllItems } from "../api";
import { Button } from "@mantine/core";

function Item(props: GetAllItems) {
  const {
    id,
    name,
    price,
    availableQuantity,
    allowedMinQuantity,
    allowedMaxQuantity,
    description,
  } = props;
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(removeItem);

  async function remove() {
    await mutateAsync(id);
    queryClient.invalidateQueries({ queryKey: ["items"] });
  }

  type TableCellProps = {
    cellWidth?: string;
    children: React.ReactNode;
  };

  const TableCell = ({ cellWidth, children }: TableCellProps) => (
    <td style={{ textAlign: "center", width: cellWidth }}>{children}</td>
  );

  return (
    <tr key={id}>
      <TableCell>
        <Link to={`/update-item/${id}`}>{name}</Link>
      </TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{availableQuantity}</TableCell>
      <TableCell>{allowedMinQuantity}</TableCell>
      <TableCell>{allowedMaxQuantity}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell cellWidth="90px">
        <Button variant="outline" size="xs" onClick={remove}>
          Remove
        </Button>
      </TableCell>
    </tr>
  );
}

export default Item;
