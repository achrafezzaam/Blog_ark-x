const fs = require('fs').promises;
const path = require('path');
const config = require('../config');

const postsFilePath = path.resolve(config.dataPath);
const tempFilePath = `${postsFilePath}.tmp`;

// A promise chain to ensure writes are serialized.
let writeQueue = Promise.resolve();

const read = async () => {
    try {
        const data = await fs.readFile(postsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') { // File doesn't exist
            return { posts: [] };
        }
        throw error;
    }
};

const write = async (data) => {
    const task = async () => {
        try {
            // Atomic write: write to temp file first
            await fs.writeFile(tempFilePath, JSON.stringify(data, null, 2), 'utf8');
            // Then rename it to the actual file
            await fs.rename(tempFilePath, postsFilePath);
        } catch (error) {
            console.error('Failed to write to file store:', error);
            // Attempt to clean up temp file on failure
            await fs.unlink(tempFilePath).catch(() => {});
            throw error;
        }
    };
    
    // Add the write task to the queue
    writeQueue = writeQueue.then(task).catch(err => {
        // Prevent the queue from breaking on an error
        console.error("Write queue error:", err);
        return Promise.resolve();
    });
    
    return writeQueue;
};

module.exports = { read, write };
