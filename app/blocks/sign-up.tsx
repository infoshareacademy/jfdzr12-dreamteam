
// import { useState } from "react";
// import { Button } from "~/atoms/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
// import { Input } from '~/atoms/ui/input';
// import { Label } from '~/atoms/ui/label';
// import { registerWithEmailAndPassword } from "~/db/auth";
// import { Link, useNavigate } from "@remix-run/react";
// import { getUserUID } from "~/db/get-user-uid";

// export const SignUp = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate(); 
//   const handleSignUp = async () => {
//     setFirstNameError("");
//     setLastNameError("");
//     setEmailError("");
//     setPasswordError("");
//     setConfirmPasswordError(""); 

//     if (!firstName) {
//       setFirstNameError("Name is required");
//       return;
//     }

//     if (!lastName) {
//       setLastNameError("Surname is required");
//       return;
//     }

//     if (!email) {
//       setEmailError("Email is required");
//       return;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Invalid email format");
//       return;
//     }

//     if (!password) {
//       setPasswordError("Password is required");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       return;
//     }

//     const signUpResult = await registerWithEmailAndPassword(email, password);
//     if (signUpResult.success) {
//       console.log("Account created successfully!");
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       const currentUserUID = await getUserUID();
//       navigate(`/${currentUserUID}/events`);
//     } else {
//       console.error("Sign up error:", signUpResult.error);
//     }
//   };

//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-xl">Sign Up</CardTitle>
//         <CardDescription>
//           Enter your information to create an account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid gap-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="first-name">Name</Label>
//               <Input
//                 id="first-name"
//                 placeholder="Name"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 required
//               />
//               {firstNameError && <p className="text-red-500">{firstNameError}</p>}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="last-name">Surname</Label>
//               <Input
//                 id="last-name"
//                 placeholder="Surname"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 required
//               />
//               {lastNameError && <p className="text-red-500">{lastNameError}</p>}
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="m@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {emailError && <p className="text-red-500">{emailError}</p>}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 px-2 py-1 text-sm"
//               >
//                 {showPassword ? "👁️" : "👁️‍🗨️"}
//               </button>
//             </div>
//             {passwordError && <p className="text-red-500">{passwordError}</p>}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="confirm-password">Confirm Password</Label>
//             <div className="relative">
//               <Input
//                 id="confirm-password"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-0 px-2 py-1 text-sm"
//               >
//                 {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
//               </button>
//             </div>
//             {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
//           </div>
//           <Button type="button" className="w-full" style={{ backgroundColor: 'black' }} onClick={handleSignUp}>
//             Create an account 
//           </Button>
//         </div>
//         <div className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//          <Link to="/sign-in" className="underline"> Sign in </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };


import { useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { registerWithEmailAndPassword } from "~/db/auth";
import { Link, useNavigate } from "@remix-run/react";
import { getUserUID } from "~/db/get-user-uid";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); // Dodanie stanu dla kliknięcia przycisku
  const navigate = useNavigate(); 

  const handleSignUp = async () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError(""); 

    if (!firstName) {
      setFirstNameError("Name is required");
      return;
    }

    if (!lastName) {
      setLastNameError("Surname is required");
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setButtonClicked(true); // Ustawienie stanu, że przycisk został kliknięty

    const signUpResult = await registerWithEmailAndPassword(email, password);
    if (signUpResult.success) {
      console.log("Account created successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      const currentUserUID = await getUserUID();
      navigate(`/${currentUserUID}/events`);
    } else {
      console.error("Sign up error:", signUpResult.error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <Card className="mx-auto max-w-sm" onKeyPress={handleKeyPress}>
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Name</Label>
              <Input
                id="first-name"
                placeholder="Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {firstNameError && <p className="text-red-500">{firstNameError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Surname</Label>
              <Input
                id="last-name"
                placeholder="Surname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {lastNameError && <p className="text-red-500">{lastNameError}</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-2 py-1 text-sm"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-2 py-1 text-sm"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
          </div>
          <Button type="button" className="w-full" style={{ backgroundColor: 'black' }} onClick={handleSignUp} disabled={buttonClicked}>
            {buttonClicked ? "Creating Account..." : "Create an account"} {/* Zmiana napisu na przycisku w zależności od stanu */}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
         <Link to="/sign-in" className="underline"> Sign in </Link>
        </div>
      </CardContent>
    </Card>
  );
};
