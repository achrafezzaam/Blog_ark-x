import React, { useState } from "react";

const MainContent = ({ postsList, postColumns }) => {
    const [posts, setPosts] = useState(postsList);

    const addPost = (newPost) => {
        setPosts([
            ...posts,
            newPost
        ]);
    };

    const delPost = (index) => {
        const newPosts = posts.filter((a, i) => i !== index);
        setPosts(newPosts);
    };

    const temp = {
        "title": "Testing the Add Button",
        "content": "This is a test for the add button feature.",
        "url": "#"    
    }
    
    
    return (
        <>
            <section id="hero">
                <h1>Welcome to my Blog App</h1>
                <p>A clean, modern space for your thoughts, stories, and ideas. Discover articles on topics you love, or start sharing your own perspective today.</p>
            </section>
            <section id="posts-container" style={{ gridTemplateColumns: `repeat(${postColumns}, 1fr)` }}>
                <button onClick={() => {addPost(temp)}}>Add new post</button>
                {posts.length > 0 ? posts.map((post, index) => {
                    return (
                        <div key={index} className="post-card">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <a href={post.url}>Read More</a>
                            <button onClick={() => {delPost(index)}}>Delete</button>
                        </div>
                    )
                }) : <span style={{ gridColumn: "1 / span 3", textAlign: "center" }}>No posts available</span>}
            </section>
        </>
    );
};

export default MainContent;