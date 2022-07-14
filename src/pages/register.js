import imgHome from "../img/img-home.svg"
import { CardStyle } from '../components/style-components';
import Footer from "../components/footer/footer";
//import Card from './components/card/card';

export default function Register() {
  return (
    <div>
      <header>
        <div><h1><a className="" href="/">Project NodeJs + ReactJs</a></h1></div>
        <div>
          <input placeholder='Email' className='input-home'/>
          <input placeholder='Password' className='input-home'/>
          <button>Login</button>
        </div>
      </header>
      <div className='container-body'>
        <div className='container-body-initial'>
          <h1>Seja bem-vindo</h1>
          <div className='img-home'><img src={imgHome} className="img-home"/></div>
          <h3><a target="_blank" className='motivational-phrase' href='https://www.pensador.com/frase/MjAyMTg3MQ/'>"Faça o teu melhor, na condição que você tem, enquanto você não tem condições melhores, para fazer melhor ainda!"</a></h3>
        </div>
        <div className='container-body-card'>
            <div className="Container-body-register">
                <h1>Realize seu registro!</h1>
                <input placeholder="Name" className="input-home"/>
                <input placeholder="Email" className="input-home"/>
                <input placeholder="Password" className="input-home"/>
                <button>Cadastrar-se</button>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}