import axios from "axios";
import Footer from "../components/footer/footer";
import React, { useEffect, useState } from "react";
import HeaderLogout from "../components/header-logout/header-logout";
import { read_cookie } from "sfcookies";
import CardThreeEntrypoints from "../components/card/card-3-entrypoints";

export default function Home(){

    const [users, SetUsers] = useState([]);
    const [courses, SetCourses] = useState([]);
    const [coursesModulesContents, SetCoursesModulesContents] = useState([]);
    const [sql4, SetSql4] = useState([]);
    const [sql5, SetSql5] = useState([]);
    console.log(sql5)

//SQL-01 ==> Usuarios que possuem mais cursos
    useEffect(() => {
		const authorization = read_cookie("authorization");
		axios.get('http://localhost:3001/report/1', {
			headers: {
				authorization: `Bearer ${authorization}` 
			}
		})
		.then((response) => {
			SetUsers(response.data);
		}).catch(() => {
			alert("Erro ao buscar os dados.")
		});
	}, [])

//SQL-03 ==> Curso com mais conteudos
    useEffect(() => {
		const authorization = read_cookie("authorization");
		axios.get('http://localhost:3001/report/2', {
			headers: {
				authorization: `Bearer ${authorization}` 
			}
		})
		.then((response) => {
			SetCourses(response.data);
		}).catch(() => {
			alert("Erro ao buscar os dados.")
		});
	}, [])

//SQL-03 ==> todos os cursos, com total de modulos e conteudos
    useEffect(() => {
		const authorization = read_cookie("authorization");
		axios.get('http://localhost:3001/report/3', {
			headers: {
				authorization: `Bearer ${authorization}` 
			}
		})
		.then((response) => {
			SetCoursesModulesContents(response.data);
		}).catch(() => {
			alert("Erro ao buscar os dados.")
		});
	}, [])

//SQL-04 ==> Todos os conteudos com nome do curso
    useEffect(() => {
		const authorization = read_cookie("authorization");
		axios.get('http://localhost:3001/report/4', {
			headers: {
				authorization: `Bearer ${authorization}` 
			}
		})
		.then((response) => {
			SetSql4(response.data);
		}).catch(() => {
			alert("Erro ao buscar os dados.")
		});
	}, [])

//SQL-05 ==> Alunos que assistiram a aula do conteudo ID=2
    useEffect(() => {
		const authorization = read_cookie("authorization");
		axios.get('http://localhost:3001/report/5', {
			headers: {
				authorization: `Bearer ${authorization}` 
			}
		})
		.then((response) => {
			SetSql5(response.data);
		}).catch(() => {
			alert("Erro ao buscar os dados.")
		});
	}, [])

    return(
        <div>
            <HeaderLogout/>
            <div className="title"><h1>Menu principal</h1></div>
            <div className="container-home-card">
                <div>
                    <h1 className="container-home-card-label">Usuarios com mais cursos</h1>
                    <div className="card">
                        {users?.map((info) => (
                            <CardThreeEntrypoints 
                                key={info.id} 
                                pointOne={info.name} 
                                pointTwo={info.email} 
                                pointThree={info._count.Course}/>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="container-home-card-label">Cursos com mais conteúdos</h1>
                    <div className="card">
                        {courses?.map((info) => (
                            <CardThreeEntrypoints 
                                key={info.id} 
                                pointOne={info.title} 
                                pointTwo={info.contents} 
                                />
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-home-card">
                <div>
                    <h1 className="container-home-card-label">Todos os cursos, total de módulos e cursos</h1>
                    <div className="card">
                        {coursesModulesContents?.map((info) => (
                            <CardThreeEntrypoints 
                            key={info.id} 
                            pointOne={info.title} 
                            pointTwo={info.modules} 
                            pointThree={info.contents}/>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="container-home-card-label">Todos os conteudos com nome do curso</h1>
                    <div className="card">
                        {sql4?.map((info) => (
                            <CardThreeEntrypoints 
                            key={info.id} 
                            pointOne={info.content} 
                            pointTwo={info.Module.Course.title} 
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h1 className="container-home-card-label">Alunos que assistiram a aula do conteudo ID=2</h1>
                    <div className="card">
                        {sql5?.map((info) => (
                            <CardThreeEntrypoints 
                            key={info.id} 
                            pointOne={info.name}
                            />
                        ))}
                    </div>
                </div>
            <Footer/>
            <button className="container-home-button">editar</button>
        </div>
    )
}