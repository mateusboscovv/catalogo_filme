import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0)

  let navigate = useNavigate();
  /*retorn -- mostra na tela todos os elementos de hipertexto do HTML*/ 
  return (
    <>
      <div>
        <button onClick={() => navigate("./src/pages/Feed/community.jsx")} class="button-initialHome">Investigue</button> 
      </div>
      <p className="read-the-docs">
        Clique no título a cima para inspecionar uma temática no blog Plotástico
      </p>
    </>
  )
}

export default Home
