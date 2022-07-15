import { Navigate } from "react-router-dom";
import useAuth from "./funcion-auth"

export default function PrivateRoute({ children }) {
	const auth = useAuth();
    return auth ? children : <Navigate to="/" /> ;
};