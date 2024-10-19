import React, { useState, useEffect } from 'react';
import { auth } from '../../../../server/firebase/firebase';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import styles from './Auth.module.scss';

interface AuthProps {
    onUserChange: (user: User | null) => void;
}

const provider = new GoogleAuthProvider();

const Auth: React.FC<AuthProps> = ({ onUserChange }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            onUserChange(user); 
        });

        
        return () => unsubscribe();
    }, [onUserChange]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                const result = await signInWithEmailAndPassword(auth, email, password);
                onUserChange(result.user);
            } else {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                onUserChange(result.user);
            }
        } catch (error) {
            setError((error as Error).message);
            console.error("Ошибка при аутентификации:", error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            onUserChange(null);
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            const result = await signInWithPopup(auth, provider);
            onUserChange(result.user);
        } catch (error) {
            setError((error as Error).message);
            console.error("Ошибка при входе с Google:", error);
        }
    };

    return (
        <form className={styles.authForm} onSubmit={handleAuth}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <div>
                <label htmlFor='email'>Электронная почта</label>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='password'>Пароль</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type='submit'>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <button type='button' onClick={logOut}>
                Выйти
            </button>
            <button type='button' onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Перейти к регистрации' : 'Перейти к входу'}
            </button>
            <button type='button' onClick={handleGoogleSignIn}>
                Войти с Google
            </button>
        </form>
    );
};

export default Auth;