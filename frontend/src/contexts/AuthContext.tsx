import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiLogin, apiLogout, apiMe } from "@/lib/api";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifier l'état de session via le backend
        apiMe()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            await apiLogin(username, password);
            setIsAuthenticated(true);
            return true;
        } catch {
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = async () => {
        try {
            await apiLogout();
        } finally {
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

