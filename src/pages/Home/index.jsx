import { useState } from 'react'
import './style.css'
function Home() {
  const [count, setCount] = useState(0)

  /*retorn -- mostra na tela todos os elementos de hipertexto do HTML*/ 
  return (
    <>
        <header class="vertical-header">
                    <ul>
                        <li><a href="#">Perfil</a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Comunidade</a></li>
                        <li><a href="#">Minhas publicações</a></li>
                        <li><a href="#">Sobre o blog</a></li>
                    </ul>
            </header>

            <div className="content">
                <h1>Bem-vindo ao Meu Site</h1>
                <p>Este é um exemplo de site com cabeçalho fixo e estilizado.</p>
            </div>
    </>
  )
}

export default Home
