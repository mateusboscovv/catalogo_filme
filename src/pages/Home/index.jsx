import { useState, useEffect, useRef } from 'react';
import './style.css';
import { salvarTextoNoFirebase } from './firebaseConfig'; // Importe a função do Firebase
import { database } from "./firebaseConfig";
import { ref, get } from "firebase/database";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

  
    if (!user || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const userRef = ref(database, `logins/${user}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const storedPassword = snapshot.val();
        if (storedPassword === password) {
          alert("Login bem-sucedido!");
          localStorage.setItem("user", user);
          window.location.href = "/dashboard"; // Redirecionamento
        } else {
          setError("Senha incorreta.");
        }
      } else {
        setError("Usuário não encontrado.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
      console.error(err);
    }
  };

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

  function login(){
    
  }
  function handleClick() {
    if (text.trim()) {
      salvarTextoNoFirebase(text) // Chama a função para salvar no Firebase
        .then(() => {
          setText(""); // Limpa o campo após o envio
          alert("Texto enviado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao enviar:", error);
          alert("Ocorreu um erro ao enviar o texto.");
        });
    } else {
      alert("Por favor, digite algo antes de enviar.");
    }
  }
  return (
    <>

<div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>

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
            <li><a href="#">Publicações</a></li>
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


        <div>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite algo..."
          className="border p-2 w-full"
        />  
          <button id="button-send"onClick={handleClick}> Enviar </button>
        </div>

          <div>
            <button id="button-login"onClick={login}>Login</button>
          </div>
        <div className="painel-fixo">
      <h2>Resumo da obra Us</h2>
        <p>Dirigido por Jordan Peele, Us é um filme de terror psicológico que segue a família Wilson durante as férias na praia. A trama toma um rumo aterrorizante quando um grupo de doppelgängers (sósias) invade sua casa à noite. Esses invasores, chamados de Os Presos, são versões sombrias e violentas de cada pessoa, vindas de um mundo subterrâneo.

A protagonista, Adelaide (Lupita Nyong'o), descobre uma conexão perturbadora com sua sósia, Red, e revela-se parte de um experimento governamental que criou cópias humanas falhadas. Conforme a violência escalona, fica claro que os doppelgängers estão se rebelando contra seus "tethers" (originais) em um plano macabro.

O filme explora temas como dualidade, classe social e o medo do "outro", com um final chocante que revela que Adelaide, na verdade, era a cópia que substituiu a original na infância. Us mistura horror, suspense e crítica social, deixando questões abertas sobre identidade e opressão.

Nota: O título "Us" (Nós, em português) remete tanto aos doppelgängers quanto à divisão na sociedade.</p>
<h1>          -            </h1>
<h2>O monstro é sempre o outro?</h2>
<p>  "E quanto ao monstro que toma a forma do homem no espelho e a escuridão que nós, humanos, 
  praticamos e temos dentro de nós de maneira bem natural? Frequentemente essa escuridão passa batida,
   sem reconhecimento, ignorada. E quando isso acontece, temos que projetá-la externamente e torna-se a destruição 
   com que nós precisamos lidar."</p>
      </div>

      </div>

    </>
  );
}

export default Home;