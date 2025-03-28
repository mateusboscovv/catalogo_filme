import { useState, useEffect, useRef } from 'react';
import './style.css';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estados e funções do carrossel
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  
  const imagens = [
    'file:///C:/Users/anani/Downloads/foto2.pdf',
    'https://via.placeholder.com/800x400?text=Imagem+2',
    'https://via.placeholder.com/800x400?text=Imagem+3',
    'https://via.placeholder.com/800x400?text=Imagem+4',
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imagens.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startTimer = () => {
    timerRef.current = setInterval(nextSlide, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    startTimer();
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
        {/* Adicionando o carrossel aqui */}
        <div 
          className="carrossel-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="carrossel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {imagens.map((imagem, index) => (
              <div key={index} className="carrossel-slide">
                <img 
                  src={imagem} 
                  alt={`Slide ${index + 1}`} 
                  className="carrossel-image"
                />
              </div>
            ))}
          </div>
          
          <div className="carrossel-dots">
            {imagens.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                  if (timerRef.current) {
                    clearInterval(timerRef.current);
                  }
                  startTimer();
                }}
              />
            ))}
          </div>
        </div>

      <div className="text-container">
          <h2>Título do Seu Texto</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
            rhoncus ut eleifend nibh porttitor.
          </p>
          <p>
            Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl 
            tempor. Suspendisse dictum feugiat nisl ut dapibus.
          </p>
        </div>

        <h1>Bem-vindo ao Meu Site</h1>
        <p>Este é um exemplo de site com cabeçalho fixo e estilizado.</p>
      </div>
    </>
  );
}

export default Home;