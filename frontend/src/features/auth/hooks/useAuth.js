import { useContext } from "react";
import { AuthContext } from "../auth.context";

//custome hook to acess the authContext and all its value's in an easy way 
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}