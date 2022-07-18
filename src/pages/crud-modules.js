import axios from "axios";
import React, { useEffect, useState } from "react";
import { read_cookie } from "sfcookies";
import Card from "../components/card/card";
import HeaderLogout from "../components/header-logout/header-logout";

export default function CrudModules() {
	const [Modules, SetModules] = useState([]);
	const [Title, SetTitle] = useState("");
	const [Description, SetDescription] = useState("");
	const [courseId, SetcourseId] = useState("");
	const [IdDelete, SetIdDelete] = useState("");
	const [IdAlter, SetIdAlter] = useState("");
	const [TitleAlter, SetTitleAlter] = useState("");
	const [DescriptionAlter, SetDescriptionAlter] = useState("");
	const [CourseIdAlter, SetCourseIdAlter] = useState("");

	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.URL_BACKEND}/modules`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetModules(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados.");
			});
	}, []);

	function CreateModules() {
		const authorization = read_cookie("authorization");
		axios
			.post(
				`${process.env.URL_BACKEND}/modules`,
				{
					title: Title,
					description: Description,
					courseId: courseId,
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

	async function AlterModules() {
		const authorization = read_cookie("authorization");
		await axios
			.put(
				`${process.env.URL_BACKEND}/modules/${IdAlter}`,
				{
					title: TitleAlter,
					description: DescriptionAlter,
					courseId: CourseIdAlter,
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

	async function DeleteModules() {
		const authorization = read_cookie("authorization");
		await axios
			.delete(`${process.env.URL_BACKEND}/modules/${IdDelete}`, {
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
					<h1>CRUD de módulos</h1>
				</div>
				<button className="container-home-button">
					<a className="text-black" href="/home">
						Menu
					</a>
				</button>
			</div>
			<div className="container-crud">
				<div className="container-crud-list">
					{Modules?.map((info) => (
						<Card key={info.id} pointOne={info.id} pointTwo={info.title} pointThree={info.content} />
					))}
				</div>
				<div className="container-crud-create">
					<div>
						<h1>Cadastrar</h1>
						<input onChange={(e) => SetTitle(e.target.value)} placeholder="Título" type="text" />
						<input onChange={(e) => SetDescription(e.target.value)} placeholder="Descrição" type="text" />
						<input onChange={(e) => SetcourseId(e.target.value)} placeholder="ID do Curso" type="number" />
						<button type="submit" onClick={CreateModules}>
							Cadastrar
						</button>
					</div>
					<div>
						<h1>Alterar</h1>
						<input onChange={(e) => SetIdAlter(e.target.value)} placeholder="Id do Módulo" type="number" />
						<input onChange={(e) => SetTitleAlter(e.target.value)} placeholder="Título" type="text" />
						<input
							onChange={(e) => SetDescriptionAlter(e.target.value)}
							placeholder="Descrição"
							type="text"
						/>
						<input
							onChange={(e) => SetCourseIdAlter(e.target.value)}
							placeholder="ID do Curso"
							type="number"
						/>
						<button onClick={AlterModules}>Alterar</button>
					</div>
				</div>
				<div className="container-crud-delete">
					<div>
						<h1>Deletar</h1>
						<input onChange={(e) => SetIdDelete(e.target.value)} placeholder="Id do Módulo" />
						<button onClick={DeleteModules}>Deletar</button>
					</div>
				</div>
			</div>
		</div>
	);
}
