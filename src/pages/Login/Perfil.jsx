import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, registrarUsuario, loginUsuario, logoutUsuario, salvarPerfil, carregarPerfil } from './firebase';
import './Perfil.css';

function Perfil() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        carregarDadosPerfil(user.uid);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const carregarDadosPerfil = async (uid) => {
    try {
      const perfil = await carregarPerfil(uid);
      if (perfil) {
        setNome(perfil.nome || '');
        setFoto(perfil.foto || '');
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await loginUsuario(email, senha);
        navigate('/');
      } else {
        const userCredential = await registrarUsuario(email, senha);
        await salvarPerfil(userCredential.user.uid, { nome, foto });
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUsuario();
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    return (
      <div className="perfil-container">
        <h2>Meu Perfil</h2>
        {foto && <img src={foto} alt="Foto do perfil" className="foto-perfil" />}
        <div className="info-perfil">
          <p><strong>Nome:</strong> {nome || 'Não informado'}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Registrar'}</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Foto (URL):</label>
              <input
                type="url"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
              />
            </div>
          </>
        )}
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength="6"
          />
        </div>
        
        <button type="submit" disabled={loading} className="auth-btn">
          {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Registrar'}
        </button>
      </form>
      
      <p className="toggle-auth">
        {isLogin ? 'Novo por aqui? ' : 'Já tem uma conta? '}
        <button 
          type="button" 
          onClick={() => setIsLogin(!isLogin)}
          className="toggle-btn"
        >
          {isLogin ? 'Crie uma conta' : 'Faça login'}
        </button>
      </p>
    </div>
  );
}

export default Perfil;