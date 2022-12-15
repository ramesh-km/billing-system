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
  Input,
} from "@mantine/core";
import { IconSend } from "@tabler/icons";

const ItemDataSchema = z.object({
  name: z.string().min(1, { message: "Item name is required" }),
  price: z.string().min(1, { message: "Item price is required" }),
  availableQuantity: z.string().min(1,{message:'Available Qty is required'}),
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
          <Input.Wrapper id="name" label="Name" error={errors.name?.message}>
            <Input id="name" placeholder="Eg: laptop" {...register("name")} />
          </Input.Wrapper>
          <Input.Wrapper id="price" label="Price" error={errors.price?.message}>
            <Input id="price" placeholder="Eg: 10000" {...register("price")} />
          </Input.Wrapper>
          <Input.Wrapper
            id="availableQuantity"
            label="Avl.Quantity"
            error={errors.availableQuantity?.message}
          >
            <Input
              id="availableQuantity"
              placeholder="Eg: 140"
              {...register("availableQuantity")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="allowedMinQuantity"
            label="Min.Qty"
            error={errors.allowedMinQuantity?.message}
          >
            <Input
              id="allowedMinQuantity"
              placeholder="Eg: 1"
              {...register("allowedMinQuantity")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="allowedMaxQuantity"
            label="Max.Qty"
            error={errors.allowedMaxQuantity?.message}
          >
            <Input
              id="allowedMaxQuantity"
              placeholder="Eg: 5"
              {...register("allowedMaxQuantity")}
            />
          </Input.Wrapper>

          <Stack spacing={0}>
            <label htmlFor="image" style={{ fontSize: "1rem" }}>
              Image
            </label>
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
