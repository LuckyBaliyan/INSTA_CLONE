import { createContext, useState, useEffect } from "react";
import { register, login } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({children}){
     
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (userName, password)=>{
        setLoading(true);

        try{
            const data = await login(userName, password);
            setUser(data.user);
            return data;
        }
        catch(err){
            console.log(err);
            throw err;
        }
        finally{
            setLoading(false);
        }
    }

    const handleRegister = async (userName, email, password)=>{
        setLoading(true);

        try{
           const data = await register(userName, email, password);
           setUser(data.user);
           return data;
        }
        catch(err){
           console.log(err);
           throw err;
        }
        finally{
           setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{user, loading, handleLogin, handleRegister}}>
            {children}
        </AuthContext.Provider>
    )

}
