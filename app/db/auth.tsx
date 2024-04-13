import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "~/firebase.config";

const auth = getAuth(app);
export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.code === "auth/email-already-in-use") {
      return { success: false, error: "This email address is already in use." };
    }
    return { success: false, error: error.message };
  }
};


// //login


// //Challenge 4: Logowanie użytkownika
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