import React from "react";
import Footer from "../components/footer/footer";
import HeaderLogout from "../components/header-logout/header-logout";
import { CardMenuStyle } from "../components/style-components";

export default function Home(){
    return(
        <div>
            <HeaderLogout/>
            <div className="title"><h1>Menu principal</h1></div>
            <div className="container-home-card">
                <div>
                    <CardMenuStyle/>
                    <button className="container-home-button">editar</button>
                    <button className="container-home-button">editar</button>
                </div>
                <div>
                    <CardMenuStyle/>
                    <button className="container-home-button">editar</button>
                    <button className="container-home-button">editar</button>
                </div>
            </div>
            <div className="container-home-card">
            <div>
                    <CardMenuStyle/>
                    <button className="container-home-button">editar</button>
                    <button className="container-home-button">editar</button>
                </div>
                <div>
                    <CardMenuStyle/>
                    <button className="container-home-button">editar</button>
                    <button className="container-home-button">editar</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}