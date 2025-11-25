import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../util/AuthContext';
import '../../assets/css/AuthForm.css';

function AuthForm({ mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const isLoginMode = mode === 'login';

  const buttonText = isLoginMode ? 'ВОЙТИ' : 'Зарегистрироваться';
  const title = isLoginMode ? 'Авторизация' : 'Регистрация';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    let result;
    if (isLoginMode) {
      result = await login(email, password);
    } else {
      result = await register(email, password, username);
    }

    if (result.success) {
      setMessage(`Успех ${isLoginMode ? 'входа' : 'регистрации'}!`);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMessage(`Ошибка: ${result.error}`);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2 className="auth-title">{title}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <div className="form-group">
              <label>Имя пользователя:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
                placeholder="Введите имя пользователя"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Введите email"
            />
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Введите пароль"
            />
          </div>
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Загрузка...' : buttonText}
          </button>
          {message && (
            <div className={`auth-message ${message.includes('Успех') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
        <div className="auth-switch">
          {isLoginMode ? (
            <p>
              Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            </p>
          ) : (
            <p>
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
