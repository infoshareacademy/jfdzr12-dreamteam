import { auth } from "./firebase";

export async function getUserUID() {
    const currentUser = auth.currentUser;
    if(currentUser) {
        const currentUserUID = currentUser.uid;
        return currentUserUID
    } else {
        return;
    }
}


