import { useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = () => {
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
    setEmail("");
    setPassword("");
    console.log("success!");
  };

  return (
    <Card className="mx-auto max-w-sm">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <Button type="button" className="w-full" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account? Sign up{" "}

          {/* <Link to="#" className="underline"> 
//             Sign in
//           </Link> */}
        </div>
      </CardContent>
    </Card>
  );
}
