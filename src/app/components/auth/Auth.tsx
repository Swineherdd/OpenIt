import React, { useState } from 'react';
import { auth } from '../../../../server/firebase/firebase';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
} from 'firebase/auth';

interface AuthProps {
    onUserChange: (user: User | null) => void;
}

const provider = new GoogleAuthProvider();

const Auth: React.FC<AuthProps> = ({ onUserChange }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleAuth = async () => {
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
            console.error("Ошибка при всоооа:", error);
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
        <div>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Электронная почта"
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Пароль"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleAuth}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <button onClick={logOut}>Выйти</button>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Перейти к регистрации' : 'Перейти к входу'}
            </button>
            <button onClick={handleGoogleSignIn}>Войти с Google</button>
        </div>
    );
};

export default Auth;