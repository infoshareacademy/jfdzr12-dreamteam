import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "~/firebase.config";

//rejestracja użytkownika

const auth = getAuth(app);
export const registerWithEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      return { success: true } as const;
      // .then(() => navigate("/home))?????gdzieś nas musi przenieść po zarejetrowaniu
    })
    .catch((error) => {
      if (error.message.includes("already in use")) {
        return { success: false, error: "This email address is already in use." } as const;
      }
      return { success: false, error: error.message } as const;
    });
};


//login 
export const loginWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return { success: true } as const;
      // .then(() => navigate("/home))?????gdzieś nas musi przenieść po logowaniu
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
       
        return { success: false, error: "Invalid email or password." } as const;
      }
      return { success: false, error: error.message } as const;
    });
};


//forgot password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true } as const;
  }
  catch (error) {
    return { success: false, error: error.message } as const;
  }
};

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>();
  useEffect(() => {
    auth.onAuthStateChanged((authState) => {
      setCurrentUser(authState)
    })
  }, [])
  if (currentUser === undefined) {
    return {
      status: 'loading',
    } as const;
  }
  if (currentUser) {
    return {
      status: 'authenticated',
      value: currentUser,
    } as const;
  }
  return {
    status: 'unauthenticated',
  } as const;
}

//logout
export const logout = async () => {
  try {
    await auth.signOut();
    return { success: true } as const;
  } catch (error) {
    return { success: false, error: error.message } as const;
  }
};