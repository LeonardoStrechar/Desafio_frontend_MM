import axios from "axios";
import React, { useEffect, useState } from "react";
import { read_cookie } from "sfcookies";
import Card from "../components/card/card";
import HeaderLogout from "../components/header-logout/header-logout";

export default function CrudCourses() {
	const [Courses, SetCourses] = useState([]);
	const [Title, SetTitle] = useState("");
	const [Description, SetDescription] = useState("");
	const [IdDelete, SetIdDelete] = useState("");
	const [IdAlter, SetIdAlter] = useState("");
	const [TitleAlter, SetTitleAlter] = useState("");
	const [DescriptionAlter, SetDescriptionAlter] = useState("");

	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.URL_BACKEND}/courses`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetCourses(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados.");
			});
	}, []);

	function CreateCourses() {
		const authorization = read_cookie("authorization");
		axios
			.post(
				`${process.env.URL_BACKEND}/courses`,
				{
					title: Title,
					description: Description,
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

	async function AlterCourses() {
		const authorization = read_cookie("authorization");
		await axios
			.put(
				`${process.env.URL_BACKEND}/courses/${IdAlter}`,
				{
					title: TitleAlter,
					description: DescriptionAlter,
				},
				{
					headers: {
						authorization: `Bearer ${authorization}`,
					},
				}
			)
			.then((response) => window.location.reload())
			.catch(() => {
				alert("Não foi possivel realizar sua aalteração!");
			});
	}

	async function DeleteCourses() {
		const authorization = read_cookie("authorization");
		await axios
			.delete(`${process.env.URL_BACKEND}/courses/${IdDelete}`, {
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
					<h1>CRUD de Cursos</h1>
				</div>
				<button className="container-home-button">
					<a className="text-black" href="/home">
						Menu
					</a>
				</button>
			</div>
			<div className="container-crud">
				<div className="container-crud-list">
					{Courses?.map((info) => (
						<Card key={info.id} pointOne={info.id} pointTwo={info.title} pointThree={info.content} />
					))}
				</div>
				<div className="container-crud-create">
					<div>
						<h1>Cadastrar</h1>
						<input onChange={(e) => SetTitle(e.target.value)} placeholder="Título" type="text" />
						<input onChange={(e) => SetDescription(e.target.value)} placeholder="Descrição" type="text" />
						<button type="submit" onClick={CreateCourses}>
							Cadastrar
						</button>
					</div>
					<div>
						<h1>Alterar</h1>
						<input onChange={(e) => SetIdAlter(e.target.value)} placeholder="Id do Curso" type="number" />
						<input onChange={(e) => SetTitleAlter(e.target.value)} placeholder="Título" type="text" />
						<input
							onChange={(e) => SetDescriptionAlter(e.target.value)}
							placeholder="Descrição"
							type="text"
						/>
						<button onClick={AlterCourses}>Alterar</button>
					</div>
				</div>
				<div className="container-crud-delete">
					<div>
						<h1>Deletar</h1>
						<input onChange={(e) => SetIdDelete(e.target.value)} placeholder="Id do Curso" />
						<button onClick={DeleteCourses}>Deletar</button>
					</div>
				</div>
			</div>
		</div>
	);
}
