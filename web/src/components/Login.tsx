import React, { useState } from "react";
import axiosInstance from "../lib/http-client";
import useAuth from "../hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Input,
} from "@mantine/core";

function Login() {
  const auth = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", { ...user });
      auth.login(response.data.token, response.data.user);
      console.log(
        "🚀 ~ file: Login.tsx:31 ~ handleLogin ~ response",
        response.data
      );

      setUser({ email: "", password: "" });
    } catch (error) {
      console.log("🚀 ~ file: Login.tsx:39 ~ handleLogin ~ error", error);
    }
  };
  if (auth.token) return <Navigate to="/" />;
  return (
    <form onSubmit={handleLogin}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Link style={{ textDecoration: "none" }} to="/signup">
            Create account
          </Link>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Input.Wrapper id="email" label="Email">
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
          <Group position="apart" mt="lg">
            <Link to="/forgot-password" style={{textDecoration:'none'}}>Forgot password?</Link>
          </Group>
          <Button fullWidth mt="xl">
            Logn In
          </Button>
        </Paper>
      </Container>
    </form>
  );
}

export default Login;
