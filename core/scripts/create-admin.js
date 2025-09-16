const userModel = require('../src/models/user-model');

async function createAdmin() {
    try {
        const adminData = {
            email: 'admin@example.com',
            password: 'admin123456',
            role: 'admin'
        };

        const admin = await userModel.create(adminData);
        console.log('Admin user created successfully:');
        console.log('Email:', admin.email);
        console.log('Role:', admin.role);
        console.log('ID:', admin.id);
        console.log('\nYou can now login with:');
        console.log('Email: admin@example.com');
        console.log('Password: admin123456');
    } catch (error) {
        if (error.message.includes('User already exists')) {
            console.log('Admin user already exists with email: admin@example.com');
        } else {
            console.error('Error creating admin user:', error.message);
        }
    }
}

createAdmin();