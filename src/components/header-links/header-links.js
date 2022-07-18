export default function HeaderLink(props) {
	return (
		<div className="container-home-header">
			<div className="title">
				<h1>{props.title}</h1>
			</div>
			<div className="container-home-button-flex">
				<a className="text-black" href="/Content">
					<button className="container-home-button">Conteúdos</button>
				</a>
				<a className="text-black" href="/Modules">
					<button className="container-home-button">Modulos</button>
				</a>
				<button className="container-home-button">
					<a className="text-black" href="/Courses">
						Cursos
					</a>
				</button>
				<a className="text-black" href="/Users">
					<button className="container-home-button">Usuários</button>
				</a>
			</div>
		</div>
	);
}
