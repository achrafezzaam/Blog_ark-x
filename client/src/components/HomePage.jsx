import MainContent from './MainContent';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { posts, isLoggedIn, user } = useAuth();

  return (
    <div>
      {isLoggedIn && user && (
        <div className="welcome-section">
          <h2>Welcome back, {user.email}!</h2>
          <p>You are successfully logged in.</p>
        </div>
      )}
      <MainContent postsList={posts} postColumns={3} />
    </div>
  );
};

export default HomePage;