const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const USERS_FILE = path.join(__dirname, '../../data/users.json');

class UserModel {
    async ensureDataFile() {
        try {
            await fs.access(USERS_FILE);
        } catch (error) {
            // File doesn't exist, create it with empty array
            await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
        }
    }

    async findAll() {
        await this.ensureDataFile();
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    }

    async findById(id) {
        const users = await this.findAll();
        return users.find(user => user.id === id);
    }

    async findByEmail(email) {
        const users = await this.findAll();
        return users.find(user => user.email === email);
    }

    async create(userData) {
        const users = await this.findAll();
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            const error = new Error('User already exists with this email');
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const newUser = {
            id: uuidv4(),
            email: userData.email,
            password: hashedPassword,
            role: userData.role || 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        users.push(newUser);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async validatePassword(email, password) {
        const user = await this.findByEmail(email);
        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return null;
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async update(id, updateData) {
        const users = await this.findAll();
        const userIndex = users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            return null;
        }

        // Hash password if it's being updated
        if (updateData.password) {
            const saltRounds = 12;
            updateData.password = await bcrypt.hash(updateData.password, saltRounds);
        }

        users[userIndex] = {
            ...users[userIndex],
            ...updateData,
            updatedAt: new Date().toISOString()
        };

        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

        // Return user without password
        const { password, ...userWithoutPassword } = users[userIndex];
        return userWithoutPassword;
    }

    async remove(id) {
        const users = await this.findAll();
        const userIndex = users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            return false;
        }

        users.splice(userIndex, 1);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    }
}

module.exports = new UserModel();