import { createContext } from "react";
import Employee from "../interfaces/employee";

export type UserContentType = {
    employee: Employee | null;
    setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContentType>({
    employee: null,
    setEmployee: () => {},
    token: null,
    setToken: () => {},
});
