import { useAuth } from "../hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { validatePassword } from "../utils/validators/helpers";

export default function Login() {
  const router = useRouter();
  const { user, signIn, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (user?.username) router.push("/");
  }, [user]);

  useEffect(() => {
    const isValidPassword = validatePassword(password);
    if (username.length > 3 && isValidPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div>
        <h1 className="mb-5 text-3xl font-bold text-center text-white">
          Welcome back to voxlog!
        </h1>
        <div className="w-full max-w-xs mx-auto">
          <form
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-center text-gray-700"
                htmlFor="username"
              >
                Your Username
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-center text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-center text-gray-700"
                htmlFor="password"
              >
                insert your password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 leading-tight text-center text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="your strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                disabled={loading || buttonDisabled}
                className="px-4 py-2 mx-auto font-bold text-white duration-300 rounded focus:outline-none focus:shadow-outline bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 enabled:hover:from-purple-500 enabled:hover:via-pink-600 enabled:hover:to-red-600 disabled:opacity-50 hover:scale-110"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
