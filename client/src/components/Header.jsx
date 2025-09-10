import React from "react";

const Header = ({ props }) => {
    return (
        <header>
            <h1>My Blog App - {props[0].title}</h1>
            <nav>
                <ul>
                    {props[0].links.map((item, index) => {
                        return <li key={index}><a href={item.url}>{item.name}</a></li>
                    })}
                    {}
                </ul>
                {props.isLoggedIn ? <button>Logout</button> : <button>Login</button>}
            </nav>
        </header>
    );
};

export default Header;