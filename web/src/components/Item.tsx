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
  return (
    <tr key={id}>
      <td>
        <Link to={`/update-item/${id}`}>{name}</Link>
      </td>
      <td>{price}</td>
      <td>{availableQuantity}</td>
      <td>{allowedMinQuantity}</td>
      <td>{allowedMaxQuantity}</td>
      <td>{description}</td>
      <td>
        <Button variant="outline" size="xs" onClick={remove}>
          Remove
        </Button>
      </td>
    </tr>
  );
}

export default Item;
