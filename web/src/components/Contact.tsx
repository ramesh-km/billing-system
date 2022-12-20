import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeContact } from "../api/contacts";
import { GetAllContacts } from "../api/contacts";
import { Button } from "@mantine/core";
import { IconTrashX } from "@tabler/icons";

function Contact(props: GetAllContacts) {
  const { id, name, email, phone, address } = props;
  const queryClient = useQueryClient();
  const { mutateAsync } =
    useMutation(removeContact);

  async function remove() {
    await mutateAsync(id);
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
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
        <Link to={`/update-contact/${id}`}>{name}</Link>
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell cellWidth="90px">
        <Button
          p={0}
          variant="outline"
          sx={{ width: "35px", height: "35px" }}
          onClick={remove}
        >
          <IconTrashX color="gray" />
        </Button>
      </TableCell>
    </tr>
  );
}

export default Contact;
