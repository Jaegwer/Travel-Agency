import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./auth.css";
const Gender = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
];
const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:");
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp();
  };
  const [selectedGender, setSelectedGender] = useState("male");

  const handleGenderChange = (genderId: string) => {
    setSelectedGender(genderId);
  };
  return (
    <div className="w-1/2 mx-auto  flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 auth">
      <form className="card" onSubmit={handleSubmit}>
        <div className="space-y-12 ">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-700">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="text-base  text-gray-700">
                  Gender
                </label>

                <fieldset className="mt-4">
                  <div className="space-y-4">
                    {Gender.map((genderMethod) => (
                      <div key={genderMethod.id} className="flex items-center">
                        <input
                          id={genderMethod.id}
                          name="notification-method"
                          type="radio"
                          checked={selectedGender === genderMethod.id}
                          onChange={() => handleGenderChange(genderMethod.id)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor={genderMethod.id}
                          className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                        >
                          {genderMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Birth Date
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="date"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-700"
          >
            <p>
              Already have an account? <Link className="underline" to="/login">Login</Link>
            </p>
          </button>
          <button
            onClick={handleSignUp}
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
