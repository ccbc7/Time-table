import React, { useState } from "react";
import { loginWithEmail } from "../utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginWithEmail(email, password);
      // ログイン成功時の処理をここに書く
    } catch (error) {
      console.error(error);
      // ログイン失敗時の処理をここに書く
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <form onSubmit={handleSubmit} className="p-5 bg-white rounded shadow-md">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-3 py-2 mt-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
