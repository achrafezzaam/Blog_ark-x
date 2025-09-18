import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <header>
            <h1>My Blog App</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {isLoggedIn && (
                        <li><Link to="/new-post">New Post</Link></li>
                    )}
                </ul>

                <div className="auth-section">
                    {isLoggedIn ? (
                        <div className="user-info">
                            <span>Hello, {user?.email}</span>
                            <button onClick={logout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="auth-link">Login</Link>
                            <Link to="/signup" className="auth-link">Sign Up</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;