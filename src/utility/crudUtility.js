import { collection, onSnapshot, orderBy, query, serverTimestamp, where, doc, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"
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
    //const docSnap = await getDoc(docRef)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setPost({ ...snapshot.data(), id: snapshot.id })
    })
}

export const deletePost = async (id) => {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
}

export const toggleLikes = async (uid, id) => {
    const docRef = doc(db, 'posts', id)
    const docSnap = await getDoc(docRef)
    const likesArray = docSnap.data().likes || []
    if (likesArray.includes(uid)) {
        console.log('unlike');
        await updateDoc(docRef, {likes: likesArray.filter(p_id=>p_id!=uid)})
    } else {
        console.log('like');
        await updateDoc(docRef, {likes:[...likesArray, uid]})
    }
}