import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyB1Q4YpULju3n9VyJVu9Qb0IlwD9UT6YGw',
	authDomain: 'swinopopka.firebaseapp.com',
	projectId: 'swinopopka',
	storageBucket: 'swinopopka.appspot.com',
	messagingSenderId: '647800718461',
	appId: '1:647800718461:web:b38c857aa7e7f0c6a4dd14',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db, app }
