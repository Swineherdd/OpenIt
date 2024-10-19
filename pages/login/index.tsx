import React, { useState } from 'react'
import Auth from '../../src/app/components/auth/Auth' 
import { User } from 'firebase/auth'
const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	return (
		<div>
			{currentUser ? (
				<h1>
					Добро пожаловать, {currentUser.displayName || currentUser.email}!
				</h1>
			) : (
				<h1>Пожалуйста, войдите или зарегистрируйте попку</h1>
			)}
			<Auth onUserChange={setCurrentUser} />
		</div>
	)
}

export default App
