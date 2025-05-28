"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  return (
    <div className="flex min-h-screen pt-32 justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Trading Bot</h1>
          <p className="text-muted-foreground mt-2">
            Please enter your API keys to continue.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
          Login
        </Button>
      </div>
    </div>
  );
}
