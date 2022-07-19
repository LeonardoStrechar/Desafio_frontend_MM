import imgHome from "../img/img-home.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/footer";
import { useState } from "react";
import axios from "axios";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function Register() {
		axios
			.post(
				`${process.env.REACT_APP_URL_BACKEND}/register`,
				{
					name: name,
					email: email,
					password: password,
				}
			)
			.then((response) => {
				navigate("/");
			})
			.catch(() => {
				alert("Não foi possivel realizar seu cadastro!");
			});
	}

	return (
		<div>
			<header>
				<div>
					<h1>
						<a href="/">Project NodeJs + ReactJs</a>
					</h1>
				</div>
			</header>
			<div className="container-body">
				<div className="container-body-initial">
					<h1>Seja bem-vindo</h1>
					<div className="img-home">
						<img src={imgHome} alt="icone-home" className="img-home" />
					</div>
					<h3>
						<a
							target="_blank"
							rel="noreferrer"
							className="motivational-phrase"
							href="https://www.pensador.com/frase/MjAyMTg3MQ/"
						>
							"Faça o teu melhor, na condição que você tem, enquanto você não tem condições melhores, para
							fazer melhor ainda!"
						</a>
					</h3>
				</div>
				<div className="container-body-card">
					<div className="Container-body-register">
						<h1>Realize seu registro!</h1>
						<input onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" />
						<input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
						<input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
						<button onClick={Register}>Cadastrar-se</button>
						<h3>
							<a href="/">voltar para Login</a>
						</h3>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
