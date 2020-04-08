import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from 'app/config'

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
