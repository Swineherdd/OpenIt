'use client'
import React, { useState } from 'react'
import Auth from '../../app/components/auth/Auth' 
import { User } from 'firebase/auth'
import style from './page.module.scss'

const App = () => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	return (
		<section className={style.MyPopka}>
			<Auth onUserChange={setCurrentUser} />
		</section>
	)
}

export default App
