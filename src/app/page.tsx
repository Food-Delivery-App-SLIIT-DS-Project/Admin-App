"use client";
import { Label, TextInput, Button, Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      setError("");
      router.push("/dashboard");
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Branding Section */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col items-center justify-center space-y-4 p-6">
        <img
          src="/Branding_LightMode_export.svg"
          alt="Branding"
          className="w-1/2 h-auto"
        />
        <div className="text-lg font-medium text-gray-700 text-center">
          <i>Because Hunger Waits for No One</i>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1">Your email</Label>
            </div>
            <TextInput
              id="email1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@quickgrubs.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1">Your password</Label>
            </div>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Login</Button>

          {error && (
            <Alert color="failure" icon={HiInformationCircle}>
              {error}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
