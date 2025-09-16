import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const schema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

const LoginForm = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                onLogin(result.data.user, result.data.token);
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input 
                        type="email" 
                        placeholder="Email"
                        {...register('email')} 
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                
                <div>
                    <input 
                        type="password" 
                        placeholder="Password"
                        {...register('password')} 
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                
                {error && <p className="error">{error}</p>}
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;