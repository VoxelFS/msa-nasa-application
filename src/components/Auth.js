import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (user, password) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "id": 0,
        "name": user,
        "email": password
        });

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };

        const res = await fetch("https://msa-nasa-project.azurewebsites.net/api/Users/login", requestOptions);
        if (res.ok === true) {
            setUser(user);
        }
        else {
            setUser(null);
        }
    }

    const logout = () => {
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}