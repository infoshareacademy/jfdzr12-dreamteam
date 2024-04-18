import { auth } from "./firebase";

export async function getUserUID() {
    const currentUser = auth.currentUser;
    if(currentUser) {
        const currentUserUID = currentUser.uid;
        console.log('current user uid from get user uid', currentUserUID)
        return currentUserUID
    } else {
        return;
    }
}


