import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MainContent = ({ postsList, postColumns }) => {
    const { isLoggedIn } = useAuth();
    
    return (
        <>
            <section id="hero">
                <h1>Welcome to my Blog App</h1>
                <p>A clean, modern space for your thoughts, stories, and ideas. Discover articles on topics you love, or start sharing your own perspective today.</p>
                {isLoggedIn && (
                    <Link to="/new-post" style={{ 
                        display: 'inline-block', 
                        marginTop: '20px', 
                        padding: '12px 24px', 
                        backgroundColor: 'var(--primary-color)', 
                        color: 'var(--secondary-color)', 
                        textDecoration: 'none', 
                        borderRadius: '5px',
                        fontWeight: '600',
                        zIndex: 10,
                        position: 'relative'
                    }}>
                        Create New Post
                    </Link>
                )}
            </section>
            <section id="posts-container" style={{ gridTemplateColumns: `repeat(${postColumns}, 1fr)` }}>
                {postsList && postsList.length > 0 ? postsList.map((post) => {
                    return (
                        <div key={post.id} className="post-card">
                            <h2>{post.title}</h2>
                            {post.description && <p className="post-description"><em>{post.description}</em></p>}
                            <p>{post.content}</p>
                            <div className="post-meta">
                                <small>By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</small>
                            </div>
                        </div>
                    )
                }) : <span style={{ gridColumn: `1 / span ${postColumns}`, textAlign: "center" }}>No posts available</span>}
            </section>
        </>
    );
};

export default MainContent;