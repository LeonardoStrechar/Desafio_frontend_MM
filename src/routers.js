import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { read_cookie } from "sfcookies";

import Home from "./pages/home";
import Login from "./pages/login";

// function useAuth() {
// 	const token = read_cookie("authorization");
// 	if( token.length <= 0){
// 		return false;	
// 	} else {
// 		return true;
// 	}
// };

// function PrivateRoute({ children }) {
// 	const auth = useAuth();
//     return auth ? children : <Navigate to="/" /> ;
// };

export default function Rotas() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
			</Routes>
		</BrowserRouter>
	);
}