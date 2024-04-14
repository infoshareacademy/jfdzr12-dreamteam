import { useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { registerWithEmailAndPassword } from "~/db/auth";
import { Link } from "@remix-run/react";

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

    const signUpResult = await registerWithEmailAndPassword(email, password);
    if (signUpResult.success) {
      console.log("Account created successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      console.error("Sign up error:", signUpResult.error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
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
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
          </div>
          <Button type="button" className="w-full" style={{ backgroundColor: 'black' }} onClick={handleSignUp}>
            Create an account
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


