import React, { useState } from "react";
import axiosInstance from "../lib/http-client";
import useAuth from "../hooks/useAuth";
import {Link, Navigate } from "react-router-dom";
import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Input,
} from "@mantine/core";

function SignUp() {
  const auth = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/sign-up", { ...user });
      auth.login(response.data.token, response.data.user);
      console.log(
        "🚀 ~ file: Login.tsx:31 ~ handleLogin ~ response",
        response.data
      );

      setUser({name:'', email: "", password: "" });
    } catch (error) {
      console.log("🚀 ~ file: Login.tsx:39 ~ handleLogin ~ error", error);
    }
  };
  if (auth.token) return <Navigate to="/" />;
  return (
    <form onSubmit={handleSignup}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Create an account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/login">
            Login
          </Link>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Input.Wrapper id="name" label="Name">
            <Input
              id="name"
              name="name"
              placeholder="Eg: John Doe"
              value={user.name}
              onChange={handleChange}
            />
          </Input.Wrapper>
          <Input.Wrapper id="email" label="Email" pt="lg">
            <Input
              id="email"
              name="email"
              placeholder="Eg: johndoe@gmail.com"
              value={user.email}
              onChange={handleChange}
            />
          </Input.Wrapper>
          <Input.Wrapper id="password" label="Password" pt="lg">
            <PasswordInput
              id="password"
              name="password"
              placeholder="Your password"
              value={user.password}
              onChange={handleChange}
            />
          </Input.Wrapper>
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </Paper>
      </Container>
    </form>
  );
}

export default SignUp;
