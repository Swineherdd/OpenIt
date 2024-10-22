import React, { useState } from 'react'
import Auth from '../../src/app/components/auth/Auth' 
import { User } from 'firebase/auth'
import style from './index.module.scss'
const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	return (
		<section className={style.MyPopka}>
			{currentUser ? (
				<h1 className={style.title}>
					Добро пожаловать, {currentUser.displayName || currentUser.email}!
				</h1>
			) : (
				<h1 className={style.title}>
					Пожалуйста, войдите или зарегистрируйте попку
				</h1>
			)}
			<Auth onUserChange={setCurrentUser} />
		</section>
	)
}

export default App
