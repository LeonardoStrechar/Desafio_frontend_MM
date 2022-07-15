import axios from "axios";
import imgHome from "../img/img-home.svg"
import Footer from "../components/footer/footer";
import { useState } from "react";
import { bake_cookie } from "sfcookies";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	function Login() {
		axios.post("http://localhost:3001/login", {
			email: email,
      password: password,
		})
		.then((response) => {
			bake_cookie("authorization", response.data.token);
			navigate("/home");
		})
		.catch(() => {
			alert("Não foi possivel realizar seu Login, email ou senha incorreto!");
			window.location.reload(false);
		});
	}

  return (
    <div>
      <header>
        <div><h1><a href="/">Project NodeJs + ReactJs</a></h1></div>
        <button><a className="text-design-a" href="/register">Cadastre-se</a></button>
      </header>
      <div className='container-body'>
        <div className='container-body-initial'>
          <h1>Seja bem-vindo</h1>
          <div className='img-home'><img alt="img-home" src={imgHome} className="img-home"/></div>
          <h3><a target="_blank" rel="noreferrer" className='motivational-phrase' href='https://www.pensador.com/frase/MjAyMTg3MQ/'>"Faça o teu melhor, na condição que você tem, enquanto você não tem condições melhores, para fazer melhor ainda!"</a></h3>
        </div>
        <div className='container-body-card'>
          <div className="Container-body-register">
            <h1>Realize seu login!</h1>
            <input onChange={(e) => setEmail(e.target.value)} required placeholder="Email" type="email"/>
            <input onChange={(e) => setPassword(e.target.value)} required placeholder="Password" type="password"/>
            <button onClick={Login}>Entrar</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}