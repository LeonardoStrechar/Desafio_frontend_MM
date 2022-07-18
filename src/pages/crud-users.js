import axios from "axios";
import React, { useEffect, useState } from "react";
import { read_cookie } from "sfcookies";
import Card from "../components/card/card";
import HeaderLogout from "../components/header-logout/header-logout";

export default function CrudUsers() {
	const [Users, SetUsers] = useState([]);
	const [Name, SetName] = useState("");
	const [Email, SetEmail] = useState("");
	const [Password, SetPassword] = useState("");
	const [AlterPassword, SetAlterPassword] = useState("");
	const [IdDelete, SetIdDelete] = useState("");
	const [NameAlter, SetNameAlter] = useState("");
	const [IdUserAlter, SetIdUserAlter] = useState("");

	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.REACT_APP_URL_BACKEND}/users`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetUsers(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados.");
			});
	}, []);

	function CreateModules() {
		const authorization = read_cookie("authorization");
		axios
			.post(
				`${process.env.REACT_APP_URL_BACKEND}/register`,
				{
					name: Name,
					email: Email,
					password: Password,
				},
				{
					headers: {
						authorization: `Bearer ${authorization}`,
					},
				}
			)
			.then((response) => window.location.reload())
			.catch(() => {
				alert("Não foi possivel realizar seu cadastro!");
			});
	}

	async function AlterUsers() {
		const authorization = read_cookie("authorization");
		await axios
			.put(
				`${process.env.REACT_APP_URL_BACKEND}/users/${IdUserAlter}`,
				{
					name: NameAlter,
					password: AlterPassword,
				},
				{
					headers: {
						authorization: `Bearer ${authorization}`,
					},
				}
			)
			.then((response) => window.location.reload())
			.catch(() => {
				alert("Não foi possivel realizar sua alteração!");
			});
	}

	async function DeleteModules() {
		const authorization = read_cookie("authorization");
		await axios
			.delete(`${process.env.REACT_APP_URL_BACKEND}/users/${IdDelete}`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => window.location.reload())
			.catch(() => {
				alert("Não foi possivel deletar!");
			});
	}

	return (
		<div>
			<HeaderLogout />
			<div className="container-home-header">
				<div className="title">
					<h1>CRUD de usuários</h1>
				</div>
				<button className="container-home-button">
					<a className="text-black" href="/home">
						Menu
					</a>
				</button>
			</div>
			<div className="container-crud">
				<div className="container-crud-list">
					{Users?.map((info) => (
						<Card key={info.id} pointOne={info.id} pointTwo={info.name} pointThree={info.email} />
					))}
				</div>
				<div className="container-crud-create">
					<div>
						<h1>Cadastrar</h1>
						<input onChange={(e) => SetName(e.target.value)} placeholder="Nome completo" type="text" />
						<input onChange={(e) => SetEmail(e.target.value)} placeholder="E-mail" type="email" />
						<input onChange={(e) => SetPassword(e.target.value)} placeholder="Sua senha" type="password" />
						<button type="submit" onClick={CreateModules}>
							Cadastrar
						</button>
					</div>
					<div>
						<h1>Alterar</h1>
						<input
							onChange={(e) => SetIdUserAlter(e.target.value)}
							placeholder="Id do usuário"
							type="number"
						/>
						<input onChange={(e) => SetNameAlter(e.target.value)} placeholder="Nome completo" type="text" />
						<input
							onChange={(e) => SetAlterPassword(e.target.value)}
							placeholder="Nova senha"
							type="password"
						/>
						<button onClick={AlterUsers}>Alterar</button>
					</div>
				</div>
				<div className="container-crud-delete">
					<div>
						<h1>Deletar</h1>
						<input onChange={(e) => SetIdDelete(e.target.value)} placeholder="Id do Usuário" />
						<button onClick={DeleteModules}>Deletar</button>
					</div>
				</div>
			</div>
		</div>
	);
}
