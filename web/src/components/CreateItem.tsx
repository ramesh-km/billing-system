import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Button,
  Stack,
  Text,
  Textarea,
  Flex,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";

const ItemDataSchema = z.object({
  name: z.string().min(1, { message: "Item name is required" }),
  price: z.string().min(1, { message: "Item price is required" }),
  availableQuantity: z.string(),
  allowedMinQuantity: z
    .string()
    .min(1, { message: "Allowed min. quantity is 1" }),
  allowedMaxQuantity: z
    .string()
    .max(5, { message: "Allowed max. quantity is 5" }),
  image: z.any(),
  description: z.string(),
});

type ItemData = z.infer<typeof ItemDataSchema>;

const resolver = zodResolver(ItemDataSchema);

function CreateItem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemData>({ resolver, reValidateMode: "onChange" });

  console.log(errors);


  const onSubmit = (data: ItemData) => {
    console.log(data);
    // const reader = new FileReader()
    // const output = reader.readAsDataURL(data.image[0]?.name)
  };

  return (
    <Flex justify="center" align="center" pt="4rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text sx={{ fontSize: "1.5rem", fontWeight: 600, textAlign: "center" }}>
          Item
        </Text>
        <Stack
          spacing="lg"
          align="stretch"
          justify="center"
          sx={{ width: 700, padding: "2rem", fontSize: "1.2rem" }}
        >
          <TextInput
            label="Name"
            placeholder="Eg: laptop"
            id="name"
            {...register("name")}
          />{" "}
          {errors.name && (
            <small
              style={{
                fontStyle: "italic",
                fontSize: "16px",
                color: "red",
                marginTop: "4px",
              }}
            >
              {errors.name?.message}
            </small>
          )}
          <TextInput
            label="Price"
            placeholder="Eg: Rs.50000"
            id="price"
            {...register("price")}
          />{" "}
          {errors.price && (
            <small
              style={{
                fontStyle: "italic",
                fontSize: "16px",
                color: "red",
                marginTop: "4px",
              }}
            >
              {errors.price?.message}
            </small>
          )}
          <TextInput
            label="Avl.Quantity"
            placeholder="Eg: 100"
            id="availableQuantity"
            {...register("availableQuantity")}
          />{" "}
          {errors.availableQuantity && (
            <small
              style={{
                fontStyle: "italic",
                fontSize: "16px",
                color: "red",
                marginTop: "4px",
              }}
            >
              {errors.availableQuantity?.message}
            </small>
          )}
          <TextInput
            label="Min.Qty"
            placeholder="Eg: 1"
            id="allowedMinQuantity"
            {...register("allowedMinQuantity")}
          />{" "}
          {errors.allowedMinQuantity && (
            <small
              style={{
                fontStyle: "italic",
                fontSize: "16px",
                color: "red",
                marginTop: "4px",
              }}
            >
              {errors.allowedMinQuantity?.message}
            </small>
          )}
          <TextInput
            label="Max.Qty"
            max={5}
            placeholder="Eg: 5"
            id="allowedMaxQuantity"
            {...register("allowedMaxQuantity")}
          />{" "}
          {errors.allowedMaxQuantity && (
            <small
              style={{
                fontStyle: "italic",
                fontSize: "16px",
                color: "red",
                marginTop: "4px",
              }}
            >
              {errors.allowedMaxQuantity?.message}
            </small>
          )}
          <Stack spacing={0}>

          <label htmlFor="image" style={{fontSize:'1rem'}}>Image</label>
          <input
            placeholder="Upload Image"
            type="file"
            accept="image/*"
            id="image"
            {...register("image")}
          />
          </Stack>
          <Textarea
            placeholder="About the item"
            label="Description"
            autosize
            minRows={2}
            id="description"
            {...register("description")}
          />
          <Button type="submit" leftIcon={<IconSend size={14} />}>
            Create
          </Button>
        </Stack>
      </form>
    </Flex>
  );
}

export default CreateItem;
