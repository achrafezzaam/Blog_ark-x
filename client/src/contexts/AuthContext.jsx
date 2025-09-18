import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "The Rise of AI in Everyday Life",
            content: "This post explores how artificial intelligence is no longer a futuristic concept but a part of our daily routines. From smart assistants and personalized recommendations to self-driving cars, we delve into the various ways AI is shaping our world and the ethical considerations that come with its rapid advancement.",
            author: "Admin",
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: "Mastering the Art of Remote Work",
            content: "With the shift towards remote work becoming more permanent, this summary offers practical tips and strategies for staying productive and maintaining a healthy work-life balance. We cover everything from setting up an effective home office to communication tools and mental well-being in a virtual environment.",
            author: "Admin",
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            title: "Sustainable Living on a Budget",
            content: "Living sustainably doesn't have to be expensive. This blog post breaks down simple, affordable ways to reduce your environmental footprint. Learn about DIY projects, smart grocery shopping, and energy-saving hacks that benefit both the planet and your wallet.",
            author: "Admin",
            createdAt: new Date().toISOString()
        }
    ]);

    // Check for existing token on app load
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUser(null);
    };

    const addPost = (newPost) => {
        const post = {
            ...newPost,
            id: Date.now(),
            author: user?.email || 'Anonymous',
            createdAt: new Date().toISOString()
        };
        setPosts(prevPosts => [post, ...prevPosts]);
    };

    const value = {
        isLoggedIn,
        user,
        posts,
        login,
        logout,
        addPost
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};