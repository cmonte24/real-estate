import React from "react";
import FormRow from "../components/FormRow";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 hover:shadow-xl w-96">
        <h1 className="font-bold text-4xl text-gray-800 font-mono text-center my-4 py-5">
          Login
        </h1>
        <FormRow labelName="email" type="email" />

        <FormRow labelName="password" type="password" />

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
