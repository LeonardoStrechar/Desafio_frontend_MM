import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./functions/function-private-route";
import EditContent from "./pages/crud-content";

export default function Rotas() {
	return (
		<BrowserRouter>
			<Routes>
				{/* puiblic route */}
				<Route path="/" element={<Login/>} />
				<Route path="/register" element={<Register/>} />

				{/* private route */}
                <Route path="/home" element={
					<PrivateRoute>
						<Home/>
					</PrivateRoute>
				} />

				<Route path="/Edit/Content" element={
					<PrivateRoute>
						<EditContent/>
					</PrivateRoute>
				} />
			</Routes>
		</BrowserRouter>
	);
}