import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  /*retorn -- mostra na tela todos os elementos de hipertexto do HTML*/ 
  return (
    <>
      <div>
        <h1>Navegue</h1>
      </div>
      <p className="read-the-docs">
        Clique a cima no título para submergir no blog Plotástico
      </p>
    </>
  )
}

export default App
