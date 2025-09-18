import LoginForm from './LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { isLoggedIn, login } = useAuth();

  // Redirect to home if already logged in
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <LoginForm onLogin={login} />
    </div>
  );
};

export default LoginPage;