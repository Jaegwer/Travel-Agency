import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./auth.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      toast.success("Successfully signed in!");
      navigate("/");
    } catch (error) {
      toast.error("Error signing");
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignIn();
  };
  return (
    <form className="auth" onSubmit={handleSubmit}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="card w-1/2 mx-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Sign in
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-white">
              Not a member? <Link className="hover:text-sky-400 transition ease-in-out delay-150" to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
