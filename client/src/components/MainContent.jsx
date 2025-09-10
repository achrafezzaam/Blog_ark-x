import React from "react";

const MainContent = ({ posts, postColumns }) => {
    return (
        <>
            <section id="hero">
                <h1>Welcome to my Blog App</h1>
                <p>A clean, modern space for your thoughts, stories, and ideas. Discover articles on topics you love, or start sharing your own perspective today.</p>
            </section>
            <section id="posts-container" style={{ gridTemplateColumns: `repeat(${postColumns}, 1fr)` }}>
                {posts.length > 0 ? posts.map((post, index) => {
                    return (
                        <div key={index} className="post-card">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <a href={post.url}>Read More</a>
                        </div>
                    )
                }) : <span style={{ gridColumn: "1 / span 3", textAlign: "center" }}>No posts available</span>}
            </section>
        </>
    );
};

export default MainContent;