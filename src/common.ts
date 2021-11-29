import {ref} from 'vue';
import {addDoc, collection, getDocs, getFirestore, query, where} from 'firebase/firestore'; // Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'; // TODO: Add SDKs for Firebase products that you want to use
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: <string>import.meta.env.VITE_FIREBASE_APP_API_KEY,
    authDomain: <string>import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN,
    projectId: <string>import.meta.env.VITE_FIREBASE_APP_PROJECT_ID,
    storageBucket: <string>import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET,
    messagingSenderId: <string>import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: <string>import.meta.env.VITE_FIREBASE_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const isLoggedIn = ref(false);
export const loggedInUser = ref();
export const db = getFirestore();

export function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export async function getWishlists(userUID: string) {
    const q = query(collection(db, '/wishlists'), where('userUID', '==', userUID));
    return await getDocs(q);
}

export async function createWishlist(name: string, uniqueId: string, userUID: string) {
    const docRef = await addDoc(collection(db, '/wishlists'), {
        userUID: userUID,
        name,
        uniqueId,
    });
}

export async function createWishlistItem(
    wishlistUniqueId: string,
    type: string,
    uuid: string,
    name: string,
    description: string,
    currency: string,
    price: number,
    url: string,
    picture: string,
    purchased: boolean
) {
    const docRef = await addDoc(collection(db, '/wishlistItems'), {
        wishlistUniqueId,
        type,
        uuid,
        name,
        description,
        currency,
        price,
        url,
        picture,
        purchased,
    });
}
