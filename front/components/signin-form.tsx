"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInForm() {
  const { login, loading, user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(formData.username, formData.password, formData.rememberMe);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during sign in");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 h-screen flex flex-col justify-center items-center">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="mr-2"
            disabled={loading}
          />
          <span className="text-sm">Remember me</span>
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
