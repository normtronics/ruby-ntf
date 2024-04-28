import { createContext } from 'react';

export type User = {

}

interface AuthProps {}

export const AuthContext = createContext<AuthProps | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {}