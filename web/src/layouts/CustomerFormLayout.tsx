import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Input } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons";

const CustomerDataSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be atleast 3 charecters length" })
    .max(50, { message: "Name should not exceed 50 charecters length" }),
  email: z.string().optional(),
  phone: z
    .string()
    .max(20, {
      message: "Mobile number should not exceed 20 charecters length",
    })
    .optional(),
  address: z.string().max(100, { message: "Address is required" }).optional(),
});

export type CustomerData = z.infer<typeof CustomerDataSchema>;

const resolver = zodResolver(CustomerDataSchema);

type CustomerFormLayoutProps = {
  defaultValues?: CustomerData;
  onCustomerSubmit: (data: CustomerData) => void;
};

const CustomerFormLayout = ({
  defaultValues,
  onCustomerSubmit,
}: CustomerFormLayoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerData>({
    defaultValues,
    resolver,
    reValidateMode: "onChange",
  });
  console.log("🚀 ~ file: CustomerFormLayout.tsx:39 ~ errors", errors);

  const onSubmit = handleSubmit((data: CustomerData) => {
    onCustomerSubmit(data);
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
          <Input id="name" placeholder="Eg: John Doe" {...register("name")} />
        </Input.Wrapper>
        <Input.Wrapper id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            placeholder="Eg: johndoe@gmail.com"
            {...register("email")}
          />
        </Input.Wrapper>
        <Input.Wrapper id="phone" label="Phone" error={errors.phone?.message}>
          <Input
            id="phone"
            placeholder="Eg: 9900245321"
            {...register("phone")}
          />
        </Input.Wrapper>
        <Input.Wrapper
          id="address"
          label="Address"
          error={errors.address?.message}
        >
          <Input
            id="address"
            placeholder="Eg: John Doe, xyz street"
            {...register("address")}
          />
        </Input.Wrapper>
        <Button type="submit" leftIcon={<IconUserPlus size={14} />}>
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CustomerFormLayout;
