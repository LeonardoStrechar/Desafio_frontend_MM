import FunctionLogout from "../../functions/function-delete";

export default function HeaderLogout (){
    return (
        <div>
            <header>
            <div><h1><a href="/">Project NodeJs + ReactJs</a></h1></div>
                <button onClick={FunctionLogout}>Sair</button>
            </header>
        </div>
    );
}