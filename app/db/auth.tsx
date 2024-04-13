import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "~/firebase.config";

const auth = getAuth(app);
export const registerWithEmailAndPassword = (email:string, password:string) => {
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


export const loginWithEmailAndPassword =(email:string, password:string) =>{
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





// Logowanie użytkownika
// export const Login = () => {
//     // const navigate = useNavigate()
//     const handleSubmit = ({login, password}) => {
//         signInWithEmailAndPassword(auth, login, password)
//             .then((e) => console.log(e))
//             // .then(() => navigate("/admin")) // nawiguje po zalogowaniu do admina, panel admina
//     }

// return <Form submitText="Zaloguj się" handleSubmit={handleSubmit}/>
// }


// //forgot password

// //Challenge 5: Przypomnienie hasła
// export const ForgotPassword = () => {

//   const handleSubmit = ({login}) => {
//     //sam login bez password w nawiasie bo password jest hidden
//     sendPasswordResetEmail(auth, login)
//   }

//   return <Form submitText="Forgot Password" isPasswordHidden handleSubmit={handleSubmit}/>
// }