const { v4: uuidv4 } = require('uuid');
const fileStore = require('../utils/file-store');

const findAll = async ({ page = 1, limit = 10, sort = 'createdAt', order = 'desc', q = '' }) => {
    const { posts } = await fileStore.read();
    let filteredPosts = posts;

    // Search
    if (q) {
        const searchTerm = q.toLowerCase();
        filteredPosts = filteredPosts.filter(
            post => post.title.toLowerCase().includes(searchTerm) ||
                    post.content.toLowerCase().includes(searchTerm)
        );
    }

    // Sort
    filteredPosts.sort((a, b) => {
        const valA = a[sort] || '';
        const valB = b[sort] || '';
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });

    // Paginate
    const total = filteredPosts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const items = filteredPosts.slice(startIndex, endIndex);

    return { items, page, limit, total };
};

const findById = async (postId) => {
    const { posts } = await fileStore.read();
    return posts.find(p => p.id === postId);
};

const create = async (postData) => {
    const { posts } = await fileStore.read();
    const now = new Date().toISOString();
    const newPost = {
        id: uuidv4(),
        ...postData,
        tags: postData.tags || [],
        createdAt: now,
        updatedAt: now,
    };
    posts.push(newPost);
    await fileStore.write({ posts });
    return newPost;
};

const update = async (postId, postUpdateData) => {
    const data = await fileStore.read();
    const postIndex = data.posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return null;
    }

    const updatedPost = {
        ...data.posts[postIndex],
        ...postUpdateData,
        updatedAt: new Date().toISOString(),
    };
    data.posts[postIndex] = updatedPost;
    await fileStore.write(data);
    return updatedPost;
};

const remove = async (postId) => {
    const data = await fileStore.read();
    const initialLength = data.posts.length;
    data.posts = data.posts.filter(p => p.id !== postId);
    
    if (data.posts.length === initialLength) {
        return false;
    }
    
    await fileStore.write(data);
    return true;
};

module.exports = { findAll, findById, create, update, remove };
