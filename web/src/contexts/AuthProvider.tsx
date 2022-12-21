import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { createContext, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type User = {
    name?: string | undefined;
    email: string;
    password: string;
}

interface IAuthContext {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  user: null,
  login: () => null,
  logout: () => null,
});

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage<string | null>({
    key: "token",
    defaultValue: null,
    deserialize,
  });
  const [user, setUser] = useLocalStorage<User | null>({
    key: "user",
    defaultValue: null,
    deserialize,
  });

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function deserialize(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

export default AuthProvider;
