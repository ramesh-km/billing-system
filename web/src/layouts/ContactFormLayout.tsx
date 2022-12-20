import { z } from "zod";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Input} from "@mantine/core";
import {IconUserPlus} from '@tabler/icons' 


const ContactDataSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().min(3, { message: "Email is required" }),
  phone: z.string().min(6, { message: "Mobile number is required" }),
  address: z.string(),
});

export type ContactData = z.infer<typeof ContactDataSchema>;

const resolver = zodResolver(ContactDataSchema);

type ContactFormLayoutProps = {
  defaultValues?: ContactData;
  onContactSubmit: (data: ContactData) => void;
};

const ContactFormLayout = ({
  defaultValues,
  onContactSubmit,
}: ContactFormLayoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    defaultValues,
    resolver,
    reValidateMode: "onChange",
  });
  console.log("🚀 ~ file: ContactFormLayout.tsx:39 ~ errors", errors);

  const onSubmit = handleSubmit((data: ContactData) => {
    onContactSubmit(data);
    console.log("🚀 ~ file: ContactFormLayout.tsx:50 ~ onSubmit ~ data", data);
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
          <Input id="email" placeholder="Eg: johndoe@gmail.com" {...register("email")} />
        </Input.Wrapper>
        <Input.Wrapper id="phone" label="Phone" error={errors.phone?.message}>
          <Input id="phone" placeholder="Eg: 9900245321" {...register("phone")} />
        </Input.Wrapper>
        <Input.Wrapper id="address" label="Address" error={errors.address?.message}>
          <Input id="address" placeholder="Eg: John Doe, xyz street" {...register("address")} />
        </Input.Wrapper>
        <Button type="submit" leftIcon={<IconUserPlus size={14} />}>
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default ContactFormLayout;
