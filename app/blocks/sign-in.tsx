
import { useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { loginWithEmailAndPassword } from "~/db/auth";
import { resetPassword } from "~/db/auth";
import { Link, useNavigate } from "@remix-run/react"; 


export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signInDisabled, setSignInDisabled] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate(); 

  const handleSignIn = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      setPassword("");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      setEmail("");
      setPassword("");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    setSignInDisabled(true);
    setButtonClicked(true);

    const signInResult = await loginWithEmailAndPassword(email, password);
    if (signInResult.success) {
      console.log("Sign in successful!");
      setEmail("");
      setPassword("");
      navigate(`/events`);
    } else {
      console.error("Sign in error:", signInResult.error);
      setSignInDisabled(false);
      if (signInResult.error === "Invalid email or password.") {
        setPasswordError("Invalid email or password");
      } else {
        setPasswordError("Incorrect login or password or account does not exist");
      }
    }
    setButtonClicked(false);
  };

  const handleForgotPassword = async () => {
    const resetResult = await resetPassword(email); 
    if (resetResult.success) {
      console.log("Password reset email sent successfully!");
    } else {
      console.error("Error sending password reset email:", resetResult.error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <Card className="mx-auto max-w-sm" onKeyPress={handleKeyPress}>
      <CardHeader>
        <CardTitle className="text-2x">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
         
          <p className="text-sm hover:underline" onClick={handleForgotPassword} style={{ cursor: 'pointer' }}>
            Forgot Password? Please check email
          </p>
          <Button type="button" className="w-full" onClick={handleSignIn} disabled={signInDisabled || buttonClicked}>
            {buttonClicked ? "Signing In..." : "Sign In"}
          </Button>
        </div>
        
        <div className="mt-4 text-center text-sm">
          Do not have an account?{" "}
          <Link to="/sign-up" className="underline">Sign up</Link>
        </div>
      </CardContent>
    </Card>
  );
}
