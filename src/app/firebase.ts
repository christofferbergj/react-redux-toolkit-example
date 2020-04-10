import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from 'app/config'

firebase.initializeApp(firebaseConfig)
firebase.firestore()

/**
 * Get firestore timestamp
 * @type {() => firebase.firestore.FieldValue}
 */
export const timestamp = firebase.firestore.FieldValue.serverTimestamp

export default firebase
