import { useState } from 'react'
import './style.css'

function ShowInfo() {
    return (
        <>
            <header id="header">
                <nav aria-label="Menu principal">
                    <ul>
                        <li><a href="#">Perfil</a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Comunidade</a></li>
                        <li><a href="#">Minhas publicações</a></li>
                        <li><a href="#">Sobre o blog</a></li>
                    </ul>
                </nav>
            </header>

            <div className="content">
                <h1>Bem-vindo ao Meu Site</h1>
                <p>Este é um exemplo de site com cabeçalho fixo e estilizado.</p>
            </div>
        </>
    )
}

export default ShowInfo;
