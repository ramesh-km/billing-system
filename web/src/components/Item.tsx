import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeItem } from "../api";
import { GetAllItems } from "../api";
import { Button } from "@mantine/core";
import {IconTrashX} from '@tabler/icons'

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
  const { mutateAsync, isLoading:isRemoveLoading } = useMutation(removeItem);

  async function remove() {
    await mutateAsync(id);
    queryClient.invalidateQueries({ queryKey: ["items"] });
  }

  type TableCellProps = {
    cellWidth?: string;
    children: React.ReactNode;
  };

  const TableCell = ({ cellWidth, children }: TableCellProps) => (
    <td style={{ width: cellWidth }}>{children}</td>
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
        <Button p={0} variant="outline" sx={{width:'35px',height:'35px'}} onClick={remove}>
          <IconTrashX color="gray"/>
        </Button>
      </TableCell>
    </tr>
  );
}

export default Item;
