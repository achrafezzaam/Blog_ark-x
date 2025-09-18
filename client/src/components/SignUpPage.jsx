import SignUpForm from './SignUpForm';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const SignUpPage = () => {
  const { isLoggedIn, login } = useAuth();

  // Redirect to home if already logged in
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="auth-page">
      <SignUpForm onLogin={login} />
    </div>
  );
};

export default SignUpPage;