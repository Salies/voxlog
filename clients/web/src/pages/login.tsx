import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { login, getCurrentUser } from "../lib/auth";

export default function Login() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    login(username, password)
      .then(() => {
        // Get the logged in user (needs the next request to work)
        const currentUser = getCurrentUser(res);
        setUser(currentUser);
        router.push("/");
      })
      .catch((err) => {
        const errors: [] = err.response?.data?.errors || [];
        // join all errors into one string
        const message = errors.join("\n");
        setError(message);
        setLoading(false);
        // clear password field
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Nome de usuário
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs italic text-red-500">{error}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-xs text-center text-gray-500">
          &copy;2022 VOXLOG. All rights reserved.
        </p>
      </div>
    </div>
  );
}
