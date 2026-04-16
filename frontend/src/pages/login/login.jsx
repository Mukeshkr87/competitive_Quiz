import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${apiUrl}/api/user/login`, data);
      Cookies.set("token", response.data.token, { expires: 1 });
      toast.success("Loggedin successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 px-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to continue your quiz journey
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("email", { required: "email is required" })}
            />
            {errors?.email && (
              <div className="text-sm text-red-400">{errors.email.message}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length of password must be 6.",
                },
              })}
            />
            {errors?.password && (
              <div className="text-sm text-red-400">
                {errors.password.message}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            size="md"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
