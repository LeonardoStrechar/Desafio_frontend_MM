import axios from "axios";
import React, { useEffect, useState } from "react";
import { read_cookie } from "sfcookies";
import Card from "../components/card/card";
import HeaderLogout from "../components/header-logout/header-logout";

export default function CrudContent() {
	const [Contents, SetContents] = useState([]);
	const [Title, SetTitle] = useState("");
	const [Content, SetContent] = useState("");
	const [ModuleId, SetModuleId] = useState("");
	const [IdDelete, SetIdDelete] = useState("");
	const [IdAlter, SetIdAlter] = useState("");
	const [TitleAlter, SetTitleAlter] = useState("");
	const [ContentAlter, SetContentAlter] = useState("");
	const [ModuleIdAlter, SetModuleIdAlter] = useState("");

	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.REACT_APP_URL_BACKEND}/contents`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetContents(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados.");
			});
	}, []);

	function CreateContent() {
		const authorization = read_cookie("authorization");
		axios
			.post(
				`${process.env.REACT_APP_URL_BACKEND}/contents`,
				{
					title: Title,
					content: Content,
					moduleId: ModuleId,
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

	async function AlterContent() {
		const authorization = read_cookie("authorization");
		await axios
			.put(
				`${process.env.REACT_APP_URL_BACKEND}/contents/${IdAlter}`,
				{
					title: TitleAlter,
					content: ContentAlter,
					moduleId: ModuleIdAlter,
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

	async function DeleteContent() {
		const authorization = read_cookie("authorization");
		await axios
			.delete(`${process.env.REACT_APP_URL_BACKEND}/contents/${IdDelete}`, {
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
					<h1>CRUD de conteúdos</h1>
				</div>
				<button className="container-home-button">
					<a className="text-black" href="/home">
						Menu
					</a>
				</button>
			</div>
			<div className="container-crud">
				<div className="container-crud-list">
					{Contents?.map((info) => (
						<Card key={info.id} pointOne={info.id} pointTwo={info.title} pointThree={info.content} />
					))}
				</div>
				<div className="container-crud-create">
					<div>
						<h1>Cadastrar</h1>
						<input onChange={(e) => SetTitle(e.target.value)} placeholder="Título" type="text" />
						<input onChange={(e) => SetContent(e.target.value)} placeholder="Conteúdo" type="text" />
						<input onChange={(e) => SetModuleId(e.target.value)} placeholder="ID do Módulo" type="number" />
						<button type="submit" onClick={CreateContent}>
							Cadastrar
						</button>
					</div>
					<div>
						<h1>Alterar</h1>
						<input
							onChange={(e) => SetIdAlter(e.target.value)}
							placeholder="Id do Conteúdo"
							type="number"
						/>
						<input onChange={(e) => SetTitleAlter(e.target.value)} placeholder="Título" type="text" />
						<input onChange={(e) => SetContentAlter(e.target.value)} placeholder="Conteúdo" type="text" />
						<input
							onChange={(e) => SetModuleIdAlter(e.target.value)}
							placeholder="ID do Módulo"
							type="number"
						/>
						<button onClick={AlterContent}>Alterar</button>
					</div>
				</div>
				<div className="container-crud-delete">
					<div>
						<h1>Deletar</h1>
						<input onChange={(e) => SetIdDelete(e.target.value)} placeholder="Id do Conteúdo" />
						<button onClick={DeleteContent}>Deletar</button>
					</div>
				</div>
			</div>
		</div>
	);
}
