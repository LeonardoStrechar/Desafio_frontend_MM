import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { read_cookie } from "sfcookies";
import Card from "../components/card/card";
import HeaderLogout from "../components/header-logout/header-logout";

export  default function EditContent (){

    const [Contents, SetContents] = useState([]);
    const [Title, SetTitle] = useState([]);
    const [Content, SetContent] = useState([]);
    const [ModuleId, SetModuleId] = useState([]);
    const [IdAlter, SetIdAlter] = useState([]);
    const [IdDelete, SetIdDelete] = useState([]);
    

    useEffect(() => {
		const authorization = read_cookie("authorization");
		axios.get('http://localhost:3001/contents', {
			headers: {
				authorization: `Bearer ${authorization}` 
			}
		})
		.then((response) => {
			SetContents(response.data);
		}).catch(() => {
			alert("Erro ao buscar os dados.")
		});
	}, [])


    function CreateContent(){
        axios.post("http://localhost:3001/contents", {
          title: Title,
          content: Content,
          moduleId: ModuleId,
        })
        .then((response) => {
          Navigate("/");
        })
        .catch(() => {
          alert("Não foi possivel realizar seu cadastro!");
        })
      }
    
    function AlterContent(){
    axios.put(`http://localhost:3001/contents/${IdAlter}`, {
        title: Title,
        content: Content,
        moduleId: ModuleId,
    })
    .then((response) => {
        Navigate("/");
    })
    .catch(() => {
        alert("Não foi possivel realizar seu cadastro!");
    })
    }

    function DeleteContent(){
        axios.delete(`http://localhost:3001/contents/${IdDelete}`, {
            title: Title,
            content: Content,
            moduleId: ModuleId,
        })
        .then((response) => {
            Navigate("/");
        })
        .catch(() => {
            alert("Não foi possivel realizar seu cadastro!");
        })
        }

    return(
        <div>
            <HeaderLogout/>
            <h1>CRUD conteúdos</h1>
            <div className="container-crud">
                <div className="container-crud-list">
                    {Contents?.map((info) => (
                        <Card
                            key={info.id}
                            pointOne={info.id} 
                            pointTwo={info.title} 
                            pointThree={info.content} 
                        />
                    ))}
                </div>
                <div className="container-crud-create">
                    <div>
                        <h1>Cadastrar</h1>
                        <input onChange={(e) => SetTitle(e.target.value)} placeholder="Título" />
                        <input onChange={(e) => SetContent(e.target.value)} placeholder="Conteúdo"/>
                        <input onChange={(e) => SetModuleId(e.target.value)} placeholder="ID do Módulo"/>
                        <button onClick={CreateContent}>Cadastrar</button>
                    </div>
                    <div>
                        <h1>Alterar</h1>
                        <input onChange={(e) => SetIdAlter(e.target.value)} placeholder="Id do Conteúdo" />
                        <input onChange={(e) => SetTitle(e.target.value)} placeholder="Título" />
                        <input onChange={(e) => SetContent(e.target.value)} placeholder="Conteúdo"/>
                        <input onChange={(e) => SetModuleId(e.target.value)} placeholder="ID do Módulo"/>
                        <button onClick={AlterContent}>Alterar</button>
                    </div>
                </div>
                <div className="container-crud-list">
                    <div>
                        <h1>Deletar</h1>
                        <input onChange={(e) => SetIdDelete(e.target.value)} placeholder="Id do Conteúdo" />
                        <button onClick={DeleteContent}>Deletar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}