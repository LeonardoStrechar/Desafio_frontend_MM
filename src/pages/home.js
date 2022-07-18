import axios from "axios";
import Footer from "../components/footer/footer";
import React, { useEffect, useState } from "react";
import HeaderLogout from "../components/header-logout/header-logout";
import { read_cookie } from "sfcookies";
import Card from "../components/card/card";
import HeaderLink from "../components/header-links/header-links";
import { InfoRequest } from "../components/style-components";

export default function Home() {
	const [Sql1, SetSql1] = useState([]);
	const [Sql2, SetSql2] = useState([]);
	const [Sql3, SetSql3] = useState([]);
	const [sql4, SetSql4] = useState([]);
	const [sql5, SetSql5] = useState([]);
	const [Contents, SetContents] = useState([]);

	//SQL-01 ==> Usuarios que possuem mais cursos
	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.REACT_APP_URL_BACKEND}/report/1`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetSql1(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados na tabela 1");
			});
	}, []);

	//SQL-02 ==> Curso com mais conteudos
	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.REACT_APP_URL_BACKEND}/report/2`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetSql2(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados na tabela 2");
			});
	}, []);

	//SQL-02 ==> todos os cursos, com total de modulos e conteudos
	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.REACT_APP_URL_BACKEND}/report/3`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetSql3(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados na tabela 3");
			});
	}, []);

	//SQL-04 ==> Todos os conteudos com nome do curso
	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.REACT_APP_URL_BACKEND}/report/4`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetSql4(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados na tabela 4");
			});
	}, []);

	//SQL-05 ==> Alunos que assistiram a aula do conteudo ID=2
	useEffect(() => {
		const authorization = read_cookie("authorization");
		axios
			.get(`${process.env.REACT_APP_URL_BACKEND}/report/5`, {
				headers: {
					authorization: `Bearer ${authorization}`,
				},
			})
			.then((response) => {
				SetSql5(response.data);
			})
			.catch(() => {
				alert("Erro ao buscar os dados na tabela 5.");
			});
	}, []);

	//SQL-06 ==>Todos os conteudos
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

	async function Watch(event) {
		const id = event.currentTarget.id;
		const authorization = read_cookie("authorization");
		await axios
			.post(
				`${process.env.REACT_APP_URL_BACKEND}/watch/${id}`,
				{},
				{
					headers: {
						authorization: `Bearer ${authorization}`,
					},
				}
			)
			.then((response) => window.location.reload())
			.catch(() => {});
	}
	async function Unwatch(event) {
		const id = event.currentTarget.id;
		const authorization = read_cookie("authorization");
		await axios
			.post(
				`${process.env.REACT_APP_URL_BACKEND}/unwatch/${id}`,
				{},
				{
					headers: {
						authorization: `Bearer ${authorization}`,
					},
				}
			)
			.then((response) => window.location.reload())
			.catch(() => {});
	}

	return (
		<div>
			<HeaderLogout />
			<HeaderLink title="Menu principal" />
			<div className="container-home-card">
				<div>
					<h1 className="container-home-card-label">Usuários com mais cursos</h1>
					<div className="card">
						{Sql1?.map((info1) => (
							<Card key={info1.id} pointOne={info1.name} pointTwo={info1._count.Course} />
						))}
					</div>
				</div>
				<div>
					<h1 className="container-home-card-label">Cursos com mais conteúdos</h1>
					<div className="card">
						{Sql2?.map((info2) => (
							<Card key={info2.id} pointOne={info2.title} pointTwo={info2.contents} />
						))}
					</div>
				</div>
			</div>

			<div className="container-home-card">
				<div>
					<h1 className="container-home-card-label">Todos os cursos, total de módulos e conteúdos</h1>
					<div className="card">
						{Sql3?.map((info3) => (
							<Card
								key={info3.id}
								pointOne={info3.title}
								pointTwo={info3.modules}
								pointThree={info3.contents}
							/>
						))}
					</div>
				</div>

				<div>
					<h1 className="container-home-card-label">Todos os conteúdos com nome do curso</h1>
					<div className="card">
						{sql4?.map((info4) => (
							<Card key={info4.id} pointOne={info4.title} pointTwo={info4.Module.Course.title} />
						))}
					</div>
				</div>
			</div>
			<div className="container-home-card">
				<div>
					<h1 className="container-home-card-label">Alunos que assistiram a aula do conteúdo ID=2</h1>
					<div className="card">
						{sql5?.map((info5) => (
							<Card key={info5.id} pointOne={info5.name} />
						))}
					</div>
				</div>
				<div>
					<h1 className="container-home-card-label">Marcar como assistido ou não</h1>
					<div className="card">
						{console.log(Contents)}
						{Contents?.map((info6) => (
							<div className="divStyle-watch">
								<InfoRequest className="infoRequest">
									{info6.title}
									<button id={info6.id} onClick={Watch} className="button-watch">
										Assistir
									</button>
									<button id={info6.id} onClick={Unwatch} className="button-watch">
										Não assistir
									</button>
								</InfoRequest>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
