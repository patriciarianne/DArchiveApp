import { firebase, collection } from '../../src/firebase'

const getCurrentUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      return user
    } else {
      return null
    }
  })
}

const getUserData = async (id) => {
  try {
    const doc = await collection('users').doc(id).get()
    if (doc.exists) {
      return { id, ...doc.data() }
    } else {
      return null
    }
  } catch (error) {
    return error
  }
}

export { getCurrentUser, getUserData}