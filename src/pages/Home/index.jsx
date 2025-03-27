import { useState } from 'react'


function Home() {
  const [count, setCount] = useState(0)

  /*retorn -- mostra na tela todos os elementos de hipertexto do HTML*/ 
  return (
    <>
      <div>
        <button class="button-initialHome">Investigue</button> 
      </div>
      <p className="read-the-docs">
        Clique no título a cima para inspecionar uma temática no blog Plotástico
      </p>
    </>
  )
}

export default Home
