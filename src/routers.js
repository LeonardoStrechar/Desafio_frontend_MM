import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./functions/function-private-route";
import CrudContent from "./pages/crud-content";
import CrudModules from "./pages/crud-modules";
import CrudCourses from "./pages/crud-courses";
import CrudUsers from "./pages/crud-users";

export default function Rotas() {
	return (
		<BrowserRouter>
			<Routes>
				{/* puiblic route */}
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* private route */}
				<Route
					path="/home"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path="/Content"
					element={
						<PrivateRoute>
							<CrudContent />
						</PrivateRoute>
					}
				/>
				<Route
					path="/Modules"
					element={
						<PrivateRoute>
							<CrudModules />
						</PrivateRoute>
					}
				/>
				<Route
					path="/Courses"
					element={
						<PrivateRoute>
							<CrudCourses />
						</PrivateRoute>
					}
				/>
				<Route
					path="/Users"
					element={
						<PrivateRoute>
							<CrudUsers />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
