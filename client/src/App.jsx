import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NewPostForm from './components/NewPostForm';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <main>
        <Header />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route 
              path="/new-post" 
              element={
                <ProtectedRoute>
                  <NewPostForm />
                </ProtectedRoute>
              } 
            />
            {/* Placeholder routes for future implementation */}
            <Route path="/about" element={<div className="page-placeholder"><h2>About Page</h2><p>Coming soon...</p></div>} />
            <Route path="/contact" element={<div className="page-placeholder"><h2>Contact Page</h2><p>Coming soon...</p></div>} />
          </Routes>
        </div>
        
        <Footer />
      </main>
    </AuthProvider>
  )
}

export default App;
