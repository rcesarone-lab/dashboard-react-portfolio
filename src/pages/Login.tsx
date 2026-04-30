import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === 'admin' && password === '1234') {
      localStorage.setItem('auth', 'true');
      onLogin();
      navigate('/', { replace: true });
      return;
    }

    alert('Credenciales incorrectas');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Login</h1>

      <input
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button type="button" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
}
