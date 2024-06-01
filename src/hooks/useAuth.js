import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../services/firebase';

export function checkIsLoggedIn() {
  return getAuth().currentUser !== null;
}

export function createAccount(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      console.error(error);
      if (['auth/email-already-in-use', 'auth/weak-password'].some(e => e === error.code)) {
        return error.code;
      }
      return null;
    });
}

export function logIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export function logOut() {
  const auth = getAuth();
  return signOut(auth).then(() => {
    return true;
  }).catch((error) => {
    console.error(error);
    return false;
  });
}