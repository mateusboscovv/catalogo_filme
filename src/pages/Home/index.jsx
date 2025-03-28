import { useState } from 'react';
import './style.css';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button 
        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
        aria-label="Abrir menu"
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <header className={`vertical-header ${isMenuOpen ? 'active' : ''}`}>
        <nav>
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
  );
}

export default Home;