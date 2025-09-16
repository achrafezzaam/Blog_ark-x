import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUser(null);
  };

  const header_info = [
    {
      title: "My Blog App",
      isLoggedIn: isLoggedIn,
      user: user,
      links: [
        {
          name: "Home",
          url: "#"
        },
        {
          name: "About",
          url: "#"
        },
        {
          name: "Contact",
          url: "#"
        }
      ]
  }
  ];

  const posts = [
    {
      "title": "The Rise of AI in Everyday Life",
      "content": "This post explores how artificial intelligence is no longer a futuristic concept but a part of our daily routines. From smart assistants and personalized recommendations to self-driving cars, we delve into the various ways AI is shaping our world and the ethical considerations that come with its rapid advancement.",
      "url": "#"
    },
    {
      "title": "Mastering the Art of Remote Work",
      "content": "With the shift towards remote work becoming more permanent, this summary offers practical tips and strategies for staying productive and maintaining a healthy work-life balance. We cover everything from setting up an effective home office to communication tools and mental well-being in a virtual environment.",
      "url": "#"
    },
    {
      "title": "Sustainable Living on a Budget",
      "content": "Living sustainably doesn't have to be expensive. This blog post breaks down simple, affordable ways to reduce your environmental footprint. Learn about DIY projects, smart grocery shopping, and energy-saving hacks that benefit both the planet and your wallet.",
      "url": "#"
    }
  ];

  const postColumns = 3;

  return ( 
    <main>
      <Header props={header_info} onLogout={handleLogout} />
      
      {/* Conditional rendering: Show forms only if not logged in */}
      {!isLoggedIn && (
        <div className="auth-forms">
          <LoginForm onLogin={handleLogin} />
          <SignUpForm onLogin={handleLogin} />
        </div>
      )}
      
      {/* Show welcome message if logged in */}
      {isLoggedIn && user && (
        <div className="welcome-section">
          <h2>Welcome back, {user.email}!</h2>
          <p>You are successfully logged in.</p>
        </div>
      )}
      
      <MainContent postsList={posts} postColumns={postColumns} />
      <Footer />
    </main>
  )
}

export default App;
