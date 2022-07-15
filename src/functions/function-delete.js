import { Navigate } from "react-router-dom";
import { delete_cookie } from "sfcookies";
import RefreshPage from "./function-reload";

export default function FunctionLogout(){
	delete_cookie("authorization")
    RefreshPage()
	Navigate("/");
};