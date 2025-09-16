import React from "react";

const Header = ({ props, onLogout }) => {
    const headerData = props[0];

    return (
        <header>
            <h1>{headerData.title}</h1>
            <nav>
                <ul>
                    {headerData.links.map((item, index) => {
                        return <li key={index}><a href={item.url}>{item.name}</a></li>
                    })}
                </ul>

                <div className="auth-section">
                    {headerData.isLoggedIn ? (
                        <div className="user-info">
                            <span>Hello, {headerData.user?.email}</span>
                            <button onClick={onLogout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <span>Please log in to continue</span>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;