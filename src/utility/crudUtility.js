import { collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDoc, addDoc } from "firebase/firestore"
import { db } from "./firebaseApp"


export const readCategories = (setCategories) => {
    const collectionReference = collection(db, 'categories')
    const q = query(collectionReference, orderBy('name', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setCategories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return unsubscribe;
}

export const addPost = async (formdata) => {
    const collectionRef = collection(db, "posts")
    console.log(formdata);

    const newItem = { ...formdata, timestamp: serverTimestamp() }
    await addDoc(collectionRef, newItem)
}

export const readPosts = (setPosts, selectedCateg) => {
    const collectionRef = collection(db, "posts")
    const q = selectedCateg.length == 0 ? query(collectionRef, orderBy("timestamp", "desc")) : query(collectionRef, where("category", "in", selectedCateg))
    const unsubscribe = onSnapshot(q, (snapshot) => { setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) })
    return unsubscribe
}

export const readSinglePost = async (id, setPost) => {
    const docRef = doc(db, "posts", id)
    const docSnap = await getDoc(docRef)
    setPost({ ...docSnap.data(), id: docSnap.id })

}