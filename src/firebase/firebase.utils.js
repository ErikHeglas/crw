import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCmoCJsSzOVyzJRekOlhW8wUrKn9gv9zfU",
    authDomain: "crwn-db-ba62b.firebaseapp.com",
    databaseURL: "https://crwn-db-ba62b.firebaseio.com",
    projectId: "crwn-db-ba62b",
    storageBucket: "crwn-db-ba62b.appspot.com",
    messagingSenderId: "695478220393",
    appId: "1:695478220393:web:7a605a4bf1c95485e354f8",
    measurementId: "G-6WHHPRF5QZ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;