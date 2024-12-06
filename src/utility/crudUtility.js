import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "./firebaseApp"


export const readCategories = (setCategories) => {
    const collectionReference = collection(db, 'categories')
    const q = query(collectionReference, orderBy('name', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return unsubscribe;
}