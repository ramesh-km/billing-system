import { z } from "zod";
import { useForm,Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Stack,
  Text,
  Textarea,
  Flex,
  Input,NumberInput
} from "@mantine/core";
import { IconSend } from "@tabler/icons";

const ItemDataSchema = z.object({
  name: z.string().min(1, { message: "Item name is required" }),
  price: z.number().min(1, { message: "Item price is required" }),
  availableQuantity: z
    .string()
    .min(1, { message: "Available Qty is required" }),
  allowedMinQuantity: z
    .string()
    .min(1, { message: "Allowed min. quantity is 1" }),
  allowedMaxQuantity: z
    .string()
    .max(5, { message: "Allowed max. quantity is 5" }),
  image: z.any(),
  description: z.string(),
});

export type ItemData = z.infer<typeof ItemDataSchema>;

const resolver = zodResolver(ItemDataSchema);

type ItemFormLayoutProps = {
    defaultValues?: ItemData,
    onFormSubmit: ItemData
}

function ItemFormLayout({defaultValues,onFormSubmit}: ItemFormLayoutProps) {
  const {
    register,control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemData>({defaultValues, resolver, reValidateMode: "onChange" });

  console.log(errors);

    const onSubmit = handleSubmit((data: ItemData) => {
      onFormSubmit(data)
    console.log(data);
    // const reader = new FileReader()
    // const output = reader.readAsDataURL(data.image[0]?.name)
  });

  return (
    <form onSubmit={onSubmit}>
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
          <Controller
          control={control}
            name="price"
            render={({ field }) => {
              return (
                <input
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              );
            }}
          />
          {/* <Input id="price" placeholder="Eg: 10000" {...register("price")} /> */}
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
  );
}

export default ItemFormLayout;
